/**
 * 求最大公约数
 * @param {Number} x
 * @param {Number} y
 * @return {Number}
 */
const gcm = (x: number, y: number): number => !y ? x : gcm(y, x % y)

export default gcm