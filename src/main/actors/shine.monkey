Strict

Public

Import actors.actor
Import assetbox
Import scenes.level
Import time

Class Shine Extends Actor
Public

	Const FrameTime:Int = 45

	Field atlas:Image[]
	Field img:Int = 0
	Field nextTime:Int = 0
	Field level:Level
	
	Method New(level:Level)
		atlas = AssetBox.GfxMisc
		nextTime = Time.instance.actTime + FrameTime
		Self.level = level
		z = -5.0
	End Method

	Method Update:Void()
		If (Time.instance.actTime >= nextTime)
			img += 1
			If (img > 3)
				level.RemoveActor(Self)	
			Else
				nextTime = Time.instance.actTime + FrameTime
			End If
		End If
		x = Floor(x + 0.5)
		y = Floor(y + 0.5)
	End Method	
	
	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetColor(1.0, 1.0, 1.0, 0.75)
		canvas.SetBlendMode(BlendMode.Additive)
		canvas.DrawImage(atlas[img], x - camera.x0, y - camera.y0)
	End Method
End Class