import vue2Page from './vue2Page.js'
import vue2Dialog from './vue2Dialog.js'
import ejs from 'ejs'
import { getFilePath } from '../lib/util.js'
import fsExtra from 'fs-extra'
import { generatorData, generatorMethods } from './componentsTem.js'

export function generator ( code) {
  return async (options={}) => {
    const { target } = options
    if (!target) console.error('创建路径未填')
    const result = ejs.render(code, {...options, data: generatorData(options), methods: generatorMethods(options) } );
    try {
      const fileName = getFilePath(target)
      console.log('创建: '+ fileName)
      return fsExtra.outputFileSync(fileName, result)
    }catch (err) {
      console.log(err)
    }
  }
}

export default {
  vue2Page: generator(vue2Page),
  vue2Dialog: generator(vue2Dialog)
}
