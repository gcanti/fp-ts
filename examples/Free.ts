// code for docs/Free.md

// ts-node -r tsconfig-paths/register Free.ts

import { free, identity, option } from 'fp-ts'

export class Degree {
  readonly value: number
  constructor(d: number) {
    this.value = (d + 360) % 360
  }
}

export class Position {
  constructor(public readonly x: number, public readonly y: number, public readonly heading: Degree) {}
}

export class Forward {
  readonly _tag = 'Forward'
  constructor(public readonly position: Position, public readonly length: number) {}
}

export class Backward {
  readonly _tag = 'Backward'
  constructor(public readonly position: Position, public readonly length: number) {}
}

export class RotateRight {
  readonly _tag = 'RotateRight'
  constructor(public readonly position: Position, public readonly degree: Degree) {}
}

export class Show {
  readonly _tag = 'Show'
  constructor(public readonly position: Position) {}
}

export type Instruction = Forward | Backward | RotateRight | Show

export const forward = (position: Position, length: number) =>
  free.liftF<Instruction, Position>(new Forward(position, length))
export const backward = (position: Position, length: number) =>
  free.liftF<Instruction, Position>(new Backward(position, length))
export const right = (position: Position, degree: Degree) =>
  free.liftF<Instruction, Position>(new RotateRight(position, degree))
export const show = (position: Position) => free.liftF<Instruction, void>(new Show(position))

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

export function interpretIdentity(fa: Instruction): identity.Identity<Position | void> {
  switch (fa._tag) {
    case 'Forward':
      return identity.of(computation.forward(fa.position, fa.length))
    case 'Backward':
      return identity.of(computation.backward(fa.position, fa.length))
    case 'RotateRight':
      return identity.of(computation.right(fa.position, fa.degree))
    case 'Show':
      console.log('interpretIdentity', fa.position)
      return identity.of(undefined)
  }
}

const start = new Position(0, 0, new Degree(90))

const program1 = (start: Position) => {
  return forward(start, 10).chain(p1 => right(p1, new Degree(90))).chain(p2 => forward(p2, 10)).chain(p3 => show(p3))
}

console.log('--program1--')
program1(start).foldMap(identity, (fa: Instruction) => interpretIdentity(fa)).value // => interpretIdentity Position { x: 10, y: 10, heading: Degree { value: 0 } }

const nonNegative = (position: Position): option.Option<Position> =>
  position.x >= 0 && position.y >= 0 ? option.some(position) : option.none

export function interpretOption(fa: Instruction): option.Option<Position | void> {
  switch (fa._tag) {
    case 'Forward':
      return nonNegative(computation.forward(fa.position, fa.length))
    case 'Backward':
      return nonNegative(computation.backward(fa.position, fa.length))
    case 'RotateRight':
      return nonNegative(computation.right(fa.position, fa.degree))
    case 'Show':
      console.log('interpretOption', fa.position)
      return option.some(undefined)
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
program2(start).foldMap(option, (fa: Instruction) => interpretOption(fa))

// Composing

export class PencilUp {
  readonly _tag = 'PencilUp'
  constructor(public readonly position: Position) {}
}

export class PencilDown {
  readonly _tag = 'PencilDown'
  constructor(public readonly position: Position) {}
}

export type PencilInstruction = PencilUp | PencilDown

export const pencilUp = (position: Position) => free.liftF<PencilInstruction, void>(new PencilUp(position))
export const pencilDown = (position: Position) => free.liftF<PencilInstruction, void>(new PencilDown(position))

export type LogoApp = Instruction | PencilInstruction

const inj = free.inject<LogoApp>()

const program3 = (start: Position) => {
  return inj(forward(start, 10)).chain(p1 => right(p1, new Degree(90))).chain(p2 => {
    return inj(pencilUp(p2)).chain(() => forward(p2, 10)).chain(p3 => {
      return inj(pencilDown(p3)).chain(() => backward(p3, 20)).chain(p4 => show(p4))
    })
  })
}

export function penInterpretIdentity(fa: PencilInstruction): identity.Identity<void> {
  switch (fa._tag) {
    case 'PencilUp':
      console.log(`stop drawing at position ${JSON.stringify(fa.position)}`)
      return identity.of(undefined)
    case 'PencilDown':
      console.log(`start drawing at position ${JSON.stringify(fa.position)}`)
      return identity.of(undefined)
  }
}

export function interpret(fa: LogoApp): identity.Identity<Position | void> {
  switch (fa._tag) {
    case 'Forward':
    case 'Backward':
    case 'RotateRight':
    case 'Show':
      return interpretIdentity(fa)
    case 'PencilUp':
    case 'PencilDown':
      return penInterpretIdentity(fa)
  }
}

console.log('--program3--')
program3(start).foldMap(identity, (fa: LogoApp) => interpret(fa))
/*
stop drawing at position {"x":0,"y":10,"heading":{"value":0}}
start drawing at position {"x":10,"y":10,"heading":{"value":0}}
interpretIdentity Position { x: -10, y: 10, heading: Degree { value: 180 } }
*/

// should raise an error
// program3(start).foldMap(identity, (fa: LogoApp) => interpretIdentity(fa))
