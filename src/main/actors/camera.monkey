Strict

Public

Import actors.actor

Class Camera Extends Actor

	Method Update:Void()
		If (KeyDown(KEY_UP))
			y -= 1
		End If
		If (KeyDown(KEY_DOWN))
			y += 1
		End If
		If (KeyDown(KEY_LEFT))
			x -= 1
		End If
		If (KeyDown(KEY_RIGHT))
			x += 1
		End If
	End Method

End Class