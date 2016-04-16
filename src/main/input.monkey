Strict

Public

Import mojo2
Import consts

Function TMouseX:Float()
	Return (MouseX() * CanvasWidth) / ScreenWidth
End Function

Function TMouseY:Float()
	Return (MouseY() * CanvasHeight) / ScreenHeight
End Function