/**
 * 统计数组中特定值出现的次数
 * @param {Array} arr 需要查询的数组
 * @param {Any} value 目标项
 * @return {number} 统计次数
 */
export default (arr: Array<any>, value: string|number|boolean) => arr.reduce((prev, next) => prev + next === value, 0)