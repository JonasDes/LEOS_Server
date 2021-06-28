import { transports } from 'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

import type { LoggerOptions } from '../infrastructure'

export const loggerConfig: LoggerOptions = {
  label: 'leos-server',
  transports: []
}

const {
  LOGGER_CONSOLE_ENABLED,
  LOGGER_CONSOLE_LEVEL,
  LOGGER_FILE_ENABLED,
  LOGGER_FILE_PATH,
  LOGGER_FILE_ROTATION_ENABLED,
  LOGGER_FILE_ROTATION_DAYS
} = process.env

// Console config
if (LOGGER_CONSOLE_ENABLED?.trim() !== 'false' && LOGGER_CONSOLE_ENABLED?.trim() !== '0') {
  loggerConfig.transports.push(
    new transports.Console({
      level: LOGGER_CONSOLE_LEVEL ?? 'debug',
      handleExceptions: true
    })
  )
}

// File config
if ((LOGGER_FILE_ENABLED?.trim() === 'true' || LOGGER_FILE_ENABLED?.trim() === '1') && LOGGER_FILE_PATH?.trim() !== '') {
  const filename = LOGGER_FILE_PATH
  const configs = [
    { filename: `${filename}.debug`, level: 'debug', handleExceptions: true },
    { filename: `${filename}.info`, level: 'info', handleExceptions: true },
    { filename: `${filename}.warning`, level: 'warning', handleExceptions: true },
    { filename: `${filename}.error`, level: 'error', handleExceptions: true }
  ]

  let customTransports: Array<transports.FileTransportInstance | DailyRotateFile> = []
  if (LOGGER_FILE_ROTATION_ENABLED !== 'false' && LOGGER_FILE_ROTATION_ENABLED !== '0') {
    const maxFiles = LOGGER_FILE_ROTATION_DAYS !== undefined ? parseInt(LOGGER_FILE_ROTATION_DAYS, 10) : 7
    customTransports = configs.map(config => new DailyRotateFile({ ...config, maxFiles }))
  } else {
    customTransports = configs.map(config => new transports.File({ ...config }))
  }

  loggerConfig.transports.push(...customTransports)
}
