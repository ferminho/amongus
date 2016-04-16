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
		Local canvasX0:Int = camera.x - CanvasHalfWidth
		Local canvasY0:Int = camera.y - CanvasHalfHeight
		Local x0:Int = -(canvasX0 Mod TileSize)
		Local y:Int = -(canvasY0 Mod TileSize)

		Local tileI0:Int = canvasY0 / TileSize
		Local tileI1:Int = tileI0 + (CanvasHeight / TileSize)
		Local tileJ0:Int = canvasX0 / TileSize
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
	
End Class