/**
 * 数组求和
 * @param {Array} arr
 * @return {Number}
 */
export default (arr: Array<number>): number => arr.reduce((pre, cur) => pre + cur)
