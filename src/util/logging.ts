//log levels: 20: debug, 15: info, 10: warn, 5: error, 0: fatal

let logLevel = 15
type LogLevel = 20 | 15 | 10 | 5 | 0

export const setLogLevel = (level: LogLevel) => {
    logLevel = level
}

export const log = {
    debug: (...args: any[]) => {
        if (logLevel === 20) console.log(...args)
    },
    info: (...args: any[]) => {
        if (logLevel >= 15) console.log(...args)
    },
    warn: (...args: any[]) => {
        if (logLevel >= 10) console.log(...args)
    },
    error: (...args: any[]) => {
        if (logLevel >= 5) console.log(...args)
    },
    fatal: (...args: any[]) => {
        if (logLevel >= 0) console.log(...args)
    }
}