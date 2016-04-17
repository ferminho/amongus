Strict

Public

Import mojo2 

Import actors.actor
Import actors.camera
Import actors.cameraeditor
Import actors.character
Import actors.dummycharacter
Import maps.gamemap
Import maps.testmap
Import scenes.scene

Class Level Implements Scene

	Field camera:Camera
	Field map:GameMap
	Field chr:Character
	
	Method New(map:GameMap)
		Self.map = map
		
		If (Editing)
			camera = New CameraEditor(map)
			chr = New DummyCharacter()
		Else
			chr = New Character(map)
			camera = New Camera(chr)
		End If
		chr.x = Int(((map.width * TileSize) / 2.0) + 0.5)
		chr.y = Int(((map.height * TileSize) / 2.0) + 0.5)
		camera.x = chr.x
		camera.y = chr.y 
	End Method
	
	Method Start:Void()
		Update()
	End Method

	Method Update:Int()
		chr.Update()
		camera.Update()
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		
		map.Draw(canvas, camera)
		chr.Draw(canvas, camera)
		camera.Draw(canvas, camera) ' usually doesn't draw but who knows?
	End Method
		
End Class