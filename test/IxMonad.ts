import * as assert from 'assert'
import { IO, io } from '../src/IO'
import { IxMonad3, iapplyFirst, iapplySecond } from '../src/IxMonad'

declare module '../src/HKT' {
  interface URI2HKT3<U, L, A> {
    IxIO: IxIO<U, L, A>
  }
}

interface IxIO<I, O, A> extends IO<A> {
  readonly _I: I
  readonly _O: O
}

const URI = 'IxIO'

type URI = typeof URI

const lift = <I, O, A>(ma: IO<A>): IxIO<I, O, A> => ma as any

const iof = <I, A>(a: A): IxIO<I, I, A> => {
  return lift(io.of(a))
}

const ichain = <I, O, Z, A, B>(fa: IxIO<I, O, A>, f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> => {
  return lift(fa.chain(f))
}

const ixIO: IxMonad3<URI> = {
  URI,
  iof,
  ichain
}

let log: Array<string> = []

const open: IxIO<'Closed', 'Open', number> = lift(
  new IO(() => {
    log.push('Opening the door')
    return 1
  })
)

const close: IxIO<'Open', 'Closed', void> = lift(
  new IO(() => {
    log.push('Closing the door')
  })
)

describe('IxIO', () => {
  it('iapplyFirst', () => {
    log = []
    const action = iapplyFirst(ixIO)(open, close)
    assert.strictEqual(action.run(), 1)
    assert.deepStrictEqual(log, ['Opening the door', 'Closing the door'])
  })

  it('iapplySecond', () => {
    log = []
    const action = iapplySecond(ixIO)(open, close)
    assert.strictEqual(action.run(), undefined)
    assert.deepStrictEqual(log, ['Opening the door', 'Closing the door'])
  })
})
