Strict

Public

Import mojo2

Import actors.camera
Import consts
Import maps.tileset

Class GameMap
Public

	Field width:Int
	Field height:Int
	Field tiles:Int[]

	Method Draw:Void(canvas:Canvas, camera:Camera)
		Local x0:Int = -(camera.x0 Mod TileSize)
		Local y:Int = -(camera.y0 Mod TileSize)

		Local tileI0:Int = camera.y0 / TileSize
		Local tileI1:Int = tileI0 + (CanvasHeight / TileSize)
		Local tileJ0:Int = camera.x0 / TileSize
		Local tileJ1:Int = tileJ0 + (CanvasWidth / TileSize)
		
		For Local i:Int = tileI0 to tileI1
			If (i >= 0 And i < height)
				Local x:Int = x0
				For Local j:Int = tileJ0 To tileJ1
					If (j >= 0 And j < width)
						Local imgN:Int = tiles[i * width + j]
						Local img:Image = Tileset.Tiles[imgN]
						canvas.DrawImage(img, x, y)
					End If
					x += TileSize
				End For
			End If
			y += TileSize
		End For
			
	End Method
	
	Method GetTileTypeAt:Int(x:Float, y:Float)
		Local i:Int = Floor((y - 0.5) / TileSize)
		Local j:Int = Floor((x + 0.5) / TileSize)
		if (i < 0 Or i >= height) Then Return Tileset.TileBlock
		If (j < 0 Or j >= width) Then Return Tileset.TileBlock
		Return Tileset.TileType[tiles[i * width + j]]
	End Method
	
End Class