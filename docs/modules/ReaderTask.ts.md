---
title: ReaderTask.ts
nav_order: 76
parent: Modules
---

## ReaderTask overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Chain](#chain)
  - [chain](#chain)
  - [chainW](#chainw)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOK](#chainiok)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainTaskK](#chaintaskk)
  - [flap](#flap)
  - [flattenW](#flattenw)
  - [fromIOK](#fromiok)
  - [fromReaderK](#fromreaderk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderTask](#asksreadertask)
  - [asksReaderTaskW](#asksreadertaskw)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Chain](#chain-1)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [URI (type alias)](#uri-type-alias)
- [model](#model)
  - [ReaderTask (interface)](#readertask-interface)
- [natural transformations](#natural-transformations)
  - [fromIO](#fromio)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
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
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: ReaderTask<E, A>) => <B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <R2, A>(
  fa: ReaderTask<R2, A>
) => <R1, B>(fab: ReaderTask<R1, (a: A) => B>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E, B>(f: (a: A) => ReaderTask<E, B>) => (ma: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => ReaderTask<E, A>
```

Added in v3.0.0

# combinators

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => (ma: ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainFirstReaderK).

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <A, R2, B>(
  f: (a: A) => ReaderTask<R2, B>
) => <R1>(ma: ReaderTask<R1, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(f: (a: A) => IO<B>) => <E>(first: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(f: (a: A) => R.Reader<R, B>) => (ma: ReaderTask<R, A>) => ReaderTask<R, B>
```

Added in v3.0.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainReaderK).

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2>(ma: ReaderTask<R2, A>) => ReaderTask<R1 & R2, B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(f: (a: A) => T.Task<B>) => <E>(first: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: ReaderTask<E, (a: A) => B>) => ReaderTask<E, B>
```

Added in v3.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

**Signature**

```ts
export declare const flattenW: <R1, R2, A>(mma: ReaderTask<R1, ReaderTask<R2, A>>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A, B>(f: (...a: A) => IO<B>) => <E>(...a: A) => ReaderTask<E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A, R, B>(f: (...a: A) => R.Reader<R, B>) => (...a: A) => ReaderTask<R, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A, B>(f: (...a: A) => T.Task<B>) => <E>(...a: A) => ReaderTask<E, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(f: (r2: R2) => R1) => <A>(ma: ReaderTask<R1, A>) => ReaderTask<R2, A>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R>() => ReaderTask<R, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderTask`.

**Signature**

```ts
export declare const asks: <R, A>(f: (r: R) => A) => ReaderTask<R, A>
```

Added in v3.0.0

## asksReaderTask

**Signature**

```ts
export declare const asksReaderTask: <R, A>(f: (r: R) => ReaderTask<R, A>) => ReaderTask<R, A>
```

Added in v3.0.0

## asksReaderTaskW

Less strict version of [`asksReaderTaskK`](#asksreadertaskk).

**Signature**

```ts
export declare const asksReaderTaskW: <R1, R2, A>(f: (r1: R1) => ReaderTask<R2, A>) => ReaderTask<R1 & R2, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: ReaderTask<E, B>) => <A>(first: ReaderTask<E, A>) => ReaderTask<E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(
  f: (a: A) => ReaderTask<E, B>
) => (first: ReaderTask<E, A>) => ReaderTask<E, A>
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, A>(mma: ReaderTask<R, ReaderTask<R, A>>) => ReaderTask<R, A>
```

Added in v3.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply2<'ReaderTask'>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Applicative2<'ReaderTask'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain2<'ReaderTask'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'ReaderTask'>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader2<'ReaderTask'>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask2<'ReaderTask'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'ReaderTask'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'ReaderTask'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'ReaderTask'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'ReaderTask'
```

Added in v3.0.0

# model

## ReaderTask (interface)

**Signature**

```ts
export interface ReaderTask<R, A> {
  (r: R): Task<A>
}
```

Added in v3.0.0

# natural transformations

## fromIO

**Signature**

```ts
export declare const fromIO: NaturalTransformation12<'IO', 'ReaderTask'>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: NaturalTransformation22<'Reader', 'ReaderTask'>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: NaturalTransformation12<'Task', 'ReaderTask'>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderTask<unknown, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReaderTask<unknown, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<E, B>
) => (fa: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(
  fb: ReaderTask<E, B>
) => <A>(fas: ReaderTask<E, A>) => ReaderTask<E, readonly [...A, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <R2, B>(
  fb: ReaderTask<R2, B>
) => <R1, A extends readonly unknown[]>(fas: ReaderTask<R1, A>) => ReaderTask<R1 & R2, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2>(a: A | A2) => ReaderTask<E, B>
) => (ma: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: ReaderTask<E, A>) => ReaderTask<E, { readonly [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => ReaderTask<R2, B>
) => <R1>(fa: ReaderTask<R1, A>) => ReaderTask<R1 & R2, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: readonly A[]) => ReaderTask<R, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, R, B>(
  f: (index: number, a: A) => ReaderTask<R, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTask<R, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(fa: ReaderTask<E, A>) => ReaderTask<E, readonly [A]>
```

Added in v3.0.0
