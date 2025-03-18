'use client'

import { useEffect, useRef, useState } from 'react'

// 撒花粒子类型
type Confetti = {
  x: number
  y: number
  radius: number
  color: string
  velocity: {
    x: number
    y: number
  }
  rotation: number
  rotationSpeed: number
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [showText, setShowText] = useState(false) // 新增状态管理文字显示
  
  // 密码验证相关状态
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [showPasswordHint, setShowPasswordHint] = useState(false)
  
  // 中文古风引言
  const ancientQuote = "云想衣裳花想容，春风拂槛露华浓";
  const displayText = "杨涵锦就tm是个雷军";

  // 验证密码函数
  const verifyPassword = () => {
    if (password === '123456') {
      setPasswordVerified(true)
      setPasswordError(false)
      
      // 密码验证成功后，延迟一点启动特效页面
      setTimeout(() => {
        setShowText(true)
      }, 1500)
    } else {
      setPasswordError(true)
      setPassword('')
    }
  }

  // 处理密码输入
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError(false)
  }

  // 处理密码框回车键按下
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      verifyPassword()
    }
  }

  // 显示密码提示
  const togglePasswordHint = () => {
    setShowPasswordHint(!showPasswordHint)
  }

  // 背景动画效果
  useEffect(() => {
    if (!canvasRef.current || !passwordVerified) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 设置canvas尺寸
    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 粒子数量 - 增加粒子数量使背景更丰富
    const particlesCount = Math.floor(width * height / 5000) // 减少一些粒子，让古风效果更明显
    
    // 粒子数组
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
      opacity: number
      pulse: boolean
      size: number // 新增粒子大小变化属性
    }[] = []

    // 创建粒子 - 使用古风配色
    const ancientColors = [
      'hsl(43, 74%, 49%)',   // 金色
      'hsl(33, 82%, 30%)',   // 棕色
      'hsl(24, 54%, 66%)',   // 烟褐色
      'hsl(19, 56%, 40%)',   // 赭石色
      'hsl(15, 60%, 27%)',   // 深棕
      'hsl(36, 100%, 94%)'   // 米色
    ]

    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 3 + 1
      const colorIndex = Math.floor(Math.random() * ancientColors.length)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: ancientColors[colorIndex],
        speedX: Math.random() * 0.6 - 0.3, // 速度更慢，更加优雅
        speedY: Math.random() * 0.6 - 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        pulse: Math.random() > 0.5,
        size: Math.random() 
      })
    }

    // 动画逻辑
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // 古风背景渐变
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height))
      gradient.addColorStop(0, '#2C1810')  // 深棕色
      gradient.addColorStop(0.5, '#1a0c04')  // 更深的棕色
      gradient.addColorStop(1, '#0a0502')  // 接近黑色
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // 更新所有粒子
      for (const particle of particles) {
        // 脉动效果 - 更平滑的呼吸效果
        if (particle.pulse) {
          particle.size = 0.8 + Math.sin(Date.now() * 0.0008 + Math.random() * 10) * 0.2
          particle.opacity = 0.2 + Math.sin(Date.now() * 0.001 + Math.random() * 10) * 0.15
        }
        
        particle.x += particle.speedX
        particle.y += particle.speedY

        // 边界检查
        if (particle.x < 0 || particle.x > width) {
          particle.speedX = -particle.speedX
        }
        if (particle.y < 0 || particle.y > height) {
          particle.speedY = -particle.speedY
        }

        // 实际半径计算
        const actualRadius = particle.radius * particle.size

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, actualRadius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`)
                                     .replace('hsl', 'hsla')
        ctx.fill()
        
        // 粒子发光效果 - 古风光晕
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, actualRadius * 3, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', ', 0.1)')
                                     .replace('hsl', 'hsla')
        ctx.fill()
      }

      // 绘制连接线 - 丝绸飘带效果
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) { // 减少连接距离，更加精致
            ctx.beginPath()
            const opacity = 0.15 * (1 - distance / 120) // 降低不透明度
            ctx.strokeStyle = `rgba(218, 165, 32, ${opacity})`
            ctx.lineWidth = 0.6 // 更细的线
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [passwordVerified]) // 依赖密码验证状态

  // 文字动画效果 - 使用React状态管理
  useEffect(() => {
    if (!showText) return
    
    // 重置动画状态
    setAnimationComplete(false)
    
    // 延迟后触发撒花效果
    const timer = setTimeout(() => {
      setAnimationComplete(true)
    }, displayText.length * 80 + 500)
    
    return () => clearTimeout(timer)
  }, [showText, displayText])

  // 撒花特效 - 更丰富的效果
  useEffect(() => {
    if (!animationComplete || !confettiCanvasRef.current) return

    const canvas = confettiCanvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 设置canvas尺寸
    const setCanvasSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
    }

    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // 创建撒花粒子 - 使用古风配色
    const confetti: Confetti[] = []
    const confettiCount = 300 // 稍微减少粒子数量
    const colors = [
      '#DAA520', '#CD853F', '#D2B48C', '#BC8F8F', '#F5DEB3', 
      '#DEB887', '#D2691E', '#8B4513', '#A0522D', '#CD5C5C',
      '#B22222', '#8B0000', '#800000', '#8E4585', '#C19A6B'
    ]
    
    // 中国传统元素形状
    const shapes = [
      // 圆形
      (ctx: CanvasRenderingContext2D, size: number) => {
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.fill()
      },
      // 方形 - 代表印章
      (ctx: CanvasRenderingContext2D, size: number) => {
        ctx.fillRect(-size, -size, size * 2, size * 2)
      },
      // 六边形 - 代表花瓣
      (ctx: CanvasRenderingContext2D, size: number) => {
        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3
          ctx.lineTo(
            Math.cos(angle) * size,
            Math.sin(angle) * size
          )
        }
        ctx.closePath()
        ctx.fill()
      },
      // 梅花形状
      (ctx: CanvasRenderingContext2D, size: number) => {
        ctx.beginPath()
        for (let i = 0; i < 5; i++) {
          const outerAngle = (i * 2 * Math.PI) / 5
          ctx.lineTo(
            Math.cos(outerAngle) * size,
            Math.sin(outerAngle) * size
          )
          
          const innerAngle = outerAngle + Math.PI / 5
          ctx.lineTo(
            Math.cos(innerAngle) * (size / 2),
            Math.sin(innerAngle) * (size / 2)
          )
        }
        ctx.closePath()
        ctx.fill()
      },
      // 扇形
      (ctx: CanvasRenderingContext2D, size: number) => {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.arc(0, 0, size, -Math.PI / 4, Math.PI / 4)
        ctx.closePath()
        ctx.fill()
      }
    ]

    for (let i = 0; i < confettiCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 8 + 2, // 更大的粒子
        color: randomColor,
        velocity: {
          x: (Math.random() - 0.5) * 15, // 速度更快
          y: (Math.random() - 0.5) * 15
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8 // 旋转更快
      })
    }

    // 撒花动画
    const gravity = 0.12 // 更轻的重力
    const friction = 0.985 // 更少的摩擦
    let confettiActive = true
    let frames = 0

    const animateConfetti = () => {
      frames++
      ctx.clearRect(0, 0, width, height)

      if (confettiActive) {
        for (const particle of confetti) {
          particle.velocity.y += gravity
          particle.velocity.x *= friction
          particle.velocity.y *= friction
          
          particle.x += particle.velocity.x
          particle.y += particle.velocity.y
          particle.rotation += particle.rotationSpeed

          // 绘制五彩纸屑
          ctx.save()
          ctx.translate(particle.x, particle.y)
          ctx.rotate(particle.rotation * Math.PI / 180)
          
          // 根据帧数随机改变形状
          const shape = shapes[Math.floor(Math.random() * shapes.length)]
          
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 5 // 轻微发光效果
          
          shape(ctx, particle.radius)
          
          ctx.restore()
        }
      }

      // 粒子循环
      confetti.forEach(particle => {
        if (particle.y > height + 100 || particle.y < -100 || 
            particle.x > width + 100 || particle.x < -100) {
          
          if (Math.random() > 0.97) { // 一部分粒子将重新投放
            particle.x = width / 2
            particle.y = height / 2
            particle.velocity.x = (Math.random() - 0.5) * 15
            particle.velocity.y = (Math.random() - 0.5) * 15
          }
        }
      })

      if (confettiActive) {
        requestAnimationFrame(animateConfetti)
      }
    }

    animateConfetti()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [animationComplete])
  
  // 生成随机的星星
  const generateStars = (count: number) => {
    const stars = []
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const delay = Math.random() * 4
      const size = Math.random() * 3 + 1 // 变化星星大小
      stars.push(
        <div
          key={i}
          className="star"
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animation: `twinkle 4s ${delay}s infinite`
          }}
        />
      )
    }
    return stars
  }
  
  // 根据设备设置装饰元素数量
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const decorationCount = isMobile ? 30 : 50

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center ancient-bg">
      {/* 背景装饰元素 - 减少移动设备上的数量 */}
      <div className="ancient-decoration">
        {!isMobile && (
          <>
            <div className="chinese-cloud cloud-1"></div>
            <div className="chinese-cloud cloud-2"></div>
          </>
        )}
        <div className="chinese-cloud cloud-3"></div>
        <div className="chinese-cloud cloud-4"></div>
        
        <div className="lantern lantern-1"></div>
        <div className="lantern lantern-2"></div>
        {!isMobile && (
          <>
            <div className="lantern lantern-3"></div>
            <div className="lantern lantern-4"></div>
          </>
        )}
        
        <div className="ribbon ribbon-1"></div>
        <div className="ribbon ribbon-2"></div>
        {!isMobile && (
          <>
            <div className="ribbon ribbon-3"></div>
            <div className="ribbon ribbon-4"></div>
          </>
        )}
        
        {!isMobile && (
          <>
            <div className="ink-splash ink-1"></div>
            <div className="ink-splash ink-2"></div>
          </>
        )}
        <div className="ink-splash ink-3"></div>
        <div className="ink-splash ink-4"></div>
        
        {!isMobile && (
          <>
            <div className="flying-bird bird-1"></div>
            <div className="flying-bird bird-2"></div>
            <div className="flying-bird bird-3"></div>
          </>
        )}
        
        <div className="stars">
          {generateStars(decorationCount)}
        </div>
      </div>
      
      {/* 背景画布 */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      
      {/* 撒花画布 */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* 密码验证页面 */}
      {!passwordVerified && (
        <div className="w-full h-full flex items-center justify-center z-50">
          <div className="ancient-scroll ancient-border max-w-md w-full mx-4">
            <div className="corner-tl"></div>
            <div className="corner-tr"></div>
            <div className="corner-bl"></div>
            <div className="corner-br"></div>
            
            <div className="scroll-content">
              <h2 className="ancient-title text-3xl mb-6">玉阙绛阙宫</h2>
              
              <p className="ancient-text text-lg mb-4 tracking-wider text-center">
                须凭仙令，方可入内
              </p>
              
              <div className="space-y-5">
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyDown={handleKeyDown}
                    className={`ancient-input ${passwordError ? 'border-red-500 animate-shake' : ''}`}
                    placeholder="请输入密令..."
                    autoFocus
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-400 text-center">密令有误，请重试</p>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={togglePasswordHint}
                    className="text-sm text-amber-800 hover:text-amber-700 transition-colors"
                  >
                    需要提示？
                  </button>
                  <button
                    type="button"
                    onClick={verifyPassword}
                    className="ancient-button"
                  >
                    验证
                  </button>
                </div>
                
                {showPasswordHint && (
                  <div className="mt-3 p-3 bg-amber-800/30 rounded-lg border border-amber-700/30 animate-fadeInUp">
                    <p className="text-sm text-amber-700 text-center">
                      <span className="font-semibold">提示：</span> 最简单的6位数字
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-amber-800/70">
                  此乃仙家秘境，非有缘人不可入内
                </p>
              </div>
            </div>
            
            <div className="ancient-seal seal-1"></div>
          </div>
        </div>
      )}
      
      {/* 特效页面 - 仅在密码验证通过后显示 */}
      {passwordVerified && (
        <>
          {/* 主要内容 - 固定在屏幕中央 */}
          <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-full">
            <div className="ancient-scroll ancient-border">
              <div className="corner-tl"></div>
              <div className="corner-tr"></div>
              <div className="corner-bl"></div>
              <div className="corner-br"></div>
              
              <div className="scroll-content">
                {/* 顶部引言 */}
                <p className="ancient-text text-lg tracking-wider mb-4 text-amber-900 glow-text">
                  {ancientQuote}
                </p>
                
                {/* 主要文字 */}
                <h1 className="ancient-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-widest">
                  {displayText.split('').map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block opacity-0 transform translate-y-10 scale-50 transition-all duration-800"
                      style={{
                        animation: showText ? `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s forwards` : 'none',
                        animationFillMode: 'forwards',
                        '--index': index,
                      } as React.CSSProperties}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = `#DAA520`
                        e.currentTarget.style.transform = 'translateY(-15px) scale(1.4) rotate(5deg)'
                        e.currentTarget.style.textShadow = '0 0 20px #DAA520'
                        e.currentTarget.style.zIndex = '10'
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = ''
                        e.currentTarget.style.transform = 'translateY(0) scale(1) rotate(0)'
                        e.currentTarget.style.textShadow = ''
                        e.currentTarget.style.zIndex = '1'
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
                
                {/* 底部装饰 */}
                <div className="ancient-text text-lg text-amber-900">
                  <p className="tracking-wider animate-float">
                    若有缘，君自知
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
