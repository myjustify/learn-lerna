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
    name: 'grForm',
    message: '是否包含grForm',
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
    name: 'grTable',
    message: '是否包含grTable',
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
