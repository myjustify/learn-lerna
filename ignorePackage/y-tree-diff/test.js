const {TreeNodeDiff} = require('./index')
const oldTree = [
  {
    label: 'label1',
    value: '1',
    children: [
      {
        label: 'label1-1',
        value: '1-1',
      }
    ]
  },
  {
    label: 'label2',
    value: '2',
    children: [
      {
        label: 'label2-1',
        value: '2-1',
        children: [
          {
            label: 'label2-1-1',
            value: '2-1-1',
          }
        ]
      }
    ]
  }
]
const newTree = JSON.parse(JSON.stringify(oldTree))
newTree[0].label = 'new-label1-2'
newTree[0].children[0].label = 'new-label1-1'
const Diff = new TreeNodeDiff(oldTree)
// const a = Diff.diff(newTree)
// console.log(a)
