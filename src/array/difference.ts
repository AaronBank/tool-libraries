/**
 * 数组取差集
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */
export default (arr1: Array<any>, arr2: Array<any>): Array<any> => {
    const s = new Set(arr2)

    return arr1.filter(x => !s.has(x))
}