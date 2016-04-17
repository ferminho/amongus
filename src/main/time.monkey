Strict

Private

Import mojo2

Public 

Class Time
Public

	Field initialTime:Int = 0
	Field timeDistortion:Float = 1.0
	Field actTime:Float = 0.0
	Field realActTime:Int = 0
	Field lastFrame:Float = 0.0
	Field realLastFrame:Float = 0.0
	
	Field lastFpsTime:Int = -1.0
	Field frames:Int = 0
	Field fps:Float = 0.0
	
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
		
		If (lastFpsTime = -1.0)
			lastFpsTime = temp
		Else If ((temp - lastFpsTime) >= 3000)
			lastFpsTime = temp
			fps = (frames + 1) / 3
			frames = 0
			Print(fps)
		Else
			frames += 1
		End If
	End Method
	
End Class