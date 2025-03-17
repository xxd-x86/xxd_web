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
  const textRef = useRef<HTMLDivElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  const [showText, setShowText] = useState(false) // 新增状态管理文字显示

  // 背景动画效果
  useEffect(() => {
    if (!canvasRef.current) return

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
    const particlesCount = Math.floor(width * height / 4000) // 增加粒子密度
    
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

    // 创建粒子
    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 3 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`, // 使用全彩色谱
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() > 0.5,
        size: Math.random() // 随机初始大小因子
      })
    }

    // 动画逻辑
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // 渐变背景
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height))
      gradient.addColorStop(0, '#1a2f6f')  // 更鲜艳的蓝色
      gradient.addColorStop(0.5, '#121a3a')  // 中间色
      gradient.addColorStop(1, '#060c1a')  // 接近黑色
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // 更新所有粒子
      for (const particle of particles) {
        // 脉动效果 - 更平滑的呼吸效果
        if (particle.pulse) {
          particle.size = 0.8 + Math.sin(Date.now() * 0.001 + Math.random() * 10) * 0.2
          particle.opacity = 0.3 + Math.sin(Date.now() * 0.002 + Math.random() * 10) * 0.2
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
        
        // 粒子发光效果 - 更强的光晕
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, actualRadius * 2, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', ', 0.15)')
                                     .replace('hsl', 'hsla')
        ctx.fill()
        
        // 额外的光晕层
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, actualRadius * 3, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', ', 0.05)')
                                     .replace('hsl', 'hsla')
        ctx.fill()
      }

      // 绘制连接线 - 彩虹连接线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) { // 增加连接距离
            ctx.beginPath()
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            )
            const color1 = particles[i].color.replace(')', `, ${0.2 * (1 - distance / 150)})`)
                                          .replace('hsl', 'hsla')
            const color2 = particles[j].color.replace(')', `, ${0.2 * (1 - distance / 150)})`)
                                          .replace('hsl', 'hsla')
            gradient.addColorStop(0, color1)
            gradient.addColorStop(1, color2)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.8 // 更粗的线
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()
    
    // 2秒后显示文字
    setTimeout(() => {
      setShowText(true)
    }, 1500)

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  // 文字动画效果 - 完全重写
  useEffect(() => {
    if (!textRef.current || !showText) return
    
    const text = textRef.current
    const content = "张智萱是超级无敌大帅哥"
    const letters = content.split('')
    
    // 清空原始文本
    text.innerHTML = ''
    
    // 为每个字母创建具有更丰富效果的span
    letters.forEach((letter, index) => {
      const span = document.createElement('span')
      span.innerText = letter
      span.style.opacity = '0'
      span.style.display = 'inline-block'
      span.style.transform = 'translateY(40px) rotateY(90deg) scale(0.5)'
      span.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`
      text.appendChild(span)
      
      // 为每个字符添加独特的悬停效果
      span.onmouseover = () => {
        span.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`
        span.style.transform = 'translateY(-15px) scale(1.4) rotate(5deg)'
        span.style.textShadow = '0 0 20px currentColor'
        span.style.zIndex = '10'
      }
      
      span.onmouseout = () => {
        span.style.color = ''
        span.style.transform = 'translateY(0) scale(1) rotate(0)'
        span.style.textShadow = ''
        span.style.zIndex = '1'
      }
    })
    
    // 延迟一点后开始逐个显示字符
    setTimeout(() => {
      const spans = text.querySelectorAll('span')
      spans.forEach((span) => {
        span.style.opacity = '1'
        span.style.transform = 'translateY(0) rotateY(0) scale(1)'
      })
      
      // 所有字符显示完成后，触发撒花效果
      setTimeout(() => {
        setAnimationComplete(true)
      }, letters.length * 80 + 500)
    }, 300)
    
  }, [showText]) // 依赖showText状态

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

    // 创建撒花粒子
    const confetti: Confetti[] = []
    const confettiCount = 400 // 更多粒子数量
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
      '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
      '#FF10F0', '#7DF9FF', '#ADFF2F', '#FD3A4A', '#C3B091',
      '#FF9EE5', '#AAF0D1', '#7BCCB5', '#FFC8DD', '#FFAFCC'
    ]
    
    // 粒子的形状数量增加
    const shapeCount = 5

    for (let i = 0; i < confettiCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 10 + 3, // 更大的粒子
        color: randomColor,
        velocity: {
          x: (Math.random() - 0.5) * 20, // 速度更快
          y: (Math.random() - 0.5) * 20
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10 // 旋转更快
      })
    }

    // 撒花动画
    const gravity = 0.15 // 更轻的重力
    const friction = 0.99 // 更少的摩擦
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
          const shape = (Math.floor(frames / 30) + Math.floor(Math.random() * shapeCount)) % shapeCount
          
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 15 // 更强的发光效果
          
          if (shape === 0) {
            // 圆形
            ctx.beginPath()
            ctx.arc(0, 0, particle.radius, 0, Math.PI * 2)
            ctx.fill()
          } else if (shape === 1) {
            // A矩形
            ctx.fillRect(-particle.radius, -particle.radius / 2, particle.radius * 2, particle.radius)
          } else if (shape === 2) {
            // 心形
            ctx.beginPath()
            const size = particle.radius
            ctx.moveTo(0, -size/2)
            ctx.bezierCurveTo(size/2, -size, size, -size/2, 0, size/2)
            ctx.bezierCurveTo(-size, -size/2, -size/2, -size, 0, -size/2)
            ctx.fill()
          } else if (shape === 3) {
            // 星形
            ctx.beginPath()
            const spikes = 5
            const outerRadius = particle.radius
            const innerRadius = particle.radius / 2
            
            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius
              const angle = (i * Math.PI) / spikes
              
              ctx.lineTo(
                Math.cos(angle) * radius,
                Math.sin(angle) * radius
              )
            }
            
            ctx.closePath()
            ctx.fill()
          } else {
            // 六边形
            ctx.beginPath()
            const sides = 6
            const angle = (2 * Math.PI) / sides
            
            for (let i = 0; i < sides; i++) {
              ctx.lineTo(
                Math.cos(i * angle) * particle.radius,
                Math.sin(i * angle) * particle.radius
              )
            }
            
            ctx.closePath()
            ctx.fill()
          }
          
          ctx.restore()
        }
      }

      // 粒子循环 - 当粒子飞出屏幕时重用它们，制造持续效果
      confetti.forEach(particle => {
        if (particle.y > height + 100 || particle.y < -100 || 
            particle.x > width + 100 || particle.x < -100) {
          
          if (Math.random() > 0.97) { // 一部分粒子将重新投放
            particle.x = width / 2
            particle.y = height / 2
            particle.velocity.x = (Math.random() - 0.5) * 20
            particle.velocity.y = (Math.random() - 0.5) * 20
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

  return (
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center">
      {/* 背景动画 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* 撒花特效 Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none"
      />
      
      {/* 主要内容 - 固定在屏幕中央 */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center max-w-full">
        <div className="text-center">
          {/* 顶部装饰 */}
          <div className="mb-6 text-blue-300 text-lg tracking-wider animate-pulse">
            <span className="text-yellow-300 text-2xl mx-1">✧</span>
            <span className="text-pink-300 text-2xl mx-1">♥</span>
            <span className="text-blue-300 text-2xl mx-1">✦</span>
            <span className="text-green-300 text-2xl mx-1">✢</span>
            <span className="text-purple-300 text-2xl mx-1">✴</span>
            <span className="text-yellow-300 text-2xl mx-1">✦</span>
          </div>
          
          {/* 主要文字 */}
          <h1 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-shadow-glow tracking-wide max-w-4xl mx-auto"
            style={{
              backgroundSize: "200% 200%",
              animation: "gradient-shift 8s ease infinite"
            }}
          >
            张智萱是超级无敌大帅哥
          </h1>
          
          {/* 底部装饰 */}
          <div className="mt-6 text-pink-300 text-lg tracking-wider animate-pulse">
            <span className="text-purple-300 text-2xl mx-1">✴</span>
            <span className="text-green-300 text-2xl mx-1">✢</span>
            <span className="text-blue-300 text-2xl mx-1">✦</span>
            <span className="text-pink-300 text-2xl mx-1">♥</span>
            <span className="text-yellow-300 text-2xl mx-1">✧</span>
            <span className="text-blue-300 text-2xl mx-1">✦</span>
          </div>
          
          {/* 动画完成后的装饰图标 */}
          {animationComplete && (
            <div className="mt-8 flex justify-center items-center space-x-4">
              <span className="text-4xl text-yellow-300 animate-float">✨</span>
              <span className="text-4xl text-pink-300 animate-float-delay-1">💖</span>
              <span className="text-4xl text-blue-300 animate-float-delay-2">🌟</span>
              <span className="text-4xl text-green-300 animate-float-delay-3">✨</span>
              <span className="text-4xl text-purple-300 animate-float-delay-4">💖</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
