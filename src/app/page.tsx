import Image from 'next/image'
import Link from 'next/link'
import { CodeBracketIcon, RocketLaunchIcon, CommandLineIcon, CpuChipIcon } from '@heroicons/react/24/outline'

const skills = [
  { name: 'React', icon: <CodeBracketIcon className="h-5 w-5" />, description: '前端框架' },
  { name: 'Next.js', icon: <RocketLaunchIcon className="h-5 w-5" />, description: 'React框架' },
  { name: 'TypeScript', icon: <CommandLineIcon className="h-5 w-5" />, description: '类型系统' },
  { name: 'Node.js', icon: <CpuChipIcon className="h-5 w-5" />, description: '后端开发' },
]

export default function Home() {
  return (
    <main>
      {/* Hero区域 */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        {/* 装饰背景 */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-indigo-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl pb-4">
              <span className="block text-blue-600 dark:text-blue-500">你好，</span>
              我是夏旭东
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              全栈开发工程师，热爱技术，专注于创建现代化的Web应用程序和解决方案
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/blog" className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-blue-500 transition duration-200 ease-in-out transform hover:-translate-y-1">
                阅读博客
              </Link>
              <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
                查看项目 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我区域 */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none lg:flex lg:items-center lg:gap-16">
            <div className="lg:w-1/2">
              <div className="aspect-square h-64 sm:h-80 lg:h-96 relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-xl ring-1 ring-gray-900/10 dark:ring-white/10">
                <div className="absolute inset-0 flex items-center justify-center text-white text-7xl sm:text-8xl font-bold">
                  XD
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                关于我
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                我是一名全栈开发工程师，热爱技术，喜欢探索新事物。我专注于使用现代Web技术构建高性能、可扩展的应用程序。
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
                这里是我的个人网站，记录我的技术博客、项目经验和生活感悟。通过这个平台，我希望能与更多志同道合的朋友交流学习。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 技能区域 */}
      <section className="py-16 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              技术栈
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              我熟悉的一些核心技术和工具
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
              {skills.map((skill) => (
                <div key={skill.name} className="relative bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 group hover:shadow-md transition duration-200">
                  <div className="absolute -top-3 -left-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 group-hover:bg-blue-500 transition duration-200">
                    <div className="text-white">
                      {skill.icon}
                    </div>
                  </div>
                  <dt className="ml-6 mt-3 text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                    {skill.name}
                  </dt>
                  <dd className="ml-6 mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {skill.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          
          <div className="mt-16 flex justify-center">
            <div className="relative inline-flex rounded-full bg-blue-100 dark:bg-blue-900/30 p-4 text-blue-600 dark:text-blue-300 ring-1 ring-inset ring-blue-200 dark:ring-blue-800">
              <span className="text-sm font-medium">更多技术栈正在持续更新中...</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* 底部 CTA 区域 */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              让我们一起创造精彩
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
              如果你对我的项目或技术感兴趣，欢迎随时联系我进行交流
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="https://github.com/xxd-x86"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-gray-900 dark:bg-white px-4 py-2.5 text-sm font-semibold text-white dark:text-gray-900 shadow-md hover:bg-gray-700 dark:hover:bg-gray-100 transition duration-200 ease-in-out transform hover:-translate-y-1 flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition duration-200">
                了解更多 <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
