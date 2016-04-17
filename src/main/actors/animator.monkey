Strict

Public

Import actors.character
Import time

Class AnimStep
Public
	Field graph:Int
	Field timeMs:Int
	Method New(graph:Int, timeMs:Int)
		Self.graph = graph
		Self.timeMs = timeMs
	End Method
End Class

Class AnimResult
Public
	Field graph:Int
	Field ended:Bool
	Method New(graph:Int, ended:Bool)
		Self.graph = graph
		Self.ended = ended
	End Method
End Class

Class Animator
Public

	Global anims:AnimStep[6][]
	Function Initialize:Void()
		anims[Character.Idle] = [ New AnimStep(0, 500) ]
		anims[Character.Running] = [ New AnimStep(1, 120), New AnimStep(2, 90), New AnimStep(3, 120), New AnimStep(2, 90) ]
		anims[Character.Sliding] = [ New AnimStep(4, 500) ]
		anims[Character.Jumping] = [ New AnimStep(5, 500) ]
		anims[Character.Shooting] = [ New AnimStep(6, 300) ]
		anims[Character.Falling] = [ New AnimStep(7, 90), New AnimStep(8, 90), New AnimStep(9, 90), New AnimStep(10, 90) ]
	End Function

	Field stepEnd:Float
	Field currentStep:Int = 0
	Field status:Int = Character.Idle
	
	Method Animate:AnimResult(currentStatus:Int, directionX:Float, directionY:Float)	
		Local time:Float = Time.instance.actTime
		Local ended:Bool = False
		If (status <> currentStatus)
			currentStep = 0
			status = currentStatus
			stepEnd = time + (anims[status][currentStep].timeMs * Rnd(70, 130)) / 100 ' random component!
		Else If (time >= stepEnd)
			If (currentStep = anims[status].Length - 1)
				currentStep = 0
				ended = True
			Else
				currentStep += 1
			End If
			stepEnd = time + (anims[status][currentStep].timeMs * Rnd(70, 130)) / 100 ' random component!
		End If
		
		Local graph:Int = anims[status][currentStep].graph
		If (directionX < 0.0) 
			graph += 32
		Else If (directionX > 0.0)
			graph += 48
		Else If (directionY < 0.0)
			graph += 16
		End If
		
		Return New AnimResult(graph, ended)
	End Method
	
End Class