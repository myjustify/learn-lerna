export default [
  {
    type: 'input',
    name: 'name',
    message: '组件/页面 name'
  },
  {
    type: 'input',
    name: 'target',
    message: '组件/页面 路径'
  },
  {
    type: 'list',
    name: 'filterForm',
    message: '是否包含filterForm',
    choices: [
      {
        name: '是',
        value: true
      },
      {
        name: '否',
        value: false
      }
    ]
  },
  {
    type: 'list',
    name: 'table',
    message: '是否包含table',
    choices: [
      {
        name: '是',
        value: true
      },
      {
        name: '否',
        value: false
      }
    ]
  },
  {
    type: 'list',
    name: 'hasDialog',
    message: '是否包含dialog',
    choices: [
      {
        name: '是',
        value: true
      },
      {
        name: '否',
        value: false
      }
    ]
  }
]
