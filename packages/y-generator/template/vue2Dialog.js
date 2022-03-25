import { includes } from './componentsTem.js'
export default `<template>
  <gr-dialog :is-show.sync="dialogShow" :title="title" :dialog-but-item-list="btnList" :appendToBody="true">
    <%_ if (grForm) { -%>
    ${ includes.grFormHtml }
    <%_ } -%>
    <%_ if (grTable) { -%>
    ${ includes.tableHtml }
    <%_ } -%>
  </gr-dialog>
</template>
<script>
  export default {
    name: '<%= name %>',
    props: {
      isShow: {
        type: Boolean,
        default: true
      },
      rowData: {
        type: Object,
        default: () => ({})
      }
    },
    watch: {
      dialogShow(nv) {
        this.$emit('update:isShow', nv)
      }
    },
    data(){
      return {
        title: '<%= title %>',
        dialogShow: true,
        btnList: [
          {
            buttonName: '确定',
            handleClick: () => {
            }
          }
        ],
        <%- data %>
      }
    },
    methods: {
      toggle(){
        this.dialogShow = !this.dialogShow
      },
      handleSearch(){
        this.$emit('handleSearch')
      },
      <%_ if (grTable) { -%>
      getOrderList: function({ param }, callback) {
        callback([])
      },
      <%_ } -%>
    }
  }
</script>
`
