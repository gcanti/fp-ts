---
title: Semigroup
parent: Getting started
nav_order: 3
---

# Getting started with fp-ts: Semigroup

Since semigroups are such a fundamental abstraction of functional programming, this blog post will be longer than usual.

## General definition

A semigroup is a pair `(A, *)` in which `A` is a non-empty set and `*` is a binary **associative** operation on `A`, i.e. a function that takes two elements of `A` as input and returns an element of `A` as output...

```
*: (x: A, y: A) => A
```

... while associative means that the equation

```
(x * y) * z = x * (y * z)
```

holds for all `x`, `y`, `z` in `A`.

Associativity simply tells us that we do not have to worry about parenthesizing an expression and can write `x * y * z`.

> Semigroups capture the essence of parallelizable operations

There are plenty of examples of semigroups:

- `(number, *)` where `*` is the usual multiplication of numbers
- `(string, +)` where `+` is the usual concatenation of strings
- `(boolean, &&)` where `&&` is the usual conjunction

and many more.

## Type class definition

As usual in `fp-ts` the type class `Semigroup`, contained in the `fp-ts/lib/Semigroup` module, is implemented as a TypeScript `interface`, where the operation `*` is named `concat`

```ts
interface Semigroup<A> {
  concat: (x: A, y: A) => A
}
```

The following law must hold

- **Associativity**: `concat(concat(x, y), z) = concat(x, concat(y, z))`, for all `x`, `y`, `z` in `A`

The name `concat` makes a particular sense for arrays (see later) but, based on the context and the type `A` for which we are implementing an instance, the semigroup operation can be interpreted with different meanings

- "concatenation"
- "merging"
- "fusion"
- "selection"
- "addition"
- "substitution"

and many more.

## Instances

This is how we can implement the semigroup `(number, *)`

```ts
/** number `Semigroup` under multiplication */
const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}
```

Note that you can define different semigroup instances for the same type. Here's the implementation of the semigroup `(number, +)` where `+` is the usual addition of numbers

```ts
/** number `Semigroup` under addition */
const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}
```

Another example, with strings this time

```ts
const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}
```

## I can't find an instance!

What if, given a type `A`, you can't find an associative operation on `A`? You can create a (trivial) semigroup instance for every type just using the following constructions

```ts
/** Always return the first argument */
function getFirstSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => x }
}

/** Always return the second argument */
function getLastSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => y }
}
```

Another technique is to define a semigroup instance for `Array<A>` (\*), called the **free semigroup** of `A`.

```ts
function getArraySemigroup<A = never>(): Semigroup<Array<A>> {
  return { concat: (x, y) => x.concat(y) }
}
```

and map the elements of `A` to the singleton elements of `Array<A>`

```ts
function of<A>(a: A): Array<A> {
  return [a]
}
```

(\*) strictly speaking is a semigroup instance for non empty arrays of `A`

**Note**. Here `concat` is the native array method, which kind of explains the initial choice for the name of the `Semigroup` operation.

The free semigroup of `A` is the semigroup whose elements are all possible non-empty finite sequences of elements of `A`.

## Deriving from `Ord`

There's another way to build a semigroup instance for a type `A`: if we already have an [Ord](./Ord.md) instance for `A`, then we can "turn it" into a semigroup.

Actually **two** possible semigroups

```ts
import { ordNumber } from 'fp-ts/lib/Ord'
import { getMeetSemigroup, getJoinSemigroup } from 'fp-ts/lib/Semigroup'

/** Takes the minimum of two values */
const semigroupMin: Semigroup<number> = getMeetSemigroup(ordNumber)

/** Takes the maximum of two values  */
const semigroupMax: Semigroup<number> = getJoinSemigroup(ordNumber)

semigroupMin.concat(2, 1) // 1
semigroupMax.concat(2, 1) // 2
```

Let's write some `Semigroup` instances for more complex types

```ts
type Point = {
  x: number
  y: number
}

const semigroupPoint: Semigroup<Point> = {
  concat: (p1, p2) => ({
    x: semigroupSum.concat(p1.x, p2.x),
    y: semigroupSum.concat(p1.y, p2.y)
  })
}
```

This is mostly boilerplate though. The good news is that we can build a `Semigroup` instance for a struct like `Point` if we can provide a `Semigroup` instance for each field.

Indeed the `fp-ts/lib/Semigroup` module exports a `getStructSemigroup` [combinator](../functional-design/combinators-part-I):

```ts
import { getStructSemigroup } from 'fp-ts/lib/Semigroup'

const semigroupPoint: Semigroup<Point> = getStructSemigroup({
  x: semigroupSum,
  y: semigroupSum
})
```

We can go on and feed `getStructSemigroup` with the instance just defined

```ts
type Vector = {
  from: Point
  to: Point
}

const semigroupVector: Semigroup<Vector> = getStructSemigroup({
  from: semigroupPoint,
  to: semigroupPoint
})
```

