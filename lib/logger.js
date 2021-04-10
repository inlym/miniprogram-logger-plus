'use strict'

const Appender = require('./appender.js')
const utils = require('./utils.js')
const { getLevel, isLoud } = require('./level.js')

const APPENDERS = Symbol('Logger#appenders')
const LEVEL = Symbol('Logger#level')
const START_TIME = Symbol('Logger#startTime')

module.exports = class Logger {
  constructor(options) {
    options = options || {}

    /** 日志等级 */
    this[LEVEL] = getLevel(options.level || 'ALL')

    /** 日志输出源 */
    this[APPENDERS] = {}

    /** 启动时间，用来计算时间差 */
    this[START_TIME] = Date.now()

    if (options.console !== false) {
      this.add(require('./appenders/console.js'))
    }

    if (options.realtimeLog !== false) {
      this.add(require('./appenders/realtime_log.js'))
    }
  }

  set level(value) {}

  /**
   * 添加一个新的日志输出源
   */
  add(options) {
    if (typeof options !== 'object' || !options.name || !options.adapter) {
      throw new Error('自定义日志输出源 options 错误')
    }

    const name = options.name
    if (this[APPENDERS][name]) {
      throw new Error(name + '日志输出源已经存在，请勿重复添加!')
    }

    this[APPENDERS][name] = new Appender(options)
  }

  /**
   * 移除一个日志输出源
   * @param {string} name 日志输出源名称
   */
  remove(name) {
    if (this[APPENDERS][name]) {
      delete this[APPENDERS][name]
    }
  }

  /**
   * 启用一个日志输出源
   * @param {string} name 日志输出源名称
   */
  enable(name) {
    if (this[APPENDERS][name]) {
      this[APPENDERS][name]['enable']()
    }
  }

  /**
   * 禁用一个日志输出源
   * @param {string} name 日志输出源名称
   */
  disable(name) {
    if (this[APPENDERS][name]) {
      this[APPENDERS][name]['disable']()
    }
  }

  /**
   * 当前时间与初始时间的时间差，会以 '3h 5m 11s 111ms' 字符串的格式输出
   */
  get duration() {
    const diff = Date.now() - this[START_TIME]
    return utils.formatMsString(diff)
  }

  /**
   * 以 '2021-04-10 12:53:58.123' 的字符串格式输出当前时间
   */
  get nowTime() {
    return utils.nowTimeString()
  }

  debug(...args) {
    this.log('debug', ...args)
  }

  info(...args) {
    this.log('info', ...args)
  }

  warn(...args) {
    this.log('warn', args)
  }

  error(...args) {
    this.log('error', ...args)
  }

  log(level, args) {
    // 日志级别不低于 Logger 的日志级别才输出到日志输出源
    if (isLoud(level, this[LEVEL])) {
      const now = this.nowTime
      const duration = this.duration
      const content = {
        level: getLevel(level),
        message: args,
        now,
        duration,
      }

      Object.keys(this[APPENDERS]).forEach((appender) => {
        this[APPENDERS][appender]['log'](level, content)
      })
    }
  }
}
