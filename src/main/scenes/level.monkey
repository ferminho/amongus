Strict

Public

Import maps.gamemap
Import scenes.scene

Class Level Implements Scene

	Field map:GameMap
	
	Method New(map:GameMap)
		Self.map = map
	End Method
	
	Method Start:Void()
	End Method

	Method Run:Int()
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
	End Method
		
End Class