Strict

Public

Import mojo2

Interface Scene
Public

	Const KeepRunning:Int = 0
	Const Abort:Int = 1
	Const SkipToNextScene:Int = 2

	Method Start:Void()

	' Returns status (KeepRunning, Abort, SkipToNextScene...)
	Method Run:Int()
	
	Method Draw:Void(canvas:Canvas)	

End Interface
