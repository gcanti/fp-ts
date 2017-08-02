import * as assert from 'assert'
import { iapplyFirst, iapplySecond } from '../src/IxMonad'
import { IxIO } from '../src/IxIO'
import * as ixIO from '../src/IxIO'
import * as io from '../src/IO'

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
        log.push(`Opening the door`)
        return 1
      })
    )
  }
}
class Close extends Operation<'Open', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        log.push(`Closing the door`)
        return undefined
      })
    )
  }
}
class RingBell extends Operation<'Closed', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        log.push(`Ringing the bell`)
        return undefined
      })
    )
  }
}

describe('IxIO', () => {
  it('should run', () => {
    log = []
    const action = new Open().ichain(() => new Close()).ichain(() => new RingBell())
    action.run()
    assert.deepEqual(log, ['Opening the door', 'Closing the door', 'Ringing the bell'])
  })

  it('iapplyFirst', () => {
    log = []
    const action = iapplyFirst(ixIO)(new Open(), new Close())
    action.run()
    assert.deepEqual(log, ['Opening the door', 'Closing the door'])
  })

  it('iapplySecond', () => {
    log = []
    const action = iapplySecond(ixIO)(new Open(), new Close())
    action.run()
    assert.deepEqual(log, ['Opening the door', 'Closing the door'])
  })
})
