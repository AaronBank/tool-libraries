/**
 * 获取cookie模块
 * @param {string} key // 需要获取的键
 */

function grabCookies(key: string): string | null {
  let arr: any
  let reg = new RegExp(`(^| )${key}=([^;]*)(;|$)`)

  if ((arr = document.cookie.match(reg))) return arr[2]

  return null
}

/**
 * 根据传入 key 获取本地一个多个cookie
 *
 * @param {string | string[]} keys 需要获取cookie的 keys
 * @returns {string | object} 返回获取后的结果 (多个值返回值为对象类型)
 */
function getCookie(keys: Array<string>): any
function getCookie(keys: string): string
function getCookie(keys: any): any {
  if (Array.isArray(keys)) {
    let results: any = {}

    keys.forEach((key: string): any => results[key] = grabCookies(key))

    return results
  }

  return grabCookies(keys.toString())
}

export default getCookie
