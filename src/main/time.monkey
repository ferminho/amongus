Strict

Private

Import mojo

Public 

Class Time
Public

	Field initialTime:Int = 0
	Field timeDistortion:Float = 1.0
	Field actTime:Float = 0.0
	Field realActTime:Int = 0
	Field lastFrame:Float = 0.0
	Field realLastFrame:Float = 0.0
	
	Global instance:Time = New Time()
	
	Method New()
		initialTime = Millisecs()
		realActTime = 0.0
	End Method

	Method Update:Void()
		Local temp:Int = Millisecs() - initialTime
		
		realLastFrame = temp - realActTime
		lastFrame = realLastFrame * timeDistortion
		actTime = actTime + lastFrame
		realActTime = temp
	End Method
	
End Class