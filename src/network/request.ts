// import {Message, Loading} from 'element-ui';
import axios from 'axios'

console.log(qs)

import {parseUrl, mergeQuery} from './mergeUrl'
import cookies from './cookies'
import config from '@/Config'

const requestBody = ['POST', 'PUT', 'PATCH']
const restfulApi = ['GET', 'HEAD', 'POST', 'DELETE', 'PUT', 'PATCH']
const RESPONSE_SUCCESS_STATUS = 0

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true

let count = 0
let loading = null

let defaultOptions = {
  headers: {},
  data: {},
  timeout: 8000,
  responseType: 'json',
}

const httpFactory = method => (
  url,
  params = {},
  isLoading = false,
  postQuery = false,
  axiosOptions = {},
  jsonType = false
) => {
  let options = {
    ...defaultOptions,
    ...axiosOptions,
    headers: {
      uid: cookies.getCookie('uid'),
      utoken: cookies.getCookie('utoken'),
    },
    method,
    url: parseUrl(url),
  }

  let stagingRes = null

  if (jsonType) {
    options.data = params
  } else {
    if (requestBody.includes(method.toUpperCase()) && !postQuery) {
      if (JSON.stringify(params) !== '{}') {
        let formData = new FormData()

        for (let key in params) {
          formData.append(key, params[key])
        }

        options.data = formData
      }
    } else {
      options.url = mergeQuery(url, params)
    }
  }

  return new Promise((resolve, reject) => {
    const startDate = Date.now()

    if (count <= 0 && isLoading) {
      loading = Loading.service({fullscreen: true})
    }

    isLoading && count++

    axios(options)
      .then(code => {
        const result = code.data

        stagingRes = code

        if (code.headers.authority) {
          Message.error({
            message: '您没有操作权限，请联系管理员',
            showClose: true,
          })
          reject('您没有操作权限，请联系管理员')

          return
        }

        if (code.headers.iframe_relogin) {
          Message.error({
            message: '登陆状态失效，请重新登陆',
            showClose: true,
          })
          reject('登陆状态失效，请重新登陆')

          return
        }

        if (result.status === RESPONSE_SUCCESS_STATUS) {
          resolve(result.data)
        } else {
          let msg =
            result.errorMsg || result.errmsg || '数据请求失败，请稍后再试！'
          Message.error({
            message: msg,
            showClose: true,
          })
          reject(msg)
        }
      })
      .catch(e => {
        stagingRes = e
        Message.error({
          message: '数据请求失败，请稍后再试！',
          showClose: true,
        })
        reject('数据请求失败，请稍后再试！')
      })
      .finally(() => {
        const poorDate = Date.now() - startDate

        isLoading && count--

        if (config.env === 'dev') {
          console.group(
            '%c当前请求详细信息： ',
            'background:#000;color:#bada55'
          )
          console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url)
          console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params)
          console.log('%c请求配置：', 'color:#A101A6;font-weight: 600', options)
          console.log(
            '%c请求耗时：',
            'color:#A101A6;font-weight: 600',
            `${poorDate} ms`
          )
          console.log(
            '%c返回数据：',
            'color:#A101A6;font-weight: 600',
            stagingRes
          )
          console.groupEnd()
        }

        if (count <= 0 && isLoading) {
          if (poorDate < 400) {
            setTimeout(() => loading && loading.close(), 400)
          } else {
            loading && loading.close()
          }
        }
      })
  })
}

const methodsFactory = () => {
  const collection = {}

  restfulApi.forEach(method => {
    collection[method.toLowerCase()] = httpFactory(method)
  })

  collection.download = (url, query) => {
    const oIframe = document.createElement('iframe')
    const oBody = document.querySelector('body')

    oIframe.src = mergeQuery(url, query)

    if (oIframe.attachEvent) {
      oIframe.attachEvent('onreadystatechange', function() {
        if (
          oIframe.readyState === 'complete' ||
          oIframe.readyState === 'loaded'
        ) {
          /* eslint-disable */
          oIframe.detachEvent('onreadystatechange', arguments.callee)
          if (!oIframe.document) {
            Message.error({
              message: '下载失败，请稍后再试',
              showClose: true,
            })
          }

          oBody.removeChild(oIframe)
        }
      })
    } else {
      oIframe.addEventListener(
        'load',
        function() {
          this.removeEventListener('load', arguments.call, false)
          if (!oIframe.document) {
            Message.error({
              message: '下载失败，请稍后再试',
              showClose: true,
            })
          }

          oBody.removeChild(oIframe)
        },
        false
      )
    }

    oBody.appendChild(oIframe)
  }

  collection.all = (...arg) => {
    arg.filter(fn => typeof fn === 'function' && fn.then)

    return Promise.all(arg)
  }

  collection.race = (...arg) => {
    arg.filter(fn => typeof fn === 'function' && fn.then)

    return Promise.race(arg)
  }

  return collection
}

export default methodsFactory()
