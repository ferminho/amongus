Strict

Public

Import scenes.scene

Class Game Implements Scene

	Method Start:Void()
	End Method

	Method Run:Int()
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		canvas.Clear()
		canvas.SetColor(255.0, 0.0, 0.0)
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetAlpha(0.5)
		canvas.DrawCircle(32.0, 32.0, 32.0)
		canvas.Flush
	End Method
	
End Class