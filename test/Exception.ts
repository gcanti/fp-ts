import * as assert from 'assert'
import * as exception from '../src/Exception'
import { IO } from '../src/IO'

describe('Exception', () => {
  it('error', () => {
    const message = 'bum!'
    const e = exception.error(message)
    assert.strictEqual(e instanceof Error, true)
    assert.strictEqual(e.message, message)
  })

  it('message', () => {
    const message = 'bum!'
    const e = new Error(message)
    assert.strictEqual(exception.message(e), message)
  })

  it('throwError', () => {
    const eio = exception.throwError<number>(new Error('bum!'))
    assert.throws(() => eio.run())
  })

  it('catchError', () => {
    const eio = exception.throwError<number>(new Error('bum!'))
    const io = exception.catchError(eio, e => new IO(() => 1))
    assert.strictEqual(io.run(), 1)
  })

  it('tryCatch', () => {
    const eiol = exception.tryCatch(exception.throwError<number>(new Error('bum!')))
    assert.strictEqual(eiol.run().isLeft(), true)
    const eior = exception.tryCatch(new IO(() => 1))
    assert.strictEqual(eior.run().isRight(), true)
  })
})
