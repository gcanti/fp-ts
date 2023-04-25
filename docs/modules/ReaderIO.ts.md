---
title: ReaderIO.ts
nav_order: 80
parent: Modules
---

## ReaderIO overview

Added in v2.13.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderIO](#asksreaderio)
  - [asksReaderIOW](#asksreaderiow)
  - [of](#of)
- [conversions](#conversions)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [Functor](#functor)
  - [Monad](#monad)
  - [MonadIO](#monadio)
  - [Pointed](#pointed)
- [legacy](#legacy)
  - [chain](#chain)
  - [chainW](#chainw)
- [lifting](#lifting)
  - [fromIOK](#fromiok)
  - [fromReaderK](#fromreaderk)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [ReaderIO (interface)](#readerio-interface)
- [sequencing](#sequencing)
  - [chainFirst](#chainfirst)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstW](#chainfirstw)
  - [chainIOK](#chainiok)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
- [traversing](#traversing)
  - [sequenceArray](#sequencearray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [apW](#apw)
  - [local](#local)

---

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderIO<R, R>
```

Added in v2.13.0

## asks

Projects a value from the global context in a `ReaderIO`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderIO<R, A>
```

Added in v2.13.0

## asksReaderIO

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderIO: <R, A>(f: (r: R) => ReaderIO<R, A>) => ReaderIO<R, A>
```

Added in v2.13.0

## asksReaderIOW

Less strict version of [`asksReaderIO`](#asksreaderio).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const asksReaderIOW: <R1, R2, A>(f: (r1: R1) => ReaderIO<R2, A>) => ReaderIO<R1 & R2, A>
```

Added in v2.13.0

## of

**Signature**

```ts
export declare const of: <R = unknown, A = never>(a: A) => ReaderIO<R, A>
```

Added in v2.13.0

# conversions

## fromIO

**Signature**

```ts
export declare const fromIO: <A, R = unknown>(fa: I.IO<A>) => ReaderIO<R, A>
```

Added in v2.13.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A>(fa: R.Reader<R, A>) => ReaderIO<R, A>
```

Added in v2.13.0

# do notation

## Do

**Signature**

```ts
export declare const Do: ReaderIO<unknown, {}>
```

Added in v2.13.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<E, B>
) => (fa: ReaderIO<E, A>) => ReaderIO<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apSW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderIO<R2, B>
) => <R1>(fa: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<E, B>
) => (ma: ReaderIO<E, A>) => ReaderIO<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: ReaderIO<E, A>) => ReaderIO<E, { readonly [K in N]: A }>
```

Added in v2.13.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(fa: ReaderIO<R1, A>) => ReaderIO<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'ReaderIO'>
```

Added in v2.13.0

## Apply

**Signature**

```ts
export declare const Apply: Apply2<'ReaderIO'>
```

Added in v2.13.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'ReaderIO'>
```

Added in v2.13.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'ReaderIO'>
```

Added in v2.13.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader2<'ReaderIO'>
```

Added in v2.13.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderIO'>
```

Added in v2.13.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'ReaderIO'>
```

Added in v2.13.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'ReaderIO'>
```

Added in v2.13.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'ReaderIO'>
```

Added in v2.13.0

# legacy

## chain

Alias of `flatMap`.

**Signature**

```ts
export declare const chain: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v2.13.0

## chainW

Alias of `flatMap`.

**Signature**

```ts
export declare const chainW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
```

Added in v2.13.0

# lifting

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => I.IO<B>
) => <R = unknown>(...a: A) => ReaderIO<R, B>
```

Added in v2.13.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => (...a: A) => ReaderIO<R, B>
```

Added in v2.13.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: ReaderIO<E, (a: A) => B>) => ReaderIO<E, B>
```

Added in v2.13.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R>(fa: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v2.13.0

# model

## ReaderIO (interface)

**Signature**

```ts
export interface ReaderIO<R, A> {
  (r: R): I.IO<A>
}
```

Added in v2.13.0

# sequencing

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, R, B>(f: (a: A) => ReaderIO<R, B>) => (first: ReaderIO<R, A>) => ReaderIO<R, A>
```

Added in v2.13.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v2.13.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, A>
```

Added in v2.13.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderIO<R2, A>) => ReaderIO<R1 & R2, A>
```

Added in v2.13.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainFirstW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, A>
```

Added in v2.13.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => <E>(first: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v2.13.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderIO<R, A>) => ReaderIO<R, B>
```

Added in v2.13.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderIO<R2, A>) => ReaderIO<R1 & R2, B>
```

Added in v2.13.0

## flatMap

**Signature**

```ts
export declare const flatMap: {
  <A, R2, B>(f: (a: A) => ReaderIO<R2, B>): <R1>(ma: ReaderIO<R1, A>) => ReaderIO<R1 & R2, B>
  <R1, A, R2, B>(ma: ReaderIO<R1, A>, f: (a: A) => ReaderIO<R2, B>): ReaderIO<R1 & R2, B>
}
```

Added in v2.14.0

## flatten

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderIO<R, ReaderIO<R, A>>) => ReaderIO<R, A>
```

Added in v2.13.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(mma: ReaderIO<R1, ReaderIO<R2, A>>) => ReaderIO<R1 & R2, A>
```

Added in v2.13.0

# traversing

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <R, A>(arr: readonly ReaderIO<R, A>[]) => ReaderIO<R, readonly A[]>
```

Added in v2.13.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v2.13.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v2.13.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: readonly A[]) => ReaderIO<R, readonly B[]>
```

Added in v2.13.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderIO<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderIO<R, ReadonlyNonEmptyArray<B>>
```

Added in v2.13.0

# type lambdas

## URI

**Signature**

```ts
export declare const URI: 'ReaderIO'
```

Added in v2.13.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.13.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderIO<unknown, readonly []>
```

Added in v2.13.0

## ap

**Signature**

```ts
export declare const ap: <R, A>(fa: ReaderIO<R, A>) => <B>(fab: ReaderIO<R, (a: A) => B>) => ReaderIO<R, B>
```

Added in v2.13.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(second: ReaderIO<E, B>) => <A>(first: ReaderIO<E, A>) => ReaderIO<E, A>
```

Added in v2.13.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(second: ReaderIO<E, B>) => <A>(first: ReaderIO<E, A>) => ReaderIO<E, B>
```

Added in v2.13.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderIO<R2, A>
) => <R1, B>(fab: ReaderIO<R1, (a: A) => B>) => ReaderIO<R1 & R2, B>
```

Added in v2.13.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderIO<R1, A>) => ReaderIO<R2, A>
```

Added in v2.13.0
