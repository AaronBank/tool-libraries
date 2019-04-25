/**
 * 多维数组转一维数组 (暂时有缺陷，等待修改兼容版本)
 * @param {Array} arr
 * @param {Number} dimension
 * @return {Number}
 */
export default (arr: Array<any>, dimension: number = Infinity): Array<any> => arr.flat(dimension);