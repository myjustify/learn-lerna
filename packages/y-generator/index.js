#!/usr/bin/env node
import inquirer from "inquirer"
import { Command } from "commander"
import list from './template/list.js'
import vue2PagePrompt from './prompts/vue2PagePrompt.js'
import {genPrompt} from './lib/util.js'
import vue2DialogPrompt from './prompts/vue2DialogPrompt.js'
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
        'vue2Dialog'
      ],
    }
  ])
  return template
}

async function genTemplate(template) {
  let options
  switch (template) {
    case 'vue2Page':
      options = await genPrompt(vue2PagePrompt)
      await list.vue2Page(options)
      break
    case 'vue2Dialog':
      options = await genPrompt(vue2DialogPrompt)
      await list.vue2Dialog(options)
      break
    default:
      console.log('has no this template')
  }
}

program.parse(process.argv);

const options = program.opts();
console.log(options)
