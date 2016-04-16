Strict

Public

Import actors.actor
Import consts
Import time

Class Camera Extends Actor
Public 

	Const ShiftX:Float = CanvasHeight / 3.0
	Const ShiftY:Float = CanvasWidth / 3.0
	Const Speed:Float = 64.0
	
	Field x0:Int	' screen origin
	Field y0:Int
	
	Field owner:Actor
	
	Field destX:Int
	Field destY:Int

	Method New(cameraOwner:Actor)
		owner = cameraOwner
	End Method
	
	Method Update:Void()
		Select (owner.direction)
			Case DirectionUp
				destX = owner.x
				destY = owner.y - ShiftY
			Case DirectionDown 
				destX = owner.x
				destY = owner.y + ShiftY
			Case DirectionLeft
				destX = owner.x - ShiftX
				destY = owner.y
			Case DirectionRight
				destX = owner.x + ShiftX
				destY = owner.y
		End Select
		
		If (x <> destX Or y <> destY)
			Local vel:Float = (Speed * Time.instance.lastFrame) / 1000.0
			Local dist:Float = Sqrt(Pow(destX - x, 2) + Pow(destY - y, 2))
			Local angle:Float = ATan2(destY - y, destX - x)
			If (dist < vel)
				x = destX
				y = destY
			Else
				Local velX:Float = Sgn(destX - x) * (vel * Cos(angle))
				Local velY:Float = Sgn(destY - y) * (vel * Sin(angle))
				x = x + velX
				y = y + velY
			End If
		End If
		x0 = Int(x - CanvasHalfWidth + 0.5)
		y0 = Int(y - CanvasHalfHeight + 0.5)
	End Method

End Class