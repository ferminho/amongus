Strict

Public

Import actors.camera
Import maps.gamemap
Import input

Class CameraEditor extends Camera
Public

	Const Margin:Float = TileSize + 2.0
	Const MarginStart:Float = CanvasHeight - Margin
	Const FittingTiles:Int = (CanvasWidth / (TileSize + 1.0)) + 1
	Const HalfFittingTiles:Int = FittingTiles / 2
	Const SelectedTileX:Int = (CanvasHalfWidth - (TileSize / 2.0))

	Field map:GameMap
	Field currentTile:Int = 0

	Method New(map:GameMap)
		Self.map = map
	End Method
	
	Method Update:Void()
		Local vel:Float = (32.0 * Time.instance.realLastFrame) / 1000.0
		If (KeyDown(KEY_SPACE))
			x = Int(((map.width * TileSize) / 2.0) + 0.5)
			y = Int(((map.height * TileSize) / 2.0) + 0.5)
		Else			
			If (KeyDown(KEY_SHIFT)) Then vel *= 2.0
			If (KeyDown(KEY_CONTROL)) Then vel *= 4.0
			If (KeyDown(KEY_UP))
				y -= vel
			Else If (KeyDown(KEY_DOWN))
				y += vel
			End If
			If (KeyDown(KEY_LEFT))
				x -= vel
			Else If (KeyDown(KEY_RIGHT))
				x += vel
			End If
		End If	
		
		Local mx:Float = TMouseX()
		Local my:Float = TMouseY()
		
		If (my >= MarginStart)
			If (MouseHitLeft Or MouseHitRight)
				Local offset:Int = Floor((mx - SelectedTileX) / (TileSize + 1.0))
				currentTile += offset
				If (currentTile < 0) Then currentTile = 0
				If (currentTile > Tileset.Tiles.Length) Then currentTile = Tileset.Tiles.Length - 1
			End If
		Else
			Local screenX0:Float = x - CanvasHalfWidth
			Local screenY0:Float = y - CanvasHalfHeight
			Local i:Int = Floor((my + screenY0) / TileSize)
			Local j:Int = Floor((mx + screenX0) / TileSize)
			If (i >= 0 And j >= 0 And i < map.height And j < map.width)
				If (MouseDownLeft)
					map.tiles[i * map.width + j] = currentTile
				Else If (MouseDownRight)
					currentTile = map.tiles[i * map.width + j]
				End If
				If (KeyDown(KEY_NUM0))
					Local tile:Int = map.tiles[i * map.width + j]
					If (tile >= 0 And tile <= 4)
						tile = Int(Rnd(0.0, 5.0))
					Else If (tile >= 16 And tile <= 20)
						tile = Int(Rnd(16.0, 21.0))
					End If
					map.tiles[i * map.width + j] = tile
				End If
			End If
		End If
		
		If (KeyHit(KEY_P))
			For Local i:Int = 1 To 100
				Print("")
			End For
			For Local i:Int = 0 To map.height - 1
				Local line:String = ""
				Local offset:Int = i * map.width
				For Local j:Int = 0 To map.width - 1
					line += map.tiles[offset] + ","
					offset += 1
				End For
				Print(line)
			End For
		End If
		
		x0 = Int(x - CanvasHalfWidth + 0.5)
		y0 = Int(y - CanvasHalfHeight + 0.5)
	End Method
	
	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetColor(0.1, 0.1, 0.1, 1.0)
		canvas.DrawRect(0.0, MarginStart, CanvasWidth, Margin)
		canvas.SetColor(1.0, 0.1, 0.1, 1.0)
		canvas.DrawRect(CanvasHalfWidth - (Margin / 2.0), MarginStart, Margin, Margin)

		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		
		Local y:Int = MarginStart + 1.0
		Local tile:Int = currentTile - HalfFittingTiles
	
		Local x:Int = SelectedTileX - (HalfFittingTiles * (TileSize + 1.0))
		While (x < CanvasWidth)
			If (tile >= 0 And tile < Tileset.Tiles.Length)
				canvas.DrawImage(Tileset.Tiles[tile], x, y)
			End If
			tile += 1
			x += TileSize + 1.0
		End While
	End Method
End Class