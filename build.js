const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 运行 Next.js 构建
console.log('Running Next.js build...');
execSync('next build', { stdio: 'inherit' });

// 确保 out 目录存在
if (!fs.existsSync('out')) {
  console.log('Creating out directory...');
  fs.mkdirSync('out');
}

// 复制 public 目录内容到 out 目录
console.log('Copying public files to out directory...');
const copyDir = (src, dest) => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

copyDir('public', 'out');

console.log('Build completed successfully!'); 