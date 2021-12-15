export default `<template>
  <gr-dialog :is-show.sync="dialogShow" :title="title" :dialog-but-item-list="btnList">
    <%_ if (grForm) { -%>
    <gr-form
      :field-list="formInfo.fieldList"
      :data="formInfo.data"
      :ref-obj.sync="formInfo.ref"
      :list-type-info="listTypeInfo"
    />
    <%_ } -%>
    <%_ if (grTable) { -%>
    <gr-table
      ref="filterTable"
      :request-func="getOrderList"
      :table-data="pageTableData"
      :default-sort="defaultSort"
    >
    </gr-table>
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
        title: '<%= title %>'
        ,dialogShow: true
        ,btnList: [
          {
            buttonName: '确定',
            handleClick: () => {
            }
          }
        ]
        <%_ if (grForm) { -%>
        ,formInfo: {
          ref: null,
          data: {
          },
          fieldList: [
          ]
        }
        ,listTypeInfo: []
        <%_ } -%>
        <%_ if (grTable) { -%>
        ,defaultSort: { createdTime: 'DESC' }
        ,extraBtn: [
        ]
        ,pageTableData: [
          {
            label: '操作',
            fixed: 'right',
            name: 'validEnd',
            width: '150',
            operator: [
            ]
          }
        ]
        <%_ } -%>
      }
    },
    methods: {
      toggle(){
        this.isShow = !this.isShow
      },
      handleSearch(){
        this.$emit('handleSearch')
      }
      <%_ if (grTable) { -%>
      ,getOrderList: function({ param }, callback) {
        callback([])
      }
      <%_ } -%>
    }
  }
</script>
`
