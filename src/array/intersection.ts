/**
 * 数组取交集
 * @param {Array} arr1 目标数组1
 * @param {Array} arr2  目标数组2
 * @return {Array} 数组交集
 */
export default (arr1: Array<any>, arr2: Array<any>): Array<any> => {
    const all = Array.from(new Set([...arr1, ...arr2]))

    return all.filter(x => arr1.includes(x) && arr2.includes(x))
}