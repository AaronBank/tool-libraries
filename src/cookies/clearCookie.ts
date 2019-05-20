/**
 * 清空客户端cookie模块
 *
 * @param {string[]} paths 需要清除cookie 作用于集合
 * @param {string[]} domains 需要清除cookie 域集合
 */

function clearCookie(path: string, domain: string): void
function clearCookie(path: Array<string>, domain: Array<string>): void
function clearCookie(path: any, domain: any): void {
  let exp = new Date()
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
  let paths: Array<string> = []
  let domains: Array<string> = []

  if (Array.isArray(path))
    paths = path
  else
    paths.push(path || '/')

  if (Array.isArray(domain))
    domains = path
  else
    domains.push(domain || '')

  if (!keys) return
  
  exp.setDate(exp.getDate() - 1)

  keys.forEach((key: string): any => domains.forEach((domain: string): any => paths.forEach((path: string): any => document.cookie = `${key}=0;path=${path};Domain=${domain};expires=${exp.toUTCString()}`)))
}

export default clearCookie
