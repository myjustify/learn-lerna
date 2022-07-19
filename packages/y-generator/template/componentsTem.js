import { isWindows} from '../lib/util.js'
import ejs from 'ejs'
import path from 'path'
const prefix = isWindows() ? 'file:///':'file://'
const curPath = path.dirname(import.meta.url.replace(prefix, ''))
function getIncludes(p){
  return ejs.compile(`<%- include(path) %>`)({ path: path.resolve(curPath, p) })
}

export const includes = {
  tableHtml: getIncludes('./includes/tableHtml.ejs'),
  filterFormHtml: getIncludes('./includes/filterFormHtml.ejs'),
  grFormHtml: getIncludes('./includes/grFormHtml.ejs'),
  dialogHtml: getIncludes('./includes/dialogHtml.ejs'),
  tableData: `defaultSort: { createdTime: 'DESC' },
  extraBtn: [],
  pageTableData: [
    {
      label: '操作',
      fixed: 'right',
      name: 'validEnd',
      width: '150',
      operator: [
      ]
    }
  ]`,
  tableMethods: `getOrderList: function({ param }, callback) {
    callback([])
  },
  handleSearch() {
    this.$refs.tableRef.handleSearch()
  }`,
  dialogData: `dialogProps: {
    dialogShow: false,
    dialogName: '',
    rowData: {}
  }`,
  dialogMethods: `dialogToggle(dialogName, rowData={}) {
    dialogName && (this.dialogProps.dialogName = dialogName)
    this.dialogProps.dialogShow = !this.dialogProps.dialogShow
    this.dialogProps.rowData = rowData
  },
  dialogConfirm({fn, comName}) {
    handleSearch()
  }`,
  filterFormData: `formInfo: {
    ref: null,
    data: {},
    fieldList: []
  },
  listTypeInfo: {}`,
  filterFormMethods: `handleReset() {
    this.handleSearch()
  }`
}
export function generatorData(options={}){
  const obj = { filterForm: 'filterFormData', grForm: 'filterFormData', grTable: 'tableData', hasDialog: 'dialogData'}
  const result = []
  for (let k in options){
    if(options[k]){
      includes[obj[k]] && result.push(includes[obj[k]])
    }
  }
  return result.join(',\n  ')
}

export function generatorMethods(options={}){
  const obj = { filterForm: 'filterFormMethods', grForm: 'filterFormData', grTable: 'tableMethods', hasDialog: 'dialogMethods'}
  const result = []
  for (let k in options){
    if(options[k]){
      includes[obj[k]] && result.push(includes[obj[k]])
    }
  }
  return result.join(',\n  ')
}
