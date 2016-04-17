Strict

Public

Import mojo2
Import consts


Global MouseHitLeft:Int
Global MouseHitLeftUp:Int
Global MouseHitRight:Int
Global MouseHitRightUp:Int
Global MouseDownLeft:Int
Global MouseDownRight:Int

' I had to do my own MouseLeft logic since Monkey's one seems defective, at least in HTML5
Function UpdateMouse:Void()
	MouseDownLeft = MouseDown(MOUSE_LEFT)
	MouseDownRight = MouseDown(MOUSE_RIGHT)
	If (MouseHitLeft)
		MouseHitLeft = False
	Else If (Not MouseHitLeftUp)
		If (Not MouseDownLeft) Then MouseHitLeftUp = True
	Else If (MouseDownLeft)
		MouseHitLeft = True
		MouseHitLeftUp = False
	End If
	If (MouseHitRight)
		MouseHitRight = False
	Else If (Not MouseHitRightUp)
		If (Not MouseDownRight) Then MouseHitRightUp = True
	Else If (MouseDownRight)
		MouseHitRight = True
		MouseHitRightUp = False
	End If
End Function

Function TMouseX:Float()
	Return (MouseX() * CanvasWidth) / ScreenWidth
End Function

Function TMouseY:Float()
	Return (MouseY() * CanvasHeight) / ScreenHeight
End Function


