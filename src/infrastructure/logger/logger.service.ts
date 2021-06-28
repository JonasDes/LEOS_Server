import { SPLAT } from 'triple-beam'

import { inspect } from 'util'
import { createLogger, format, Logger } from 'winston'

import { LoggerOptions } from './logger.options'

export class LoggerService {

  private readonly _logger: Logger

  constructor(private readonly options: LoggerOptions) {
    this._logger = createLogger({
      format: format.combine(
        format.colorize(),
        format.label({ label: this.options.label }),
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.prettyPrint(),
        format.printf(({ timestamp, label, level, message, ...meta }) => {
          let logMessage = `${timestamp} [${label}] ${level}: ${message}`
          // @ts-expect-error https://github.com/microsoft/TypeScript/issues/1863
          if (meta[SPLAT] !== undefined) logMessage += ' ' + inspect(meta[SPLAT], false, 4)

          return logMessage
        })
      ),
      ...this.options
    })
  }

  silly(message: string, ...meta: any[]) {
    this._logger.silly(message, ...meta)
  }

  debug(message: string, ...meta: any[]) {
    this._logger.debug(message, ...meta)
  }

  verbose(message: string, ...meta: any[]) {
    this._logger.verbose(message, ...meta)
  }

  info(message: string, ...meta: any[]) {
    this._logger.info(message, ...meta)
  }

  log(message: string, ...meta: any[]) {
    this._logger.info(message, ...meta)
  }

  warn(message: string, ...meta: any[]) {
    this._logger.warn(message, ...meta)
  }

  error(message: string, ...meta: any[]) {
    this._logger.error(message, ...meta)
  }

}
