Strict

Public

Import mojo2

Class AssetBox
Public

	Global GfxCharacter:Image[] 
	Global GfxPedestrian1:Image[]
	Global GfxMisc:Image[]
	
	Global SfxExplo1:Sound
	Global SfxExplo2:Sound
	Global SfxExplo3:Sound
	Global SfxShoot:Sound
	Global SfxTrip:Sound
	Global SfxDie1:Sound
	Global SfxDie2:Sound
	Global SfxDie3:Sound
	
	Function Initialize:Void()
		GfxCharacter = Image.LoadFrames("monkey://data/character.png", 64, False, .5, 1.0, 0)
		GfxPedestrian1 = Image.LoadFrames("monkey://data/pedestrian1.png", 64, False, .5, 1.0, 0)
		GfxMisc = Image.LoadFrames("monkey://data/misc.png", 64, False, .5, .5, 0)
		SfxExplo1 = LoadSound("monkey://data/explo1.wav")
		SfxExplo2 = LoadSound("monkey://data/explo2.wav")
		SfxExplo3 = LoadSound("monkey://data/explo3.wav")
		SfxShoot = LoadSound("monkey://data/shoot.wav")
		SfxTrip = LoadSound("monkey://data/trip.wav")
		SfxDie1 = LoadSound("monkey://data/die1.wav")
		SfxDie2 = LoadSound("monkey://data/die2.wav")
		SfxDie3 = LoadSound("monkey://data/die3.wav")
	End Function
	
End Class