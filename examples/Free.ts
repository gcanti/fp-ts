import * as free from '../src/Free'
import { Identity, identity } from '../src/Identity'

export class Degree {
  readonly value: number
  constructor(d: number) {
    this.value = (d + 360) % 360
  }
}

declare module '../src/HKT' {
  interface URI2HKT<A> {
    Instruction: InstructionF<A>
  }
}

export const InstructionFURI = 'Instruction'

export type InstructionFURI = typeof InstructionFURI

export class Position {
  constructor(readonly x: number, readonly y: number, readonly heading: Degree) {}
}

export class Forward<A> {
  readonly _tag: 'Forward' = 'Forward'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: InstructionFURI
  constructor(readonly position: Position, readonly length: number, readonly more: (p: Position) => A) {}
}

export class Backward<A> {
  readonly _tag: 'Backward' = 'Backward'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: InstructionFURI
  constructor(readonly position: Position, readonly length: number, readonly more: (p: Position) => A) {}
}

export class RotateRight<A> {
  readonly _tag: 'RotateRight' = 'RotateRight'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: InstructionFURI
  constructor(readonly position: Position, readonly degree: Degree, readonly more: (p: Position) => A) {}
}

export class Show<A> {
  readonly _tag: 'Show' = 'Show'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: InstructionFURI
  constructor(readonly position: Position, readonly more: A) {}
}

export type InstructionF<A> = Forward<A> | Backward<A> | RotateRight<A> | Show<A>

export const forward = (position: Position, length: number) => free.liftF(new Forward(position, length, a => a))
export const backward = (position: Position, length: number) => free.liftF(new Backward(position, length, a => a))
export const right = (position: Position, degree: Degree) => free.liftF(new RotateRight(position, degree, a => a))
export const show = (position: Position) => free.liftF(new Show(position, undefined))

const computation = {
  forward(position: Position, length: number): Position {
    const degree = position.heading.value
    if (degree === 0) {
      return new Position(position.x + length, position.y, position.heading)
    } else if (degree === 90) {
      return new Position(position.x, position.y + length, position.heading)
    } else if (degree === 180) {
      return new Position(position.x - length, position.y, position.heading)
    } else if (degree === 270) {
      return new Position(position.x, position.y - length, position.heading)
    }
    throw new Error(`Unkonwn direction ${degree}`)
  },
  backward(position: Position, length: number): Position {
    return computation.forward(new Position(position.x, position.y, new Degree(position.heading.value + 180)), length)
  },
  right(position: Position, degree: Degree): Position {
    return new Position(position.x, position.y, new Degree(position.heading.value - degree.value))
  }
}

export function interpretIdentity<A>(fa: InstructionF<A>): Identity<A> {
  switch (fa._tag) {
    case 'Forward':
      return identity.of(fa.more(computation.forward(fa.position, fa.length)))
    case 'Backward':
      return identity.of(fa.more(computation.backward(fa.position, fa.length)))
    case 'RotateRight':
      return identity.of(fa.more(computation.right(fa.position, fa.degree)))
    case 'Show':
      console.log('interpretIdentity', fa.position)
      return identity.of(fa.more)
  }
}

const start = new Position(0, 0, new Degree(90))

const program1 = (start: Position) => {
  return forward(start, 10)
    .chain(p1 => right(p1, new Degree(90)))
    .chain(p2 => forward(p2, 10))
    .chain(p3 => show(p3))
}

console.log('--program1--')
const result1 = free.foldFree(identity)(interpretIdentity, program1(start)) // interpretIdentity Position { x: 10, y: 10, heading: Degree { value: 0 } }
console.log(result1.value) // undefined

import * as option from '../src/Option'

const nonNegative = (position: Position): option.Option<Position> =>
  position.x >= 0 && position.y >= 0 ? option.some(position) : option.none

export function interpretOption<A>(fa: InstructionF<A>): option.Option<A> {
  switch (fa._tag) {
    case 'Forward':
      return nonNegative(computation.forward(fa.position, fa.length)).map(fa.more)
    case 'Backward':
      return nonNegative(computation.backward(fa.position, fa.length)).map(fa.more)
    case 'RotateRight':
      return nonNegative(computation.right(fa.position, fa.degree)).map(fa.more)
    case 'Show':
      console.log('interpretOption', fa.position)
      return option.some(fa.more)
  }
}

