/**
 * 函数防抖，限制事件的频繁触发
 * 将延迟函数的执行(真正的执行)在函数最后一次调用时刻的 wait 毫秒之后，
 * 传参 immediate 为 true， 立即执行函数，wait 时间间隔内不再触发事件后才可以重新触发执行
 * @param {Any} func
 * @param {Number} wait ms
 * @param {Boolean} immediate
 */

function debounce(func: any, wait: number, immediate?: boolean): any {
  let timeout: any
  return (...args: Array<any>) => {
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      // 立即执行函数，n 秒内不再触发事件，才可以重新触发执行
      const callNow = !timeout

      timeout = setTimeout((): any => timeout = null, wait)

      if (callNow) func.apply(this, args)

      return
    } else {
      timeout = setTimeout(() => {
        // 触发完事件 n 秒内不再触发事件后才可以重新触发执行
        func.apply(this, args)
        timeout = null
      }, wait)
    }
  }
}

/**
 * 函数防抖装饰器模式
 * @param time
 * @param immediate
 */
const Debounce = (time: number, immediate?: boolean): Function => (target: any, key: string, descriptor: any): any => descriptor.value = debounce(target[key], time, immediate)

export default { debounce, Debounce }
