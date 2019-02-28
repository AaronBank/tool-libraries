import types from '../speculation/types'
/**
 * 拼接url与参数
 *
 * @param url 目标url，可默认带参数
 * @param params 需要拼接的参数
 * @return 二阶调用函数
 */

const mergeQuery: Function = (url: string, params: any): string => {
  if (types.isObject(params) && JSON.stringify(params) === '{}') {
    return url
  }
  const isParam = url.indexOf('?', 0) !== -1
  const query = Object.keys(params)
    .map((key: string): string => `${key}=${params[key]}`)
    .join('&')

  return query ? `${url}${isParam ? '&' : '?'}${query}` : url
}

export default mergeQuery
