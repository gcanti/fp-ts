---
title: Reader.ts
nav_order: 64
parent: Modules
---

## Reader overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
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
- [Profunctor](#profunctor)
  - [promap](#promap)
- [Semigroupoid](#semigroupoid)
  - [compose](#compose)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [Category](#category-1)
  - [Choice](#choice)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Profunctor](#profunctor-1)
  - [Strong](#strong)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [reader](#reader)
- [model](#model)
  - [Reader (interface)](#reader-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)

---

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <E, A>(a: A) => Reader<E, A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, A>(fa: Reader<R, A>) => <B>(fab: Reader<R, (a: A) => B>) => Reader<R, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <Q, A>(fa: Reader<Q, A>) => <R, B>(fab: Reader<R, (a: A) => B>) => Reader<Q & R, B>
```

Added in v2.8.0

# Category

## id

**Signature**

```ts
export declare const id: <A>() => Reader<A, A>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <R, A, B>(f: (a: A) => Reader<R, B>) => <Q>(ma: Reader<Q, A>) => Reader<Q & R, B>
```

Added in v2.6.0

# Profunctor

## promap

**Signature**

```ts
export declare const promap: <E, A, D, B>(f: (d: D) => E, g: (a: A) => B) => (fbc: Reader<E, A>) => Reader<D, B>
```

Added in v2.0.0

# Semigroupoid

## compose

**Signature**

```ts
export declare const compose: <A, B>(ab: Reader<A, B>) => <C>(bc: Reader<B, C>) => Reader<A, C>
```

Added in v2.0.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, B>(fb: Reader<R, B>) => <A>(fa: Reader<R, A>) => Reader<R, B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Reader<R, A>) => Reader<R, A>
```

Added in v2.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: Reader<R, Reader<R, A>>) => Reader<R, A>
```

Added in v2.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <Q, R>(f: (d: Q) => R) => <A>(ma: Reader<R, A>) => Reader<Q, A>
```

Added in v2.0.0

# constructors

## ask

Reads the current context

**Signature**

```ts
export declare const ask: <R>() => Reader<R, R>
```

Added in v2.0.0

## asks

Projects a value from the global context in a Reader

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => Reader<R, A>
```

Added in v2.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'Reader'>
```

Added in v2.7.0

## Category

**Signature**

```ts
export declare const Category: Category2<'Reader'>
```

Added in v2.7.0

## Choice

**Signature**

```ts
export declare const Choice: Choice2<'Reader'>
```

Added in v2.8.3

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Reader'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'Reader'>
```

Added in v2.7.0

## Profunctor

**Signature**

```ts
export declare const Profunctor: Profunctor2<'Reader'>
```

Added in v2.7.0

## Strong

**Signature**

```ts
export declare const Strong: Strong2<'Reader'>
```

Added in v2.8.3

## URI

**Signature**

```ts
export declare const URI: 'Reader'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getMonoid

**Signature**

```ts
export declare function getMonoid<R, A>(M: Monoid<A>): Monoid<Reader<R, A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<R, A>(S: Semigroup<A>): Semigroup<Reader<R, A>>
```

Added in v2.0.0

## reader

**Signature**

```ts
export declare const reader: Monad2<'Reader'> &
  Profunctor2<'Reader'> &
  Category2<'Reader'> &
  Strong2<'Reader'> &
  Choice2<'Reader'>
```

Added in v2.0.0

# model

## Reader (interface)

**Signature**

```ts
export interface Reader<R, A> {
  (r: R): A
}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: Reader<unknown, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, R, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, Q, B>(
  name: Exclude<N, keyof A>,
  fb: Reader<Q, B>
) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<R, B>
) => (fa: Reader<R, A>) => Reader<R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <R, A>(fa: Reader<R, A>) => Reader<R, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, Q, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Reader<Q, B>
) => <R>(fa: Reader<R, A>) => Reader<Q & R, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## sequenceArray

this function have the same behavior of `A.sequence(R.reader)` but it's stack safe and optimized

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

Added in v2.9.0

## traverseArray

this function have the same behavior of `A.traverse(R.reader)` but it's stack safe and optimized

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

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, A, B>(
  f: (index: number, a: A) => Reader<R, B>
) => (arr: readonly A[]) => Reader<R, readonly B[]>
```

Added in v2.9.0
