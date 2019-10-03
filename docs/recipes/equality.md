---
title: Equality
parent: Recipes
nav_order: 1
---

# How to determine if two things are equal

With `fp-ts` you can test whether two values are equal using a `Eq`. You can also compose equality functions to test deep structures and create your own definitions of equality.

We show the most common usages here, but if you need more ways to check for equality, be sure to read the [Eq](../modules/Eq.ts) documentation page.

## Primitive equality

```ts
import { eqBoolean,  eqDate, eqNumber, eqString } from 'fp-ts/lib/Eq'

eqBoolean.equals(true, true) // true
eqDate.equals(new Date('1984-01-27'), new Date('1984-01-27')) // true
eqNumber.equals(3, 3) // true
eqString.equals('Cyndi', 'Cyndi') // true
```

## Compare structures

```ts
import { Eq, getStructEq, eqNumber } from 'fp-ts/lib/Eq'

type Point = {
  x: number
  y: number
}

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
})

eqPoint.equals({ x: 0, y: 0 }, { x: 0, y: 0 }) // true
```

This structure can be combined further:

```ts
type Vector = {
  from: Point
  to: Point
}

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
})

eqVector.equals(
  { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } },
  { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } }
) // true
```

## Compare arrays

```ts
import { eqString } from 'fp-ts/lib/Eq'
import { getEq } from 'fp-ts/lib/Array'

const eqArrayOfStrings = getEq(eqString)

eqArrayOfStrings.equals(
  ['Time', 'After', 'Time'],
  ['Time', 'After', 'Time']
) // true
```

Test the equality of structures nested within arrays:

```ts
import { Eq, getStructEq, eqNumber } from 'fp-ts/lib/Eq'
import { getEq } from 'fp-ts/lib/Array'

type Point = {
  x: number
  y: number
}

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
})

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)

eqArrayOfPoints.equals(
  [{ x: 0, y: 0 }, { x: 4, y: 0 }],
  [{ x: 0, y: 0 }, { x: 4, y: 0 }]
) // true
```

## Custom definitions

In this example, two users are equal if their `userId` field is equal.

```ts
import { contramap, eqNumber } from 'fp-ts/lib/Eq'

type User = {
  userId: number
  name: string
}

const eqUserId = contramap((user: User) => user.userId)(eqNumber)

eqUserId.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' }) // true
eqUserId.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false
```

## More `Eq` instances

Many data types provide `Eq` instances. Here's [Option](../modules/Option.ts):

```ts
import { getEq, none, some } from 'fp-ts/lib/Option'
import { eqNumber } from 'fp-ts/lib/Eq'

const E = getEq(eqNumber)

E.equals(some(3), some(3)) // true
E.equals(none, some(4)) // false
E.equals(none, none) // true
```

It works similarly for [Either](../modules/Either.ts) and other types where it is possible to determine equality:

```ts
import { getEq, left, right } from 'fp-ts/lib/Either'
import { eqNumber, eqString } from 'fp-ts/lib/Eq'

const E = getEq(eqString, eqNumber)

E.equals(right(3), right(3)) // true
E.equals(left('3'), right(3)) // false
E.equals(left('3'), left('3')) // true
```
