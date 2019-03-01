/**
 * 测试功能所花费的时间
 * @param {Function} callback 需要检测的目标函数
 */

function runningTime(callback: Function): any {
  if (typeof callback !== 'function') return callback

  console.time('startTime')

  const r = callback()

  console.timeEnd('endTime')

  return r
}

export default runningTime
