/**
 * 去除空格
 * @param {string} str
 * @param {number} type 1-所有空格(不传), 2-前后空格，3-前空格，4-后空格
 */

export default (str: string, type: number = 1): string => {
  let reg: Array<RegExp> = [/\s*/g, /(^\s*)|(\s*$)/g, /(^\s*)/g, /(\s*$)/g]

  return str.replace(reg[type], '')
}
