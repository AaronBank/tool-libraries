/**
 * 转义特殊字符
 * @param {string} str 需要转义的字符串
 */
function escapeStr(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default escapeStr
