Strict

Public

Import mojo2
Import actors.camera

Class Actor
Public

	Field x:Float, y:Float
	Field directionX:Int
	Field directionY:Int
	
	Method Update:Void()
	End Method

	Method Draw:Void(canvas:Canvas, camera:Camera)
	End Method
	
	Method Compare:Int(actor:Actor)
		If (y < actor.y)
			Return -1
		ElseIf (y > actor.y)
			Return 1
		End If
		Return 0
	End Method
End Class