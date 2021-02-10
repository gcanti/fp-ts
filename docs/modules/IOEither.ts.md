---
title: IOEither.ts
nav_order: 47
parent: Modules
---

## IOEither overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.

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
  - [apSecond](#apsecond)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [chainOptionK](#chainoptionk)
  - [filterOrElse](#filterorelse)
  - [filterOrElseW](#filterorelsew)
  - [flap](#flap)
  - [flatten](#flatten)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
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
- [destructors](#destructors)
  - [fold](#fold)
  - [foldW](#foldw)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
  - [match](#match)
  - [matchW](#matchw)
  - [toUnion](#tounion)
- [instances](#instances)
  - [Alt](#alt-1)
  - [ApplicativePar](#applicativepar)
  - [ApplicativeSeq](#applicativeseq)
  - [ApplyPar](#applypar)
  - [Bifunctor](#bifunctor-1)
  - [FromEither](#fromeither)
  - [FromIO](#fromio)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio)
  - [MonadThrow](#monadthrow-1)
  - [Pointed](#pointed-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltIOValidation](#getaltiovalidation)
  - [getApplicativeIOValidation](#getapplicativeiovalidation)
  - [getCompactable](#getcompactable)
  - [getFilterable](#getfilterable)
  - [~~Applicative~~](#applicative)
  - [~~getApplyMonoid~~](#getapplymonoid)
  - [~~getApplySemigroup~~](#getapplysemigroup)
  - [~~getIOValidation~~](#getiovalidation)
  - [~~getSemigroup~~](#getsemigroup)
  - [~~ioEither~~](#ioeither)
- [model](#model)
  - [IOEither (interface)](#ioeither-interface)
- [utils](#utils)
  - [Do](#do)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [bracket](#bracket)
  - [sequenceArray](#sequencearray)
  - [sequenceSeqArray](#sequenceseqarray)
  - [traverseArray](#traversearray)
  - [traverseArrayWithIndex](#traversearraywithindex)
  - [traverseSeqArray](#traverseseqarray)
  - [traverseSeqArrayWithIndex](#traverseseqarraywithindex)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <E, A>(that: Lazy<IOEither<E, A>>) => (fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <E2, B>(
  that: Lazy<IOEither<E2, B>>
) => <E1, A>(fa: IOEither<E1, A>) => IOEither<E2 | E1, B | A>
```

Added in v2.9.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <E2, A>(
  fa: IOEither<E2, A>
) => <E1, B>(fab: IOEither<E1, (a: A) => B>) => IOEither<E2 | E1, B>
```

Added in v2.8.0

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.6.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => IOEither<E, A>
```

Added in v2.7.0

# Pointed

## of

**Signature**

```ts
export declare const of: <E, A>(a: A) => IOEither<E, A>
```

Added in v2.8.5

# combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <E, B>(second: IOEither<E, B>) => <A>(first: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(f: (a: A) => E.Either<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <E2, A, B>(
  f: (a: A) => E.Either<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

Derivable from `Monad`.

**Signature**

```ts
export declare const chainFirstW: <E2, A, B>(
  f: (a: A) => IOEither<E2, B>
) => <E1>(ma: IOEither<E1, A>) => IOEither<E2 | E1, A>
```

Added in v2.8.0

## chainOptionK

**Signature**

```ts
export declare const chainOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (a: A) => Option<B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.10.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
```

Added in v2.0.0

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

Added in v2.9.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.10.0

## flatten

Derivable from `Monad`.

**Signature**

```ts
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <E, A, B>(f: (...a: A) => E.Either<E, B>) => (...a: A) => IOEither<E, B>
```

Added in v2.4.0

## fromOptionK

**Signature**

```ts
export declare const fromOptionK: <E>(
  onNone: Lazy<E>
) => <A, B>(f: (...a: A) => Option<B>) => (...a: A) => IOEither<E, B>
```

Added in v2.10.0

## orElse

**Signature**

```ts
export declare const orElse: <E1, A, E2>(onLeft: (e: E1) => IOEither<E2, A>) => (ma: IOEither<E1, A>) => IOEither<E2, A>
```

Added in v2.0.0

## orElseW

Less strict version of [`orElse`](#orElse).

**Signature**

```ts
export declare const orElseW: <E1, E2, B>(
  onLeft: (e: E1) => IOEither<E2, B>
) => <A>(ma: IOEither<E1, A>) => IOEither<E2, B | A>
```

Added in v2.10.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

Added in v2.0.0

## tryCatchK

Converts a function that may throw to one returning a `IOEither`.

**Signature**

```ts
export declare const tryCatchK: <A extends readonly unknown[], B, E>(
  f: (...a: A) => B,
  onThrow: (reason: unknown) => E
) => (...a: A) => IOEither<E, B>
```

Added in v2.10.0

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(e: E.Either<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## fromIO

**Signature**

```ts
export declare const fromIO: <E, A>(fa: I.IO<A>) => IOEither<E, A>
```

Added in v2.7.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <A>(ma: Option<A>) => IOEither<E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
}
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: I.IO<E>) => IOEither<E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>
```

Added in v2.0.0

## rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: I.IO<A>) => IOEither<E, A>
```

Added in v2.0.0

## tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw

See also [`tryCatchK`](#tryCatchK).

**Signature**

```ts
export declare const tryCatch: <E, A>(f: Lazy<A>, onThrow: (reason: unknown) => E) => IOEither<E, A>
```

Added in v2.0.0

# destructors

## fold

Alias of [`match`](#match).

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.0.0

## foldW

Alias of [`matchW`](#matchW).

**Signature**

```ts
export declare const foldW: <E, B, A, C>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<C>
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v2.10.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, A>(onLeft: (e: E) => I.IO<A>) => (ma: IOEither<E, A>) => I.IO<A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <E, B>(onLeft: (e: E) => I.IO<B>) => <A>(ma: IOEither<E, A>) => I.IO<B | A>
```

Added in v2.6.0

## match

**Signature**

```ts
export declare const match: <E, A, B>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.10.0

## matchW

Less strict version of [`match`](#match).

**Signature**

```ts
export declare const matchW: <E, B, A, C>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<C>
) => (ma: IOEither<E, A>) => I.IO<B | C>
```

Added in v2.10.0

## toUnion

**Signature**

```ts
export declare const toUnion: <E, A>(fa: I.IO<E.Either<E, A>>) => I.IO<E | A>
```

Added in v2.10.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'IOEither'>
```

Added in v2.7.0

## ApplicativePar

**Signature**

```ts
export declare const ApplicativePar: Applicative2<'IOEither'>
```

Added in v2.8.4

## ApplicativeSeq

**Signature**

```ts
export declare const ApplicativeSeq: Applicative2<'IOEither'>
```

Added in v2.8.4

## ApplyPar

**Signature**

```ts
export declare const ApplyPar: Apply2<'IOEither'>
```

Added in v2.10.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'IOEither'>
```

Added in v2.7.0

## FromEither

**Signature**

```ts
export declare const FromEither: FromEither2<'IOEither'>
```

Added in v2.10.0

## FromIO

**Signature**

```ts
export declare const FromIO: FromIO2<'IOEither'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'IOEither'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad2<'IOEither'>
```

Added in v2.7.0

## MonadIO

**Signature**

```ts
export declare const MonadIO: MonadIO2<'IOEither'>
```

Added in v2.7.0

## MonadThrow

**Signature**

```ts
export declare const MonadThrow: MonadThrow2<'IOEither'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed2<'IOEither'>
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'IOEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getAltIOValidation

**Signature**

```ts
export declare function getAltIOValidation<E>(S: Semigroup<E>): Alt2C<URI, E>
```

Added in v2.7.0

## getApplicativeIOValidation

**Signature**

```ts
export declare function getApplicativeIOValidation<E>(S: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getCompactable

**Signature**

```ts
export declare const getCompactable: <E>(M: Monoid<E>) => Compactable2C<'IOEither', E>
```

Added in v2.10.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

## ~~Applicative~~

Use `ApplicativePar` instead

**Signature**

```ts
export declare const Applicative: Applicative2<'IOEither'>
```

Added in v2.7.0

## ~~getApplyMonoid~~

Use `Applicative.getApplicativeMonoid` instead.

**Signature**

```ts
export declare const getApplyMonoid: <E, A>(M: Monoid<A>) => Monoid<IOEither<E, A>>
```

Added in v2.0.0

## ~~getApplySemigroup~~

Use `Apply.getApplySemigroup` instead.

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare const getApplySemigroup: <E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## ~~getIOValidation~~

Use `getApplicativeIOValidation` and `getAltIOValidation`.

**Signature**

```ts
export declare function getIOValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## ~~getSemigroup~~

Use `Apply.getApplySemigroup` instead.

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare const getSemigroup: <E, A>(S: Semigroup<A>) => Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## ~~ioEither~~

Use small, specific instances instead.

**Signature**

```ts
export declare const ioEither: Monad2<'IOEither'> &
  Bifunctor2<'IOEither'> &
  Alt2<'IOEither'> &
  MonadIO2<'IOEither'> &
  MonadThrow2<'IOEither'>
```

Added in v2.0.0

# model

## IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

Added in v2.0.0

# utils

## Do

**Signature**

```ts
export declare const Do: IOEither<never, {}>
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, E2, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (ma: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E2, B>
) => <E1>(fa: IOEither<E1, A>) => IOEither<E2 | E1, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

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

Added in v2.0.0

## sequenceArray

Equivalent to `ReadonlyArray#sequence(Applicative)`.

**Signature**

```ts
export declare const sequenceArray: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v2.9.0

## sequenceSeqArray

Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.

**Signature**

```ts
export declare const sequenceSeqArray: <E, A>(arr: readonly IOEither<E, A>[]) => IOEither<E, readonly A[]>
```

Added in v2.9.0

## traverseArray

Equivalent to `ReadonlyArray#traverse(Applicative)`.

**Signature**

```ts
export declare const traverseArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseSeqArray

Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.

**Signature**

```ts
export declare const traverseSeqArray: <A, E, B>(
  f: (a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0

## traverseSeqArrayWithIndex

Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.

**Signature**

```ts
export declare const traverseSeqArrayWithIndex: <A, E, B>(
  f: (index: number, a: A) => IOEither<E, B>
) => (as: readonly A[]) => IOEither<E, readonly B[]>
```

Added in v2.9.0
