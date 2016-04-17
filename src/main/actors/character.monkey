Strict

Public

Import mojo2
Import actors.actor
Import actors.animator
Import assetbox
Import maps.gamemap
Import time

Class Character Extends Actor
Public

	Const CollisionRadius:Float = 2.0
	Const RunningSpeed:Float = 32.0
	Const RunningSpeedDiagonal:Float = 22.63
	
	Const Idle:Int = 0
	Const Running:Int = 1
	Const Jumping:Int = 2
	Const Falling:Int = 3
	Const Shooting:Int = 4
	
	Field map:GameMap
	Field atlas:Image[]
	Field img:Int
	Field animator:Animator = New Animator()
	Field status:Int = Idle

	Field velx:Float, vely:Float
		
	Field inputMoveUp:Bool
	Field inputMoveDown:Bool
	Field inputMoveLeft:Bool
	Field inputMoveRight:Bool
	Field inputShoot:Bool
	Field collisionX:Int
	Field collisionY:Int

	Method New(map:GameMap)
		atlas = AssetBox.GfxCharacter
		animator.Animate(Idle, 0.0, 1.0)
		Self.map = map
	End Method
	
	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
		Local vel:Float
		Local animResult:AnimResult
		Local tile:Int
		Local increase:Float
		
		IA()
		collisionX = 0
		collisionY = 0
		
		Select (status)
			Case Idle, Running
				If (inputMoveDown Or inputMoveLeft Or inputMoveRight Or inputMoveUp)
					status = Running
					directionX = 0
					directionY = 0
					velx = 0.0
					vely = 0.0
					If (KeyDown(KEY_UP))
						vel = RunningSpeed
						vely = -1.0
						directionY = -1
					Else If (KeyDown(KEY_DOWN))
						vel = RunningSpeed
						vely = 1.0
						directionY = 1
					End If
					If (KeyDown(KEY_LEFT))
						If (vel > 0) Then vel = RunningSpeedDiagonal Else vel = RunningSpeed
						velx = -1.0
						directionX = -1
					Else If (KeyDown(KEY_RIGHT))
						If (vel > 0) Then vel = RunningSpeedDiagonal Else vel = RunningSpeed
						velx = 1.0
						directionX = 1
					End If
					vel = (vel * delta) / 1000.0
					velx *= vel
					vely *= vel
					'movement & colision
					x += velx
					increase = Sgn(velx)
					tile = GetCurrentTile(increase * CollisionRadius, 0.0)
					While (Tileset.TileType[tile] = Tileset.TileBlock Or Tileset.TileType[tile] = Tileset.TileJump)
						x -= increase
						tile = GetCurrentTile(increase * CollisionRadius, 0.0)
						collisionX = increase
					End While
					y += vely
					increase = Sgn(vely)
					tile = GetCurrentTile(0.0, increase * CollisionRadius)
					While (Tileset.TileType[tile] = Tileset.TileBlock Or Tileset.TileType[tile] = Tileset.TileJump)
						y -= increase
						tile = GetCurrentTile(0.0, increase * CollisionRadius)
						collisionY = increase
					End While
				Else
					status = Idle
				End If
		End Select		
		
		x = Int(Floor(x + 0.5))
		y = Int(Floor(y + 0.5))
		
		animResult = animator.Animate(status, directionX, directionY)
		If (animResult.ended)
			Select (status)
				Case Shooting
					status = Idle
					animResult = animator.Animate(status, directionX, directionY)
				Case Falling
					status = Idle
					animResult = animator.Animate(status, directionX, directionY)
			End Select
		End If
		img = animResult.graph
		
	End Method

	Method GetCurrentTile:Int(dispX:Float, dispY:Float)
		Local i:Int = Floor((y + dispY - 0.5) / TileSize)
		Local j:Int = Floor((x + dispX + 0.5) / TileSize)
		Return map.tiles[i * map.width + j]
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
		inputShoot = False
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
		If (KeyDown(KEY_SPACE))
			inputShoot = True
		End If
	End Method
	
End Class