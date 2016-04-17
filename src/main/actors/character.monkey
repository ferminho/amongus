Strict

Public

Import mojo2
Import actors.actor
Import actors.animator
Import assetbox
Import time

Class Character Extends Actor
Public

	Const Idle:Int = 0
	Const Running:Int = 1
	
	Field atlas:Image[]
	Field img:Int
	Field animator:Animator = New Animator()
	Field status:Int = Idle
	
	Field inputMoveUp:Bool
	Field inputMoveDown:Bool
	Field inputMoveLeft:Bool
	Field inputMoveRight:Bool
	Field inputShoot:Bool

	Method New()
		atlas = AssetBox.GfxCharacter
		animator.Animate(Idle, 0.0, 1.0)
	End Method
	
	Method Update:Void()
		Local delta:Float = Time.instance.lastFrame
		Local vel:Float = (30.0 * delta) / 1000.0
		Local animResult:AnimResult
		
		IA()
		
		Select (status)
			Case Idle, Running
				If (inputMoveDown Or inputMoveLeft Or inputMoveRight Or inputMoveUp)
					status = Running
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
				Else
					status = Idle
				End If
		End Select		
		
		x = Int(Floor(x + 0.5))
		y = Int(Floor(y + 0.5))
		
		animResult = animator.Animate(status, directionX, directionY)
		If (animResult.ended)
		End If
		img = animResult.graph
		
	End Method

	Method Draw:Void(canvas:Canvas, camera:Camera)
		canvas.SetBlendMode(BlendMode.Alpha)
		canvas.SetColor(1.0, 1.0, 1.0, 1.0)
		canvas.DrawImage(atlas[img], x - camera.x0, y - camera.y0)
	End Method
	
	Method IA:Void()
		inputMoveDown = False
		inputMoveLeft = False
		inputMoveRight = False
		inputMoveUp = False
		inputShoot = False
		If (KeyDown(KEY_UP))
			inputMoveUp = True
		Else If (KeyDown(KEY_DOWN))
			inputMoveDown = True
		End If
		If (KeyDown(KEY_LEFT))
			inputMoveLeft = True
		Else If (KeyDown(KEY_RIGHT))
			inputMoveRight = True
		End If
		If (KeyDown(KEY_SPACE))
			inputShoot = True
		End If
	End Method
	
End Class