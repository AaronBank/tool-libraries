/**
 * 空数据检测模块
 */
import types from './types'

const emptyMethod = (): boolean => false

const typeList: Array<string> = ['string', 'array', 'object']
const methods: Array<Function> = [
  (target: any): boolean => JSON.stringify(target) === '{}',
  (target: string): boolean => !!target.trim(),
  (target: any): boolean => !!target.length,
  (target: Map<any, any>): boolean => target.size > 0,
  (target: Set<any>): boolean => target.size > 0,
]
const factory: Map<string, Function> = new Map()

typeList.forEach(
  (type: string, index: number): void => {
    factory.set(type, methods[index])
  }
)

/**
 * 检测传入任意类型数据是否为空（注：string、array、object、map、set（null、undefined将被视为空）除现有类型其他均被视为不为空）
 *
 * @param {Any} target 目标数据
 * @return {Boolean} 返回检测结果
 */
function isEmpty(target: any): boolean {
  let key: string = types.typeOf(target)

  if (key === 'null' || key === 'undefined') return true

  let method: Function = factory.get(key) || emptyMethod

  return method(target)
}

export default isEmpty
