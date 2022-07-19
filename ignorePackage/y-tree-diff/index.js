class TreeNodeDiff {
  constructor(data, options = {}) {
    this.label = options.label || 'label'
    this.value = options.value || 'value'
    this.children = options.children || 'children'
    this.uniqueKey = options.uniqueKey || this.value
    this.compareKeys = options.compareKeys || [this.value, this.label]
    this.generateData = options.generateData || null
    this.data = []
    this.cacheTreeMap = {}
    this.oldValues = []
    this.initData(data)
  }

  initData(data) {
    this.data = data
    const { result, nodeValues } = this.generateTreeMap(data)
    this.cacheTreeMap = result
    this.oldValues = nodeValues // 存储所有节点value 用于判断删除的节点
  }

  /**
   *
   * @return result.type noUpdate, all (全部更改) update  add del move(暂未实现)
   * @param nv
   */
  diff(nv = []) {
    const diffs = []
    const newDataStr = JSON.stringify(nv)
    const newData = JSON.parse(newDataStr)
    const { data: oldData, cacheTreeMap, oldValues } = this
    const { result: newTreeMap, nodeValues: newValues, data } = this.generateTreeMap(newData)

    function replaceData() {
      this.data = newData
      this.oldValues = newValues
      this.cacheTreeMap = newTreeMap
    }

    // tree 没有任何改动
    if (this.compare(oldData, newDataStr)) {
      replaceData.call(this)
      return { diffType: 'noUpdate', data }
    }
    // tree 全部更改
    if (!newData.length || !oldData.length) {
      replaceData.call(this)
      return { diffType: 'all', data }
    }

    // 获取删除 修改的节点
    for (let i = 0; i < newValues.length; i++) {
      const value = newValues[i]
      const { index: newIndexStr, data: newNodeData } = newTreeMap[value]
      const oldNode = cacheTreeMap[value]
      const son = this.getDeepValue(newData, newIndexStr)
      if (oldNode) {
        const { index: oldIndexStr, data: oldNodeData } = oldNode
        if (
          this.compareNode(oldNodeData, newNodeData)
          // && this.compare(this.getDeepValue(oldData,oldIndexStr), son)
        ) { // 无更改 只是数据无更改 不代表位置没有更改 暂不考虑位置更改
          // 位置更改逻辑
        } else {
          // 有更改
          diffs.push({
            diffType: 'update',
            data: newNodeData
          })
        }
      } else {
        const parentData = this.getParentData(newData, newIndexStr)
        // // 新增节点 需要知道pId
        diffs.push({
          diffType: 'add',
          parentData,
          data: son
        })
      }
    }

    // 获取删除的节点
    const delValues = oldValues.filter(value => !newValues.includes(value))
    for (let i = 0; i < delValues.length; i++) {
      const son = delValues[i]
      const node = cacheTreeMap[son]
      if (!node.parent || !delValues.includes(node.parent[this.value])) {
        diffs.push({
          diffType: 'del',
          data: cacheTreeMap[son].data
        })
      }
    }

    replaceData.call(this)
    return { diffType: 'update', diffs, data }
  }

  // 存储最外层数据 需要对比children数据时直接compare
  generateTreeMap(data, result = {}, nodeValues = []) {
    const _this = this
    function traverse(node, i, parent) {
      const uniqueKey = _this.getUniqueKey(node)
      nodeValues.push(uniqueKey)
      const positionStr = '' + i
      _this.generateData && _this.generateData(node)
      result[uniqueKey] = {
        index: positionStr,
        data: node,
        parent: parent
      }
      const children = node[_this.children]
      if (children && children.length) {
        for (let j = 0; j < children.length; j++) {
          traverse(children[j], positionStr + '-' + j, node)
        }
      }
    }
    for (let i = 0; i < data.length; i++) {
      const son = data[i]
      traverse(son, '' + i, null)
    }
    return {
      result,
      nodeValues,
      data
    }
  }

  getStringify(obj) {
    const { [this.children]: children, ...reset } = obj
    return JSON.stringify(reset)
  }

  compare(a, b) {
    return this.enString(a) === this.enString(b)
  }

  compareNode(a, b) {
    const compareKeys = this.compareKeys
    let flag = true
    for (let i = 0; i < compareKeys.length; i++) {
      const key = compareKeys[i]
      if (a[key] !== b[key]) {
        flag = false
        break
      }
    }
    return flag
  }

  getDeepValue(target, indexStr) {
    const indexArr = indexStr.split('-').filter(Boolean)
    const children = this.children
    let temp = target
    let result = null
    for (let i = 0; i < indexArr.length; i++) {
      result = temp[indexArr[i]]
      temp = temp[indexArr[i]][children]
    }
    return result
  }

  getParentData(target, indexStr) {
    const indexArr = indexStr.split('-').filter(Boolean)
    if (!indexArr.length) return ''
    const children = this.children
    let temp = target
    let result = null
    for (let i = 0; i < indexArr.length - 1; i++) {
      result = temp[indexArr[i]]
      temp = temp[indexArr[i]][children]
    }
    return result
  }

  enString(data) {
    return typeof data === 'string' ? data : JSON.stringify(data)
  }

  getUniqueKey(son) {
    if (typeof this.uniqueKey === 'function') {
      return this.uniqueKey(son)
    } else {
      return son[this.uniqueKey]
    }
  }
}

module.exports.TreeNodeDiff = TreeNodeDiff
