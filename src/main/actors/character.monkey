Strict

Public

Import mojo2
Import actors.actor
Import actors.animator
Import actors.shine
Import actors.shot 
Import assetbox
Import maps.gamemap
Import scenes.level
Import time

Class Character Extends Actor
Public

	Const CollisionRadius:Float = 2.0
	Const RunningSpeed:Float = 45.0
	Const RunningSpeedDiagonal:Float = 31.82
	Const JumpingSpeed:Float = 20.0
	Const JumpingSpeedDiagonal:Float = 16.0
	Const FallingSpeed:Float = 15.0
	Const FallingSpeedDiagonal:Float = 15.0
	Const DriftDecel:Float = 0.002
	Const SpacePressShootTime:Int = 400
	Const JumpDistance:Float = 21.0
	Const FallPenaltyTime:Int = 700
	
	Const Idle:Int = 0
	Const Running:Int = 1
	Const Sliding:Int = 2
	Const Jumping:Int = 3
	Const Shooting:Int = 4
	Const Falling:Int = 5
	
	Field map:GameMap
	Field level:Level
	Field atlas:Image[]
	Field img:Int
	Field animator:Animator = New Animator()
	Field status:Int = Idle

	Field velx:Float, vely:Float
	Field jumpDistanceAcum:Float 
	
	Field timeToShoot:Int = -1
	Field timeToRecover:Int = -1
	Field inputMoveUp:Bool
	Field inputMoveDown:Bool
	Field inputMoveLeft:Bool
	Field inputMoveRight:Bool
	Field inputSlide:Bool
	Field inputShoot:Bool
	Field inputJump:Bool
	Field collisionX:Int
	Field collisionY:Int

	Method New(level:Level)
		Self.level = level
		atlas = AssetBox.GfxCharacter
		animator.Animate(Idle, 0.0, 1.0)
		map = level.map
		directionY = 1.0
	End Method
	
	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
		Local animResult:AnimResult
		
		#If CONFIG="debug"
			If (KeyDown(KEY_R))
				status = Idle
				x = map.width * TileSize / 2.0
				y = map.height * TileSize / 2.0
			End If
		#End
		
		IA()
		collisionX = 0
		collisionY = 0
		Select (status)
			Case Idle, Running
				If (inputSlide)
					status = Sliding
					DoDrift(delta)
				Else If (inputMoveDown Or inputMoveLeft Or inputMoveRight Or inputMoveUp)
					DoRun(delta)
				Else
					velx = 0.0
					vely = 0.0
					status = Idle
				End If
			Case Sliding
				If (inputJump)
					jumpDistanceAcum = 0.0
					status = Jumping
					If (velx <> 0.0 And vely <> 0.0)
						velx = Sgn(velx) * JumpingSpeedDiagonal
						vely = Sgn(vely) * JumpingSpeedDiagonal
					Else
						velx = Sgn(velx) * JumpingSpeed
						vely = Sgn(vely) * JumpingSpeed
					End If
					DoJump(delta)
				Else If (inputShoot)
					status = Shooting
					Local shine:Shine = New Shine(level)
					shine.x = x + (directionX * 6.0 + directionY * 2.0)
					shine.y = y - 5.0 + (directionY * 6.0)
					Local shot:Shot = New Shot(level, directionX, directionY)
					shot.x = shine.x
					shot.y = shine.y
					level.AddActor(shine)
					level.AddActor(shot)
					level.camera.Shake(4.0)
					PlaySound(AssetBox.SfxShoot)
				Else If (inputSlide)
					DoDrift(delta)
				Else
					status = Idle
				End If
			Case Jumping
				DoJump(delta)
			Case Falling
				DoFall(delta)
		End Select	
		
		x = Int(Floor(x + 0.5))
		y = Int(Floor(y + 0.5))
		
		animResult = animator.Animate(status, directionX, directionY)
		If (animResult.ended)
			Select (status)
				Case Shooting
					status = Idle
					animResult = animator.Animate(status, directionX, directionY)
			End Select
		End If
		img = animResult.graph
	End Method
		
	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		#If CONFIG="debug"
			Local i:Int = Floor((y + 0.5) / TileSize)
			Local j:Int = Floor((x + 0.5) / TileSize)
			canvas.SetBlendMode(BlendMode.Multiply)
			Local tile:Int = map.tiles[i * map.width + j]
			canvas.DrawImage(Tileset.Tiles[tile], (j * TileSize) - camera.x0, (i * TileSize) - camera.y0)  
		#End

		canvas.SetBlendMode(BlendMode.Alpha)		
		canvas.DrawImage(atlas[img], x - camera.x0, y - camera.y0)
	End Method
	
	Method IA:Void()
		inputMoveDown = False
		inputMoveLeft = False
		inputMoveRight = False
		inputMoveUp = False
		inputSlide = False
		inputShoot = False
		inputJump = False
		If (KeyDown(KEY_SPACE) And (status = Idle Or status = Running) And timeToShoot = -1)
			timeToShoot = Time.instance.realActTime + SpacePressShootTime
			inputSlide = True
		Else If (KeyDown(KEY_SPACE) And status = Sliding)
			If (Time.instance.realActTime >= timeToShoot)
				inputShoot = True
			Else
				inputSlide = True
			End If
		Else
			If (timeToShoot <> -1 And (status = Sliding) And (velx <> 0.0 Or vely <> 0.0))
				inputJump = True
				timeToShoot = -1
			Else
				If (Not KeyDown(KEY_SPACE)) Then timeToShoot = -1 ' able to shoot/slide again
				If (KeyDown(KEY_UP))
					inputMoveUp = True
				Else If (KeyDown(KEY_DOWN))
					inputMoveDown = True
				End If
				If (KeyDown(KEY_LEFT))
					inputMoveLeft = True
				Else If (KeyDown(KEY_RIGHT))
					inputMoveRight = True
				End If
			End If
		End If
	End Method
	
	Method DoRun:Void(delta:Float)
		Local tile:Int
		Local increase:Float
		Local vel:Float
		status = Running
		directionX = 0.0
		directionY = 0.0
		velx = 0.0
		vely = 0.0
		If (inputMoveUp)
			vel = RunningSpeed
			vely = -1.0
			directionY = -1.0
		Else If (inputMoveDown)
			vel = RunningSpeed
			vely = 1.0
			directionY = 1.0
		End If
		If (inputMoveLeft)
			If (vel > 0) Then vel = RunningSpeedDiagonal Else vel = RunningSpeed
			velx = -1.0
			directionX = -1.0
		Else If (inputMoveRight)
			If (vel > 0) Then vel = RunningSpeedDiagonal Else vel = RunningSpeed
			velx = 1.0
			directionX = 1.0
		End If
		velx *= vel
		vely *= vel
		'movement & colision
		x += (velx * delta) / 1000.0
		increase = Sgn(velx)
		tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
		While (tile = Tileset.TileBlock Or tile = Tileset.TileJump)
			x -= increase
			tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
			collisionX = increase
		End While
		y += (vely * delta) / 1000.0
		increase = Sgn(vely)
		tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
		While (tile = Tileset.TileBlock Or tile = Tileset.TileJump)
			y -= increase
			tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
			collisionY = increase
		End While
		If ((velx <> 0.0 And vely <> 0.0 And collisionX And collisionY) Or
			(velx <> 0.0 And vely = 0.0 And collisionX) Or 
			(velx = 0.0 And vely <> 0.0 And collisionY))
			status = Idle
		End If
	End Method

	Method DoDrift:Void(delta:Float)
		Local decel:Float = delta * DriftDecel
		Local tile:Int
		Local increase:Float
		If (Abs(velx) < decel)
			velx = 0.0
		Else
			velx -= decel * Sgn(velx)
		End If
		If (Abs(vely) < decel)
			vely = 0.0
		Else
			vely -= decel * Sgn(vely)
		End If

		'movement & colision
		x += (velx * delta) / 1000.0
		increase = Sgn(velx)
		tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
		While (tile = Tileset.TileBlock Or tile = Tileset.TileJump)
			x -= increase
			tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
			collisionX = increase
		End While
		y += (vely * delta) / 1000.0
		increase = Sgn(vely)
		tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
		While (tile = Tileset.TileBlock Or tile = Tileset.TileJump)
			y -= increase
			tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
			collisionY = increase
		End While
	End Method
	
	Method DoJump:Void(delta:Float)
		Local tile:Int
		Local increase:Float
		
		'movement & colision
		x += (velx * delta) / 1000.0
		increase = Sgn(velx)
		tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
		While (tile = Tileset.TileBlock)
			x -= increase
			tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
			collisionX = increase
			status = Idle
		End While
		y += (vely * delta) / 1000.0
		increase = Sgn(vely)
		tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
		While (tile = Tileset.TileBlock)
			y -= increase
			tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
			collisionY = increase
			status = Idle
		End While
		
		Local xi:Int = Int(Floor(((velx * delta) / 1000.0) + 0.5))
		Local yi:Int = Int(Floor(((vely * delta) / 1000.0) + 0.5))
		jumpDistanceAcum += Int(Floor(Sqrt(xi * xi + yi * yi) + 0.5))
		If (collisionX Or collisionY Or jumpDistanceAcum >= JumpDistance) Then StopJump()
	End Method

	Method StopJump:Void()
		If (map.GetTileTypeAt(x, y) = Tileset.TileJump)
			If (velx <> 0.0 And vely <> 0.0)
				velx = Sgn(velx) * FallingSpeedDiagonal
				vely = Sgn(vely) * FallingSpeedDiagonal
			Else
				velx = Sgn(velx) * FallingSpeed
				vely = Sgn(vely) * FallingSpeed
			End If
			PlaySound(AssetBox.SfxTrip, 0)
			status = Falling
		Else 
			status = Idle
		End If
	End Method

	Method DoFall:Void(delta:Float)
		Local tile:Int
		Local increase:Float

		'movement & colision
		x += (velx * delta) / 1000.0
		increase = Sgn(velx)
		tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
		While (tile = Tileset.TileBlock)
			x -= increase
			tile = map.GetTileTypeAt(x + increase * CollisionRadius, y)
			collisionX = increase
		End While
		y += (vely * delta) / 1000.0
		increase = Sgn(vely)
		tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
		While (tile = Tileset.TileBlock)
			y -= increase
			tile = map.GetTileTypeAt(x, y + increase * CollisionRadius)
			collisionY = increase
		End While
		
		If (collisionX <> 0) Then velx = -velx
		If (collisionY <> 0) Then vely = -vely
		
		tile = map.GetTileTypeAt(x, y)
		If (tile <> Tileset.TileBlock And tile <> Tileset.TileJump)
			velx = 0.0
			vely = 0.0
			If (timeToRecover = -1)
				timeToRecover = Time.instance.actTime + FallPenaltyTime
			Else If (Time.instance.actTime > timeToRecover)
				timeToRecover = -1
				status = Idle
			End If
		End If
	End Method			
End Class