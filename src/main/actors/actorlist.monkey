Strict

Public

Import actors.actor

Class ActorList Extends List<Actor>
	
	Method Compare:Int(a:Actor, b:Actor)
		If (a.z < b.z) Then Return -1
		If (a.z > b.z) Then Return 1
		If (a.y < b.y) Then Return -1
		If (a.y > b.y) Then Return 1
		Return 0
	End Method
End Class