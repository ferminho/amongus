Strict

Public

Import mojo2
Import actors.actor
Import assetbox
Import time

Class Character Extends Actor
Public

	Field atlas:Image[] = AssetBox.GfxCharacter

	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
	End Method

	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		canvas.DrawImage(atlas[0], Int(x), Int(y))
	End Method
	
End Class