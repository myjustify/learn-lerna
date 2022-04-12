export default [
  {
    type: 'input',
    name: 'name',
    message: 'dialog name'
  },
  {
    type: 'input',
    name: 'title',
    message: 'dialog title'
  },
  {
    type: 'input',
    name: 'target',
    message: '组件/页面 路径'
  },
  {
    type: 'list',
    name: 'wbForm',
    message: '是否包含wbForm',
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
]
