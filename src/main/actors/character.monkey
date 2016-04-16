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
		Local vel:Float = (30.0 * delta) / 1000.0
		If (KeyDown(KEY_SHIFT)) Then vel *= 2.0
		If (KeyDown(KEY_CONTROL)) Then vel *= 4.0
		If (KeyDown(KEY_UP) Or KeyDown(KEY_DOWN) Or KeyDown(KEY_LEFT) Or KeyDown(KEY_RIGHT))
			directionX = 0.0
			directionY = 0.0
			If (KeyDown(KEY_UP))
				y -= vel
				directionY = -1.0
			Else If (KeyDown(KEY_DOWN))
				y += vel
				directionY = 1.0
			End If
			If (KeyDown(KEY_LEFT))
				x -= vel
				directionX = -1.0
			Else If (KeyDown(KEY_RIGHT))
				x += vel
				directionX = 1.0
			End If		
		End If
		
		x = Int(Floor(x + 0.5))
		y = Int(Floor(y + 0.5))
		
	End Method

	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		canvas.DrawImage(atlas[0], x - camera.x0, y - camera.y0)
	End Method
	
End Class