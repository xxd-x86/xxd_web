'use client'

import { useEffect, useRef } from 'react'

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

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
      span.className = 'inline-block transform transition-all duration-700'
      span.style.animationDelay = `${index * 0.1}s`
      text.appendChild(span)
    })
    
    // 添加动画类
    const spans = text.querySelectorAll('span')
    let index = 0
    
    const animateLetters = () => {
      if (index < spans.length) {
        spans[index].classList.add('text-animate')
        index++
        setTimeout(animateLetters, 100)
      } else {
        // 动画完成后，设置循环
        setTimeout(() => {
          spans.forEach(span => span.classList.remove('text-animate'))
          index = 0
          setTimeout(animateLetters, 500)
        }, 3000)
      }
    }
    
    animateLetters()
    
    return () => {
      // 清理动画
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景动画 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 
            ref={textRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 text-shadow-glow tracking-wide leading-tight"
          >
            张智萱是超级无敌大帅哥
          </h1>
        </div>
      </div>
    </div>
  )
}
