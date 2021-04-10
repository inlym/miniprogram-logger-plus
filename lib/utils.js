'use strict'

/**
 * 对数字补零到指定位数
 * @param {number} number 被格式化的数字
 * @param {number} digit 格式化的位数
 * @returns {string}
 */
function zerofill(number, digit = 2) {
  const zero = '0'
  for (let i = 0; i < digit; i++) {
    if (number < Math.pow(10, i + 1)) {
      const str = zero.repeat(digit - i - 1) + number.toString()
      return str
    }
  }
  return number
}

/** 返回当前时间的标准格式 */
module.exports.nowTimeString = function nowTimeString() {
  const time = new Date()
  const year = time.getFullYear()
  const month = zerofill(time.getMonth())
  const day = zerofill(time.getDate())
  const hour = zerofill(time.getHours())
  const minute = zerofill(time.getMinutes())
  const second = zerofill(time.getSeconds())
  const millisecond = zerofill(time.getMilliseconds(), 3)

  const str = `${year}-${month}-${day} ${hour}:${minute}:${second}.${millisecond}`
  return str
}

/**
 * 将毫秒数格式化成文本，例如：'3h 5m 11s 111ms'
 * @param {number} ms 待格式化的毫秒数
 */
module.exports.formatMsString = function formatMsString(ms) {
  const s = 1000
  const m = s * 60
  const h = m * 60
  const d = h * 24

  /** 分隔符 */
  const sep = '.'

  /** 最终拼接的字符串 */
  let str = ''

  /** 待操作的剩余值 */
  let rest = ms

  if (rest === 0) {
    return '0ms'
  }
  if (rest >= h) {
    const hour = Math.floor(rest / h)
    rest -= hour * h
    str = `${hour}h`
  }
  if (rest >= m) {
    const minute = Math.floor(rest / m)
    rest -= minute * m
    str += str ? `${sep}${minute}m` : `${minute}m`
    return str
  }
  if (rest >= s) {
    const second = Math.floor(rest / s)
    rest -= second * s
    str += str ? `${sep}${second}s` : `${second}s`
    return str
  }
  if (rest > 0) {
    const millisecond = Math.floor(rest)
    str += str ? `${sep}${millisecond}ms` : `${millisecond}ms`
  }
  return str
}
