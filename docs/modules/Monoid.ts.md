---
title: Monoid.ts
nav_order: 49
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `a`.

```ts
a |> concat(empty) = empty |> concat(a) <-> a
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getDual](#getdual)
  - [getStructMonoid](#getstructmonoid)
  - [getTupleMonoid](#gettuplemonoid)
- [constructors](#constructors)
  - [getJoinMonoid](#getjoinmonoid)
  - [getMeetMonoid](#getmeetmonoid)
  - [getUnitMonoid](#getunitmonoid)
- [instances](#instances)
  - [monoidProduct](#monoidproduct)
  - [monoidSum](#monoidsum)
- [type classes](#type-classes)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [fold](#fold)

---

# combinators

## getDual

The dual of a `Monoid`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const getDual: <A>(M: Monoid<A>) => Monoid<A>
```

**Example**

```ts
import { getDual } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'
import { pipe } from 'fp-ts/function'

const M = getDual(S.Monoid)
assert.deepStrictEqual(pipe('a', M.concat('b')), 'ba')
```

Added in v3.0.0

## getStructMonoid

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const getStructMonoid: <A>(monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<A>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'

interface Point {
  readonly x: number
  readonly y: number
}

const monoidPoint = M.getStructMonoid<Point>({
  x: M.monoidSum,
  y: M.monoidSum,
})

assert.deepStrictEqual(pipe({ x: 1, y: 2 }, monoidPoint.concat({ x: 3, y: 4 })), { x: 4, y: 6 })
```

Added in v3.0.0

## getTupleMonoid

Given a tuple of monoids returns a monoid for the tuple.

**Signature**

```ts
export declare const getTupleMonoid: <A extends readonly unknown[]>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<A>
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'
import * as B from 'fp-ts/boolean'
import * as S from 'fp-ts/string'

const M1 = M.getTupleMonoid(S.Monoid, M.monoidSum)
assert.deepStrictEqual(pipe(['a', 1], M1.concat(['b', 2])), ['ab', 3])

const M2 = M.getTupleMonoid(S.Monoid, M.monoidSum, B.MonoidAll)
assert.deepStrictEqual(pipe(['a', 1, true], M2.concat(['b', 2, false])), ['ab', 3, false])
```

Added in v3.0.0

# constructors

## getJoinMonoid

Get a monoid where `concat` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare const getJoinMonoid: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import * as B from 'fp-ts/Bounded'
import * as M from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'

const M1 = M.getJoinMonoid(B.boundedNumber)

assert.deepStrictEqual(pipe(1, M1.concat(2)), 2)
```

Added in v3.0.0

## getMeetMonoid

Get a monoid where `concat` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare const getMeetMonoid: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import * as B from 'fp-ts/Bounded'
import * as M from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'

const M1 = M.getMeetMonoid(B.boundedNumber)

assert.deepStrictEqual(pipe(1, M1.concat(2)), 1)
```

Added in v3.0.0

## getUnitMonoid

**Signature**

```ts
export declare const getUnitMonoid: <A>(a: A) => Monoid<A>
```

Added in v2.10.0

# instances

## monoidProduct

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const monoidProduct: Monoid<number>
```

**Example**

```ts
import { monoidProduct } from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(2, monoidProduct.concat(3)), 6)
```

Added in v3.0.0

## monoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const monoidSum: Monoid<number>
```

**Example**

```ts
import { monoidSum } from 'fp-ts/Monoid'
import { pipe } from 'fp-ts/function'

assert.deepStrictEqual(pipe(2, monoidSum.concat(3)), 5)
```

Added in v3.0.0

# type classes

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends S.Semigroup<A> {
  readonly empty: A
}
```

Added in v3.0.0

# utils

## fold

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare const fold: <A>(M: Monoid<A>) => (as: readonly A[]) => A
```

**Example**

```ts
import * as M from 'fp-ts/Monoid'

assert.deepStrictEqual(M.fold(M.monoidSum)([1, 2, 3]), 6)
assert.deepStrictEqual(M.fold(M.monoidSum)([]), 0)
```

Added in v3.0.0
