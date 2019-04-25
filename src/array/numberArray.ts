/**
 * 数组求和
 * @param {Array} arr
 * @return {Number}
 */
const sum = (arr: Array<number>): number => arr.reduce((pre, cur) => pre + cur)

/**
 * 数组最大值
 * @param {Array} arr
 * @return {Number}
 */
const max = (arr: Array<number>): number => Math.max.apply(null, arr)

/**
 * 数组求平均值
 * @param {Array} arr
 * @return {Number}
 */
const mean = (arr: Array<number>): number => sum(arr) / arr.length

/**
 * 数组最小值
 * @param {Array} arr
 * @return {Number}
 */
const min = (arr: Array<number>): number => Math.min.apply(null, arr)

export default { sum, max, mean, min }