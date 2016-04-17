Strict

Public

Import actors.actor
Import assetbox
Import scenes.level
Import time

Class Shot Extends Actor
Public

	Const Speed:Float = 90.0
	Const SpeedDiagonal:Float = 70.71
	Const FrameTime:Int = 25
	Const BaseDistance:Float = 50.0
	Const PercentVariance:Float = 20.0

	Field atlas:Image[]
	Field img:Int = 2
	Field nextTime:Int = 0
	Field level:Level
	
	Field vx:Float, vy:Float
	Field distanceAcum:Int
	Field targetDistance:Int
	
	Method New(level:Level, directionX:Float, directionY:Float)
		atlas = AssetBox.GfxMisc
		nextTime = Time.instance.actTime + FrameTime
		Self.level = level
		If (directionX <> 0 And directionY <> 0)
			vx = directionX * SpeedDiagonal
			vy = directionY * SpeedDiagonal
		Else
			vx = directionX * Speed
			vy = directionY * Speed
		End If
		z = -10.0
		targetDistance = (BaseDistance * Rnd (100.0 - PercentVariance, 100.0 + PercentVariance)) / 100.0
	End Method

	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
		If (Time.instance.actTime >= nextTime)
			img += 1
			If (img > 3)
				img = 2
			End If
			nextTime = Time.instance.actTime + FrameTime
		End If
		x += (vx * delta) / 1000.0
		y += (vy * delta) / 1000.0
		x += (Rnd(-PercentVariance, PercentVariance) * 10.0) / 100.0
		x = Floor(x + 0.5)
		y = Floor(y + 0.5)
		y += (Rnd(-PercentVariance, PercentVariance) * 10.0) / 100.0
		
		Local xi:Int = Int(Floor(((vx * delta) / 1000.0) + 0.5))
		Local yi:Int = Int(Floor(((vy * delta) / 1000.0) + 0.5))
		distanceAcum += Int(Floor(Sqrt(xi * xi + yi * yi) + 0.5))		
		If (level.map.GetTileTypeAt(x, y) = Tileset.TileBlock Or distanceAcum >= targetDistance)
			Explode()
		End If
	End Method	
	
	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetColor(1.0, 1.0, 1.0, 0.75)
		canvas.SetBlendMode(BlendMode.Additive)
		canvas.DrawImage(atlas[img], x - camera.x0, y - camera.y0)
	End Method
	
	Method Explode:Void()
		level.RemoveActor(Self)
		Local explosions:Int = Rnd(5, 8)
		For Local i:Int = 1 To explosions
			
			Local explo:Shine = New Shine(level, (Shine.BaseFrameTime * Rnd(80.0, 120.0)) / 100.0)
			explo.x = x + Rnd(-5.0, 5.0)
			explo.y = y + Rnd(-5.0, 5.0)
			level.AddActor(explo)
		End For
		level.camera.Shake(7.0)
	End Method
End Class