Strict

Public

Import actors.actor
Import consts
Import time

Class Camera Extends Actor
Public 

	Const ShiftX:Float = CanvasHeight / 7
	Const ShiftY:Float = CanvasWidth / 7
	Const Speed:Float = 60.0
	
	Field x0:Int	' screen origin
	Field y0:Int
	
	Field owner:Actor
	
	Field destX:Int
	Field destY:Int
	
	Field shaking:Float
	Field lastDirection:Int = 0 ' 1 horizontal, 2 vertical

	Method New(cameraOwner:Actor)
		owner = cameraOwner
	End Method
	
	Method Update:Void()
		destX = owner.x
		destY = owner.y
		' this avoids the camera running in two directions at once on diagonals - it remembers the first pressed direction (up/down vs left/right)
		' it helps avoid the shaky camera effect
		If (lastDirection = 1)
			If (owner.directionX <> 0.0)
				destX = Int(Floor(owner.x + (ShiftX * owner.directionX) + 0.5))		
			ElseIf (owner.directionY <> 0.0)
				lastDirection = 2
				destY = Int(Floor(owner.y + (ShiftY * owner.directionY) + 0.5))
			Else
				lastDirection = 0
			End If
		Else If (lastDirection = 2)
			If (owner.directionY <> 0.0)
				destY = Int(Floor(owner.y + (ShiftY * owner.directionY) + 0.5))
			ElseIf (owner.directionX <> 0.0)
				lastDirection = 1
				destX = Int(Floor(owner.x + (ShiftX * owner.directionX) + 0.5))		
			Else
				lastDirection = 0
			End If
		Else
			If (owner.directionX <> 0.0)
				lastDirection = 1
				destX = Int(Floor(owner.x + (ShiftX * owner.directionX) + 0.5))		
			ElseIf (owner.directionY <> 0.0)
				lastDirection = 2
				destY = Int(Floor(owner.y + (ShiftY * owner.directionY) + 0.5))
			End If
		End If
		
		If (x <> destX Or y <> destY)
			Local vel:Float = (Speed * Time.instance.lastFrame) / 1000.0
			Local dist:Float = Sqrt(Pow(destX - x, 2) + Pow(destY - y, 2))
			Local angle:Float = ATan2(destY - y, destX - x)
			If (dist < vel)
				x = destX
				y = destY
			Else
				Local velX:Float = vel * Cos(angle)
				Local velY:Float = vel * Sin(angle)
				x = x + velX
				y = y + velY
			End If
		End If
		Local shiftX:Float
		Local shiftY:Float 
		If (shaking > 0.0)
			shiftX = Rnd(-shaking, shaking)
			shiftY = Rnd(-shaking, shaking)
			shaking -= 1.0
		End If
		x = Int(Floor(x + shiftX + 0.5))
		y = Int(Floor(y + shiftY + 0.5))
		x0 = Int(Floor(x - CanvasHalfWidth + 0.5))
		y0 = Int(Floor(y - CanvasHalfHeight + 0.5))
	End Method

	Method Shake:Void(magnitude:Float)
		shaking = magnitude
	End Method
End Class