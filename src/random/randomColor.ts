/**
 * 随机生成颜色
 */
export default (): string => '#' + ('000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
