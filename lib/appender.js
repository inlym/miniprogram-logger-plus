'use strict'

const { getLevel, isLoud } = require('./level.js')

const LEVEL = Symbol('Appender#level')
const ENABLED = Symbol('Appender#enable')
const ADAPTER = Symbol('Appender#adapter')
const PREFIX = Symbol('Appender#prefix')

module.exports = class Appender {
  /**
   * @class
   * @param {object} options
   */
  constructor(options) {
    // 在调用前对 options 做检测，此处无需再次检测
    this.name = options.name
    this[LEVEL] = getLevel(options.level || 'DEBUG')
    this[ADAPTER] = options.adapter
    this[PREFIX] = options.prefix || ['now', 'duration', 'level']

    // 默认启用
    this.enable()
  }

  set level(value) {
    this[LEVEL] = getLevel(value)
  }

  get level() {
    return this[LEVEL]
  }

  get enabled() {
    return this[ENABLED]
  }

  enable() {
    this[ENABLED] = true
  }

  disable() {
    this[ENABLED] = false
  }

  serializeContent(content) {
    const rule = this[PREFIX]
    const list = rule.map((item) => {
      return content[item]
    })
    list.push(...content.message)
    return list
  }

  log(level, content) {
    // 日志级别不低于 Apperder 的日志级别才输出
    if (isLoud(level, this[LEVEL]) && this[ENABLED]) {
      const output = this.serializeContent(content)
      const loggerAdapter = this[ADAPTER][level.toLowerCase()]
      if (loggerAdapter && typeof loggerAdapter === 'function') {
        loggerAdapter(...output)
      } else {
        throw new Error(`${this.name}适配器的${level.toLowerCase()}级别的日志方法不存在`)
      }
    }
  }
}
