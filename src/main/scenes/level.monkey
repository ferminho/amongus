Strict

Public

Import mojo2 

Import actors.actor
Import actors.camera
Import actors.cameraeditor
Import actors.character
Import maps.gamemap
Import maps.testmap
Import scenes.scene

Class Level Implements Scene

	Field camera:Camera
	Field map:GameMap
	Field chr:Character
	
	Method New(map:GameMap)
		Self.map = map
		chr = New Character()
		chr.x = 4.0
		chr.y = 7.0
		
		If (Editing)
			camera = New CameraEditor(map)
		Else
			camera = New Camera(chr)
		End If
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
		canvas.Clear()
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		
		map.Draw(canvas, camera)
		chr.Draw(canvas, camera)
		camera.Draw(canvas, camera) ' usually doesn't draw but who knows?
		canvas.Flush()
	End Method
		
End Class