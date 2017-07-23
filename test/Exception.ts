import * as assert from 'assert'
import * as exception from '../src/Exception'
import { IO } from '../src/IO'
import { isLeft, isRight } from '../src/Either'

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

  it('throwException', () => {
    const eio = exception.throwException<number>(new Error('bum!'))
    assert.throws(() => eio.run())
  })

  it('catchException', () => {
    const eio = exception.throwException<number>(new Error('bum!'))
    const io = exception.catchException(e => new IO(() => 1), eio)
    assert.strictEqual(io.run(), 1)
  })

  it('tryCatch', () => {
    const eiol = exception.tryCatch(exception.throwException<number>(new Error('bum!')))
    assert.strictEqual(isLeft(eiol.run()), true)
    const eior = exception.tryCatch(new IO(() => 1))
    assert.strictEqual(isRight(eior.run()), true)
  })
})
