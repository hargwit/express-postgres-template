import { Environment } from './environment'

type Config = {
    environment: Environment
    logLevel: string
    port: string
    service: string
    version: string
}

export const config: Config = {
    environment: process.env.ENVIRONMENT as Environment,
    logLevel: process.env.LOG_LEVEL || 'info',
    port: process.env.PORT || '3000',
    service: 'template-service',
    version: process.env.npm_package_version || '',
}
