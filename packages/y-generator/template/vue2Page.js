import ejs from 'ejs'
import { getFilePath } from '../lib/util.js'
import fsExtra  from 'fs-extra'

const str = `<template>
  <div>
    <gr-collapse>
      <template v-slot:filter>
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
      </template>
      <template>
        <gr-table
          ref="filterTable"
          :request-func="getOrderList"
          :table-data="pageTableData"
          :default-sort="defaultSort"
        >
        </gr-table>
      </template>
    </gr-collapse>

    <%_ if (hasDialog) { -%>
    <template v-if="dialogShow">
      <component :is="dialogName" :is-show.sync="dialogShow" :row-data="rowData" @handleSearch="handleSearch"></component>
    </template>
    <%_ } -%>

  </div>
</template>
<script>
import FilterForm from '@/components/FilterForm/index'
import GrForm from '@/components/GrForm/index'
import GrCollapse from '@/components/Collapse/FilterCollapase'
import GrTable from '@/components/GrTable/index'
export default {
  name: '<%= name %>',
  components: { FilterForm, GrCollapse, GrTable, GrForm },
  data() {
    return {
      <%_ if (hasDialog) { -%>
      dialogShow: false,
      dialogName: '',
      rowData: {},
      <%_ } -%>
      
      defaultSort: { createdTime: 'DESC' },
      formInfo: {
        data: {
        },
        fieldList: [
        ]
      },
      listTypeInfo: {
      },
      extraBtn: [
      ],
      pageTableData: [
        {
          label: '操作',
          fixed: 'right',
          name: 'validEnd',
          width: '150',
          operator: [
          ]
        }
      ],
      getOrderList: function({ param }, callback) {
        callback([])
      }
    }
  },
  created() {
  },
  methods: {
    handleReset() {
      this.handleSearch()
    },
    handleSearch() {
      const params = { ...this.formInfo.data }
      this.$refs.filterTable.handleSearch(params)
    }
  }
}
</script>`
export default async function ({ hasDialog=false, name, target }={}) {
  if (!target) console.error('创建路径未填')
  const result = ejs.render(str, { hasDialog, name });
  try {
    const fileName = getFilePath(target)
    console.log('创建: '+ fileName)
    return fsExtra.outputFileSync(fileName, result)
  }catch (err) {
    console.log(err)
  }
}
