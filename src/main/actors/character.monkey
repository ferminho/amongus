Strict

Public

Import mojo2
Import actors.actor
Import actors.animator
Import actors.shine
Import actors.shot 
Import audio.dj
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
	Const WalkingSpeed:Float = 15.0
	Const WalkingSpeedDiagonal:Float = 15.0
	Const DriftDecel:Float = 0.003
	Const JumpDistance:Float = 21.0
	Const FallPenaltyTime:Int = 500
	Const SlideShootTime:Int = 400
	Const SlideLandTime:Int = 150
	
	Const Idle:Int = 0
	Const Running:Int = 1
	Const Sliding:Int = 2
	Const Jumping:Int = 3
	Const Shooting:Int = 4
	Const Falling:Int = 5
	Const Walking:Int = 6
	Const SlidingAfterJump:Int = 7
	
	Field map:GameMap
	Field level:Level
	Field atlas:Image[]
	Field img:Int
	Field animator:Animator = New Animator()
	Field status:Int = Idle

	Field velx:Float, vely:Float
	Field jumpDistanceAcum:Float = -1.0
	
	Field slideShootTimer:Int = -1
	Field timeToRecover:Int = -1
	Field inputMoveUp:Bool
	Field inputMoveDown:Bool
	Field inputMoveLeft:Bool
	Field inputMoveRight:Bool
	Field inputRun:Bool
	Field inputSlide:Bool
	Field inputShoot:Bool
	Field inputJump:Bool
	Field collisionX:Int
	Field collisionY:Int

	Method New(level:Level, atlas:Image[] = AssetBox.GfxCharacter)
		Self.level = level
		Self.atlas = atlas
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
		
		AI()
		collisionX = 0
		collisionY = 0
		Select (status)
			Case Idle, Running, Walking
				If (inputSlide)
					DoUpdateDirection()
					status = Sliding
					DoDrift(delta)
				Else If (inputJump)
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
				Else If (inputMoveDown Or inputMoveLeft Or inputMoveRight Or inputMoveUp)
					If (inputRun)
						DoMove(delta, Running)
					Else
						DoMove(delta, Walking)
					EndIf
				Else
					velx = 0.0
					vely = 0.0
					status = Idle
				End If
			Case Sliding, SlidingAfterJump
				If (inputShoot)
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
					Dj.instance.Play(AssetBox.SfxShoot)
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
	
	Method AI:Void()
		inputMoveDown = False
		inputMoveLeft = False
		inputMoveRight = False
		inputMoveUp = False
		inputSlide = False
		inputShoot = False
		inputJump = False
		inputRun = True ' always run
		
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
		
		If (status = Idle Or status = Running Or status = Walking)
			If (KeyDown(KEY_X))
				slideShootTimer = Time.instance.realActTime + SlideShootTime
				inputSlide = True
			Else If (KeyDown(KEY_Z))
				If (jumpDistanceAcum = -1.0) Then inputJump = True
			Else 
				jumpDistanceAcum = -1.0 ' able to jump again
			End If
		Else If (status = Sliding)
			If (Time.instance.realActTime >= slideShootTimer)
				inputShoot = True
				velx = 0.0
				vely = 0.0
			Else
				inputSlide = True
			End If
		Else If (status = SlidingAfterJump)
			If (Time.instance.realActTime >= slideShootTimer)
				status = Idle
				velx = 0.0
				vely = 0.0
			Else
				inputSlide = True
			End If
		Else If (status = Idle Or status = Running Or status = Walking)
		End If
	End Method
	
	Method DoMove:Void(delta:Float, newStatus:Int)
		Local tile:Int
		Local increase:Float
		Local vel:Float
		Local speed:Float 
		Local speedDiag:Float
		status = newStatus
		If (status = Walking)
			speed = WalkingSpeed
			speedDiag = WalkingSpeedDiagonal
		Else
			speed = RunningSpeed
			speedDiag = RunningSpeedDiagonal
		End If
		directionX = 0.0
		directionY = 0.0
		velx = 0.0
		vely = 0.0
		If (inputMoveUp)
			vel = speed
			vely = -1.0
			directionY = -1.0
		Else If (inputMoveDown)
			vel = speed
			vely = 1.0
			directionY = 1.0
		End If
		If (inputMoveLeft)
			If (vel > 0) Then vel = speedDiag Else vel = speed
			velx = -1.0
			directionX = -1.0
		Else If (inputMoveRight)
			If (vel > 0) Then vel = speedDiag Else vel = speed
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
	
	Method DoUpdateDirection:Void()
		If (inputMoveUp Or inputMoveDown Or inputMoveLeft Or inputMoveRight)
			' if any pressed, change direction, if not keep previous one
			directionX = 0.0
			directionY = 0.0
			If (inputMoveUp)
				directionY = -1.0
			Else If (inputMoveDown)
				directionY = 1.0
			End If
			If (inputMoveLeft)
				directionX = -1.0
			Else If (inputMoveRight)
				directionX = 1.0
			End If
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
				velx = Sgn(velx) * WalkingSpeedDiagonal
				vely = Sgn(vely) * WalkingSpeedDiagonal
			Else
				velx = Sgn(velx) * WalkingSpeed
				vely = Sgn(vely) * WalkingSpeed
			End If
			Dj.instance.Play(AssetBox.SfxTrip)
			status = Falling
		Else
			slideShootTimer = Time.instance.realActTime + SlideLandTime
			status = SlidingAfterJump 
			velx = 0.0
			vely = 0.0
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