'use strict'

module.exports = {
  name: 'console',
  level: 'DEBUG',
  adapter: {
    debug: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  },
  prefix: ['now', 'duration', 'level'],
}
