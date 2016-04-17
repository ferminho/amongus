Strict

Public

Import mojo2 

Import actors.actor
Import actors.actorlist
Import actors.camera
Import actors.cameraeditor
Import actors.character
Import actors.dummycharacter
Import actors.pedestrian
Import maps.gamemap
Import maps.testmap
Import scenes.scene

Class Level Implements Scene

	Const MinPedestrians:Int = 30
	Const MaxPedestrians:Int = 50

	Field camera:Camera
	Field map:GameMap
	Field chr:Character
	Field world:ActorList = New ActorList()
	
	Method New(map:GameMap)
		Self.map = map
		
		If (Editing)
			camera = New CameraEditor(map)
			chr = New DummyCharacter()
		Else
			chr = New Character(Self)
			camera = New Camera(chr)
		End If
		world.AddFirst(chr)
		chr.x = Int(((map.width * TileSize) / 2.0) + 0.5)
		chr.y = Int(((map.height * TileSize) / 2.0) + 0.5)
		camera.x = chr.x
		camera.y = chr.y 
		
		Local nPedestrians:Int = Rnd(MinPedestrians, MaxPedestrians + 1)
		For Local i:Int = 1 To nPedestrians
			Local ped:Pedestrian = New Pedestrian(Self)
			world.AddLast(ped)
		End For
	End Method
	
	Method Start:Void()
	End Method

	Method Update:Int()
		For Local actor:Actor = EachIn world
			actor.Update()
		End For
		camera.Update()
		Return Scene.KeepRunning
	End Method
	
	Method Draw:Void(canvas:Canvas)	
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		
		map.Draw(canvas, camera)
		world.Sort()
		For Local actor:Actor = EachIn world
			actor.Draw(canvas, camera)
		End For
		camera.Draw(canvas, camera) ' usually doesn't draw
	End Method
		
	Method AddActor:Void(actor:Actor)
		world.AddLast(actor)
	End Method
	
	Method RemoveActor:Void(actor:Actor)
		world.Remove(actor)
	End Method
End Class