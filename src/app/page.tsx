import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            你好，我是夏旭东
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            我是一名全栈开发工程师，热爱技术，喜欢探索新事物。这里是我的个人网站，记录我的技术博客、项目经验和生活感悟。
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/blog"
              className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              阅读博客
            </Link>
            <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              查看项目 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
