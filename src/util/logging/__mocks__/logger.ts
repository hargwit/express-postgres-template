const logger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    log: jest.fn(),
}

module.exports = {
    logger,
    initialiseLogger: jest.fn(),
}
