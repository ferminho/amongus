Strict

Public

Import mojo2

Class Tileset
Public

	Const TileFree:Int = 1
	Const TileBlock:Int = 2
	Const TileRoad:Int = 3	
	
	Global TileType:Int[] = [
		TileFree,	TileFree,	TileFree,	TileFree,	TileFree,	TileFree,	TileFree,	TileFree,	TileFree,			'	00-09
		TileFree,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileRoad,	TileRoad,	TileRoad,			'	10-19
		TileRoad,	TileRoad,	TileRoad,	TileRoad,	TileRoad,	TileRoad,	TileRoad,	TileRoad,	TileRoad,			'	20-29
		TileRoad,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,			'	30-32
		TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,			'	40-49
		TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock,			'	50-59
		TileBlock,	TileBlock,	TileBlock,	TileBlock,	TileBlock]														'	60-64
	
	Global Tiles:Image[]
	
	Function Initialize:Void()
		Tiles = Image.LoadFrames("monkey://data/tileset.png", 64, False, .0, .0, 0)
	End Function
End Class