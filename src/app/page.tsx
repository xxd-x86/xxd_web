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

    // 粒子数量
    const particlesCount = Math.floor(width * height / 10000)
    
    // 粒子数组
    const particles: {
      x: number
      y: number
      radius: number
      color: string
      speedX: number
      speedY: number
    }[] = []

    // 创建粒子
    for (let i = 0; i < particlesCount; i++) {
      const radius = Math.random() * 2 + 1
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.3 + 0.2})`,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 - 0.5
      })
    }

    // 动画逻辑
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // 渐变背景
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, '#0f1729')
      gradient.addColorStop(1, '#162241')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)
      
      // 更新所有粒子
      for (const particle of particles) {
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
        ctx.fillStyle = particle.color
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
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 0.5
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
      text.appendChild(span)
    })
    
    // 添加动画类
    const spans = text.querySelectorAll('span')
    let index = 0
    
    const animateLetters = () => {
      if (index < spans.length) {
        spans[index].classList.add('text-animate')
        index++
        setTimeout(animateLetters, 150)
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
    const confettiCount = 200
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722']

    for (let i = 0; i < confettiCount; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 6 + 2,
        color: randomColor,
        velocity: {
          x: (Math.random() - 0.5) * 10,
          y: (Math.random() - 0.5) * 10
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2
      })
    }

    // 撒花动画
    const gravity = 0.15
    const friction = 0.99
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
          
          // 随机形状：圆形、矩形、三角形
          const shape = Math.floor(Math.random() * 3)
          
          ctx.fillStyle = particle.color
          if (shape === 0) {
            // 圆形
            ctx.beginPath()
            ctx.arc(0, 0, particle.radius, 0, Math.PI * 2)
            ctx.fill()
          } else if (shape === 1) {
            // 矩形
            ctx.fillRect(-particle.radius, -particle.radius / 2, particle.radius * 2, particle.radius)
          } else {
            // 三角形
            ctx.beginPath()
            ctx.moveTo(0, -particle.radius)
            ctx.lineTo(particle.radius, particle.radius)
            ctx.lineTo(-particle.radius, particle.radius)
            ctx.closePath()
            ctx.fill()
          }
          
          ctx.restore()
        }
      }

      // 判断是否所有粒子都落出画布
      if (confetti.every(p => p.y > height)) {
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
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
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
      
      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-shadow-glow tracking-wide leading-tight"
          >
            张智萱是超级无敌大帅哥
          </h1>
          {animationComplete && (
            <div className="mt-6 animate-bounce">
              <span className="text-2xl text-yellow-300">✨</span>
              <span className="text-2xl text-pink-300 mx-2">💖</span>
              <span className="text-2xl text-yellow-300">✨</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
