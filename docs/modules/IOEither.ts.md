---
title: IOEither.ts
nav_order: 44
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
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [apW](#apw)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [chainFirstW](#chainfirstw)
  - [chainW](#chainw)
  - [flatten](#flatten)
- [MonadIO](#monadio)
  - [fromIO](#fromio)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [filterOrElse](#filterorelse)
  - [fromEitherK](#fromeitherk)
  - [orElse](#orelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromEither](#fromeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftIO](#leftio)
  - [right](#right)
  - [rightIO](#rightio)
  - [tryCatch](#trycatch)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Bifunctor](#bifunctor-1)
  - [Functor](#functor-1)
  - [Monad](#monad-1)
  - [MonadIO](#monadio-1)
  - [MonadThrow](#monadthrow-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getAltIOValidation](#getaltiovalidation)
  - [getApplicativeIOValidation](#getapplicativeiovalidation)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getFilterable](#getfilterable)
  - [getIOValidation](#getiovalidation)
  - [getSemigroup](#getsemigroup)
  - [ioEither](#ioeither)
- [model](#model)
  - [IOEither (interface)](#ioeither-interface)
- [utils](#utils)
  - [apS](#aps)
  - [apSW](#apsw)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [bindW](#bindw)
  - [bracket](#bracket)

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

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

## apW

Less strict version of [`ap`](#ap).

**Signature**

```ts
export declare const apW: <D, A>(fa: IOEither<D, A>) => <E, B>(fab: IOEither<E, (a: A) => B>) => IOEither<D | E, B>
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

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

## chainFirstW

Less strict version of [`chainFirst`](#chainFirst).

**Signature**

```ts
export declare const chainFirstW: <D, A, B>(
  f: (a: A) => IOEither<D, B>
) => <E>(ma: IOEither<E, A>) => IOEither<D | E, A>
```

Added in v2.8.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <D, A, B>(f: (a: A) => IOEither<D, B>) => <E>(ma: IOEither<E, A>) => IOEither<D | E, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v2.0.0

# MonadIO

## fromIO

**Signature**

```ts
export declare const fromIO: <E, A>(fa: I.IO<A>) => IOEither<E, A>
```

Added in v2.7.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <E, A>(e: E) => IOEither<E, A>
```

Added in v2.7.0

# combinators

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
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <D>(ma: IOEither<D, A>) => IOEither<E | D, B>
```

Added in v2.6.1

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B>
```

Added in v2.4.0

## orElse

**Signature**

```ts
export declare const orElse: <E, A, M>(onLeft: (e: E) => IOEither<M, A>) => (ma: IOEither<E, A>) => IOEither<M, A>
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

Added in v2.0.0

# constructors

## fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A>
```

Added in v2.0.0

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
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
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

**Signature**

```ts
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A>
```

Added in v2.0.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <E, A, B>(
  onLeft: (e: E) => I.IO<B>,
  onRight: (a: A) => I.IO<B>
) => (ma: IOEither<E, A>) => I.IO<B>
```

Added in v2.0.0

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

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt2<'IOEither'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative2<'IOEither'>
```

Added in v2.7.0

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'IOEither'>
```

Added in v2.7.0

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
export declare function getAltIOValidation<E>(SE: Semigroup<E>): Alt2C<URI, E>
```

Added in v2.7.0

## getApplicativeIOValidation

**Signature**

```ts
export declare function getApplicativeIOValidation<E>(SE: Semigroup<E>): Applicative2C<URI, E>
```

Added in v2.7.0

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

## getIOValidation

**Signature**

```ts
export declare function getIOValidation<E>(
  SE: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
```

Added in v2.0.0

## ioEither

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

## apS

**Signature**

```ts
export declare const apS: <A, N extends string, E, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## apSW

**Signature**

```ts
export declare const apSW: <A, N extends string, D, B>(
  name: Exclude<N, keyof A>,
  fb: IOEither<D, B>
) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<E, B>
) => (fa: IOEither<E, A>) => IOEither<E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <E, A>(fa: IOEither<E, A>) => IOEither<E, { [K in N]: A }>
```

Added in v2.8.0

## bindW

**Signature**

```ts
export declare const bindW: <N extends string, A, D, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOEither<D, B>
) => <E>(fa: IOEither<E, A>) => IOEither<D | E, { [K in N | keyof A]: K extends keyof A ? A[K] : B }>
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
