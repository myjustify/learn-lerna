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
<script>
export default {
  name: '<%= name %>'
}
</script>
<script setup>
import WbDialog from '@/components/base/WbDialog/index.vue'
<%_ if (wbForm) { -%>
  import WbForm from '@/components/commonForm/WbForm'
<%_ } -%>
<%_ if (filterForm) { -%>
  import FilterForm from '@/components/filterForm/index.vue'
<%_ } -%>
<%_ if (table) { -%>
  import WbTable from '@/components/commonTable/WbTable.vue'
<%_ } -%>

<%_ if (wbForm) { -%>
  const wbFormRef = ref(null)
<%_ } -%>
<%_ if (filterForm) { -%>
  const filterFormRef = ref(null)
<%_ } -%>
<%_ if (table) { -%>
  const commonTableRef = ref(null)
<%_ } -%>

defineProps({
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
const listTypeInfo = reactive({})
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

watch(
  () => dialogData.dialogShow,
  val => {
    emit('update:isShow', val)
  }
)

onMounted(() => {
  console.log(comName.value + 'onMounted')
})

<%_ if (filterForm) { -%>
  function handleSearch() {
    commonTableRef.value.fetchData()
  }
  
  function getFormData() {
    const data = { ...filterFormInfo.data }
    // const params = 
    // return { ...params }
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
