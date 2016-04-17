Strict

Public

Import mojo2
Import consts
Import scenes.scene
Import time

Class Menu Implements Scene
Public

	Field title:Image
	Field pressSpace:Image
	
	Const AlphaSpeed:Float = 1.5
	Const PressSpaceY:Float = 48.0
	Field alpha:Float = -1.0

	Method New()
		title = Image.Load("monkey://data/title.png", .0, .0, 0)
		pressSpace = Image.Load("monkey://data/press_space.png", .5, .5, 0)
	End Method
	
	Method Start:Void()
	End Method

	Method Update:Int()
		If (KeyDown(KEY_SPACE)) Then Return Scene.SkipToNextScene
		
		alpha += (Time.instance.lastFrame * AlphaSpeed) / 1000.0
		If (alpha > 1.0) Then alpha = -1.0
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		canvas.DrawImage(title, 0.0, 0.0)
		canvas.SetAlpha(Abs(alpha))
		canvas.DrawImage(pressSpace, CanvasHalfWidth, PressSpaceY) 
		canvas.Flush()
	End Method
	
End Class