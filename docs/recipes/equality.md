---
title: Equality
parent: Recipes
nav_order: 1
---

# How to determine if two things are equal

With `fp-ts` you can test whether two values are equal using a `Setoid`. You can also compose equality functions to test deep structures and create your own definitions of equality.

We show the most common usages here, but if you need more ways to check for equality, be sure to read the [Setoid](../modules/Setoid.ts) documentation page.

## Primitive equality

```ts
import { setoidBoolean,  setoidDate, setoidNumber, setoidString } from 'fp-ts/lib/Setoid'

setoidBoolean.equals(true, true) // true
setoidDate.equals(new Date('1984-01-27'), new Date('1984-01-27')) // true
setoidNumber.equals(3, 3) // true
setoidString.equals('Cyndi', 'Cyndi') // true
```

## Compare structures

```ts
import { Setoid, getStructSetoid, setoidNumber } from 'fp-ts/lib/Setoid'

type Point = {
  x: number
  y: number
}

const setoidPoint: Setoid<Point> = getStructSetoid({
  x: setoidNumber,
  y: setoidNumber
})

setoidPoint.equals({ x: 0, y: 0 }, { x: 0, y: 0 }) // true
```

This structure can be combined further:

```ts
type Vector = {
  from: Point
  to: Point
}

const setoidVector: Setoid<Vector> = getStructSetoid({
  from: setoidPoint,
  to: setoidPoint
})

setoidVector.equals(
  { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
  { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }
) // true
```

## Compare arrays

```ts
import { Setoid, getArraySetoid, getStructSetoid, setoidString } from 'fp-ts/lib/Setoid'

const setoidArrayOfStrings = getArraySetoid(setoidString)

setoidArrayOfStrings.equals(
  ['Time', 'After', 'Time'],
  ['Time', 'After', 'Time']
) // true
```

Test the equality of structures nested within arrays:

```ts
import { Setoid, getArraySetoid, getStructSetoid, setoidNumber } from 'fp-ts/lib/Setoid'

type Point = {
  x: number
  y: number
}

const setoidPoint: Setoid<Point> = getStructSetoid({
  x: setoidNumber,
  y: setoidNumber
})

const setoidArrayOfPoints: Setoid<Array<Point>> = getArraySetoid(setoidPoint)

setoidArrayOfPoints.equals(
  [{ x: 0, y: 0 }, { x: 4, y: 0 }],
  [{ x: 0, y: 0 }, { x: 4, y: 0 }]
) // true
```

## Custom definitions

In this example, two users are equal if their `userId` field is equal.

```ts
import { contramap, setoidNumber } from 'fp-ts/lib/Setoid'

type User = {
  userId: number
  name: string
}

const setoidUserId = contramap((user: User) => user.userId, setoidNumber)

setoidUserId.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' }) // true
setoidUserId.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false
```

## More Setoid instances

Many data types provide `Setoid` instances. Here's [Option](../modules/Option.ts):

```ts
import { getSetoid, none, some } from 'fp-ts/lib/Option'
import { setoidNumber } from 'fp-ts/lib/Setoid'

const O = getSetoid(setoidNumber)

O.equals(some(3), some(3)) // true
O.equals(none, some(4)) // false
O.equals(none, none) // true
```

It works similarly for [Either](../modules/Either.ts) and other types where it is possible to determine equality:

```ts
import { getSetoid, left, right } from 'fp-ts/lib/Either'
import { setoidNumber, setoidString } from 'fp-ts/lib/Setoid'

const O = getSetoid(setoidString, setoidNumber)

O.equals(right(3), right(3)) // true
O.equals(left('3'), right(3)) // false
O.equals(left('3'), left('3')) // true
```
