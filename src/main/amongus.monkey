Strict 

Import mojo2

Import consts
Import scenes.menu
Import scenes.game
Import time


Class AmongUs Extends App
Private
	Field canvas:Canvas
	Field scenes:Scene[] = New Scene[2]
	Field currentScene:Int = 0

	Method OnCreate:Int()
		Time.instance.Update()
	
		canvas = New Canvas()
		canvas.SetProjection2d(0.0, CanvasWidth, 0.0, CanvasHeight)
		
		scenes[0] = New Menu()
		scenes[1] = New Game()
		
		scenes[0].Start()
		Return 0
	End Method
	
	Method OnUpdate:Int()
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