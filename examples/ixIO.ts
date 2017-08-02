import { IxIO } from 'fp-ts/lib/IxIO'
import * as io from 'fp-ts/lib/IO'

/*

  Usage

  Based on State Machines All The Way Down
  An Architecture for Dependently Typed Applications
  https://eb.host.cs.st-andrews.ac.uk/drafts/states-all-the-way.pdf
  by Edwin Brady

*/

//
// finite state machine
//

// By defining this state machine in a type, we can ensure that any sequence
// of operations which type checks is a valid sequence of operations on a door.
// The door can be open or closed
export type DoorState = 'Open' | 'Closed'

//
// operations
//

// A  represents the return type of the operation
// I represents the input state (the precondition)
// O represents output state (the postcondition)
export class Operation<I extends DoorState, O extends DoorState, A> extends IxIO<I, O, A> {}

class Open extends Operation<'Closed', 'Open', void> {
  constructor() {
    super(
      new io.IO(() => {
        console.log(`Opening the door`)
      })
    )
  }
}
class Close extends Operation<'Open', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        console.log(`Closing the door`)
      })
    )
  }
}
class RingBell extends Operation<'Closed', 'Closed', void> {
  constructor() {
    super(
      new io.IO(() => {
        console.log(`Ringing the bell`)
      })
    )
  }
}

// tip: decomment the following lines to see the static errors

// error: Type '"Open"' is not assignable to type '"Closed"'
// if you open the door, you must close it
// const x1: Operation<'Closed', 'Closed', void> = new Open()

// ok
export const x2: Operation<'Closed', 'Closed', void> = new Open().ichain(() => new Close())

// error: Type '"Closed"' is not assignable to type '"Open"'
// you can't ring the bell when the door is open
// const x3 = new Open().ichain(() => new RingBell())

// ok
export const x4 = new Open().ichain(() => new Close()).ichain(() => new RingBell())

x4.value.run()
/*
Opening the door
Closing the door
Ringing the bell
*/
