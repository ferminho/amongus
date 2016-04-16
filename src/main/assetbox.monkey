Strict

Public

Import mojo2

Class AssetBox
Public

	Global GfxCharacter:Image[] 
	
	Function Initialize:Void()
		GfxCharacter = Image.LoadFrames("monkey://data/character.png", 64, False, .5, 1.0, 0)
	End Function
	
End Class