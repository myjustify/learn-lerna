const {TreeNodeDiff} = require('../index')
const { treeData: oldTree } = require('./data')
const newTree = JSON.parse(JSON.stringify(oldTree))
newTree[4].label = 'new-label1-2'
newTree[5].children[2].label = 'new-label1-1'
const Diff = new TreeNodeDiff(oldTree)
const a = Diff.diff(newTree)

console.log(a)
const tree1 = JSON.parse(JSON.stringify(newTree))
tree1[5].label = 'new-1-2'
tree1[6].children[2].label = 'new-2-1'
const b = Diff.diff(tree1)
console.log(b)
