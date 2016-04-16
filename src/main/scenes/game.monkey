Strict

Public

Import mojo2

Import scenes.level
Import scenes.scene

Class Game Implements Scene

	Field levels:Scene[]
	Field currentLevel:Int = 0
	
	Method New()
		levels = New Scene[1]
		levels[0] = New Level()
	End Method
	
	Method Start:Void()
		currentLevel = 0
	End Method

	Method Run:Int()
		Local status:Int = levels[currentLevel].Run()
		If (status = Scene.SkipToNextScene)
			currentLevel+= 1
			levels[currentLevel].Start()
		Else If (status = Scene.Abort)
			Return Scene.Abort
		End If
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		levels[currentLevel].Draw(canvas)
	End Method
	
End Class