import * as assert from 'assert'
import * as ixio from '../src/IxIO'
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
class Operation<I extends DoorState, O extends DoorState, A> extends ixio.IxIO<I, O, A> {
  constructor(a: A, o: O) {
    super(i => new io.IO(() => {
      log.push(`The door was ${i} and now is ${o}`)
      return [a, o] as [A, O]
    }))
  }
}

class Open extends Operation<'Closed', 'Open', void> {
  constructor() {
    super(undefined, 'Open')
  }
}
class Close extends Operation<'Open', 'Closed', void> {
  constructor() {
    super(undefined, 'Closed')
  }
}
class RingBell extends Operation<'Closed', 'Closed', void> {
  constructor() {
    super(undefined, 'Closed')
  }
}

describe('IxIO', () => {

  it('should run', () => {
    const action = new Open().ichain(() => new Close()).ichain(() => new RingBell())
    action.run('Closed').run()
    assert.deepEqual(log, [
      'The door was Closed and now is Open',
      'The door was Open and now is Closed',
      'The door was Closed and now is Closed'
    ])
  })

})
