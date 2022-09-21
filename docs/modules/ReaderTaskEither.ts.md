---
title: ReaderTaskEither.ts
nav_order: 79
parent: Modules
---

## ReaderTaskEither overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Chainable](#chainable)
  - [chain](#chain)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [ReaderTaskEitherF (interface)](#readertaskeitherf-interface)
  - [ReaderTaskEitherFFixedE (interface)](#readertaskeitherffixede-interface)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [alt](#alt)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderEitherK](#chainfirstreadereitherk)
  - [chainFirstReaderIOK](#chainfirstreaderiok)
  - [chainFirstReaderIOKW](#chainfirstreaderiokw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderTaskK](#chainfirstreadertaskk)
  - [chainFirstTaskEitherK](#chainfirsttaskeitherk)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOK](#chainiok)
  - [chainOptionKOrElse](#chainoptionkorelse)
  - [chainReaderEitherK](#chainreadereitherk)
  - [chainReaderIOK](#chainreaderiok)
  - [chainReaderIOKW](#chainreaderiokw)
  - [chainReaderK](#chainreaderk)
  - [chainReaderTaskK](#chainreadertaskk)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskK](#chaintaskk)
  - [filterOrElse](#filterorelse)
  - [flap](#flap)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionKOrElse](#fromoptionkorelse)
  - [fromReaderEitherK](#fromreadereitherk)
  - [fromReaderIOK](#fromreaderiok)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskK](#fromreadertaskk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orLeft](#orleft)
  - [refineOrElse](#refineorelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [asksReaderTaskEither](#asksreadertaskeither)
  - [fromPredicateOrElse](#frompredicateorelse)
  - [fromReaderEither](#fromreadereither)
  - [fromRefinementOrElse](#fromrefinementorelse)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftReaderIO](#leftreaderio)
  - [leftReaderTask](#leftreadertask)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightReaderIO](#rightreaderio)
  - [rightReaderTask](#rightreadertask)
  - [rightTask](#righttask)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [getOrElse](#getorelse)
  - [getOrElseE](#getorelsee)
  - [match](#match)
  - [matchE](#matche)
- [instances](#instances)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Bifunctor](#bifunctor-1)
  - [Chain](#chain)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [FromReader](#fromreader)
  - [FromTask](#fromtask)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
  - [getApplicativeReaderTaskValidation](#getapplicativereadertaskvalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [getSemigroupKReaderTaskValidation](#getsemigroupkreadertaskvalidation)
- [interop](#interop)
  - [chainNullableKOrElse](#chainnullablekorelse)
  - [fromNullableKOrElse](#fromnullablekorelse)
  - [fromNullableOrElse](#fromnullableorelse)
  - [toUnion](#tounion)
- [model](#model)
  - [ReaderTaskEither (interface)](#readertaskeither-interface)
- [natural transformations](#natural-transformations)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromReader](#fromreader)
  - [fromTask](#fromtask)
  - [fromTaskEither](#fromtaskeither)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bracket](#bracket)
  - [let](#let)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArray](#traversereadonlynonemptyarray)
  - [traverseReadonlyNonEmptyArraySeq](#traversereadonlynonemptyarrayseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fea: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fea: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A>
```

Added in v3.0.0

# Chainable

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

# HKT

## ReaderTaskEitherF (interface)

**Signature**

```ts
export interface ReaderTaskEitherF extends HKT {
  readonly type: ReaderTaskEither<this['Contravariant1'], this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## ReaderTaskEitherFFixedE (interface)

**Signature**

```ts
export interface ReaderTaskEitherFFixedE<E> extends HKT {
  readonly type: ReaderTaskEither<this['Contravariant1'], E, this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, R = unknown, E = never>(a: A) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

# SemigroupK

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R2, E2, B>(
  second: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E2, B>(
  f: (a: A) => either.Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, A>
```

Added in v3.0.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## chainFirstReaderEitherK

**Signature**

```ts
export declare const chainFirstReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## chainFirstReaderIOK

**Signature**

```ts
export declare const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## chainFirstReaderIOKW

Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).

**Signature**

```ts
export declare const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v3.0.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v3.0.0

## chainFirstReaderTaskK

**Signature**

```ts
export declare const chainFirstReaderTaskK: <A, R2, B>(
  f: (a: A) => readerTask.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v3.0.0

## chainFirstTaskEitherK

**Signature**

```ts
export declare const chainFirstTaskEitherK: <A, E2, B>(
  f: (a: A) => taskEither.TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, A>
```

Added in v3.0.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(
  f: (a: A) => task.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## chainOptionKOrElse

**Signature**

```ts
export declare const chainOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## chainReaderEitherK

**Signature**

```ts
export declare const chainReaderEitherK: <A, R2, E2, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## chainReaderIOK

**Signature**

```ts
export declare const chainReaderIOK: <A, R, B>(
  f: (a: A) => ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## chainReaderIOKW

Less strict version of [`chainReaderIOK`](#chainreaderiok).

**Signature**

```ts
export declare const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R2, B>(
  f: (a: A) => reader.Reader<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## chainReaderTaskK

**Signature**

```ts
export declare const chainReaderTaskK: <A, R2, B>(
  f: (a: A) => readerTask.ReaderTask<R2, B>
) => <R1, E = never>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v3.0.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <A, E2, B>(
  f: (a: A) => taskEither.TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(
  f: (a: A) => task.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: <B extends A, E2, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E2
) => <R, E1>(mb: ReaderTaskEither<R, E1, B>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => either.Either<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => IOEither<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromOptionKOrElse

**Signature**

```ts
export declare const fromOptionKOrElse: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => <R>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderEitherK

**Signature**

```ts
export declare const fromReaderEitherK: <A extends readonly unknown[], R, E, B>(
  f: (...a: A) => ReaderEither<R, E, B>
) => (...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => ReaderIO<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => reader.Reader<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderTaskK

**Signature**

```ts
export declare const fromReaderTaskK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => readerTask.ReaderTask<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <A extends readonly unknown[], E, B>(
  f: (...a: A) => taskEither.TaskEither<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => task.Task<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v3.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => readerTask.ReaderTask<R, E2>
) => <A>(fa: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A>
```

Added in v3.0.0

## refineOrElse

**Signature**

```ts
export declare const refineOrElse: <C extends A, B extends A, E2, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E2
) => <R, E1>(ma: ReaderTaskEither<R, E1, C>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E>
```

Added in v3.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderTaskEither<R, E, R>
```

Added in v3.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, E = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## asksReaderTaskEither

**Signature**

```ts
export declare const asksReaderTaskEither: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v3.0.0

## fromPredicateOrElse

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicateOrElse: <B extends A, E, A = B>(
  predicate: Predicate<A>,
  onFalse: (b: B) => E
) => <R = unknown>(b: B) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromRefinementOrElse

**Signature**

```ts
export declare const fromRefinementOrElse: <C extends A, B extends A, E, A = C>(
  refinement: Refinement<A, B>,
  onFalse: (c: C) => E
) => <R = unknown>(c: C) => ReaderTaskEither<R, E, B>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, R = unknown, A = never>(e: E) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, R = unknown, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E, A = never>(me: reader.Reader<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## leftReaderIO

**Signature**

```ts
export declare const leftReaderIO: <R, E, A = never>(me: ReaderIO<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## leftReaderTask

**Signature**

```ts
export declare const leftReaderTask: <R, E, A = never>(me: readerTask.ReaderTask<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## leftTask

**Signature**

```ts
export declare const leftTask: <E, R = unknown, A = never>(me: task.Task<E>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, R = unknown, E = never>(a: A) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, R = unknown, E = never>(ma: IO<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, A, E = never>(ma: reader.Reader<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## rightReaderIO

**Signature**

```ts
export declare const rightReaderIO: <R, A, E = never>(ma: ReaderIO<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## rightReaderTask

**Signature**

```ts
export declare const rightReaderTask: <R, A, E = never>(ma: readerTask.ReaderTask<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## rightTask

**Signature**

```ts
export declare const rightTask: <A, R = unknown, E = never>(ma: task.Task<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chainable`.

**Signature**

```ts
export declare const chainFirst: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v3.0.0

## flatten

Derivable from `Chainable`.

**Signature**

```ts
export declare const flatten: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v3.0.0

# destructors

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, B>(
  onLeft: (e: E) => B
) => <R, A>(ma: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, B | A>
```

Added in v3.0.0

## getOrElseE

**Signature**

```ts
export declare const getOrElseE: <E, R2, B>(
  onLeft: (e: E) => readerTask.ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => readerTask.ReaderTask<R1 & R2, B | A>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare const match: <E, B, A, C = B>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, B | C>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare const matchE: <E, R2, B, A, R3, C = B>(
  onLeft: (e: E) => readerTask.ReaderTask<R2, B>,
  onRight: (a: A) => readerTask.ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => readerTask.ReaderTask<R1 & R2 & R3, B | C>
```

Added in v3.0.0

# instances

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: applicative.Applicative<ReaderTaskEitherF>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: applicative.Applicative<ReaderTaskEitherF>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply<ReaderTaskEitherF>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply<ReaderTaskEitherF>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ReaderTaskEitherF>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: chainable.Chainable<ReaderTaskEitherF>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: fromEither_.FromEither<ReaderTaskEitherF>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: fromIO_.FromIO<ReaderTaskEitherF>
```

Added in v3.0.0

## FromReader

**Signature**

```ts
export declare const FromReader: fromReader_.FromReader<ReaderTaskEitherF>
```

Added in v3.0.0

## FromTask

**Signature**

```ts
export declare const FromTask: fromTask_.FromTask<ReaderTaskEitherF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<ReaderTaskEitherF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<ReaderTaskEitherF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<ReaderTaskEitherF>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<ReaderTaskEitherF>
```

Added in v3.0.0

## getApplicativeReaderTaskValidation

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare const getApplicativeReaderTaskValidation: <E>(
  A: apply.Apply<task.TaskF>,
  S: Semigroup<E>
) => applicative.Applicative<ReaderTaskEitherFFixedE<E>>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => compactable.Compactable<ReaderTaskEitherFFixedE<E>>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => filterable.Filterable<ReaderTaskEitherFFixedE<E>>
```

Added in v3.0.0

## getSemigroupKReaderTaskValidation

The default [`SemigroupK`](#semigroupk) instance returns the last error, if you want to
get all errors you need to provide an way to concatenate them via a `Semigroup`.

**Signature**

```ts
export declare const getSemigroupKReaderTaskValidation: <E>(
  S: Semigroup<E>
) => semigroupK.SemigroupK<ReaderTaskEitherFFixedE<E>>
```

Added in v3.0.0

# interop

## chainNullableKOrElse

**Signature**

```ts
export declare const chainNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullableKOrElse

**Signature**

```ts
export declare const fromNullableKOrElse: <E>(
  onNullable: Lazy<E>
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, NonNullable<B>>
```

Added in v3.0.0

## fromNullableOrElse

**Signature**

```ts
export declare const fromNullableOrElse: <E>(
  onNullable: Lazy<E>
) => <A, R = unknown>(a: A) => ReaderTaskEither<R, E, NonNullable<A>>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => readerTask.ReaderTask<R, E | A>
```

Added in v3.0.0

# model

## ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
```

Added in v3.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, R = unknown>(fa: either.Either<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, R = unknown, E = never>(fa: IO<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, R = unknown>(fa: IOEither<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, R>(fa: Option<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, E = never>(fa: reader.Reader<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, R = unknown, E = never>(fa: task.Task<A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, R = unknown>(fa: taskEither.TaskEither<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderTaskEither<unknown, never, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: ReaderTaskEither<unknown, never, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends readonly unknown[]>(
  fas: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(
  name: N
) => <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { readonly [K in N]: A }>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderTaskEither<R1, E1, A>,
  use: (a: A) => ReaderTaskEither<R2, E2, B>,
  release: (a: A, e: either.Either<E2, B>) => ReaderTaskEither<R3, E3, void>
) => ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B>
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArray

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArray: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArraySeq

Equivalent to `ReadonlyNonEmptyArray#traverse(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArraySeq: <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplyPar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplySeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, readonly [A]>
```

Added in v3.0.0
