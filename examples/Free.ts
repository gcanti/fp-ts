// code for docs/Free.md

// ts-node -r tsconfig-paths/register Free.ts

import * as free from 'fp-ts/lib/Free'
import * as identity from 'fp-ts/lib/Identity'

export class Degree {
  readonly value: number
  constructor(d: number) {
    this.value = (d + 360) % 360
  }
}

export const InstructionFURI = 'Instruction'

export type InstructionFURI = typeof InstructionFURI

export class Position {
  constructor(public readonly x: number, public readonly y: number, public readonly heading: Degree) {}
}

export class Forward<A> {
  readonly _tag = 'Forward'
  readonly _A: A
  readonly _URI: InstructionFURI
  constructor(
    public readonly position: Position,
    public readonly length: number,
    public readonly more: (p: Position) => A
  ) {}
}

export class Backward<A> {
  readonly _tag = 'Backward'
  readonly _A: A
  readonly _URI: InstructionFURI
  constructor(
    public readonly position: Position,
    public readonly length: number,
    public readonly more: (p: Position) => A
  ) {}
}

export class RotateRight<A> {
  readonly _tag = 'RotateRight'
  readonly _A: A
  readonly _URI: InstructionFURI
  constructor(
    public readonly position: Position,
    public readonly degree: Degree,
    public readonly more: (p: Position) => A
  ) {}
}

export class Show<A> {
  readonly _tag = 'Show'
  readonly _A: A
  readonly _URI: InstructionFURI
  constructor(public readonly position: Position, public readonly more: A) {}
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

export function interpretIdentity<A>(fa: InstructionF<A>): identity.Identity<A> {
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
  return forward(start, 10).chain(p1 => right(p1, new Degree(90))).chain(p2 => forward(p2, 10)).chain(p3 => show(p3))
}

console.log('--program1--')
const result1 = program1(start).foldMap(identity, <A>(fa: InstructionF<A>) => interpretIdentity(fa)) // interpretIdentity Position { x: 10, y: 10, heading: Degree { value: 0 } }
console.log(result1.value) // undefined

import * as option from 'fp-ts/lib/Option'

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

// console.log('--program2--')
const result2 = program2(start).foldMap(option, <A>(fa: InstructionF<A>) => interpretOption(fa))
console.log(result2) // none

// Composing

export const PencilInstructionFURI = 'PencilInstruction'

export type PencilInstructionFURI = typeof PencilInstructionFURI

export class PencilUp<A> {
  readonly _tag = 'PencilUp'
  readonly _A: A
  readonly _URI: PencilInstructionFURI
  constructor(public readonly position: Position, public readonly more: A) {}
}

export class PencilDown<A> {
  readonly _tag = 'PencilDown'
  readonly _A: A
  readonly _URI: PencilInstructionFURI
  constructor(public readonly position: Position, public readonly more: A) {}
}

export type PencilInstructionF<A> = PencilUp<A> | PencilDown<A>

export const pencilUp = (position: Position) => free.liftF(new PencilUp(position, undefined))
export const pencilDown = (position: Position) => free.liftF(new PencilDown(position, undefined))

export type LogoApp<A> = InstructionF<A> | PencilInstructionF<A>

export const LogoAppFURI = 'LogoApp'

export type LogoAppFURI = typeof LogoAppFURI

export class Instruction<A> {
  readonly _tag = InstructionFURI
  readonly _A: A
  readonly _URI: LogoAppFURI
  constructor(public readonly instruction: InstructionF<A>) {}
}

export class PencilInstruction<A> {
  readonly _tag = PencilInstructionFURI
  readonly _A: A
  readonly _URI: LogoAppFURI
  constructor(public readonly instruction: PencilInstructionF<A>) {}
}

export type LogoAppF<A> = Instruction<A> | PencilInstruction<A>

// const program3 = (start: Position) => {
//   return forward(start, 10).chain(p1 => right(p1, new Degree(90))).chain(p2 => {
//     return pencilUp(p2).chain(() => forward(p2, 10)).chain(p3 => {
//       return pencilDown(p3).chain(() => backward(p3, 20)).chain(p4 => show(p4))
//     })
//   })
// }

// const program3 = (start: Position) => {
//   return inj(forward(start, 10)).chain(p1 => right(p1, new Degree(90))).chain(p2 => {
//     return inj(pencilUp(p2)).chain(() => forward(p2, 10)).chain(p3 => {
//       return inj(pencilDown(p3)).chain(() => backward(p3, 20)).chain(p4 => show(p4))
//     })
//   })
// }

// export function penInterpretIdentity(fa: PencilInstruction): identity.Identity<void> {
//   switch (fa._tag) {
//     case 'PencilUp':
//       console.log(`stop drawing at position ${JSON.stringify(fa.position)}`)
//       return identity.of(undefined)
//     case 'PencilDown':
//       console.log(`start drawing at position ${JSON.stringify(fa.position)}`)
//       return identity.of(undefined)
//   }
// }

// export function interpret(fa: LogoApp): identity.Identity<Position | void> {
//   switch (fa._tag) {
//     case 'Forward':
//     case 'Backward':
//     case 'RotateRight':
//     case 'Show':
//       return interpretIdentity(fa)
//     case 'PencilUp':
//     case 'PencilDown':
//       return penInterpretIdentity(fa)
//   }
// }

// console.log('--program3--')
// program3(start).foldMap(identity, (fa: LogoApp) => interpret(fa))
// /*
// stop drawing at position {"x":0,"y":10,"heading":{"value":0}}
// start drawing at position {"x":10,"y":10,"heading":{"value":0}}
// interpretIdentity Position { x: -10, y: 10, heading: Degree { value: 180 } }
// */

// // should raise an error
// // program3(start).foldMap(identity, (fa: LogoApp) => interpretIdentity(fa))
