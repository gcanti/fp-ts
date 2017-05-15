import * as assert from 'assert'
import { IxMonadT } from '../src/IxMonadT'
import * as io from '../src/IO'

//
// finite state machine
//

// By defining this state machine in a type, we can ensure that any sequence
// of operations which type checks is a valid sequence of operations on a door.
// The door can be open or closed
type DoorState =
  | 'Open'
  | 'Closed'

//
// operations
//

const log: Array<string> = []

// A  represents the return type of the operation
// I represents the input state (the precondition)
// O represents output state (the postcondition)
class Operation<I extends DoorState, O extends DoorState, A> extends IxMonadT<io.URI, I, O, A> {
  constructor(ma: io.IO<A>) {
    super(io, ma)
  }
}

class Open extends Operation<'Closed', 'Open', void> {
  constructor() {
    super(new io.IO(() => {
      log.push(`Opening the door`)
      return undefined
    }))
  }
}
class Close extends Operation<'Open', 'Closed', void> {
  constructor() {
    super(new io.IO(() => {
      log.push(`Closing the door`)
      return undefined
    }))
  }
}
class RingBell extends Operation<'Closed', 'Closed', void> {
  constructor() {
    super(new io.IO(() => {
      log.push(`Ringing the bell`)
      return undefined
    }))
  }
}

describe('IxMonadT', () => {

  it('should run', () => {
    const action = new Open().ichain(() => new Close()).ichain(() => new RingBell())
    action.value.run()
    assert.deepEqual(log, [
      'Opening the door',
      'Closing the door',
      'Ringing the bell'
    ])
  })

})
