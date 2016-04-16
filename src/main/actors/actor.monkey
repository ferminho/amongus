Strict

Public

Import mojo2

Class Actor
Public

	Const DirectionDown:Int = 0
	Const DirectionUp:Int = 1
	Const DirectionLeft:Int = 2
	Const DirectionRight:Int = 3	

	Field x:Float, y:Float
	Field direction:Int = DirectionDown
	
	Method Update:Void()
	End Method

	Method Draw:Void(canvas:Canvas)
	End Method
		
End Class