/**
 * 事件池
 */
import types from '../judge/types'

let events: any = {};

/**
 * 添加单个监听
 * @param {String} eventName 事件名
 * @param {Function} listener 函数
 */
const setListener = (eventName: string, listener: Function) => {
    if (!types.isFunction(listener)) throw Error(`The listener is expected to be a function but receives an ${types.typeOf(listener)}`)

    let target: any = events[eventName]

    if (!target) return events[eventName] = [listener]

    if (target.indexOf(listener) < 0) events[eventName].push(listener)
}


/**
 * 添加一个或多个监听
 * 
 * @param {String} eventName 事件名
 * @param {Array | Function} listener 函数/函数集合
 */
function on(eventName: string, listener: Function): void
function on(eventName: string, listener: Array<Function>): void
function on(eventName: string, listener: any): void {
    if (!(types.isArray(listener) || types.isFunction(listener))) throw Error(`The listener is expected to be a function or an array but receives an ${types.typeOf(listener)}`)

    if (types.isFunction(listener)) listener = [listener]

    listener.forEach((item: any): any => setListener(eventName, item));
}


/**
 * 只绑定一次
 * 
 * @param {String} eventName 事件名
 * @param {Array | Function} listener 函数/函数集合
 */
function once(eventName: string, listener: Function): void
function once(eventName: string, listener: Array<Function>): void
function once(eventName: string, listener: any): void {
    if (!(types.isArray(listener) || types.isFunction(listener))) throw Error(`The listener is expected to be a function or an array but receives an ${types.typeOf(listener)}`)

    if (types.isFunction(listener)) listener = [listener]

    listener.forEach((item: Function) => {
        const newListener = () => {
            off(eventName, newListener);
            item.apply(this, arguments);
        }
    
        on(eventName, newListener)
    });
}

/**
 * 触发
 * 
 * @param {String} eventName 事件名
 * @param {Any} args
 */
const emit = (eventName: string, ...args: Array<any>): void => {
    const handler: Array<Function> | undefined = events[eventName];

    if (!handler) return;

    handler.forEach((item: Function) => item.apply(this, args))
}

/**
 * 去除一个或多个监听
 * 
 * @param {String} eventName 事件名
 * @param {Array | Function} listener 函数/函数集合
 */
function off(eventName: string, listener: Function): void
function off(eventName: string, listener: Array<Function>): void
function off(eventName: string, listener: any): void {
    if (!(types.isArray(listener) || types.isFunction(listener))) throw Error(`The listener is expected to be a function or an array but receives an ${types.typeOf(listener)}`)

    if (!events[eventName]) return;

    const newListeners = events[eventName].filter((item: Function) => {
        if (types.isArray(listener)) return !listener.includes(item)

        return item !== listener
    })

    events[eventName] = newListeners
}

/**
 * 清除监听
 * 
 * @param {String} eventName 事件名
 */
const clear = (eventName: string): void => {
    if (!events[eventName]) return;

    delete events[eventName];
}

export default { on, once, emit, off, clear }