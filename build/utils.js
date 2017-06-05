const execSync = require('child_process').execSync

const exec = (command, extraEnv) => {
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })
}

module.exports = {
  exec
}
