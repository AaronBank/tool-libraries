import isEmpty from '../judge/isEmpty'

/**
 * 拼接url与参数
 *
 * @param {String} url 目标url，可默认带参数
 * @param {Object} params 需要拼接的参数
 * @return {String}
 */
export default (url: string, params: any): string => {
  if (isEmpty(params)) return url

  const isParam = url.indexOf('?', 0) !== -1
  const query: any = Object.keys(params)
    .map((key: string): string => `${key}=${params[key]}`)
    .join('&')

  return query ? `${url}${isParam ? '&' : '?'}${query}` : url
}
