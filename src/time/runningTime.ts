/**
 * 测试功能所花费的时间
 * @param {Function} callback 需要检测的目标函数
 * @param {Any} 函数执行返回结果
 */

export default (callback: Function): any => {
  if (typeof callback !== 'function') return callback

  console.time('Spend time：')

  const run = callback()

  console.timeEnd('Spend time：')

  return run
}
