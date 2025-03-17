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
    const particlesCount = Math.floor(width * height / 5000)
    
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
    }[] = []

    // 创建粒子
    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 3 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: `hsl(${Math.random() * 60 + 220}, 100%, 70%)`, // 使用蓝紫色系
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() > 0.5
      })
    }

    // 动画逻辑
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // 渐变背景
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height))
      gradient.addColorStop(0, '#111e3c')  // 更深的蓝色
      gradient.addColorStop(1, '#060c1a')  // 接近黑色
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // 更新所有粒子
      for (const particle of particles) {
        // 脉动效果
        if (particle.pulse) {
          particle.radius = particle.radius * 0.995 + 0.005 * (Math.random() * 3 + 1)
          particle.opacity = particle.opacity * 0.995 + 0.005 * (Math.random() * 0.5 + 0.3)
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

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', `, ${particle.opacity})`)
                                     .replace('hsl', 'hsla')
        ctx.fill()
        
        // 粒子发光效果
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2)
        ctx.fillStyle = particle.color.replace(')', ', 0.1)')
                                     .replace('hsl', 'hsla')
        ctx.fill()
      }

      // 绘制连接线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            const gradient = ctx.createLinearGradient(
              particles[i].x, 
              particles[i].y, 
              particles[j].x, 
              particles[j].y
            )
            const color1 = particles[i].color.replace(')', `, ${0.15 * (1 - distance / 120)})`)
                                          .replace('hsl', 'hsla')
            const color2 = particles[j].color.replace(')', `, ${0.15 * (1 - distance / 120)})`)
                                          .replace('hsl', 'hsla')
            gradient.addColorStop(0, color1)
            gradient.addColorStop(1, color2)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 0.6
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
  }, [])

  // 文字动画效果
  useEffect(() => {
    if (!textRef.current) return
    
    const text = textRef.current
    const letters = text.innerText.split('')
    
    // 清空原始文本
    text.innerText = ''
    
    // 为每个字母创建span
    letters.forEach((letter, index) => {
      const span = document.createElement('span')
      span.innerText = letter
      span.className = 'inline-block transform transition-all duration-700 opacity-0'
      span.style.animationDelay = `${index * 0.15}s`
      span.style.transitionDelay = `${index * 0.1}s`
      text.appendChild(span)
    })
    
    // 添加动画类
    const spans = text.querySelectorAll('span')
    let index = 0
    
    // 初始加载完成
    setInitialLoad(false)
    
    const animateLetters = () => {
      if (index < spans.length) {
        spans[index].classList.add('text-animate')
        
        // 添加荧光闪烁效果
        setTimeout(() => {
          spans[index].classList.add('glow-effect')
        }, 500)
        
        index++
        setTimeout(animateLetters, 100)
      } else {
        // 动画完成后，设置状态触发撒花效果
        setTimeout(() => {
          setAnimationComplete(true)
        }, 500)
      }
    }
    
    // 开始文字动画
    setTimeout(animateLetters, 500)
    
    return () => {
      // 清理动画
    }
  }, [])

  // 撒花特效
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
    const confettiCount = 300 // 增加数量
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
      '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722',
      '#FF10F0', '#7DF9FF', '#ADFF2F', '#FD3A4A', '#C3B091'
    ]

    for (let i = 0; i < confettiCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 8 + 3, // 增大粒子尺寸
        color: randomColor,
        velocity: {
          x: (Math.random() - 0.5) * 15,
          y: (Math.random() - 0.5) * 15
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5 // 增加旋转速度
      })
    }

    // 撒花动画
    const gravity = 0.2
    const friction = 0.985
    let confettiActive = true

    const animateConfetti = () => {
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
          
          // 随机形状：圆形、矩形、三角形、星形
          const shape = Math.floor(Math.random() * 4)
          
          ctx.fillStyle = particle.color
          ctx.shadowColor = particle.color
          ctx.shadowBlur = 5
          
          if (shape === 0) {
            // 圆形
            ctx.beginPath()
            ctx.arc(0, 0, particle.radius, 0, Math.PI * 2)
            ctx.fill()
          } else if (shape === 1) {
            // 矩形
            ctx.fillRect(-particle.radius, -particle.radius / 2, particle.radius * 2, particle.radius)
          } else if (shape === 2) {
            // 三角形
            ctx.beginPath()
            ctx.moveTo(0, -particle.radius)
            ctx.lineTo(particle.radius, particle.radius)
            ctx.lineTo(-particle.radius, particle.radius)
            ctx.closePath()
            ctx.fill()
          } else {
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
          }
          
          ctx.restore()
        }
      }

      // 判断是否所有粒子都落出画布，保持更长的动画时间
      if (confetti.every(p => p.y > height + 100)) {
        confettiActive = false
      }

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
          <div className="mb-3 text-blue-300 text-lg tracking-wider animate-pulse">✧･ﾟ: *✧･ﾟ:* ✨ *:･ﾟ✧*:･ﾟ✧</div>
          <h1 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-shadow-glow tracking-wide"
          >
            张智萱是超级无敌大帅哥
          </h1>
          <div className="mt-3 text-pink-300 text-lg tracking-wider animate-pulse">✧･ﾟ: *✧･ﾟ:* ✨ *:･ﾟ✧*:･ﾟ✧</div>
          
          {animationComplete && (
            <div className="mt-6 animate-bounce">
              <span className="text-3xl text-yellow-300 mx-1">✨</span>
              <span className="text-3xl text-pink-300 mx-1">💖</span>
              <span className="text-3xl text-blue-300 mx-1">🌟</span>
              <span className="text-3xl text-green-300 mx-1">✨</span>
              <span className="text-3xl text-purple-300 mx-1">💖</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
