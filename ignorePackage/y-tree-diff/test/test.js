const {TreeNodeDiff} = require('../index')
// const { treeData: oldTree } = require('./data')
const { treeData: oldTree } = require('./data1')
const newTree = JSON.parse(JSON.stringify(oldTree))
console.time()
newTree[1].label = 'new-label1-2'
newTree[1].children[2].label = 'new-label1-1'
newTree.splice(2,1)
newTree.unshift({
  label: 's',
  value: 's',
  frontKey: 's'
})
const Diff = new TreeNodeDiff(oldTree, { value: 'frontKey' })
const a = Diff.diff(newTree)
console.log(a)
// const tree1 = JSON.parse(JSON.stringify(newTree))
// tree1[2].label = 'new-1-2'
// tree1[2].children[0].label = 'new-2-1'
// const b = Diff.diff(tree1)
// console.log(b)
console.timeEnd()
