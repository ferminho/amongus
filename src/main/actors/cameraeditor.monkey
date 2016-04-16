Strict

Public

Import actors.camera

Class CameraEditor extends Camera

	Method Update:Void()
		Local vel:Float = (64.0 * Time.instance.realLastFrame) / 1000.0
		If (KeyDown(KEY_SHIFT)) Then vel *= 2.0
		If (KeyDown(KEY_CONTROL)) Then vel *= 4.0
		If (KeyDown(KEY_UP))
			y -= vel
		Else If (KeyDown(KEY_DOWN))
			y += vel
		End If
		If (KeyDown(KEY_LEFT))
			x -= vel
		Else If (KeyDown(KEY_RIGHT))
			x += vel
		End If			
	End Method
End Class