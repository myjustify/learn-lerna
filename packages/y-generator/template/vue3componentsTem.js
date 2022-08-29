import { isWindows} from '../lib/util.js'
import ejs from 'ejs'
import path from 'path'
const prefix = isWindows() ? 'file:///':'file://'
const curPath = path.dirname(import.meta.url.replace(prefix, ''))
function getIncludes(p){
  return ejs.compile(`<%- include(path) %>`)({ path: path.resolve(curPath, p) })
}

export const includes = {
  tableHtml: getIncludes('./vue3includes/tableHtml.ejs'),
  filterFormHtml: getIncludes('./vue3includes/filterFormHtml.ejs'),
  wbFormHtml: getIncludes('./vue3includes/wbFormHtml.ejs'),
  dialogHtml: getIncludes('./vue3includes/dialogHtml.ejs')
}
