const { execSync } = require('child_process')


try {
    execSync(`node --version`, { stdio: 'inherit' })
} catch (error) {
    console.log('出错啦');
}