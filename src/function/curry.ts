/**
 * 函数柯里化
 * @param {Any} fn
 * @param {Number} arity
 * @param {Array} args
 * @return {Any}
 */

const curry: Function = (fn: any, arity: number = fn.length, ...args: Array<any>): any => arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

export default curry