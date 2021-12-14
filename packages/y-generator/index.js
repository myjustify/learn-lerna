#!/usr/bin/env node
import inquirer from "inquirer"
import { Command } from "commander"
import list from './template/list.js'
const program = new Command()

program
  .version('0.1.0')
  .command('create')
  .description('create template')
  .action( async () => {
    const template = await chooseTemplate()
    await genTemplate(template)
  });


async function chooseTemplate() {
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'choose a template',
      choices: [
        'vue2Page',
        'vue3page'
      ],
    }
  ])
  return template
}

async function genTemplate(template) {
  switch (template) {
    case 'vue2Page':
      const options = await vue2PageOptions()
      await list.vue2Page(options)
      break
    default:
      console.log('has no this template')
  }
}

async function vue2PageOptions(){
  return await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '组件/页面 name'
    },
    {
      type: 'input',
      name: 'target',
      message: '组件/页面 路径'
    },
    {
      type: 'list',
      name: 'hasDialog',
      message: '是否包含dialog',
      choices: [
        {
          name: '是',
          value: true
        },
        {
          name: '否',
          value: false
        }
      ]
    }
  ])
}

program.parse(process.argv);

const options = program.opts();
console.log(options)
