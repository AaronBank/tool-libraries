import types from './types'

function emptyMethod(): boolean {
  return false
}

const typeList: string[] = ['string', 'array', 'object']
const methods: Function[] = [
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

function isEmpty(target: any): boolean {
  let key: string = types.typeOf(target)

  if (key === 'null' || key === 'undefined') return true

  let method: Function = factory.get(key) || emptyMethod

  return method(target)
}

export default isEmpty
