---
title: Monoid.ts
nav_order: 58
parent: Modules
---

## Monoid overview

`Monoid` extends the power of `Semigroup` by providing an additional `empty` value.

```ts
interface Semigroup<A> {
  readonly concat: (x: A, y: A) => A
}

interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
}
```

This `empty` value should be an identity for the `concat` operation, which means the following equalities hold for any choice of `x`.

```ts
concat(x, empty) = concat(empty, x) = x
```

Many types that form a `Semigroup` also form a `Monoid`, such as `number`s (with `0`) and `string`s (with `''`).

```ts
import { Monoid } from 'fp-ts/Monoid'

const monoidString: Monoid<string> = {
  concat: (x, y) => x + y,
  empty: '',
}
```

_Adapted from https://typelevel.org/cats_

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getDualMonoid](#getdualmonoid)
  - [getStructMonoid](#getstructmonoid)
  - [getTupleMonoid](#gettuplemonoid)
- [constructors](#constructors)
  - [getJoinMonoid](#getjoinmonoid)
  - [getMeetMonoid](#getmeetmonoid)
- [instances](#instances)
  - [monoidVoid](#monoidvoid)
  - [~~getEndomorphismMonoid~~](#getendomorphismmonoid)
  - [~~getFunctionMonoid~~](#getfunctionmonoid)
  - [~~monoidAll~~](#monoidall)
  - [~~monoidAny~~](#monoidany)
  - [~~monoidProduct~~](#monoidproduct)
  - [~~monoidString~~](#monoidstring)
  - [~~monoidSum~~](#monoidsum)
- [type classes](#type-classes)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [concatAll](#concatall)
  - [~~fold~~](#fold)

---

# combinators

## getDualMonoid

The dual of a `Monoid`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const getDualMonoid: <A>(M: Monoid<A>) => Monoid<A>
```

**Example**

```ts
import { getDualMonoid } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(getDualMonoid(S.Monoid).concat('a', 'b'), 'ba')
```

Added in v2.0.0

## getStructMonoid

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const getStructMonoid: <O extends Readonly<Record<string, any>>>(
  monoids: { [K in keyof O]: Monoid<O[K]> }
) => Monoid<O>
```

**Example**

```ts
import { getStructMonoid } from 'fp-ts/Monoid'
import { MonoidSum } from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const monoidPoint = getStructMonoid<Point>({
  x: MonoidSum,
  y: MonoidSum,
})

assert.deepStrictEqual(monoidPoint.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.0.0

## getTupleMonoid

Given a tuple of monoids returns a monoid for the tuple

**Signature**

```ts
export declare const getTupleMonoid: <T extends readonly Monoid<any>[]>(
  ...monoids: T
) => Monoid<{ [K in keyof T]: T[K] extends Se.Semigroup<infer A> ? A : never }>
```

**Example**

```ts
import { getTupleMonoid } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'
import * as N from 'fp-ts/number'
import * as B from 'fp-ts/boolean'

const M1 = getTupleMonoid(S.Monoid, N.MonoidSum)
assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])

const M2 = getTupleMonoid(S.Monoid, N.MonoidSum, B.MonoidAll)
assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.0.0

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

const M1 = M.getJoinMonoid(B.boundedNumber)

assert.deepStrictEqual(M1.concat(1, 2), 2)
```

Added in v2.0.0

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

const M1 = M.getMeetMonoid(B.boundedNumber)

assert.deepStrictEqual(M1.concat(1, 2), 1)
```

Added in v2.0.0

# instances

## monoidVoid

**Signature**

```ts
export declare const monoidVoid: Monoid<void>
```

Added in v2.0.0

## ~~getEndomorphismMonoid~~

Use `function.getEndomorphismMonoid` instead.

**Note**. The execution order in `function.getEndomorphismMonoid` is reversed.

**Signature**

```ts
export declare const getEndomorphismMonoid: <A = never>() => Monoid<Endomorphism<A>>
```

Added in v2.0.0

## ~~getFunctionMonoid~~

Use `function.getMonoid` instead.

**Signature**

```ts
export declare const getFunctionMonoid: <M>(M: Monoid<M>) => <A = never>() => Monoid<(a: A) => M>
```

Added in v2.0.0

## ~~monoidAll~~

Use `boolean.MonoidAll` instead.

**Signature**

```ts
export declare const monoidAll: Monoid<boolean>
```

Added in v2.0.0

## ~~monoidAny~~

Use `boolean.MonoidAny` instead.

**Signature**

```ts
export declare const monoidAny: Monoid<boolean>
```

Added in v2.0.0

## ~~monoidProduct~~

**Signature**

```ts
export declare const monoidProduct: Monoid<number>
```

Added in v2.0.0

## ~~monoidString~~

Use `string.Monoid` instead.

**Signature**

```ts
export declare const monoidString: Monoid<string>
```

Added in v2.0.0

## ~~monoidSum~~

Use `number.MonoidSum` instead.

**Signature**

```ts
export declare const monoidSum: Monoid<number>
```

Added in v2.0.0

# type classes

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Se.Semigroup<A> {
  readonly empty: A
}
```

Added in v2.0.0

# utils

## concatAll

Given a sequence of `as`, concat them and return the total.

If `as` is empty, return the monoid `empty` value.

**Signature**

```ts
export declare const concatAll: <A>(M: Monoid<A>) => (as: readonly A[]) => A
```

**Example**

```ts
import { concatAll } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

assert.deepStrictEqual(concatAll(N.MonoidSum)([1, 2, 3]), 6)
assert.deepStrictEqual(concatAll(N.MonoidSum)([]), 0)
```

Added in v2.10.0

## ~~fold~~

Use `concatAll` instead.

**Signature**

```ts
export declare const fold: <A>(M: Monoid<A>) => (as: readonly A[]) => A
```

Added in v2.0.0
