Strict

Public

Import mojo2

Class AssetBox
Public

	Global GfxCharacter:Image[] 
	Global GfxMisc:Image[]
	
	Function Initialize:Void()
		GfxCharacter = Image.LoadFrames("monkey://data/character.png", 64, False, .5, 1.0, 0)
		GfxMisc = Image.LoadFrames("monkey://data/misc.png", 64, False, .5, .5, 0)
	End Function
	
End Class