Strict

Public

Import actors.character

Class Pedestrian Extends Character
Public

	Const Walk:Int = 0
	Const Wait:Int = 1
	Const Run:Int = 2	

	Field pedStatus:Int 
	Field nextMoodChange:Int
	

	Method New(level:Level)
		Super.New(level, AssetBox.GfxPedestrian1)
		
		Local maxX:Float = (map.width * TileSize) - 1.0
		Local maxY:Float = (map.height * TileSize) - 1.0
		x = Rnd(0.0, maxX)
		y = Rnd(0.0, maxY)
		Local tile:Int = map.GetTileTypeAt(x, y)
		While (tile = Tileset.TileBlock Or tile = Tileset.TileJump)
			x = Rnd(0.0, maxX)
			y = Rnd(0.0, maxY)
			tile = map.GetTileTypeAt(x, y)
		End While
		SuddenChange()
	End Method

	Method AI:Void()
		If (Time.instance.actTime >= nextMoodChange)
			SuddenChange()
		Else
			Select (pedStatus)
				Case Wait
				Case Walk
					If (collisionX)
						RandomizeDirection(True)
						Stop()
						FollowDirection()
					Else If (collisionY)
						RandomizeDirection(False, True)
						Stop()
						FollowDirection()
					EndIf
			End Select
		End If
	End Method
	
	Method SuddenChange:Void()
		RandomizeDirection()
		Stop()
		If (Rnd(0.0, 100.0) > 40.0)
			pedStatus = Walk
			FollowDirection()
		Else
			pedStatus = Wait
		End If
		nextMoodChange = Time.instance.actTime + Rnd(4000.0, 10000.0)
	End Method
	
	Method RandomizeDirection:Void(avoidCurrentX:Bool = False, avoidCurrentY:Bool = False)
		Local oldX:Float = directionX
		Local oldY:Float = directionY
		directionX = Floor(Rnd(-1.0, 1.99))
		directionY = Floor(Rnd(-1.0, 1.99))
		While ((avoidCurrentX And oldX = directionX) Or (avoidCurrentY And oldY = directionY))
			directionX = Floor(Rnd(-1.0, 1.99))
			directionY = Floor(Rnd(-1.0, 1.99))
		End While
	End Method
	
	Method FollowDirection:Void()
		If (directionX < 0.0) Then inputMoveLeft = True
		If (directionX > 0.0) Then inputMoveRight = True
		If (directionY < 0.0) Then inputMoveUp = True
		If (directionY > 0.0) Then inputMoveDown = True
	End Method

	Method Stop:Void()
		inputMoveDown = False
		inputMoveLeft = False
		inputMoveRight = False
		inputMoveUp = False
		inputRun = False 
	End Method
End Class