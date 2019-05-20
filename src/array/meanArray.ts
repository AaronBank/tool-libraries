import sum from './sumArray'

/**
 * 数组求平均值
 * @param {Array} arr
 * @return {Number}
 */
export default (arr: Array<number>): number => sum(arr) / arr.length
