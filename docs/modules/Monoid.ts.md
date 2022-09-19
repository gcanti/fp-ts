---
title: Monoid.ts
nav_order: 65
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
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
  - [~~getDualMonoid~~](#getdualmonoid)
  - [~~getStructMonoid~~](#getstructmonoid)
  - [~~getTupleMonoid~~](#gettuplemonoid)
- [constructors](#constructors)
  - [max](#max)
  - [min](#min)
  - [~~getJoinMonoid~~](#getjoinmonoid)
  - [~~getMeetMonoid~~](#getmeetmonoid)
- [instances](#instances)
  - [~~getEndomorphismMonoid~~](#getendomorphismmonoid)
  - [~~getFunctionMonoid~~](#getfunctionmonoid)
  - [~~monoidAll~~](#monoidall)
  - [~~monoidAny~~](#monoidany)
  - [~~monoidProduct~~](#monoidproduct)
  - [~~monoidString~~](#monoidstring)
  - [~~monoidSum~~](#monoidsum)
  - [~~monoidVoid~~](#monoidvoid)
- [type classes](#type-classes)
  - [Monoid (interface)](#monoid-interface)
- [utils](#utils)
  - [concatAll](#concatall)
  - [~~fold~~](#fold)

---

# combinators

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `concat`.

**Signature**

```ts
export declare const reverse: <A>(M: Monoid<A>) => Monoid<A>
```

**Example**

```ts
import { reverse } from 'fp-ts/Monoid'
import * as S from 'fp-ts/string'

assert.deepStrictEqual(reverse(S.Monoid).concat('a', 'b'), 'ba')
```

Added in v2.10.0

## struct

Given a struct of monoids returns a monoid for the struct.

**Signature**

```ts
export declare const struct: <A>(monoids: { [K in keyof A]: Monoid<A[K]> }) => Monoid<{ readonly [K in keyof A]: A[K] }>
```

**Example**

```ts
import { struct } from 'fp-ts/Monoid'
import * as N from 'fp-ts/number'

interface Point {
  readonly x: number
  readonly y: number
}

const M = struct<Point>({
  x: N.MonoidSum,
  y: N.MonoidSum,
})

assert.deepStrictEqual(M.concat({ x: 1, y: 2 }, { x: 3, y: 4 }), { x: 4, y: 6 })
```

Added in v2.10.0

## tuple

Given a tuple of monoids returns a monoid for the tuple.

**Signature**

```ts
export declare const tuple: <A extends readonly unknown[]>(
  ...monoids: { [K in keyof A]: Monoid<A[K]> }
) => Monoid<Readonly<A>>
```

**Example**

```ts
import { tuple } from 'fp-ts/Monoid'
import * as B from 'fp-ts/boolean'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'

const M1 = tuple(S.Monoid, N.MonoidSum)
assert.deepStrictEqual(M1.concat(['a', 1], ['b', 2]), ['ab', 3])

const M2 = tuple(S.Monoid, N.MonoidSum, B.MonoidAll)
assert.deepStrictEqual(M2.concat(['a', 1, true], ['b', 2, false]), ['ab', 3, false])
```

Added in v2.10.0

## ~~getDualMonoid~~

Use [`reverse`](#reverse) instead.

**Signature**

```ts
export declare const getDualMonoid: <A>(M: Monoid<A>) => Monoid<A>
```

Added in v2.0.0

## ~~getStructMonoid~~

Use [`struct`](#struct) instead.

**Signature**

```ts
export declare const getStructMonoid: <O extends Readonly<Record<string, any>>>(monoids: {
  [K in keyof O]: Monoid<O[K]>
}) => Monoid<O>
```

Added in v2.0.0

## ~~getTupleMonoid~~

Use [`tuple`](#tuple) instead.

**Signature**

```ts
export declare const getTupleMonoid: <T extends readonly Monoid<any>[]>(
  ...monoids: T
) => Monoid<{ [K in keyof T]: T[K] extends Se.Semigroup<infer A> ? A : never }>
```

Added in v2.0.0

# constructors

## max

Get a monoid where `concat` will return the maximum, based on the provided bounded order.

The `empty` value is the `bottom` value.

**Signature**

```ts
export declare const max: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as M from 'fp-ts/Monoid'

const M1 = M.max(N.Bounded)

assert.deepStrictEqual(M1.concat(1, 2), 2)
```

Added in v2.10.0

## min

Get a monoid where `concat` will return the minimum, based on the provided bounded order.

The `empty` value is the `top` value.

**Signature**

```ts
export declare const min: <A>(B: Bounded<A>) => Monoid<A>
```

**Example**

```ts
import * as N from 'fp-ts/number'
import * as M from 'fp-ts/Monoid'

const M1 = M.min(N.Bounded)

assert.deepStrictEqual(M1.concat(1, 2), 1)
```

Added in v2.10.0

## ~~getJoinMonoid~~

Use [`max`](#max) instead.

**Signature**

```ts
export declare const getJoinMonoid: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v2.0.0

## ~~getMeetMonoid~~

Use [`min`](#min) instead.

**Signature**

```ts
export declare const getMeetMonoid: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v2.0.0

# instances

## ~~getEndomorphismMonoid~~

Use [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) instead.

**Note**. The execution order in [`getEndomorphismMonoid`](./function.ts.html#getendomorphismmonoid) is reversed.

**Signature**

```ts
export declare const getEndomorphismMonoid: <A = never>() => Monoid<Endomorphism<A>>
```

Added in v2.0.0

## ~~getFunctionMonoid~~

Use [`getMonoid`](./function.ts.html#getmonoid) instead.

**Signature**

```ts
export declare const getFunctionMonoid: <M>(M: Monoid<M>) => <A = never>() => Monoid<(a: A) => M>
```

Added in v2.0.0

## ~~monoidAll~~

Use [`MonoidAll`](./boolean.ts.html#monoidall) instead.

**Signature**

```ts
export declare const monoidAll: Monoid<boolean>
```

Added in v2.0.0

## ~~monoidAny~~

Use [`MonoidAny`](./boolean.ts.html#monoidany) instead.

**Signature**

```ts
export declare const monoidAny: Monoid<boolean>
```

Added in v2.0.0

## ~~monoidProduct~~

Use [`MonoidProduct`](./number.ts.html#monoidproduct) instead.

**Signature**

```ts
export declare const monoidProduct: Monoid<number>
```

Added in v2.0.0

## ~~monoidString~~

Use [`Monoid`](./string.ts.html#monoid) instead.

**Signature**

```ts
export declare const monoidString: Monoid<string>
```

Added in v2.0.0

## ~~monoidSum~~

Use [`MonoidSum`](./number.ts.html#monoidsum) instead.

**Signature**

```ts
export declare const monoidSum: Monoid<number>
```

Added in v2.0.0

## ~~monoidVoid~~

Use [`Monoid`](./void.ts.html#monoid) instead.

**Signature**

```ts
export declare const monoidVoid: Monoid<void>
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

Use [`concatAll`](#concatall) instead.

**Signature**

```ts
export declare const fold: <A>(M: Monoid<A>) => (as: readonly A[]) => A
```

Added in v2.0.0
