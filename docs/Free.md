# Free(r)

## Credits

Adapted from http://blog.scalac.io/2016/06/02/overview-of-free-monad-in-cats.html

```ts
export class Degree {
  readonly value: number
  constructor(d: number) {
    this.value = (d + 360) % 360
  }
}

export class Position {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly heading: Degree
  ) {}
}

export const InstructionURI = 'Instruction'

export type InstructionURI = typeof InstructionURI

export class Forward {
  readonly _tag = 'Forward'
  readonly _A: Position
  readonly _URI = InstructionURI
  constructor(
    public readonly position: Position,
    public readonly length: number
  ) { }
}

export class Backward {
  readonly _tag = 'Backward'
  readonly _A: Position
  readonly _URI = InstructionURI
  constructor(
    public readonly position: Position,
    public readonly length: number
  ) { }
}

export class RotateRight {
  readonly _tag = 'RotateRight'
  readonly _A: Position
  readonly _URI = InstructionURI
  constructor(
    public readonly position: Position,
    public readonly degree: Degree
  ) { }
}

export class Show {
  readonly _tag = 'Show'
  readonly _A: void
  readonly _URI = InstructionURI
  constructor(
    public readonly position: Position
  ) { }
}

export type Instruction = Forward | Backward | RotateRight | Show

declare module './HKT' {
  interface HKT<A> {
    Instruction: Instruction
  }
}

export const forward = (position: Position, length: number) => liftADT(new Forward(position, length))
export const backward = (position: Position, length: number) => liftADT(new Backward(position, length))
export const right = (position: Position, degree: Degree) => liftADT(new RotateRight(position, degree))
export const show = (position: Position) => liftADT(new Show(position))

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
    return computation.forward(
      new Position(position.x, position.y, new Degree(position.heading.value + 180)),
      length
    )
  },
  right(position: Position, degree: Degree): Position {
    return new Position(position.x, position.y, new Degree(position.heading.value - degree.value))
  }
}

import * as identity from './Identity'

export function interpretIdentity(fa: Instruction): identity.Identity<TypeOf<typeof fa>> {
  switch (fa._tag) {
    case 'Forward' :
      return identity.of(computation.forward(fa.position, fa.length))
    case 'Backward' :
      return identity.of(computation.backward(fa.position, fa.length))
    case 'RotateRight' :
      return identity.of(computation.right(fa.position, fa.degree))
    case 'Show' :
      console.log('interpretIdentity', fa.position)
      return identity.of(fa.position)
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
program1(start).foldMap(identity, (fa: Instruction) => interpretIdentity(fa)).value // => interpretIdentity Position { x: 10, y: 10, heading: Degree { value: 0 } }

import * as option from './Option'

const nonNegative = (position: Position): option.Option<Position> =>
  position.x >= 0 && position.y >= 0 ? option.some(position) : option.none

export function interpretOption(fa: Instruction): option.Option<TypeOf<typeof fa>> {
  switch (fa._tag) {
    case 'Forward' :
      return nonNegative(computation.forward(fa.position, fa.length))
    case 'Backward' :
      return nonNegative(computation.backward(fa.position, fa.length))
    case 'RotateRight' :
      return nonNegative(computation.right(fa.position, fa.degree))
    case 'Show' :
      console.log('interpretOption', fa.position)
      return option.some(fa.position)
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

export const PencilInstructionURI = 'PencilInstruction'

export type PencilInstructionURI = typeof PencilInstructionURI

export class PencilUp {
  readonly _tag = 'PencilUp'
  readonly _A: void
  readonly _URI = PencilInstructionURI
  constructor(
    public readonly position: Position
  ) { }
}

export class PencilDown {
  readonly _tag = 'PencilDown'
  readonly _A: void
  readonly _URI = PencilInstructionURI
  constructor(
    public readonly position: Position
  ) { }
}

export type PencilInstruction = PencilUp | PencilDown

declare module './HKT' {
  interface HKT<A> {
    PencilInstruction: PencilInstruction
  }
}

export const pencilUp = (position: Position) => liftADT(new PencilUp(position))
export const pencilDown = (position: Position) => liftADT(new PencilDown(position))

export type LogoAppURI = InstructionURI | PencilInstructionURI

export type LogoApp = Instruction | PencilInstruction

const inj = inject<LogoAppURI>()

const program3 = (start: Position) => {
  return inj(forward(start, 10))
    .chain(p1 => right(p1, new Degree(90)))
    .chain(p2 => {
      return inj(pencilUp(p2))
        .chain(() => forward(p2, 10))
        .chain(p3 => {
          return inj(pencilDown(p3))
            .chain(() => backward(p3, 20))
            .chain(p4 => show(p4))
        })
    })
}

export function penInterpretIdentity(fa: PencilInstruction): identity.Identity<TypeOf<typeof fa>> {
  if (fa instanceof PencilUp) {
    console.log(`stop drawing at position ${JSON.stringify(fa.position)}`)
    return identity.of(undefined)
  } else {
    console.log(`start drawing at position ${JSON.stringify(fa.position)}`)
    return identity.of(undefined)
  }
}

export function interpret(fa: LogoApp): identity.Identity<TypeOf<typeof fa>> {
  switch (fa._URI) {
    case InstructionURI :
      return interpretIdentity(fa)
    case PencilInstructionURI :
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
```
