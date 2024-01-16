import { includes } from './vue3componentsTem.js'
export default `<template>
   <wb-dialog
    v-model="dialogData.dialogShow"
    :title="dialogData.title"
    :footer="dialogData.btnList"
    :append-to-body="true"
  >
    <%_ if (wbForm) { -%>
    ${ includes.wbFormHtml }
    <%_ } -%>
    <%_ if (filterForm) { -%>
    ${ includes.filterFormHtml }
    <%_ } -%>
    <%_ if (table) { -%>
    ${ includes.tableHtml }
    <%_ } -%>
  </wb-dialog>
</template>
<script setup lang='ts'>
defineOptions({
  name: '<%= name %>'
})
<%_ if (wbForm) { -%>
  const wbFormRef = ref()
<%_ } -%>
<%_ if (filterForm) { -%>
  const filterFormRef = ref()
<%_ } -%>
<%_ if (table) { -%>
  const commonTableRef = ref()
<%_ } -%>
const props = defineProps({
  isShow: {
    type: Boolean,
    default: true
  },
  rowData: {
    type: Object,
    default: () => ({})
  }
})
const comName = ref('<%= name %>')
const emit = defineEmits(['confirm', 'cancel', 'update:isShow'])
<%_ if (wbForm) { -%>
  const formInfo = reactive({
    data: {
  
    },
    formItem: {
      aaa: {
        label: 'aaa',
        labelWidth: '60px',
        formItemType: 'input',
        placeholder: '请输入aaa'
      }
    }
  })
<%_ } -%>
<%_ if (filterForm) { -%>
  const filterFormInfo = reactive({
    data: {
  
    },
    formItem: {
      aaa: {
        label: 'aaa',
        labelWidth: '60px',
        formItemType: 'input',
        placeholder: '请输入aaa'
      }
    }
  })
<%_ } -%>
<%_ if (table) { -%>
  const tableData = reactive({
    headerOpt: [
      {
        label: 'aaa',
        type: 'primary',
        click(e) {
          console.log(e)
        }
      }
    ],
    column: [
      {
        label: 'aaa',
        name: 'aaa',
        width: '100px'
      }
    ],
    sortArr: [],
    footerOpt: [],
    requestFunc: (param) => {
      return Promise.resolve({
        content: [{ aaa: 'aaa' }]
      })
    }
  })
<%_ } -%>
const dialogData = reactive({
  dialogShow: true,
  title: '<%= title %>',
  btnList: [
    {
      label: '关闭',
      type: 'default',
      click: () => {
        toggleDialog()
      }
    },
    {
      label: '确定',
      type: 'primary',
      click: () => {
        confirm()
        toggleDialog()
      }
    }
  ]
})
computed({
    get() {
        return props.isShow
    },
    set(nv) {
        emit('update:isShow', val)
    }
})
onMounted(() => {
})
<%_ if (filterForm) { -%>
  function handleSearch() {
    commonTableRef.value.fetchData()
  }
  function getFormData() {
    const data = { ...filterFormInfo.data }
  }
  function filterFormEvent({ field, event }) {}
<%_ } -%>
<%_ if (wbForm) { -%>
  function handleEvent({ field, event }) {}
<%_ } -%>
function toggleDialog () {
  dialogData.dialogShow = !dialogData.dialogShow
}
function confirm(){
  emit('confirm',{
    fn: () => {}, comName: '<%= name %>'
  })
}
</script>`
