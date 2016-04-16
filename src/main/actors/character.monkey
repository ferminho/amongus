Strict

Public

Import mojo2
Import actors.actor
Import assetbox
Import time

Class Character Extends Actor
Public

	Field atlas:Image[]

	Method New()
		atlas = AssetBox.GfxCharacter
	End Method
	
	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
		Local vel:Float = (32.0 * delta) / 1000.0
		If (KeyDown(KEY_SHIFT)) Then vel *= 2.0
		If (KeyDown(KEY_CONTROL)) Then vel *= 4.0
		If (KeyDown(KEY_UP))
			direction = DirectionUp			
			y -= vel
		Else If (KeyDown(KEY_DOWN))
			direction = DirectionDown
			y += vel
		End If
		If (KeyDown(KEY_LEFT))
			direction = DirectionLeft
			x -= vel
		Else If (KeyDown(KEY_RIGHT))
			direction = DirectionRight
			x += vel
		End If		
		
	End Method

	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		canvas.DrawImage(atlas[0], (x - camera.x0 + 0.5), (y - camera.y0 + 0.5))
	End Method
	
End Class