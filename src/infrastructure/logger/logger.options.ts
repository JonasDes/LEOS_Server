import type { LoggerOptions as WinstonLoggerOptions } from 'winston'
import type * as Transport from 'winston-transport'

export interface LoggerOptions extends WinstonLoggerOptions {
  /**
   * Label that is prefixed before each log message, typically the package name.
   */
  label: string
  transports: Transport[] // Make this explicit to avoid null checks in dynamic configs
}
