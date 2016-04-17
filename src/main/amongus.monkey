Strict 

Import mojo2

Import assetbox
Import consts
Import scenes.menu
Import scenes.game
Import time


Class AmongUs Extends App
Private
	Const DesiredFps:Float = 50.0
	Const FrameTime:Int = 1000.0 / DesiredFps

	Field canvas:Canvas
	Field scenes:Scene[] = New Scene[2]
	Field currentScene:Int = 0
	
	Field nextExpectedFrame:Int 

	Method OnCreate:Int()
		Time.instance.Update()
	
		canvas = New Canvas()
		canvas.SetProjection2d(0.0, CanvasWidth, 0.0, CanvasHeight)
		
		scenes[0] = New Menu()
		scenes[1] = New Game()
		
		scenes[0].Start()
		
		nextExpectedFrame = Millisecs() + FrameTime
		Return 0
	End Method
	
	Method OnUpdate:Int()
		Local time:Int = Millisecs()

		If (time >= nextExpectedFrame)
			UpdateMouse()
			nextExpectedFrame = time + FrameTime
			Time.instance.Update()
			Local status:Int = scenes[currentScene].Update()
			If (status = Scene.SkipToNextScene)
				currentScene+= 1
				scenes[currentScene].Start()
			Else If (status = Scene.Abort)
				currentScene-= 1
				If (currentScene < 0) Then EndApp()
				scenes[currentScene].Start()
			End If
		End If
		Return 0
	End Method
	
	Method OnRender:Int()
		scenes[currentScene].Draw(canvas)
		Return 0
	End Method

End Class

Function Main:Int()
	New AmongUs()
	Return 0
End