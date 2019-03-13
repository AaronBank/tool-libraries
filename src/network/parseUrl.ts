/**
 * 根据传入规则自动补全接口项目名
 *
 * @param rules 需要排除的项目名集合
 * @param target 需要补全的项目名
 * @return 二阶调用函数
 */

const parseUrl: Function = (rules: Array<string>, target: string): Function => (
  url: string
): string => {
  if (!Array.isArray(rules) || typeof url !== 'string') return url

  if (!rules.includes(target)) rules.push(target)

  let reg = new RegExp(`/${rules.join('|')}`)

  return /^http|https/.test(url) ? url : reg.test(url) ? url : `${target}${url}`
}

export default parseUrl
