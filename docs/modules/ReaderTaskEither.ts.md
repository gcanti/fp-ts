---
title: ReaderTaskEither.ts
nav_order: 83
parent: Modules
---

## ReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainW](#chainw)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [apFirst](#apfirst)
  - [apFirstW](#apfirstw)
  - [apSecond](#apsecond)
  - [apSecondW](#apsecondw)
  - [asksReaderTaskEither](#asksreadertaskeither)
  - [asksReaderTaskEitherW](#asksreadertaskeitherw)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstEitherK](#chainfirsteitherk)
  - [chainFirstEitherKW](#chainfirsteitherkw)
  - [chainFirstIOK](#chainfirstiok)
  - [chainFirstReaderEitherK](#chainfirstreadereitherk)
  - [chainFirstReaderEitherKW](#chainfirstreadereitherkw)
  - [chainFirstReaderIOK](#chainfirstreaderiok)
  - [chainFirstReaderIOKW](#chainfirstreaderiokw)
  - [chainFirstReaderK](#chainfirstreaderk)
  - [chainFirstReaderKW](#chainfirstreaderkw)
  - [chainFirstReaderTaskK](#chainfirstreadertaskk)
  - [chainFirstReaderTaskKW](#chainfirstreadertaskkw)
  - [chainFirstTaskEitherK](#chainfirsttaskeitherk)
  - [chainFirstTaskEitherKW](#chainfirsttaskeitherkw)
  - [chainFirstTaskK](#chainfirsttaskk)
  - [chainFirstW](#chainfirstw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainIOK](#chainiok)
  - [chainOptionK](#chainoptionk)
  - [chainReaderEitherK](#chainreadereitherk)
  - [chainReaderEitherKW](#chainreadereitherkw)
  - [chainReaderIOK](#chainreaderiok)
  - [chainReaderIOKW](#chainreaderiokw)
  - [chainReaderK](#chainreaderk)
  - [chainReaderKW](#chainreaderkw)
  - [chainReaderTaskK](#chainreadertaskk)
  - [chainReaderTaskKW](#chainreadertaskkw)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [chainTaskK](#chaintaskk)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [flattenW](#flattenw)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromIOK](#fromiok)
  - [fromOptionK](#fromoptionk)
  - [fromReaderEitherK](#fromreadereitherk)
  - [fromReaderIOK](#fromreaderiok)
  - [fromReaderK](#fromreaderk)
  - [fromReaderTaskK](#fromreadertaskk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [fromTaskK](#fromtaskk)
  - [local](#local)
  - [orElse](#orelse)
  - [orElseFirst](#orelsefirst)
  - [orElseFirstW](#orelsefirstw)
  - [orElseW](#orelsew)
  - [orLeft](#orleft)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromPredicate](#frompredicate)
  - [fromReaderEither](#fromreadereither)
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
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchE](#matche)
  - [matchEW](#matchew)
  - [matchW](#matchw)
- [instances](#instances)
  - [Alt](#alt-1)
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
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [MonadTask](#monadtask)
  - [MonadThrow](#monadthrow-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltReaderTaskValidation](#getaltreadertaskvalidation)
  - [getApplicativeReaderTaskValidation](#getapplicativereadertaskvalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getReaderTaskValidation~~](#getreadertaskvalidation)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~readerTaskEitherSeq~~](#readertaskeitherseq)
  - [~~readerTaskEither~~](#readertaskeither)
- [interop](#interop)
  - [chainNullableK](#chainnullablek)
  - [fromNullable](#fromnullable)
  - [fromNullableK](#fromnullablek)
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
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [bracket](#bracket)
  - [bracketW](#bracketw)
  - [let](#let)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [traverseReadonlyNonEmptyArrayWithIndex](#traversereadonlynonemptyarraywithindex)
  - [traverseReadonlyNonEmptyArrayWithIndexSeq](#traversereadonlynonemptyarraywithindexseq)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)
  - [~~run~~](#run)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R, E, A>(
  that: () => ReaderTaskEither<R, E, A>
) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the environment, the error and the return types will be merged.

**Signature**

```ts
export declare const altW: <R2, E2, B>(
  that: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(fa: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderTaskEither<R, E, A>
) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apW: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v2.8.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(
  f: (e: E) => G
) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v2.6.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <R, E, A>(e: E) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <R = unknown, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A>
```

Added in v2.7.0

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  second: ReaderTaskEither<R, E, B>
) => <A>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## apFirstW

Less strict version of [`apFirst`](#apfirst).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apFirstW: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v2.12.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  second: ReaderTaskEither<R, E, B>
) => <A>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

## apSecondW

Less strict version of [`apSecond`](#apsecond).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSecondW: <R2, E2, B>(
  second: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v2.12.0

## asksReaderTaskEither

Effectfully accesses the environment.

**Signature**

```ts
export declare const asksReaderTaskEither: <R, E, A>(
  f: (r: R) => ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## asksReaderTaskEitherW

Less strict version of [`asksReaderTaskEither`](#asksreadertaskeither).

The `W` suffix (short for **W**idening) means that the environment types will be merged.

**Signature**

```ts
export declare const asksReaderTaskEitherW: <R1, R2, E, A>(
  f: (r1: R1) => ReaderTaskEither<R2, E, A>
) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v2.11.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chaineitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## chainFirstEitherK

**Signature**

```ts
export declare const chainFirstEitherK: <A, E, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.12.0

## chainFirstEitherKW

Less strict version of [`chainFirstEitherK`](#chainfirsteitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, A>
```

Added in v2.12.0

## chainFirstIOK

**Signature**

```ts
export declare const chainFirstIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.10.0

## chainFirstReaderEitherK

**Signature**

```ts
export declare const chainFirstReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## chainFirstReaderEitherKW

Less strict version of [`chainFirstReaderEitherK`](#chainfirstreadereitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v2.11.0

## chainFirstReaderIOK

**Signature**

```ts
export declare const chainFirstReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.13.0

## chainFirstReaderIOKW

Less strict version of [`chainFirstReaderIOK`](#chainfirstreaderiok).

**Signature**

```ts
export declare const chainFirstReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v2.13.0

## chainFirstReaderK

**Signature**

```ts
export declare const chainFirstReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## chainFirstReaderKW

Less strict version of [`chainFirstReaderK`](#chainfirstreaderk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E>(ma: ReaderTaskEither<R2, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v2.11.0

## chainFirstReaderTaskK

**Signature**

```ts
export declare const chainFirstReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## chainFirstReaderTaskKW

Less strict version of [`chainFirstReaderTaskK`](#chainfirstreadertaskk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, A>
```

Added in v2.11.0

## chainFirstTaskEitherK

**Signature**

```ts
export declare const chainFirstTaskEitherK: <E, A, B>(
  f: (a: A) => TE.TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## chainFirstTaskEitherKW

Less strict version of [`chainFirstTaskEitherK`](#chainfirsttaskeitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainFirstTaskEitherKW: <E2, A, B>(
  f: (a: A) => TE.TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, A>
```

Added in v2.11.0

## chainFirstTaskK

**Signature**

```ts
export declare const chainFirstTaskK: <A, B>(
  f: (a: A) => T.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.10.0

## chainFirstW

Less strict version of [`chainFirst`](#chainfirst).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirstW: <R2, E2, A, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, A>
```

Added in v2.8.0

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainioeitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainIOEitherKW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v2.6.1

## chainIOK

**Signature**

```ts
export declare const chainIOK: <A, B>(
  f: (a: A) => IO<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## chainReaderEitherK

**Signature**

```ts
export declare const chainReaderEitherK: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## chainReaderEitherKW

Less strict version of [`chainReaderEitherK`](#chainreadereitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainReaderEitherKW: <R2, E2, A, B>(
  f: (a: A) => ReaderEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E2 | E1, B>
```

Added in v2.11.0

## chainReaderIOK

**Signature**

```ts
export declare const chainReaderIOK: <A, R, B>(
  f: (a: A) => RIO.ReaderIO<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.13.0

## chainReaderIOKW

Less strict version of [`chainReaderIOK`](#chainreaderiok).

**Signature**

```ts
export declare const chainReaderIOKW: <A, R2, B>(
  f: (a: A) => RIO.ReaderIO<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v2.13.0

## chainReaderK

**Signature**

```ts
export declare const chainReaderK: <A, R, B>(
  f: (a: A) => R.Reader<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## chainReaderKW

Less strict version of [`chainReaderK`](#chainreaderk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainReaderKW: <A, R1, B>(
  f: (a: A) => R.Reader<R1, B>
) => <R2, E>(ma: ReaderTaskEither<R2, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v2.11.0

## chainReaderTaskK

**Signature**

```ts
export declare const chainReaderTaskK: <A, R, B>(
  f: (a: A) => RT.ReaderTask<R, B>
) => <E>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## chainReaderTaskKW

Less strict version of [`chainReaderTaskK`](#chainreadertaskk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainReaderTaskKW: <A, R2, B>(
  f: (a: A) => RT.ReaderTask<R2, B>
) => <R1, E>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R1 & R2, E, B>
```

Added in v2.11.0

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TE.TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chaintaskeitherk).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const chainTaskEitherKW: <E2, A, B>(
  f: (a: A) => TE.TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2 | E1, B>
```

Added in v2.6.1

## chainTaskK

**Signature**

```ts
export declare const chainTaskK: <A, B>(
  f: (a: A) => T.Task<B>
) => <R, E>(first: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R, B extends A>(
    mb: ReaderTaskEither<R, E, B>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
}
```

Added in v2.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterorelse).

The `W` suffix (short for **W**idening) means that the error types will be merged.

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1, B extends A>(
    mb: ReaderTaskEither<R, E1, B>
  ) => ReaderTaskEither<R, E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E2 | E1, A>
}
```

Added in v2.9.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <R, E, B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <R, E, A>(
  mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## flattenW

Less strict version of [`flatten`](#flatten).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const flattenW: <R1, E1, R2, E2, A>(
  mma: ReaderTaskEither<R1, E1, ReaderTaskEither<R2, E2, A>>
) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v2.11.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare const fromIOEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => IOEither<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## fromIOK

**Signature**

```ts
export declare const fromIOK: <A extends readonly unknown[], B>(
  f: (...a: A) => IO<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A extends readonly unknown[], B>(f: (...a: A) => Option<B>) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## fromReaderEitherK

**Signature**

```ts
export declare const fromReaderEitherK: <R, E, A extends readonly unknown[], B>(
  f: (...a: A) => ReaderEither<R, E, B>
) => (...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## fromReaderIOK

**Signature**

```ts
export declare const fromReaderIOK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RIO.ReaderIO<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.13.0

## fromReaderK

**Signature**

```ts
export declare const fromReaderK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => R.Reader<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## fromReaderTaskK

**Signature**

```ts
export declare const fromReaderTaskK: <A extends readonly unknown[], R, B>(
  f: (...a: A) => RT.ReaderTask<R, B>
) => <E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.11.0

## fromTaskEitherK

**Signature**

```ts
export declare const fromTaskEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => TE.TaskEither<E, B>
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## fromTaskK

**Signature**

```ts
export declare const fromTaskK: <A extends readonly unknown[], B>(
  f: (...a: A) => T.Task<B>
) => <R = unknown, E = never>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.10.0

## local

Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
`contramap`).

**Signature**

```ts
export declare const local: <R2, R1>(
  f: (r2: R2) => R1
) => <E, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTaskEither<R2, E, A>
```

Added in v2.0.0

## orElse

**Signature**

```ts
export declare const orElse: <R, E1, A, E2>(
  onLeft: (e: E1) => ReaderTaskEither<R, E2, A>
) => (ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A>
```

Added in v2.0.0

## orElseFirst

**Signature**

```ts
export declare const orElseFirst: <E, R, B>(
  onLeft: (e: E) => ReaderTaskEither<R, E, B>
) => <A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## orElseFirstW

The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.

**Signature**

```ts
export declare const orElseFirstW: <E1, R2, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R2, E2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A>
```

Added in v2.11.0

## orElseW

Less strict version of [`orElse`](#orelse).

The `W` suffix (short for **W**idening) means that the environment types and the return types will be merged.

**Signature**

```ts
export declare const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E2, B | A>
```

Added in v2.10.0

## orLeft

**Signature**

```ts
export declare const orLeft: <E1, R, E2>(
  onLeft: (e: E1) => RT.ReaderTask<R, E2>
) => <A>(fa: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E2, A>
```

Added in v2.11.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, A, E>
```

Added in v2.0.0

# constructors

## ask

Reads the current context.

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderTaskEither<R, E, R>
```

Added in v2.0.0

## asks

Projects a value from the global context in a `ReaderEither`.

**Signature**

```ts
export declare const asks: <R, A, E = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R = unknown>(
    a: A
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R = unknown, B extends A = A>(
    b: B
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R = unknown>(a: A) => ReaderTaskEither<R, E, A>
}
```

Added in v2.0.0

## fromReaderEither

**Signature**

```ts
export declare const fromReaderEither: <R, E, A>(fa: ReaderEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <R, E = never, A = never>(e: E) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <R, E = never, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E = never, A = never>(me: R.Reader<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftReaderIO

**Signature**

```ts
export declare const leftReaderIO: <R, E = never, A = never>(me: RIO.ReaderIO<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v2.13.0

## leftReaderTask

**Signature**

```ts
export declare const leftReaderTask: <R, E = never, A = never>(me: RT.ReaderTask<R, E>) => ReaderTaskEither<R, E, A>
```

Added in v2.5.0

## leftTask

**Signature**

```ts
export declare const leftTask: <R, E = never, A = never>(me: T.Task<E>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <R, E = never, A = never>(a: A) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <R, E = never, A = never>(ma: IO<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## rightReaderIO

**Signature**

```ts
export declare const rightReaderIO: <R, E = never, A = never>(ma: RIO.ReaderIO<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.13.0

## rightReaderTask

**Signature**

```ts
export declare const rightReaderTask: <R, E = never, A = never>(ma: RT.ReaderTask<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.5.0

## rightTask

**Signature**

```ts
export declare const rightTask: <R, E = never, A = never>(ma: T.Task<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# destructors

## fold

Alias of [`matchE`](#matche).

**Signature**

```ts
export declare const fold: <R, E, A, B>(
  onLeft: (e: E) => RT.ReaderTask<R, B>,
  onRight: (a: A) => RT.ReaderTask<R, B>
) => (ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, B>
```

Added in v2.0.0

## foldW

Alias of [`matchEW`](#matchew).

**Signature**

```ts
export declare const foldW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => RT.ReaderTask<R2, B>,
  onRight: (a: A) => RT.ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => RT.ReaderTask<R1 & R2 & R3, B | C>
```

Added in v2.10.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <R, E, A>(
  onLeft: (e: E) => RT.ReaderTask<R, A>
) => (ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getorelse).

The `W` suffix (short for **W**idening) means that the handler return type will be merged.

**Signature**

```ts
export declare const getOrElseW: <R2, E, B>(
  onLeft: (e: E) => RT.ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => RT.ReaderTask<R1 & R2, B | A>
```

Added in v2.6.0

## match

**Signature**

```ts
export declare const match: <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B
) => <R>(ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, B>
```

Added in v2.10.0

## matchE

The `E` suffix (short for **E**ffect) means that the handlers return an effect (`ReaderTask`).

**Signature**

```ts
export declare const matchE: <R, E, A, B>(
  onLeft: (e: E) => RT.ReaderTask<R, B>,
  onRight: (a: A) => RT.ReaderTask<R, B>
) => (ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, B>
```

Added in v2.10.0

## matchEW

Less strict version of [`matchE`](#matche).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchEW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => RT.ReaderTask<R2, B>,
  onRight: (a: A) => RT.ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => RT.ReaderTask<R1 & R2 & R3, B | C>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

The `W` suffix (short for **W**idening) means that the handler return types will be merged.

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => B,
  onRight: (a: A) => C
) => <R>(ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, B | C>
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt3<'ReaderTaskEither'>
```

Added in v2.7.0

## ApplicativePar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplicativePar: Applicative3<'ReaderTaskEither'>
```

Added in v2.7.0

## ApplicativeSeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplicativeSeq: Applicative3<'ReaderTaskEither'>
```

Added in v2.7.0

## ApplyPar

Runs computations in parallel.

**Signature**

```ts
export declare const ApplyPar: Apply3<'ReaderTaskEither'>
```

Added in v2.10.0

## ApplySeq

Runs computations sequentially.

**Signature**

```ts
export declare const ApplySeq: Apply3<'ReaderTaskEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor3<'ReaderTaskEither'>
```

Added in v2.7.0

## Chain

**Signature**

```ts
export declare const Chain: Chain3<'ReaderTaskEither'>
```

Added in v2.10.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither3<'ReaderTaskEither'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO3<'ReaderTaskEither'>
```

Added in v2.10.0

## FromReader

**Signature**

```ts
export declare const FromReader: FromReader3<'ReaderTaskEither'>
```

Added in v2.11.0

## FromTask

**Signature**

```ts
export declare const FromTask: FromTask3<'ReaderTaskEither'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor3<'ReaderTaskEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad3<'ReaderTaskEither'>
```

Added in v2.10.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO3<'ReaderTaskEither'>
```

Added in v2.10.0

## MonadTask

**Signature**

```ts
export declare const MonadTask: MonadTask3<'ReaderTaskEither'>
```

Added in v2.10.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow3<'ReaderTaskEither'>
```

Added in v2.10.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed3<'ReaderTaskEither'>
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderTaskEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getAltReaderTaskValidation

The default [`Alt`](#alt) instance returns the last error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getAltValidation`](./Either.ts.html#getaltvalidation).

**Signature**

```ts
export declare function getAltReaderTaskValidation<E>(S: Semigroup<E>): Alt3C<URI, E>
```

Added in v2.7.0

## getApplicativeReaderTaskValidation

The default [`ApplicativePar`](#applicativepar) instance returns the first error, if you want to
get all errors you need to provide a way to concatenate them via a `Semigroup`.

See [`getApplicativeValidation`](./Either.ts.html#getapplicativevalidation).

**Signature**

```ts
export declare function getApplicativeReaderTaskValidation<E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative3C<URI, E>
```

Added in v2.7.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable3C<'ReaderTaskEither', E>
```

Added in v2.10.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable3C<URI, E>
```

Added in v2.10.0

## ~~getApplyMonoid~~

Use [`getApplicativeMonoid`](./Applicative.ts.html#getapplicativemonoid) instead.

**Signature**

```ts
export declare const getApplyMonoid: <R, E, A>(M: Monoid<A>) => Monoid<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare const getApplySemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## ~~getReaderTaskValidation~~

Use [`getApplicativeReaderTaskValidation`](#getapplicativereadertaskvalidation) and [`getAltReaderTaskValidation`](#getaltreadertaskvalidation) instead.

**Signature**

```ts
export declare function getReaderTaskValidation<E>(
  SE: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E>
```

Added in v2.3.0

## ~~getSemigroup~~

Use [`getApplySemigroup`](./Apply.ts.html#getapplysemigroup) instead.

**Signature**

```ts
export declare const getSemigroup: <R, E, A>(S: Semigroup<A>) => Semigroup<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## ~~readerTaskEitherSeq~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RTE.Functor` instead of `RTE.readerTaskEitherSeq`
(where `RTE` is from `import RTE from 'fp-ts/ReaderTaskEither'`)

**Signature**

```ts
export declare const readerTaskEitherSeq: Monad3<'ReaderTaskEither'> &
  Bifunctor3<'ReaderTaskEither'> &
  Alt3<'ReaderTaskEither'> &
  MonadTask3<'ReaderTaskEither'> &
  MonadThrow3<'ReaderTaskEither'>
```

Added in v2.0.0

## ~~readerTaskEither~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `RTE.Functor` instead of `RTE.readerTaskEither`
(where `RTE` is from `import RTE from 'fp-ts/ReaderTaskEither'`)

**Signature**

```ts
export declare const readerTaskEither: Monad3<'ReaderTaskEither'> &
  Bifunctor3<'ReaderTaskEither'> &
  Alt3<'ReaderTaskEither'> &
  MonadTask3<'ReaderTaskEither'> &
  MonadThrow3<'ReaderTaskEither'>
```

Added in v2.0.0

# interop

## chainNullableK

**Signature**

```ts
export declare const chainNullableK: <E>(
  e: E
) => <A, B>(
  f: (a: A) => B | null | undefined
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, NonNullable<B>>
```

Added in v2.12.0

## fromNullable

**Signature**

```ts
export declare const fromNullable: <E>(e: E) => <R, A>(a: A) => ReaderTaskEither<R, E, NonNullable<A>>
```

Added in v2.12.0

## fromNullableK

**Signature**

```ts
export declare const fromNullableK: <E>(
  e: E
) => <A extends readonly unknown[], B>(
  f: (...a: A) => B | null | undefined
) => <R = unknown>(...a: A) => ReaderTaskEither<R, E, NonNullable<B>>
```

Added in v2.12.0

## toUnion

**Signature**

```ts
export declare const toUnion: <R, E, A>(fa: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, E | A>
```

Added in v2.10.0

# model

## ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
```

Added in v2.0.0

# natural transformations

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A, R = unknown>(fa: E.Either<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, R = unknown, E = never>(fa: IO<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromIOEither

**Signature**

```ts
export declare const fromIOEither: <E, A, R = unknown>(fa: IOEither<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A, R = unknown>(fa: Option<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromReader

**Signature**

```ts
export declare const fromReader: <R, A, E = never>(fa: R.Reader<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.11.0

## fromTask

**Signature**

```ts
export declare const fromTask: <A, R = unknown, E = never>(fa: T.Task<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <E, A, R = unknown>(fa: TE.TaskEither<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: ReaderTaskEither<unknown, never, readonly []>
```

Added in v2.11.0

## Do

**Signature**

```ts
export declare const Do: ReaderTaskEither<unknown, never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R, E, B>
) => (
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

Less strict version of [`apS`](#aps).

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, R, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (
  ma: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(
  name: N
) => <R, E, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, { readonly [K in N]: A }>
```

Added in v2.8.0

## bindW

The `W` suffix (short for **W**idening) means that the environment types and the error types will be merged.

**Signature**

```ts
export declare const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare function bracket<R, E, A, B>(
  acquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B>
```

Added in v2.0.4

## bracketW

Less strict version of [`bracket`](#bracket).

**Signature**

```ts
export declare function bracketW<R1, E1, A, R2, E2, B, R3, E3>(
  acquire: ReaderTaskEither<R1, E1, A>,
  use: (a: A) => ReaderTaskEither<R2, E2, B>,
  release: (a: A, e: Either<E2, B>) => ReaderTaskEither<R3, E3, void>
): ReaderTaskEither<R1 & R2 & R3, E1 | E2 | E3, B>
```

Added in v2.12.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <R, E>(
  fa: ReaderTaskEither<R, E, A>
) => ReaderTaskEither<R, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.13.0

## sequenceArray

**Signature**

```ts
export declare const sequenceArray: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v2.9.0

## sequenceSeqArray

**Signature**

```ts
export declare const sequenceSeqArray: <R, E, A>(
  arr: readonly ReaderTaskEither<R, E, A>[]
) => ReaderTaskEither<R, E, readonly A[]>
```

Added in v2.9.0

## traverseArray

**Signature**

```ts
export declare const traverseArray: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

**Signature**

```ts
export declare const traverseArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.9.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndex

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndex: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseReadonlyNonEmptyArrayWithIndexSeq

Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyNonEmptyArrayWithIndexSeq: <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: ReadonlyNonEmptyArray<A>) => ReaderTaskEither<R, E, ReadonlyNonEmptyArray<B>>
```

Added in v2.11.0

## traverseSeqArray

**Signature**

```ts
export declare const traverseSeqArray: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.9.0

## traverseSeqArrayWithIndex

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <R, E, A, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
) => (as: readonly A[]) => ReaderTaskEither<R, E, readonly B[]>
```

Added in v2.9.0

## ~~run~~

**Signature**

```ts
export declare function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>>
```

Added in v2.0.0
