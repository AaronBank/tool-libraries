import types from '../judge/types'

/**
 * 生成指定范围随机整数
 * @param {Number} max 最大值
 * @param {Number} min 最小值
 * @param {String} border 边界 'both'、'left'、'right'、'no'
 */
export default (min: number, max: number, border: string = 'both') => {
  if (min === max) return 0

  const range: number = max - min

  let random = Math.random() || 1

  const processing: {[index: string]: Function} = {
    left: () => min + Math.floor(random * range),
    right: () => min + Math.ceil(random * range),
    no: () => {
      if (max - min < 1 || max - min === 1) throw Error('The boundary value is unreasonable')
      return min + Math.ceil(random * (range - 1))
    },
    both: () => min + Math.round(random * range)
  }

  let f: Function = processing[border]

  if (!types.isFunction(f)) f = processing['both']

  return f()
}
