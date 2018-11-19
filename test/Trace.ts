import * as assert from 'assert'
import { trace, spy, traceA, traceM } from '../src/Trace'
import { some, option } from '../src/Option'

describe('Trace', () => {
  it('trace', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    trace('trace', () => 1)
    assert.deepEqual(logger, ['trace'])
    // tslint:disable-next-line:no-console
    console.log = log_
  })

  it('spy', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    spy(some(1))
    assert.deepEqual(logger, [some(1)])
    // tslint:disable-next-line:no-console
    console.log = log_
  })

  it('traceA', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    const x = traceA(option)('traceA')
    assert.deepEqual(logger, ['traceA'])
    assert.deepEqual(x, some(undefined))
    // tslint:disable-next-line:no-console
    console.log = log_
  })

  it('traceM', () => {
    // tslint:disable-next-line:no-console
    const log_ = console.log
    const logger: Array<any> = []
    // tslint:disable-next-line:no-console
    console.log = (a: any) => {
      logger.push(a)
    }
    const x = traceM(option)('traceM')
    assert.deepEqual(logger, ['traceM'])
    assert.deepEqual(x, some('traceM'))
    // tslint:disable-next-line:no-console
    console.log = log_
  })
})
