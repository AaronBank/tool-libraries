/**
 * 类型判断模块
 */

const basicTypes: string[] = [
  'Undefined',
  'Null',
  'String',
  'Number',
  'Boolean',
  'Function',
  'Symbol',
  'Object',
  'Array',
  'Date',
  'RegExp',
  'Arguments',
  'Error',
  'Map',
  'WeakMap',
  'Set',
  'WeakSet',
  'XMLHttpRequest',
]

let typeObj: Map<string, string> = new Map()

const concentrated = (basicType: string): Function => (type: any): Boolean => {
  return typeOf(type) === basicType.toLowerCase()
}

/**
 * 检测传入任意数据的数据类型
 *
 * @param type 待检测数据
 * @return 返回检测结果
 */
const typeOf = (type: any): string => {
  let typeName: string = Object.prototype.toString.call(type)

  return typeObj.get(typeName) || 'unknown'
}

let caller: any = {typeOf, isNaN}

basicTypes.forEach(
  (item: string): void => {
    typeObj.set(`[object ${item}]`, item.toLowerCase())

    // 批量生成类型判断方法
    caller[`is${item}`] = concentrated(item)
  }
)

export default caller
