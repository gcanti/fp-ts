import { error, info, log, warn } from '@fp-ts/core/Console'
import { deepStrictEqual } from '@fp-ts/core/test/util'

describe('Console', () => {
  it('log', () => {
    const log_ = console.log
    const logger: Array<any> = []

    console.log = (a: any) => {
      logger.push(a)
    }
    log('log')()
    deepStrictEqual(logger, ['log'])

    console.log = log_
  })

  it('info', () => {
    const info_ = console.info
    const logger: Array<any> = []

    console.info = (a: any) => {
      logger.push(a)
    }
    info('info')()
    deepStrictEqual(logger, ['info'])

    console.info = info_
  })

  it('error', () => {
    const error_ = console.error
    const logger: Array<any> = []

    console.error = (a: any) => {
      logger.push(a)
    }
    error('error')()
    deepStrictEqual(logger, ['error'])

    console.error = error_
  })

  it('warn', () => {
    const warn_ = console.warn
    const logger: Array<any> = []

    console.warn = (a: any) => {
      logger.push(a)
    }
    warn('warn')()
    deepStrictEqual(logger, ['warn'])

    console.warn = warn_
  })
})
