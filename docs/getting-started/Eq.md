---
title: Eq
parent: Getting started
nav_order: 1
---

# Getting started with fp-ts: Eq

In this blog series I will often talk about "type classes" and "instances", let's see what they are and how they are encoded in `fp-ts`.

["type class" on wikipedia](https://en.wikipedia.org/wiki/Type_class)

> The programmer defines a **type class** by specifying a set of functions or constant names, together with their respective types, that must exist for every type that belongs to the class.

In `fp-ts` type classes are encoded as TypeScript `interface`s.

A type class `Eq`, intended to contain types that admit **equality**, is declared in the following way

```ts
interface Eq<A> {
  /** returns `true` if `x` is equal to `y` */
  readonly equals: (x: A, y: A) => boolean
}
```

The declaration may be read as

> a type `A` belongs to type class `Eq` if there is a function named `equal` of the appropriate type, defined on it

What about the **instance**s?

> A programmer can make any type `A` a member of a given type class `C` by using an instance declaration that defines implementations of all of `C`'s members for the particular type `A`.

In `fp-ts` instances are encoded as static dictionaries.

As an example here's the instance of `Eq` for the type `number`

```ts
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}
```

Instances must satisfy the following laws:

1. **Reflexivity**: `equals(x, x) === true`, for all `x` in `A`
2. **Symmetry**: `equals(x, y) === equals(y, x)`, for all `x`, `y` in `A`
3. **Transitivity**: if `equals(x, y) === true` and `equals(y, z) === true`, then `equals(x, z) === true`, for all `x`, `y`, `z` in `A`

A programmer could then define a function `elem` (which determines if an element is in an array) in the following way

```ts
function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a))
}

elem(eqNumber)(1, [1, 2, 3]) // true
elem(eqNumber)(4, [1, 2, 3]) // false
```

Let's write some `Eq` instances for more complex types

```ts
type Point = {
  x: number
  y: number
}

const eqPoint: Eq<Point> = {
  equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y
}
```

We can even try to optimize `equals` by first checking reference equality

```ts
const eqPoint: Eq<Point> = {
  equals: (p1, p2) => p1 === p2 || (p1.x === p2.x && p1.y === p2.y)
}
```

This is mostly boilerplate though. The good news is that we can build an `Eq` instance for a struct like `Point` if we can provide an `Eq` instance for each field.

Indeed the `fp-ts/lib/Eq` module exports a `getStructEq` [combinator](../functional-design/combinators-part-I):

```ts
import { getStructEq } from 'fp-ts/lib/Eq'

const eqPoint: Eq<Point> = getStructEq({
  x: eqNumber,
  y: eqNumber
})
```

We can go on and feed `getStructEq` with the instance just defined

```ts
type Vector = {
  from: Point
  to: Point
}

const eqVector: Eq<Vector> = getStructEq({
  from: eqPoint,
  to: eqPoint
})
```

`getStructEq` is not the only combinator provided by `fp-ts`, here's a combinator that allows to derive an `Eq` instance for arrays

```ts
import { getEq } from 'fp-ts/lib/Array'

const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)
```

Finally another useful way to build an `Eq` instance is the `contramap` combinator: given an instance of `Eq` for `A` and a function from `B` to `A`, we can derive an instance of `Eq` for `B`

```ts
import { contramap } from 'fp-ts/lib/Eq'

type User = {
  userId: number
  name: string
}

/** two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber)

eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' }) // true
eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false
```

Next article: [Ord](./Ord.md)
