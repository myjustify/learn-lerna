export default `<template>
  <div>
    <%_ if (grCollapse) { -%>
    <gr-collapse>
      <template v-slot:filter>
    <%_ } -%>
        <%_ if (filterForm) { -%>
        <filter-form
          label-width="100px"
          :inline="true"
          :field-list="formInfo.fieldList"
          :data="formInfo.data"
          :list-type-info="listTypeInfo"
          :ref-obj.sync="formInfo.ref"
          @onSearch="handleSearch"
          @onReset="handleReset"
        />
        <%_ } -%>
      <%_ if (grCollapse) { -%>
      </template>
      <template>
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
    <%_ if (grCollapse) { -%>
      </template>
    </gr-collapse>
    <%_ } -%>

    <%_ if (hasDialog) { -%>
    <template v-if="dialogShow">
      <component :is="dialogName" :is-show.sync="dialogShow" :row-data="rowData" @handleSearch="handleSearch"></component>
    </template>
    <%_ } -%>

  </div>
</template>
<script>
export default {
  name: '<%= name %>',
  data() {
    return {
      <%_ if (hasDialog) { -%>
      dialogShow: false
      ,dialogName: ''
      ,rowData: {}
      <%_ } -%>
      
      <%_ if (filterForm) { -%>
      ,formInfo: {
        data: {
        },
        fieldList: [
        ]
      }
      ,listTypeInfo: {
      }
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
  created() {
  },
  methods: {
    <%_ if (filterForm) { -%>
    handleReset() {
      this.handleSearch()
    }
    ,handleSearch() {
      const params = { ...this.formInfo.data }
      this.$refs.filterTable.handleSearch(params)
    }
    <%_ } -%>
    <%_ if (hasDialog) { -%>
    ,dialogToggle(rowData={}) {
      this.dialogShow = !this.dialogShow
      this.rowData = rowData
    }
    <%_ } -%>
    <%_ if (grTable) { -%>
    ,getOrderList: function({ param }, callback) {
      callback([])
    }
    <%_ } -%>
  }
}
</script>`
