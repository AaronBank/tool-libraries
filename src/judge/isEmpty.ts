/**
 * 空数据检测模块
 */
import types from './types'

function emptyMethod(): boolean {
  return false
}

const typeList: Array<string> = ['string', 'array', 'object']
const methods: Array<Function> = [
  (target: any): boolean => {
    return JSON.stringify(target) === '{}'
  },
  (target: string): boolean => {
    return !!target.trim()
  },
  (target: any): boolean => {
    return !!target.length
  },
]
const factory: Map<string, Function> = new Map()

typeList.forEach(
  (type: string, index: number): void => {
    factory.set(type, methods[index])
  }
)

/**
 * 检测传入任意类型数据是否为空（注：除null、undefined、string、array、object 其他类型均返回不为空【true】）
 *
 * @param target 目标数据
 * @return 返回检测结果
 */
function isEmpty(target: any): boolean {
  let key: string = types.typeOf(target)

  if (key === 'null' || key === 'undefined') return true

  let method: Function = factory.get(key) || emptyMethod

  return method(target)
}

export default isEmpty
