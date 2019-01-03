import * as assert from 'assert'
import { catchError, error, message, stack, throwError, tryCatch } from '../src/Exception'
import { IO } from '../src/IO'

describe('Exception', () => {
  it('error', () => {
    const message = 'bum!'
    const e = error(message)
    assert.strictEqual(e instanceof Error, true)
    assert.strictEqual(e.message, message)
  })

  it('message', () => {
    const m = 'bum!'
    const e = new Error(m)
    assert.strictEqual(message(e), m)
  })

  it('stack', () => {
    try {
      throw new Error('bum!')
    } catch (e) {
      assert.strictEqual(
        stack(e)
          .filter(s => s.startsWith('Error: bum!'))
          .isSome(),
        true
      )
    }
    const e = new Error('bum!')
    delete e.stack
    assert.strictEqual(stack(e).isNone(), true)
  })

  it('throwError', () => {
    const eio = throwError<number>(new Error('bum!'))
    assert.throws(() => eio.run())
  })

  it('catchError', () => {
    assert.strictEqual(
      catchError(
        new IO(() => {
          throw new Error('bum!')
        }),
        () => new IO(() => 1)
      ).run(),
      1
    )
    assert.strictEqual(
      catchError(
        new IO(() => {
          throw 'bum!' // tslint:disable-line no-string-throw
        }),
        () => new IO(() => 1)
      ).run(),
      1
    )
  })

  it('tryCatch', () => {
    const eiol = tryCatch(throwError<number>(new Error('bum!')))
    assert.strictEqual(eiol.run().isLeft(), true)
    const eior = tryCatch(new IO(() => 1))
    assert.strictEqual(eior.run().isRight(), true)
  })
})
