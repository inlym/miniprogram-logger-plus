'use strict'

module.exports = {
  name: 'realtimeLog',
  level: 'INFO',
  adapter: wx.getRealtimeLogManager(),
  prefix: ['duration'],
}
