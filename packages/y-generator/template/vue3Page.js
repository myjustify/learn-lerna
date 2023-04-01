import { includes } from './vue3componentsTem.js'

export default `<template>
  <div :class="comName">
    <%_ if (filterForm) { -%>
       ${ includes.filterFormHtml }
    <%_ } -%>
    
    <%_ if (table) { -%>
       ${ includes.tableHtml }
    <%_ } -%>
    
    <%_ if (hasDialog) { -%>
       ${ includes.dialogHtml }
    <%_ } -%>
  </div>
</template>
<script setup>
defineOptions({
  name: '<%= name %>'
})
<%_ if (table) { -%>
  const commonTableRef = ref(null)
<%_ } -%>
<%_ if (hasDialog) { -%>
  const dialogCom = reactive({
    // uploadExcel: defineAsyncComponent(() => import('@/views/fund/payment/entrustTransportPayment/uploadExcel.vue'))
  })
  const dialogProps = reactive({
    dialogName: '',
    dialogShow: false,
    rowData: {}
  })
<%_ } -%>


const comName = ref('<%= name %>')

<%_ if (filterForm) { -%>
  const listTypeInfo = reactive({})
  
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
          dialogToggle('uploadExcel', {})
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

<%_ if (filterForm) { -%>
  function handleSearch() {
    commonTableRef.value.fetchData()
  }
  
  function getFormData() {
    return { ...filterFormInfo.data }
  }
  
  function filterFormEvent({ field, event }) {}
<%_ } -%>

<%_ if (hasDialog) { -%>
  function dialogToggle(name, rowData = {}) {
    dialogProps.dialogName = name
    dialogProps.rowData = { ...rowData }
    dialogProps.dialogShow = !dialogProps.dialogShow
  }
  
  function dialogConfirm({fn, comName}) {
    handleSearch()
  }
<%_ } -%>

</script>
<style lang="scss" scoped>
  .<%= name %> {}
</style>
`
