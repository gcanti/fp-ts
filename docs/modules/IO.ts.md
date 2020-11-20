---
title: IO.ts
nav_order: 43
parent: Modules
---

## IO overview

```ts
interface IO<A> {
  (): A
}
```

`IO<A>` represents a non-deterministic synchronous computation that can cause side effects, yields a value of
type `A` and **never fails**. If you want to represent a synchronous computation that may fail, please see
`IOEither`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [MonadIO](#monadio)
  - [fromIO](#fromio)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [Applicative](#applicative-1)
  - [ChainRec](#chainrec)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoid](#getmonoid)
  - [getSemigroup](#getsemigroup)
  - [io](#io)
- [model](#model)
  - [IO (interface)](#io-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)

---

# Applicative

## of

Wrap a value into the type constructor.

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v2.0.0

# MonadIO

## fromIO

**Signature**

```ts
export declare const fromIO: <A>(fa: IO<A>) => IO<A>
```

Added in v2.7.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(fb: IO<B>) => <A>(fa: IO<A>) => IO<B>
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<A>
```

Added in v2.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v2.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'IO'>
```

Added in v2.7.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec1<'IO'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'IO'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'IO'>
```

Added in v2.7.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO1<'IO'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'IO'
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
export declare function getMonoid<A>(M: Monoid<A>): Monoid<IO<A>>
```

Added in v2.0.0

## getSemigroup

**Signature**

```ts
export declare function getSemigroup<A>(S: Semigroup<A>): Semigroup<IO<A>>
```

Added in v2.0.0

## io

**Signature**

```ts
export declare const io: Monad1<'IO'> & MonadIO1<'IO'> & ChainRec1<'IO'>
```

Added in v2.0.0

# model

## IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: IO<{}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: IO<A>) => IO<{ [K in N]: A }>
```

Added in v2.8.0

## sequenceArray

transform Array of IO to IO of Array

this function have the same behavior of `A.sequence(IO.io)` but it's stack safe

**Signature**

```ts
export declare const sequenceArray: <A>(arr: readonly IO<A>[]) => IO<readonly A[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { sequenceArray, IO } from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'

const logger: Array<unknown> = []
const log: <A>(a: A) => IO<void> = (a) => () => {
  logger.push(a)
}

pipe(RA.range(0, 100), RA.map(log), sequenceArray)()
assert.deepStrictEqual(logger, RA.range(0, 100))
```

Added in v2.9.0

## traverseArray

runs an action for every element in array, and accumulates the results IO in the array.

this function have the same behavior of `A.traverse(IO.io)` but it's stack safe

**Signature**

```ts
export declare const traverseArray: <A, B>(f: (a: A) => IO<B>) => (arr: readonly A[]) => IO<readonly B[]>
```

**Example**

```ts
import * as RA from 'fp-ts/ReadonlyArray'
import { traverseArray, IO } from 'fp-ts/IO'
import { pipe } from 'fp-ts/function'

const logger: Array<unknown> = []
const log: <A>(a: A) => IO<void> = (a) => () => {
  logger.push(a)
}

pipe(RA.range(0, 100), traverseArray(log))()
assert.deepStrictEqual(logger, RA.range(0, 100))
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (arr: readonly A[]) => IO<readonly B[]>
```

Added in v2.9.0
