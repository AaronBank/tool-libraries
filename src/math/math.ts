/**
 * 计算两点 (x0, y0), (x1, y1) 之间的欧几里得距离
 * @param {Number} x0
 * @param {Number} y0
 * @param {Number} x1
 * @param {Number} y1
 * @return {Number}
 */
const distance = (x0: number, y0: number, x1: number, y1: number): number => Math.hypot(x1 - x0, y1 - y0)
  
/**
 * 求最大公约数
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 */
const gcd = (x: number, y: number): number => !y ? x : gcd(y, x % y)

/**
 * 数字四舍五入(可以指定保留几位小数)
 * @param {Number} value    数值
 * @param {Number} position 保留几位小数
 * @return {String}
 */
const round = (value: number, position = 0): string => {
    const tmp = Math.pow(10, position)
    
    let result = (Math.round(value * tmp) / tmp).toString()

    let num = result.split('.')[1] ? result.split('.')[1].length : 0
    
    while (num < position) {
        result += !result.includes('.') ? '.0' : '0'
      
         num++
    }

    return result
}

export default { distance, gcd, round }
