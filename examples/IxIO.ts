import { Monad } from '../src/Monad'
import { IxMonad, FantasyIxMonad } from '../src/IxMonad'
import { IO } from '../src/IO'
import * as io from '../src/IO'

declare module '../src/HKT' {
  interface HKT<A, U, V> {
    IxIO: IxIO<V, U, A>
  }
}

export const URI = 'IxIO'

export type URI = typeof URI

export class IxIO<I, O, A> implements FantasyIxMonad<URI, A, O, I> {
  static iof = iof
  readonly _O: O
  readonly _I: I
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: IO<A>) {}
  run(): A {
    return this.value.run()
  }
  iof<I, B>(b: B): IxIO<I, I, B> {
    return iof<I, B>(b)
  }
  ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B> {
    return new IxIO<I, Z, B>(this.value.chain(a => f(a).value))
  }
  of<I, B>(b: B): IxIO<I, I, B> {
    return iof<I, B>(b)
  }
  map<B>(f: (a: A) => B): IxIO<I, O, B> {
    return new IxIO<I, O, B>(this.value.map(f))
  }
  ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.ap(fab.value))
  }
  chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B> {
    return new IxIO<I, I, B>(this.value.chain(a => f(a).value))
  }
}

export function iof<I, A>(a: A): IxIO<I, I, A> {
  return new IxIO<I, I, A>(io.of(a))
}

export function ichain<I, O, Z, A, B>(f: (a: A) => IxIO<O, Z, B>, fa: IxIO<I, O, A>): IxIO<I, Z, B> {
  return fa.ichain(f)
}

export function map<I, A, B>(f: (a: A) => B, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.map(f)
}

export const of = iof

export function ap<I, A, B>(fab: IxIO<I, I, (a: A) => B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.ap(fab)
}

export function chain<I, A, B>(f: (a: A) => IxIO<I, I, B>, fa: IxIO<I, I, A>): IxIO<I, I, B> {
  return fa.chain(f)
}

const proof: Monad<URI> & IxMonad<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  iof,
  ichain
}
// tslint:disable-next-line no-unused-expression
proof

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

// x4.value.run()
/*
Opening the door
Closing the door
Ringing the bell
*/
