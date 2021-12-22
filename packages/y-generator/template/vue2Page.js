import { includes } from './componentsTem.js'

export default `<template>
  <div>
    <%_ if (grCollapse) { -%>
    <gr-collapse>
      <template v-slot:filter>
    <%_ } -%>
        <%_ if (filterForm) { -%>
        ${ includes.filterFormHtml }
        <%_ } -%>
      <%_ if (grCollapse) { -%>
      </template>
      <template>
      <%_ } -%>
        <%_ if (grTable) { %>
        ${ includes.tableHtml }
        <%_ } %>
    <%_ if (grCollapse) { -%>
      </template>
    </gr-collapse>
    <%_ } -%>

    <%_ if (hasDialog) { -%>
    ${ includes.dialogHtml }
    <%_ } -%>

  </div>
</template>
<script>
export default {
  name: '<%= name %>',
  data() {
    return {
      <%- data %>
    }
  },
  created() {},
  methods: {
    <%- methods %>
  }
}
</script>`
