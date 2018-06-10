import * as assert from 'assert'
import { trace, spy, traceA, traceM } from '../src/Trace'
import { some, option } from '../src/Option'

describe('Trace', () => {
  it('trace', () => {
    const log_ = console.log
    const logger: Array<any> = []
    console.log = (a: any) => {
      logger.push(a)
    }
    trace('trace', () => 1)
    assert.deepEqual(logger, ['trace'])
    console.log = log_
  })

  it('spy', () => {
    const log_ = console.log
    const logger: Array<any> = []
    console.log = (a: any) => {
      logger.push(a)
    }
    spy(some(1))
    assert.deepEqual(logger, [some(1)])
    console.log = log_
  })

  it('traceA', () => {
    const log_ = console.log
    const logger: Array<any> = []
    console.log = (a: any) => {
      logger.push(a)
    }
    const x = traceA(option)('traceA')
    assert.deepEqual(logger, ['traceA'])
    assert.deepEqual(x, some(undefined))
    console.log = log_
  })

  it('traceM', () => {
    const log_ = console.log
    const logger: Array<any> = []
    console.log = (a: any) => {
      logger.push(a)
    }
    const x = traceM(option)('traceM')
    assert.deepEqual(logger, ['traceM'])
    assert.deepEqual(x, some('traceM'))
    console.log = log_
  })
})