const program2 = (start: Position) => {
  return forward(start, 10)
    .chain(p1 => right(p1, new Degree(90)))
    .chain(p2 => forward(p2, 10))
    .chain(p1 => right(p1, new Degree(180)))
    .chain(p2 => forward(p2, 20)) // Here the computation stops, because result will be None
    .chain(p3 => show(p3))
}

console.log('--program2--')
const result2 = free.foldFree(option.option)(interpretOption, program2(start))
console.log(result2) // none

// Composing

declare module '../src/HKT' {
  interface URI2HKT<A> {
    PencilInstruction: PencilInstructionF<A>
  }
}

export const PencilInstructionFURI = 'PencilInstruction'

export type PencilInstructionFURI = typeof PencilInstructionFURI

export class PencilUp<A> {
  readonly _tag: 'PencilUp' = 'PencilUp'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: PencilInstructionFURI
  constructor(readonly position: Position, readonly more: A) {}
}

export class PencilDown<A> {
  readonly _tag: 'PencilDown' = 'PencilDown'
  // prettier-ignore
  readonly '_A': A
  readonly _URI: PencilInstructionFURI
  constructor(readonly position: Position, readonly more: A) {}
}

export type PencilInstructionF<A> = PencilUp<A> | PencilDown<A>

export const pencilUp = (position: Position) => free.liftF(new PencilUp(position, undefined))
export const pencilDown = (position: Position) => free.liftF(new PencilDown(position, undefined))

export type LogoApp<A> = InstructionF<A> | PencilInstructionF<A>

declare module '../src/HKT' {
  interface URI2HKT<A> {
    LogoApp: LogoAppF<A>
  }
}

export const LogoAppFURI = 'LogoApp'

export type LogoAppFURI = typeof LogoAppFURI

export class Instruction<A> {
  readonly _tag: InstructionFURI = InstructionFURI
  // prettier-ignore
  readonly '_A': A
  readonly _URI: LogoAppFURI
  constructor(readonly value: InstructionF<A>) {}
}

export class PencilInstruction<A> {
  readonly _tag: PencilInstructionFURI = PencilInstructionFURI
  // prettier-ignore
  readonly '_A': A
  readonly _URI: LogoAppFURI
  constructor(readonly value: PencilInstructionF<A>) {}
}

export type LogoAppF<A> = Instruction<A> | PencilInstruction<A>

const injectInstruction = free.hoistFree<InstructionFURI, LogoAppFURI>(<A>(fa: InstructionF<A>) => new Instruction(fa))
const injectPencil = free.hoistFree<PencilInstructionFURI, LogoAppFURI>(
  <A>(fa: PencilInstructionF<A>) => new PencilInstruction(fa)
)

const program3 = (start: Position): free.Free<LogoAppFURI, void> => {
  return injectInstruction(forward(start, 10))
    .chain(p1 => injectInstruction(right(p1, new Degree(90))))
    .chain(p2 => {
      return injectPencil(pencilUp(p2))
        .chain(() => injectInstruction(forward(p2, 10)))
        .chain(p3 => {
          return injectPencil(pencilDown(p3))
            .chain(() => injectInstruction(backward(p3, 20)))
            .chain(p4 => injectInstruction(show(p4)))
        })
    })
}

export function penInterpretIdentity<A>(fa: PencilInstructionF<A>): Identity<A> {
  switch (fa._tag) {
    case 'PencilUp':
      console.log(`stop drawing at position ${JSON.stringify(fa.position)}`)
      return identity.of(fa.more)
    case 'PencilDown':
      console.log(`start drawing at position ${JSON.stringify(fa.position)}`)
      return identity.of(fa.more)
  }
}

export function logoAppInterpretIdentity<A>(fa: LogoAppF<A>): Identity<A> {
  switch (fa._tag) {
    case InstructionFURI:
      return interpretIdentity(fa.value)
    case PencilInstructionFURI:
      return penInterpretIdentity(fa.value)
  }
}

console.log('--program3--')
free.foldFree(identity)(logoAppInterpretIdentity, program3(start))
/*
stop drawing at position {"x":0,"y":10,"heading":{"value":0}}
start drawing at position {"x":10,"y":10,"heading":{"value":0}}
interpretIdentity Position { x: -10, y: 10, heading: Degree { value: 180 } }
*/
