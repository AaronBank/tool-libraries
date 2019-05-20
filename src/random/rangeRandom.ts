/**
 * 生成指定范围随机整数
 * @param {Number} max 最大值
 * @param {Number} min 最小值
 * @param {String} 'both'(default)、'left'、'right'、'no'
 */
function rangeRandom(min: number, max: number, border: string) {
  if (min === max) return 0

  const range: number = max - min

  let random = Math.random()

  switch (border) {
    case 'left':
      return min + Math.floor(random * range)
    case 'right':
      if (random === 0) {
        random = 1
      }
      return min + Math.ceil(random * range)
    case 'no':
      if (max - min < 1 || max - min === 1) return 'rdNum() 边界值不合理'
      if (random === 0) {
        random = 1
      }
      return min + Math.ceil(random * (range - 1))
    default:
      return min + Math.round(random * range)
  }
}

export default rangeRandom
