'use strict'

const validLevel = ['ALL', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'NONE']

function throwError(level) {
  throw new Error(`${level}不是一个有效的日志等级，有效的日志等级包含：${validLevel.toString()}`)
}

function levelGrade(level) {
  for (let i = 0; i < validLevel.length; i++) {
    if (level.toUpperCase() === validLevel[i]) {
      return i
    }
  }
  throwError(level)
}

function getLevel(level) {
  const levelUpper = level.toUpperCase()
  if (validLevel.includes(levelUpper)) {
    return levelUpper
  }
  throwError(level)
}

function isLoud(logLevel, apapterLevel) {
  return levelGrade(logLevel) >= levelGrade(apapterLevel)
}

module.exports = { getLevel, isLoud }
