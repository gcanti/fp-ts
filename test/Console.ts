import * as U from './util'
import { log, info, error, warn } from '../src/Console'

describe('Console', () => {
  it('log', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    // tslint:disable-next-line: readonly-array
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    log('log')()
    U.deepStrictEqual(logger, ['log'])
    // tslint:disable-next-line:no-console
    console.log = log_
  })

  it('info', () => {
    // tslint:disable-next-line:no-console
    const info_ = console.info
    // tslint:disable-next-line: readonly-array
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.info = (a: any) => {
      logger.push(a)
    }
    info('info')()
    U.deepStrictEqual(logger, ['info'])
    // tslint:disable-next-line:no-console
    console.info = info_
  })

  it('error', () => {
    // tslint:disable-next-line:no-console
    const error_ = console.error
    // tslint:disable-next-line: readonly-array
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.error = (a: any) => {
      logger.push(a)
    }
    error('error')()
    U.deepStrictEqual(logger, ['error'])
    // tslint:disable-next-line:no-console
    console.error = error_
  })

  it('warn', () => {
    // tslint:disable-next-line:no-console
    const warn_ = console.warn
    // tslint:disable-next-line: readonly-array
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.warn = (a: any) => {
      logger.push(a)
    }
    warn('warn')()
    U.deepStrictEqual(logger, ['warn'])
    // tslint:disable-next-line:no-console
    console.warn = warn_
  })
})
