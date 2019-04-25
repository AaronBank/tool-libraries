/**
 * 删除cookie模块
 */

interface CookieInfo {
  key: string // 要删除的cookie键名 (必选)
  path?: string // 要删除的cookie值 (可选)
  domain?: string // 要删除的cookie值 (可选)
}

/**
 * @param {String} key // cookie键
 * @param {String} path // cookie 作用域
 * @param {String} domain // cookie 域
 */
function cleanFactory(
  key: string,
  path: string = '/',
  domain: string = ''
): void {
  let now = new Date()
  now.setDate(now.getDate() - 1)

  document.cookie = `${key}=0;path=${path};Domain=${domain};expires=${now.toUTCString()}`
}

/**
 * 从客户端删除一个或者多个cookie
 * @param {string | string[] | CookieInfo[]} keys 需要删除的一个key值或者多个key值(cookie描述对象)
 */
function delCookie(keys: string): void
function delCookie(keys: Array<string>): void
function delCookie(keys: Array<CookieInfo>): void
function delCookie(keys: any): void {
  let isArr = Array.isArray(keys)

  if (typeof keys === 'string') cleanFactory(keys)

  if (isArr && typeof keys[0] === 'string') keys.forEach((key: string): any => cleanFactory(key))

  if (isArr && typeof keys[0] === 'object') {
    keys.forEach(
      (target: CookieInfo): void => {
        const {key, path, domain}: CookieInfo = target
        
        cleanFactory(key, path, domain)
      }
    )
  }
}

export default delCookie
