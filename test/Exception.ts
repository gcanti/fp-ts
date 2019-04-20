import * as assert from 'assert'
import { catchError, error, message, stack, throwError, tryCatch } from '../src/Exception'
import * as O from '../src/Option'

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
      assert.strictEqual(O.isSome(O.option.filter(stack(e), s => s.startsWith('Error: bum!'))), true)
    }
    const e = new Error('bum!')
    delete e.stack
    assert.strictEqual(O.isNone(stack(e)), true)
  })

  it('throwError', () => {
    const eio = throwError<number>(new Error('bum!'))
    assert.throws(() => eio())
  })

  it('catchError', () => {
    assert.strictEqual(
      catchError(
        () => {
          throw new Error('bum!')
        },
        () => () => 1
      )(),
      1
    )
    assert.strictEqual(
      catchError(
        () => {
          throw 'bum!' // tslint:disable-line no-string-throw
        },
        () => () => 1
      )(),
      1
    )
  })

  it('tryCatch', () => {
    const eiol = tryCatch(throwError<number>(new Error('bum!')))
    assert.strictEqual(eiol()._tag, 'Left')
    const eior = tryCatch(() => 1)
    assert.strictEqual(eior()._tag, 'Right')
  })
})
