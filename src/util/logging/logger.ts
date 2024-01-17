import { Format } from 'logform'
import { createLogger, transports, format, Logger } from 'winston'

const { combine, timestamp, json, simple, errors } = format

const formatter = (isLocal: boolean): Format => {
    const printFormat = isLocal ? simple : json

    return combine(timestamp(), errors(), printFormat())
}

export type InitialiseLoggerOptions = {
    /**
     * The service this logger is being used by.
     *
     * E.g. `@application/service1`
     *
     * This will be included as meta on the logs.
     */
    service: string
    /**
     * The version of the service currently executing.
     *
     * This will be included as meta on the logs.
     */
    version: string
    /**
     * Set's which logging levels will be logged.
     *
     * Optional and defaults to `info` meaning no `debug` statements will be logged.
     */
    logLevel?: string
    /**
     * Whether or not this service is being run locally.
     *
     * If `true` then a simple formatter will be used which is easier to read in local terminals.
     * If `false` then the json formatter for compatibility with log ingestion services e.g. datadog.
     *
     * Optional and defaults to `false`.
     */
    isLocal?: boolean
}

export let logger: Logger

/**
 *
 * Initialises the logger exported from this module.
 *
 * Use the logger by importing it:
 *
 * `import { logger } from 'utils/logging'`
 *
 * You must initialise it before use.
 */
export const initialiseLogger = ({
    service,
    version,
    isLocal = false,
    logLevel = 'info',
}: InitialiseLoggerOptions): void => {
    logger = createLogger({
        level: logLevel,
        format: formatter(isLocal),
        defaultMeta: { service, version },
        transports: [new transports.Console()],
    })
}
