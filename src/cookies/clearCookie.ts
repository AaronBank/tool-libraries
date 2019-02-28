/**
 * 清空客户端cookie模块
 *
 * @param {string[]} domains 需要清除cookie的域名集合
 * @param {string[]} paths 需要清除cookie的路径集合
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

    keys.forEach(
      (key: string): void => {
        domains.forEach(
          (domain: string): void => {
            paths.forEach(
              (path: string): void => {
                document.cookie = `${key}=0;path=${path};Domain=${domain};expires=${exp.toUTCString()}`
              }
            )
          }
        )
      }
    )
  }
}

export default clearCookie
