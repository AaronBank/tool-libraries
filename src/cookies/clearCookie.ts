/**
 * 清空客户端cookie模块
 *
 * @param {string[]} domains 需要清除cookie 域集合
 * @param {string[]} paths 需要清除cookie 作用于集合
 */

function clearCookie(
  domains: Array<string> = [],
  paths: Array<string> = []
): void {
  let exp = new Date()
  let keys = document.cookie.match(/[^ =;]+(?=\=)/g)

  domains.push('')
  paths.push('/')

  if (keys) {
    exp.setDate(exp.getDate() - 1)

    keys.forEach((key: string): any => domains.forEach((domain: string): any => paths.forEach((path: string): any => document.cookie = `${key}=0;path=${path};Domain=${domain};expires=${exp.toUTCString()}`)))
  }
}

export default clearCookie
