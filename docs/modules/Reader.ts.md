---
title: Reader.ts
nav_order: 57
parent: Modules
---

## Reader overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Category](#category)
  - [id](#id)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [Pointed](#pointed)
  - [of](#of)
- [Profunctor](#profunctor)
  - [promap](#promap)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [combinators](#combinators)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Category](#category-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [Profunctor](#profunctor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
- [model](#model)
  - [Reader (interface)](#reader-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [apT](#apt)
  - [apTW](#aptw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: Reader<E, A>) => <B>(fab: Reader<E, (a: A) => B>) => Reader<E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, A>(fa: Reader<R2, A>) => <R1, B>(fab: Reader<R1, (a: A) => B>) => Reader<R1 & R2, B>
```

Added in v3.0.0

# Category

## id

**Signature**

```ts
export declare const id: <A>() => Reader<A, A>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Reader<E, A>) => Reader<E, B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E, B>(f: (a: A) => Reader<E, B>) => (ma: Reader<E, A>) => Reader<E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, R2, B>(f: (a: A) => Reader<R2, B>) => <R1>(ma: Reader<R1, A>) => Reader<R1 & R2, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => Reader<E, A>
```

Added in v3.0.0

# Profunctor

## promap

**Signature**

```ts
export declare const promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (fea: Reader<E, A>) => Reader<D, B>
```

Added in v3.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C>
```

Added in v3.0.0

# combinators

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: Reader<R1, A>) => Reader<R2, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: Reader<E, B>) => <A>(first: Reader<E, A>) => Reader<E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: Reader<E, B>) => <A>(first: Reader<E, A>) => Reader<E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(f: (a: A) => Reader<E, B>) => (first: Reader<E, A>) => Reader<E, A>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Reader'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'Reader'>
```

Added in v3.0.0

## Category

**Signature**

```ts
export declare const Category: Category2<'Reader'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Reader'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Reader'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'Reader'>
```

Added in v3.0.0

## Profunctor

**Signature**

```ts
export declare const Profunctor: Profunctor2<'Reader'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'Reader'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <A, R>(M: Monoid<A>) => Monoid<Reader<R, A>>
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <A, R>(S: Semigroup<A>) => Semigroup<Reader<R, A>>
```

Added in v3.0.0

# model

## Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: Reader<unknown, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: Reader<unknown, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<E, B>
) => (fa: Reader<E, A>) => Reader<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(fb: Reader<E, B>) => <A>(fas: Reader<E, A>) => Reader<E, readonly [any, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <R2, B>(
  fb: Reader<R2, B>
) => <R1, A extends readonly unknown[]>(fas: Reader<R1, A>) => Reader<R1 & R2, readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<E, B>
) => (ma: Reader<E, A>) => Reader<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: Reader<E, A>) => Reader<E, { [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R2, B>
) => <R1>(fa: Reader<R1, A>) => Reader<R1 & R2, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <R, A>(arr: readonly Reader<R, A>[]) => Reader<R, readonly A[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { sequenceArray, Reader } from 'fp-ts/Reader'
import { pipe } from 'fp-ts/function'

const add: (x: number) => Reader<{ value: number }, number> = (x) => (config) => x + config.value
const arr = RA.range(0, 100)

assert.deepStrictEqual(
  pipe(arr, RA.map(add), sequenceArray)({ value: 3 }),
  pipe(
    arr,
    RA.map((x) => x + 3)
  )
)
```

Added in v3.0.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <R, A, B>(
  f: (a: A) => Reader<R, B>
) => (arr: readonly A[]) => Reader<R, readonly B[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { traverseArray, Reader } from 'fp-ts/Reader'
import { pipe } from 'fp-ts/function'

const add: (x: number) => Reader<{ value: number }, number> = (x) => (config) => x + config.value
const arr = RA.range(0, 100)

assert.deepStrictEqual(
  pipe(arr, traverseArray(add))({ value: 3 }),
  pipe(
    arr,
    RA.map((x) => x + 3)
  )
)
```

Added in v3.0.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (arr: readonly A[]) => Reader<R, readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(a: Reader<E, A>) => Reader<E, readonly [A]>
```

Added in v3.0.0
