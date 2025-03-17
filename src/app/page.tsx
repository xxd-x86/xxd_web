import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="relative isolate">
      {/* 装饰背景 */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:flex lg:px-8 lg:py-32">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="flex">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-700 hover:ring-gray-900/20 dark:hover:ring-gray-500">
              欢迎访问我的个人网站 <span aria-hidden="true">&rarr;</span>
            </div>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            你好，我是夏旭东
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            我是一名全栈开发工程师，热爱技术，喜欢探索新事物。这里是我的个人网站，记录我的技术博客、项目经验和生活感悟。
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              href="/blog"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
            >
              阅读博客
            </Link>
            <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              查看项目 <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-16">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="rounded-xl bg-white/5 p-2 ring-1 ring-inset ring-white/10 dark:ring-gray-700 lg:rounded-2xl">
              <div className="aspect-w-16 aspect-h-9 w-[31rem] bg-indigo-50 dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
                <div className="h-full w-full p-6 flex flex-col justify-center items-center">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mb-6">
                    XD
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">全栈开发者</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-center">
                    React • Next.js • TypeScript • Node.js
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
