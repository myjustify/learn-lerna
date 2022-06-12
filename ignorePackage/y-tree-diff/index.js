class TreeNodeDiff {
  constructor(data, options = {}) {
    this.label = options.label || 'label'
    this.value = options.value || 'value'
    this.children = options.children || 'children'
    this.uniqueKey = options.uniqueKey || ((son) => {
      return son.type + '-' + son.value
    })
    const cacheData = JSON.parse(JSON.stringify(data||[]))
    this.data = cacheData
    const { result, nodeValues } = this.generateTreeMap(cacheData)
    this.cacheTreeMap = result
    this.oldValues = nodeValues  // 存储所有节点value 用于判断删除的节点
  }

  /**
   *
   * @param newData
   * @return result.type 0: noUpdate, 1: add, 2: del, 3: update, 4: move, 5: all (全部更改)
   */
  diff(nv = []) {
    const diffs = []
    const newDataStr = JSON.stringify(nv)
    const newData = JSON.parse(newDataStr)
    const { data: oldData, cacheTreeMap, oldValues } = this
    // tree 没有任何改动
    if (this.compare(oldData, newDataStr)) return { diffType: 'noUpdate' }
    // tree 全部更改
    if (!newData.length) return { diffType: 'all' }
    const { result: newTreeMap, nodeValues: newValues } = this.generateTreeMap(newData)

    // 获取删除 修改的节点
    for(let i = 0; i < newValues.length; i++) {
      const value = newValues[i]
      const { index: newIndexStr, data: newNodeData } = newTreeMap[value]
      const oldNode = cacheTreeMap[value]
      const { index: oldIndexStr, data: oldNodeData } = oldNode
      const son = this.getDeepValue(newData,newIndexStr)
      if (oldNode) {
        if(
          this.compare(oldNodeData, newNodeData)
          // && this.compare(this.getDeepValue(oldData,oldIndexStr), son)
        ) { // 无更改 只是数据无更改 不代表位置没有更改 暂不考虑位置更改
          // 位置更改逻辑
        } else {
          // 有更改
          diffs.push({
            diffType: 'update',
            nodeData: JSON.parse(newNodeData)
          })
        }
      } else  {
        const parentData = this.getParentData(newData, newIndexStr)
        // 新增节点 需要知道pId
        diffs.push({
          diffType: 'add',
          parentData,
          pValue: parentData[this.value],
          nodeData: son
        })
      }
    }

    // 获取删除的节点
    const delValues = oldValues.filter(value => !newValues.includes(value))
    for (let i = 0; i < delValues.length; i++) {
      diffs.push({
        diffType: 'del',
        nodeData: oldData[delValues[i]]
      })
    }

    this.data = JSON.parse(JSON.stringify(newData))
    this.oldValues = [ ...newValues ]
    this.cacheTreeMap = JSON.parse(JSON.stringify(newTreeMap))

    return JSON.parse(JSON.stringify({ diffType: 'update', diffs }))
  }

  // 存储最外层数据 需要对比children数据时直接compare
  generateTreeMap(data, level = '', result = {}, nodeValues = []) {
    for (let i = 0; i < data.length; i++) {
      const son = data[i]
      const uniqueKey = this.getUniqueKey(son)
      nodeValues.push(uniqueKey)
      const positionStr = level ? level +'-'+ i : '' + i
      result[uniqueKey] = {
        index: positionStr,
        data: this.getStringify(son)
      }
      const children = son[this.children]
      if (children && children.length) {
        this.generateTreeMap(children, positionStr, result, nodeValues)
      }
    }

    return {
      result,
      nodeValues
    }
  }

  getStringify(obj) {
    const { [this.children]: children, ...reset } = obj
    return JSON.stringify(reset)
  }

  compare(a,b) {
    return this.enString(a) === this.enString(b)
  }

  getDeepValue(target, indexStr) {
    const indexArr = indexStr.split('-').filter(Boolean)
    const children = this.children
    let temp = JSON.parse(JSON.stringify(target))
    let result = null
    for(let i = 0; i< indexArr.length; i++) {
      result = temp[indexArr[i]]
      temp = temp[indexArr[i]][children]
    }
    return result
  }

  getParentData(target, indexStr) {
    const indexArr = indexStr.split('-').filter(Boolean)
    const children = this.children
    let temp = JSON.parse(JSON.stringify(target))
    let result = null
    for(let i = 0; i< indexArr.length - 1; i++) {
      result = temp[indexArr[i]]
      temp = temp[indexArr[i]][children]
    }
    return result
  }

  enString(data) {
    return typeof data === 'string' ? data : JSON.stringify(data)
  }

  getUniqueKey(son) {
    if(typeof this.uniqueKey === 'function') {
      return this.uniqueKey(son)
    } else {
      return this.uniqueKey
    }
  }
}

module.exports.TreeNodeDiff = TreeNodeDiff
