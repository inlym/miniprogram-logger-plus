export interface Options {
  level: 'ALL' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR'
}

export declare class Logger {
  constructor(options?: Options)

  debug(...args: any[]): void
  info(...args: any[]): void
  warn(...args: any[]): void
  error(...args: any[]): void
}
