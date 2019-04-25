/**
 * 设置cookie模块
 */

interface CookieInfo {
  key: string // 要设置的cookie键名 (必选)
  value: string // 要设置的cookie值 (必选)
  path?: string // 要设置的cookie值 (可选)
  domain?: string //  要设置的cookie值 (可选)
  expires?: number //  要设置的cookie值 (可选)
}

/**
 * 设置单个值
 *
 * @param {CookieInfo} cookie cookie描述对象
 */
function operation(cookie: CookieInfo) {
  let {key, value, path = '/', domain = '', expires = 7} = cookie
  let now = new Date()

  now.setDate(now.getDate() + expires)

  document.cookie = `${key}=${escape(
    value
  )};path=${path};Domain=${domain};expires=${now.toUTCString()}`
}

/**
 * 设置一个或者多个cookie到客户端
 *
 * @param {string | CookieInfo | CookieInfo[]} cookie cookie key 或 描述对象(可接受多个描述对象)
 * @param {string} value 需设置cookie值(当cookie为 string时 value为必选字段)
 */
function setCookie(cookie: string, value: string): void
function setCookie(cookie: CookieInfo,): void
function setCookie(cookie: Array<CookieInfo>): void
function setCookie(cookie: any, value?: string) {
  let args: Array<CookieInfo> = []

  if (typeof cookie === 'string') {
    value = value || ''
    let cookieInfo: CookieInfo = {key: cookie, value}

    cookie = cookieInfo
  }

  if ({}.toString.call(cookie) === '[object Object]') args = [cookie]

  if (Array.isArray(cookie)) args = cookie

  args.forEach(
    (arg: CookieInfo): void => {
      operation(arg)
    }
  )
}

export default setCookie
