import Link from 'next/link'

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404 - 页面未找到</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        抱歉，您访问的页面不存在或已被移除。
      </p>
      <Link 
        href="/" 
        className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
      >
        返回首页
      </Link>
    </div>
  )
} 