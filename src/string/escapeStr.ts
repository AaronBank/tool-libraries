/**
 * 转义特殊字符
 * @param {string} str 需要转义的字符串
 */
export default (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
