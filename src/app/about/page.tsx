export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">关于我</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">个人简介</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          大家好，我是夏旭东，一名热爱技术的全栈开发工程师。我对Web开发充满热情，喜欢探索新技术和解决复杂问题。
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          在这个网站上，我会分享我的技术经验、项目成果和个人成长。希望我的内容能对你有所帮助！
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">技能</h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300">
          <li className="mb-2">前端开发：React, Next.js, TypeScript, Tailwind CSS</li>
          <li className="mb-2">后端开发：Node.js, Express, Python</li>
          <li className="mb-2">数据库：MySQL, MongoDB</li>
          <li>DevOps：Git, CI/CD, Docker</li>
        </ul>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">联系方式</h2>
        <p className="text-gray-600 dark:text-gray-300">
          如果你有任何问题或合作意向，欢迎联系我。
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          邮箱：<a href="mailto:contact@xiaxudong.cn" className="text-primary-600 dark:text-primary-400 hover:underline">contact@xiaxudong.cn</a>
        </p>
      </div>
    </div>
  )
} 