`getStructSemigroup` is not the only combinator provided by `fp-ts`, here's a combinator that allows to derive a `Semigroup` instance for functions: given an instance of `Semigroup` for `S` we can derive an instance of `Semigroup` for functions with signature `(a: A) => S`, for all `A`

```ts
import { getFunctionSemigroup, Semigroup, semigroupAll } from 'fp-ts/lib/Semigroup'

/** `semigroupAll` is the boolean semigroup under conjunction */
const semigroupPredicate: Semigroup<(p: Point) => boolean> = getFunctionSemigroup(
  semigroupAll
)<Point>()
```

Now we can "merge" two predicates on `Point`s

```ts
const isPositiveX = (p: Point): boolean => p.x >= 0
const isPositiveY = (p: Point): boolean => p.y >= 0

const isPositiveXY = semigroupPredicate.concat(isPositiveX, isPositiveY)

isPositiveXY({ x: 1, y: 1 }) // true
isPositiveXY({ x: 1, y: -1 }) // false
isPositiveXY({ x: -1, y: 1 }) // false
isPositiveXY({ x: -1, y: -1 }) // false
```

## Folding

By definition `concat` works with only two elements of `A`, what if we want to concat more elements?

The `fold` function takes a semigroup instance, an initial value and an array of elements:

```ts
import { fold, semigroupSum, semigroupProduct } from 'fp-ts/lib/Semigroup'

const sum = fold(semigroupSum)

sum(0, [1, 2, 3, 4]) // 10

const product = fold(semigroupProduct)

product(1, [1, 2, 3, 4]) // 24
```

## Semigroups for type constructors

What if we want to "merge" two `Option<A>`? There are four cases:

| x       | y       | concat(x, y) |
| ------- | ------- | ------------ |
| none    | none    | none         |
| some(a) | none    | none         |
| none    | some(a) | none         |
| some(a) | some(b) | ?            |

There's a problem with the last one, we'd need something to "merge" two `A`s.

That's what `Semigroup` does! We can require a semigroup instance for `A` and then derive a semigroup instance for `Option<A>`. This is how the `getApplySemigroup` combinator works

```ts
import { semigroupSum } from 'fp-ts/lib/Semigroup'
import { getApplySemigroup, some, none } from 'fp-ts/lib/Option'

const S = getApplySemigroup(semigroupSum)

S.concat(some(1), none) // none
S.concat(some(1), some(2)) // some(3)
```

## Appendix

We've seen that semigroups help us any time we want to "concat", "merge", or "combine" (whatever word gives you the best intuition) several data into one.

Let's wrap all together with a final example (adapted from [Fantas, Eel, and Specification 4: Semigroup](http://www.tomharding.me/2017/03/13/fantas-eel-and-specification-4/))

Let's imagine you're building some system in which you store customer records that look like this:

```ts
interface Customer {
  name: string
  favouriteThings: Array<string>
  registeredAt: number // since epoch
  lastUpdatedAt: number // since epoch
  hasMadePurchase: boolean
}
```

For whatever reason you might end up with duplicate records for the same person. What we need is a merge strategy. That's what semigroups are all about

```ts
import {
  Semigroup,
  getStructSemigroup,
  getJoinSemigroup,
  getMeetSemigroup,
  semigroupAny
} from 'fp-ts/lib/Semigroup'
import { getMonoid } from 'fp-ts/lib/Array'
import { ordNumber, contramap } from 'fp-ts/lib/Ord'

const semigroupCustomer: Semigroup<Customer> = getStructSemigroup({
  // keep the longer name
  name: getJoinSemigroup(contramap((s: string) => s.length)(ordNumber)),
  // accumulate things
  favouriteThings: getMonoid<string>(), // <= getMonoid returns a Semigroup for `Array<string>` see later
  // keep the least recent date
  registeredAt: getMeetSemigroup(ordNumber),
  // keep the most recent date
  lastUpdatedAt: getJoinSemigroup(ordNumber),
  // Boolean semigroup under disjunction
  hasMadePurchase: semigroupAny
})

semigroupCustomer.concat(
  {
    name: 'Giulio',
    favouriteThings: ['math', 'climbing'],
    registeredAt: new Date(2018, 1, 20).getTime(),
    lastUpdatedAt: new Date(2018, 2, 18).getTime(),
    hasMadePurchase: false
  },
  {
    name: 'Giulio Canti',
    favouriteThings: ['functional programming'],
    registeredAt: new Date(2018, 1, 22).getTime(),
    lastUpdatedAt: new Date(2018, 2, 9).getTime(),
    hasMadePurchase: true
  }
)
/*
{ name: 'Giulio Canti',
  favouriteThings: [ 'math', 'climbing', 'functional programming' ],
  registeredAt: 1519081200000, // new Date(2018, 1, 20).getTime()
  lastUpdatedAt: 1521327600000, // new Date(2018, 2, 18).getTime()
  hasMadePurchase: true }
*/
```

The function `getMonoid` returns a `Semigroup` for `Array<string>`. Actually it returns something more than a semigroup: a **monoid**.

So what's a monoid? In the next post I'll talk about [monoids](./Monoid.md)
