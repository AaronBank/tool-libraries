import clearCookie from './cookies/clearCookie'
import delCookie from './cookies/delCookie'
import getCookie from './cookies/getCookie'
import setCookie from './cookies/setCookie'

import runningTime from './date/runningTime'

import curry from './function/curry'
import debounce from './function/debounce'
import throttle from './function/throttle'

import changeCase from './judge/isEmpty'
import types from './judge/types'

import parseUrl from './network/parseUrl'
import queryString from './network/queryString'
// import request from './network/request'

import randomColor from './random/randomColor'
import rangeRandom from './random/rangeRandom'

import escapeStr from './string/escapeStr'
import trim from './string/trim'

const obj = {
  clearCookie,
  delCookie,
  getCookie,
  setCookie,
  runningTime,
  curry,
  debounce,
  throttle,
  changeCase,
  types,
  parseUrl,
  queryString,
  //   request,
  randomColor,
  rangeRandom,
  escapeStr,
  trim,
}

export default obj
