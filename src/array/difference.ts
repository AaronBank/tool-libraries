/**
 * 数组取差集
 * @param {Array} arr1 目标数组1
 * @param {Array} arr2 目标数组2
 * @return {Array} 数组差集
 */
export default (arr1: Array<any>, arr2: Array<any>): Array<any> => {
    const s = new Set(arr2)

    return arr1.filter(x => !s.has(x))
}