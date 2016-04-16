Strict 

Import mojo2

Import scenes.menu
Import scenes.game



Class MainClass Extends App
Private
	Field canvas:Canvas
	Field scenes:Scene[] = New Scene[2]
	Field currentScene:Int = 0

	Method OnCreate:Int()
		canvas = New Canvas()
		canvas.SetProjection2d(0.0, 64.0, 0.0, 64.0)
		
		scenes[0] = New Menu()
		scenes[1] = New Game()
		
		scenes[0].Start()
		Return 0
	End Method
	
	Method OnUpdate:Int()
		Local result:Int = scenes[currentScene].Run()
		If (result = Scene.SkipToNextScene)
			currentScene+= 1
			scenes[currentScene].Start()
		Else If (result = Scene.Abort)
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
	New MainClass()
	Return 0
End