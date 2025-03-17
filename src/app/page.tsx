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
  
  // 密码验证相关状态
  const [passwordVerified, setPasswordVerified] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [showPasswordHint, setShowPasswordHint] = useState(false)
  
  // 文字编辑相关状态
  const [showEditModal, setShowEditModal] = useState(false)
  const [editPassword, setEditPassword] = useState('')
  const [editPasswordError, setEditPasswordError] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [displayText, setDisplayText] = useState("杨涵锦就tm是个雷军")
  const [newText, setNewText] = useState("")

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
  
  // 打开编辑模态框
  const openEditModal = () => {
    setShowEditModal(true)
    setEditPassword('')
    setEditPasswordError(false)
    setShowEditForm(false)
  }
  
  // 关闭编辑模态框
  const closeEditModal = () => {
    setShowEditModal(false)
    setEditPassword('')
    setEditPasswordError(false)
    setShowEditForm(false)
  }
  
  // 验证编辑密码
  const verifyEditPassword = () => {
    if (editPassword === '9316893098') {
      setEditPasswordError(false)
      setShowEditForm(true)
      setNewText(displayText)
    } else {
      setEditPasswordError(true)
      setEditPassword('')
    }
  }
  
  // 处理编辑密码输入
  const handleEditPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditPassword(e.target.value)
    setEditPasswordError(false)
  }
  
  // 处理编辑密码框回车键按下
  const handleEditPasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      verifyEditPassword()
    }
  }
  
  // 处理新文本输入
  const handleNewTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value)
  }
  
  // 保存新文本
  const saveNewText = () => {
    if (newText.trim()) {
      // 先设置新文本
      setDisplayText(newText)
      
      // 关闭编辑模态框
      closeEditModal()
      
      // 完全重置动画状态
      setAnimationComplete(false)
      setShowText(false)
      setInitialLoad(true)
      
      // 清空文本区域
      if (textRef.current) {
        textRef.current.innerHTML = ''
      }
      
      // 使用多级延迟确保状态更新和DOM渲染
      setTimeout(() => {
        console.log('准备显示文字')
        setInitialLoad(false)
        
        setTimeout(() => {
          console.log('设置显示文字状态为true')
          setShowText(true)
        }, 200)
      }, 100)
    }
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
      {/* 密码验证页面 */}
      {!passwordVerified && (
        <div className="w-full h-full flex items-center justify-center z-50 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 border border-white/20 transform transition-all">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">访问验证</h2>
            
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-blue-200">
                  请输入密码
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={handleKeyDown}
                  className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${passwordError ? 'border-red-500' : 'border-blue-300/30'} text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                  placeholder="输入密码以继续..."
                  autoFocus
                />
                {passwordError && (
                  <p className="mt-2 text-sm text-red-400">密码错误，请重试</p>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={togglePasswordHint}
                  className="text-sm text-blue-300 hover:text-blue-100 transition-colors"
                >
                  需要提示？
                </button>
                <button
                  type="button"
                  onClick={verifyPassword}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:scale-105"
                >
                  确认
                </button>
              </div>
              
              {showPasswordHint && (
                <div className="mt-4 p-3 bg-blue-900/50 rounded-lg border border-blue-400/30">
                  <p className="text-sm text-blue-200">
                    <span className="font-semibold">提示：</span> 最简单的6位数字
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-blue-200/70">
                此页面受密码保护，需要正确密码才能访问。
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* 特效页面 - 仅在密码验证通过后显示 */}
      {passwordVerified && (
        <>
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 text-shadow-glow tracking-wide max-w-4xl mx-auto">
                {displayText.split('').map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block opacity-0 transform translate-y-10 rotate-y-90 scale-50 transition-all duration-800"
                    style={{
                      animation: showText ? `fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s forwards` : 'none',
                      animationFillMode: 'forwards'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = `hsl(${Math.random() * 360}, 100%, 70%)`
                      e.currentTarget.style.transform = 'translateY(-15px) scale(1.4) rotate(5deg)'
                      e.currentTarget.style.textShadow = '0 0 20px currentColor'
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
          
          {/* 编辑按钮 - 固定在右下角 */}
          <button
            onClick={openEditModal}
            className="absolute bottom-4 right-4 z-30 bg-white/10 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/20 hover:bg-white/20 transition-all transform hover:scale-110 text-white/70 hover:text-white"
            title="编辑文字"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          
          {/* 编辑模态框 */}
          {showEditModal && (
            <div className="fixed inset-0 z-50 pointer-events-none">
              <div className="absolute bottom-16 right-4 pointer-events-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl max-w-md w-full sm:w-96 border border-white/20 animate-fadeInUp">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">
                    {showEditForm ? '编辑显示文字' : '验证编辑权限'}
                  </h3>
                  <button
                    onClick={closeEditModal}
                    className="text-white/70 hover:text-white p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {!showEditForm ? (
                  // 密码验证表单
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="editPassword" className="block mb-2 text-sm font-medium text-blue-200">
                        请输入编辑密码
                      </label>
                      <input
                        id="editPassword"
                        type="password"
                        value={editPassword}
                        onChange={handleEditPasswordChange}
                        onKeyDown={handleEditPasswordKeyDown}
                        className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${editPasswordError ? 'border-red-500 animate-shake' : 'border-blue-300/30'} text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        placeholder="输入密码以编辑文字..."
                        autoFocus
                      />
                      {editPasswordError && (
                        <p className="mt-2 text-sm text-red-400">密码错误，无法编辑</p>
                      )}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={verifyEditPassword}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
                      >
                        验证
                      </button>
                    </div>
                  </div>
                ) : (
                  // 编辑文字表单
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="newText" className="block mb-2 text-sm font-medium text-blue-200">
                        输入新的显示文字
                      </label>
                      <input
                        id="newText"
                        type="text"
                        value={newText}
                        onChange={handleNewTextChange}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-blue-300/30 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="输入新文字..."
                        autoFocus
                      />
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={closeEditModal}
                        className="px-4 py-2 bg-gray-600/60 text-white font-medium rounded-lg shadow-lg hover:bg-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                      >
                        取消
                      </button>
                      <button
                        type="button"
                        onClick={saveNewText}
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all"
                      >
                        保存
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
