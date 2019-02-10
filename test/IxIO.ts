import * as assert from 'assert'
import * as io from '../src/IO'
import { IxIO, ixIO, getMonad } from '../src/IxIO'
import { iapplyFirst, iapplySecond } from '../src/IxMonad'

//
// finite state machine
//

// By defining this state machine in a type, we can ensure that any sequence
// of operations which type checks is a valid sequence of operations on a door.
// The door can be open or closed
type DoorState = 'Open' | 'Closed'

//
// operations
//

let log: Array<string> = []

// A  represents the return type of the operation
// I represents the input state (the precondition)
// O represents output state (the postcondition)
class Operation<I extends DoorState, O extends DoorState, A> extends IxIO<I, O, A> {
  constructor(ma: io.IO<A>) {
    super(ma)
  }
}

class Open extends Operation<'Closed', 'Open', number> {
  constructor() {
    super(
      new io.IO(() => {
        log.push('Opening the door')
        return 1
      })
    )
  }
}
class Close extends Operation<'Open', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        log.push('Closing the door')
      })
    )
  }
}
class RingBell extends Operation<'Closed', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        log.push('Ringing the bell')
      })
    )
  }
}

describe('IxIO', () => {
  it('should run', () => {
    log = []
    const action = new Open().ichain(() => new Close()).ichain(() => new RingBell())
    action.run()
    assert.deepStrictEqual(log, ['Opening the door', 'Closing the door', 'Ringing the bell'])
  })

  it('iapplyFirst', () => {
    log = []
    const action = iapplyFirst(ixIO)(new Open(), new Close())
    action.run()
    assert.deepStrictEqual(log, ['Opening the door', 'Closing the door'])
  })

  it('iapplySecond', () => {
    log = []
    const action = iapplySecond(ixIO)(new Open(), new Close())
    action.run()
    assert.deepStrictEqual(log, ['Opening the door', 'Closing the door'])
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    const x = ixIO.iof(1)
    assert.strictEqual(x.map(double).run(), 2)
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = ixIO.iof(double)
    const fa = ixIO.iof(1)
    assert.strictEqual(fa.ap(fab).run(), 2)
  })

  it('chain', () => {
    const f = (n: number) => ixIO.iof(n * 2)
    const fa = ixIO.iof(1)
    assert.strictEqual(fa.chain(f).run(), 2)
  })

  it('getMonad', () => {
    const M = getMonad<number>()
    const double = (n: number): number => n * 2
    assert.strictEqual(M.map(M.of(1), double).run(), 2)
    assert.strictEqual(M.ap(M.of(double), M.of(1)).run(), 2)
    assert.strictEqual(M.chain(M.of(1), n => M.of(n * 2)).run(), 2)
  })
})
