import path from 'path'
import inquirer from 'inquirer'

export function isWindows(){
  return process.platform === 'win32'
}

export function getFilePath(target){
  const cwd = process.cwd()
  const fileName = path.isAbsolute(target) ? cwd + target :path.resolve(cwd, target)
  return fileName
}

export async function genPrompt(options){
  return await inquirer.prompt(options)
}
