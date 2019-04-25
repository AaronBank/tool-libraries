/** 
 * 待晚上功能
*/

import axios from 'axios'
import types from '../judge/types'
import mergeQuery from './mergeQuery'
import parseUrl from './parseUrl'

// 需要将参数放置与请求体中的方法
const requestBody: Array<string> = ['POST', 'PUT', 'PATCH']
// 所有请求方法
const restfulApi: Array<string> = [
  'GET',
  'HEAD',
  'POST',
  'DELETE',
  'PUT',
  'PATCH',
]
// 备用空函数
const emptyFn = function() {}
// 请求统计
let count = 0

/**
 * @interface Options
 * @attribute showLoading 打开Loading函数
 * @attribute hideLoading 关闭Loading函数
 * @attribute success 全局请求成功拦截器接受函数(data,resolve,reject)
 * @attribute error 全局请求失败拦截器函数(data,reject)
 * @attribute headers 全局header设置函数
 * @attribute isLoading 全局设置Loading是否打开
 * @attribute filterPath 需要过滤的项目名
 * @attribute rootPath 目标项目名
 * @attribute env 开发环境(dev 环境将会打印出 log)
 *
 */
interface Options {
  showLoading?: Function
  hideLoading?: Function
  success?: Function
  error?: Function
  headers?: Function
  isLoading?: boolean
  filterPath?: Array<string>
  rootPath?: string
  env: string
}
// 请求相关全局配置
let gOptions: Options = {
  isLoading: true,
  filterPath: [],
  rootPath: '/',
  env: 'dev',
}

// 自动补全项目名高阶函数
let globalParseUrl: Function = parseUrl(gOptions.filterPath, gOptions.rootPath)

interface AxiosD {
  baseURL?: string
  transformRequest?: Function[]
  transformResponse?: Function[]
  paramsSerializer?: Function
  timeout?: number
  withCredentials?: boolean
  adapter?: Function
  auth?: any
  responseType?: string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onUploadProgress?: Function
  onDownloadProgress?: Function
  maxContentLength?: number
  validateStatus?: Function
  maxRedirects?: number
  httpAgent?: any
  httpsAgent?: any
  proxy?: any
  cancelToken?: any
}

let axiosGlobal: any = {}

// 设置axios全局对象
const setAxiosDefaults = (args: AxiosD) => {
  if (!types.isObject(args)) return

  axiosGlobal = args
  axios.defaults = axiosGlobal
}

// 设置请求相关全局配置
const setDefaultOption = (args: Options) => {
  gOptions = {...gOptions, ...args}
  globalParseUrl = parseUrl(gOptions.filterPath, gOptions.rootPath)
}

// 导出全局方法
const globalMethods: any = {
  setAxiosDefaults,
  setDefaultOption,
}

// log打印
const _logs = (
  url: string,
  params: any,
  options: any,
  poorDate: number,
  stagingRes: any
): void => {
  if (gOptions.env !== 'dev') return

  console.group('%c当前请求详细信息： ', 'background:#000;color:#bada55')
  console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url)
  console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params)
  console.log('%c请求配置：', 'color:#A101A6;font-weight: 600', options)
  console.log(
    '%c请求耗时：',
    'color:#A101A6;font-weight: 600',
    `${poorDate} ms`
  )
  console.log('%c返回数据：', 'color:#A101A6;font-weight: 600', stagingRes)
  console.groupEnd()
}

// 参数处理
const _dealWithParams = (
  method: string,
  options: any,
  params: any,
  jsonType: boolean
) => {
  let headers = gOptions.headers

  // 动态的添加headers
  if (headers && types.isFunction(headers)) {
    let resultHeader: any = headers()

    if (types.isObject(resultHeader))
      options.headers = {...options.headers, ...resultHeader}
  }

  // 处理参数携带方式
  if (jsonType) {
    options.data = params
  } else {
    if (requestBody.includes(method.toUpperCase())) {
      if (JSON.stringify(params) !== '{}') {
        let formData: any = new FormData()

        for (let key in params) formData.append(key, params[key])

        options.data = formData
      }
    } else {
      options.url = mergeQuery(options.url, params)
    }
  }
}

// request工厂三阶函数
const httpFactory = (method: string): Function => (
  url: string,
  params: any = {},
  isLoading: boolean = !!gOptions.isLoading,
  header: any = {},
  jsonType: boolean = false
) => {
  const {showLoading, hideLoading, success, error} = gOptions
  let stagingRes: any
  let options: any = {
    headers: {...header},
    method,
    url: globalParseUrl(url),
    data: {},
  }

  _dealWithParams(method, options, params, jsonType)

  return new Promise(
    (resolve: Function, reject: Function): void => {
      const startDate = Date.now()

      if (count <= 0 && isLoading && showLoading) showLoading()

      isLoading && count++

      axios(options)
        .then((code: any) => {
          const result = code.data

          stagingRes = code

          if (success && types.isFunction(success))
            return success(code, resolve, reject)

          resolve(result)
        })
        .catch(
          (e: any): void => {
            stagingRes = e

            if (error && types.isFunction(error)) return error(e, reject)

            reject('数据请求失败，请稍后再试！')
          }
        )
        .finally(() => {
          const poorDate = Date.now() - startDate

          isLoading && count--

          _logs(url, params, options, poorDate, stagingRes)

          if (count <= 0 && isLoading && hideLoading) {
            if (poorDate < 400) {
              setTimeout(() => hideLoading(), 400)
            } else {
              hideLoading()
            }
          }
        })
    }
  )
}

// 请求方法工厂函数
const methodsFactory = () => {
  const collection: any = {}

  restfulApi.forEach(method => {
    collection[method.toLowerCase()] = httpFactory(method)
  })

  collection.all = (...arg: any[]) => {
    let newArg: any[] = arg.filter(
      (fn: any): any => typeof fn === 'function' && fn.then
    )

    return Promise.all(newArg)
  }

  collection['race'] = (...arg: any[]): any => {
    let newArg: any[] = arg.filter(
      (fn: any): any => typeof fn === 'function' && fn.then
    )

    return Promise.race(newArg)
  }

  collection.download = (url: string, query: any) => {
    const oIframe: HTMLIFrameElement | null = document.createElement('iframe')
    const oBody: HTMLBodyElement | null = document.querySelector('body')

    oIframe.src = mergeQuery(url, query)

    oIframe.addEventListener(
      'load',
      function() {
        this.removeEventListener('load', arguments.call, false)
        if (!!oIframe.document) {
          let error = gOptions.error

          if (error && types.isFunction(error))
            return error('下载失败', emptyFn)
        }

        oBody && oBody.removeChild(oIframe)
      },
      false
    )

    oBody && oBody.appendChild(oIframe)
  }

  return collection
}

export default {
  ...methodsFactory(),
  ...globalMethods,
}
