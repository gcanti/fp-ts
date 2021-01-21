---
title: IOEither.ts
nav_order: 43
parent: Modules
---

## IOEither overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.

Added in v3.0.0

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
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirstW](#chainfirstw)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [fromEitherK](#fromeitherk)
  - [orElse](#orelse)
  - [orElseW](#orelsew)
  - [swap](#swap)
  - [tryCatchK](#trycatchk)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromIO](#fromio)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [right](#right)
  - [rightIO](#rightio)
  - [tryCatch](#trycatch)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [toUnion](#tounion)
- [instances](#instances)
  - [Alt](#alt-1)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [ApplySeq](#applyseq)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [Pointed](#pointed-1)
  - [URI (type alias)](#uri-type-alias)
  - [getAltIOValidation](#getaltiovalidation)
  - [getApplicativeIOValidation](#getapplicativeiovalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
- [model](#model)
  - [IOEither (interface)](#ioeither-interface)
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
  - [bracket](#bracket)
  - [sequenceReadonlyArray](#sequencereadonlyarray)
  - [sequenceReadonlyArraySeq](#sequencereadonlyarrayseq)
  - [traverseReadonlyArray](#traversereadonlyarray)
  - [traverseReadonlyArraySeq](#traversereadonlyarrayseq)
  - [traverseReadonlyArrayWithIndex](#traversereadonlyarraywithindex)
  - [traverseReadonlyArrayWithIndexSeq](#traversereadonlyarraywithindexseq)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <E, A>(second: Lazy<IOEither<E, A>>) => (first: IOEither<E, A>) => IOEither<E, A>
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <E2, B>(
  second: Lazy<IOEither<E2, B>>
) => <E1, A>(first: IOEither<E1, A>) => IOEither<E2 | E1, B | A>
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v3.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: IOEither<E, A>) => IOEither<G, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: IOEither<E, A>) => IOEither<G, A>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, E, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A, E>(a: A) => IOEither<E, A>
```

Added in v3.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <A, E2, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v3.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

**Signature**

```ts
export declare const chainFirstW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(first: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v3.0.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <A, B, E>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <A, E>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
```

Added in v3.0.0

## filterOrElseW

Less strict version of [`filterOrElse`](#filterOrElse).

**Signature**

```ts
export declare const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <E1>(
    ma: IOEither<E1, A>
  ) => IOEither<E2 | E1, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, A>
}
```

Added in v3.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A extends readonly unknown[], B>(
  f: (...a: A) => E.Either<E, B>
) => (...a: A) => IOEither<E, B>
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, E2, A>(
  onLeft: (e: E1) => I.IO<E.Either<E2, A>>
) => (ma: I.IO<E.Either<E1, A>>) => I.IO<E.Either<E2, A>>
```

Added in v3.0.0

## orElseW

Less strict version of [`orElse`](#orElse).

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: I.IO<E.Either<E, A>>) => I.IO<E.Either<A, E>>
```

Added in v3.0.0

## tryCatchK

Converts a function that may throw to one returning a `IOEither`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onError: (reason: unknown) => E
) => (...a: A) => IOEither<unknown, B>
```

Added in v3.0.0

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(e: E.Either<E, A>) => IOEither<E, A>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <A, E>(fa: I.IO<A>) => IOEither<E, A>
```

Added in v3.0.0

## fromOption

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A>
```

Added in v3.0.0

## fromPredicate

Derivable from `FromEither`.

**Signature**

```ts
export declare const fromPredicate: {
  <A, B>(refinement: Refinement<A, B>): (a: A) => IOEither<A, B>
  <A>(predicate: Predicate<A>): (a: A) => IOEither<A, A>
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, A = never>(e: E) => IOEither<E, A>
```

Added in v3.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E, A = never>(me: I.IO<E>) => IOEither<E, A>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <A, E = never>(a: A) => IOEither<E, A>
```

Added in v3.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <A, E = never>(ma: I.IO<A>) => IOEither<E, A>
```

Added in v3.0.0

## tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw.

**Signature**

```ts
export declare const tryCatch: <A>(f: Lazy<A>) => IOEither<unknown, A>
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, A>
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, B>
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <A, E, B>(f: (a: A) => IOEither<E, B>) => (first: IOEither<E, A>) => IOEither<E, A>
```

Added in v3.0.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v3.0.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <E, B, A>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: I.IO<E.Either<E, A>>) => I.IO<B>
```

Added in v3.0.0

## foldW

Less strict version of [`fold`](#fold).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<C>
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v3.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => I.IO<A>) => (ma: I.IO<E.Either<E, A>>) => I.IO<A>
```

Added in v3.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => I.IO<B>) => <A>(ma: IOEither<E, A>) => I.IO<B | A>
```

Added in v3.0.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(ma: I.IO<E.Either<E, A>>) => I.IO<E | A>
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'IOEither'>
```

Added in v3.0.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'IOEither'>
```

Added in v3.0.0

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'IOEither'>
```

Added in v3.0.0

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply2<'IOEither'>
```

Added in v3.0.0

## ApplySeq

**Signature**

```ts
export declare const ApplySeq: Apply2<'IOEither'>
```

Added in v3.0.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'IOEither'>
```

Added in v3.0.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'IOEither'>
```

Added in v3.0.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'IOEither'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'IOEither'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'IOEither'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'IOEither'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'IOEither'
```

Added in v3.0.0

## getAltIOValidation

**Signature**

```ts
export declare const getAltIOValidation: <E>(S: Semigroup<E>) => Alt2C<'IOEither', E>
```

Added in v3.0.0

## getApplicativeIOValidation

**Signature**

```ts
export declare const getApplicativeIOValidation: <E>(S: Semigroup<E>) => Applicative2C<'IOEither', E>
```

Added in v3.0.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'IOEither', E>
```

Added in v3.0.0

## getFilterable

**Signature**

```ts
export declare const getFilterable: <E>(M: Monoid<E>) => Filterable2C<'IOEither', E>
```

Added in v3.0.0

# model

## IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: IOEither<never, readonly []>
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: IOEither<never, {}>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSW

Less strict version of [`apS`](#apS).

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <E, B>(fb: IOEither<E, B>) => <A>(fas: IOEither<E, A>) => IOEither<E, readonly [any, B]>
```

Added in v3.0.0

## apTW

Less strict version of [`apT`](#apT).

**Signature**

```ts
export declare const apTW: <E2, B>(
  fb: IOEither<E2, B>
) => <E1, A extends readonly unknown[]>(fas: IOEither<E1, A>) => IOEither<E2 | E1, readonly [any, B]>
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }>
```

Added in v3.0.0

## bindW

Less strict version of [`bind`](#bind).

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare const bracket: <E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: E.Either<E, B>) => IOEither<E, void>
) => IOEither<E, B>
```

Added in v3.0.0

## sequenceReadonlyArray

Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.

**Signature**

```ts
export declare const sequenceReadonlyArray: <E, A>(as: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v3.0.0

## sequenceReadonlyArraySeq

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceReadonlyArraySeq: <E, A>(as: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v3.0.0

## traverseReadonlyArray

Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArraySeq

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArraySeq: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## traverseReadonlyArrayWithIndexSeq

Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseReadonlyArrayWithIndexSeq: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <E, A>(fa: IOEither<E, A>) => IOEither<E, readonly [A]>
```

Added in v3.0.0
