Strict

Public

Import mojo2 

Import actors.actor
Import actors.camera
Import actors.cameraeditor
Import maps.gamemap
Import maps.testmap
Import scenes.scene

Class Level Implements Scene

	Field map:GameMap
	Field camera:Camera
	
	Method New(map:GameMap)
		Self.map = map
		If (Editing)
			camera = New CameraEditor(map)
		Else
			camera = New Camera()
		End If
	End Method
	
	Method Start:Void()
	End Method

	Method Update:Int()
	
		camera.Update()
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		canvas.Clear()
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		
		map.Draw(canvas, camera)
		camera.Draw(canvas, camera) ' usually doesn't draw but who knows?
		canvas.Flush()
	End Method
		
End Class