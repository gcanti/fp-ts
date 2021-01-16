---
title: IO.ts
nav_order: 42
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

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
- [Pointed](#pointed)
  - [of](#of)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [model](#model)
  - [IO (interface)](#io-interface)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: IO<A>) => <B>(fab: IO<(a: A) => B>) => IO<B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: IO<A>) => IO<B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => IO<B>) => (ma: IO<A>) => IO<B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => IO<A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: IO<B>) => <A>(first: IO<A>) => IO<B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => IO<B>) => (first: IO<A>) => IO<A>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <A>(mma: IO<IO<A>>) => IO<A>
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'IO'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'IO'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO1<'IO'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'IO'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'IO'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'IO'>
```

Added in v3.0.0

## URI

**Signature**

```ts
export declare const URI: 'IO'
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v3.0.0

# model

## IO (interface)

**Signature**

```ts
export interface IO<A> {
  (): A
}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: IO<readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: IO<{}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: IO<B>
) => (fa: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: IO<B>) => <A>(fas: IO<A>) => IO<readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IO<B>
) => (ma: IO<A>) => IO<{ [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: IO<A>) => IO<{ [K in N]: A }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <A>(as: readonly IO<A>[]) => IO<readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, B>(f: (a: A) => IO<B>) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, B>(
  f: (index: number, a: A) => IO<B>
) => (as: readonly A[]) => IO<readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(a: IO<A>) => IO<readonly [A]>
```

Added in v3.0.0
