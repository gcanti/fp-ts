---
title: ReaderEither.ts
nav_order: 65
parent: Modules
---

## ReaderEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainEitherKW](#chaineitherkw)
  - [chainFirst](#chainfirst)
  - [chainW](#chainw)
  - [flatten](#flatten)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [filterOrElse](#filterorelse)
  - [fromEitherK](#fromeitherk)
  - [local](#local)
  - [orElse](#orelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromEither](#fromeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [left](#left)
  - [leftReader](#leftreader)
  - [right](#right)
  - [rightReader](#rightreader)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [instances](#instances)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getReaderValidation](#getreadervalidation)
  - [getSemigroup](#getsemigroup)
  - [readerEither](#readereither)
- [model](#model)
  - [ReaderEither (interface)](#readereither-interface)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <R, E, A>(
  that: () => ReaderEither<R, E, A>
) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <R, E, A>(
  fa: ReaderEither<R, E, A>
) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  fb: ReaderEither<R, E, B>
) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# Bifunctor

## bimap

Map a pair of functions over the two last type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v2.0.0

## mapLeft

Map a function over the second type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v2.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

## chainEitherKW

**Signature**

```ts
export declare const chainEitherKW: <D, A, B>(
  f: (a: A) => E.Either<D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R, D | E, B>
```

Added in v2.6.1

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderEither<R, E, B>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## chainW

**Signature**

```ts
export declare const chainW: <Q, D, A, B>(
  f: (a: A) => ReaderEither<Q, D, B>
) => <R, E>(ma: ReaderEither<R, E, A>) => ReaderEither<R & Q, D | E, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.4.0

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderEither<R, E, A>
  ) => ReaderEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B>
```

Added in v2.4.0

## local

**Signature**

```ts
export declare function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A>
```

Added in v2.0.0

## orElse

**Signature**

```ts
export declare const orElse: <E, R, M, A>(
  onLeft: (e: E) => ReaderEither<R, M, A>
) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A>
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E>
```

Added in v2.0.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderEither<R, E, R>
```

Added in v2.0.0

## asks

**Signature**

```ts
export declare const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>
}
```

Added in v2.0.0

## left

**Signature**

```ts
export declare const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare const leftReader: <R, E = never, A = never>(me: R.Reader<R, E>) => ReaderEither<R, E, A>
```

Added in v2.0.0

## right

**Signature**

```ts
export declare const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# destructors

## fold

**Signature**

```ts
export declare const fold: <R, E, A, B>(
  onLeft: (e: E) => R.Reader<R, B>,
  onRight: (a: A) => R.Reader<R, B>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, B>
```

Added in v2.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <E, R, A>(
  onLeft: (e: E) => R.Reader<R, A>
) => (ma: ReaderEither<R, E, A>) => R.Reader<R, A>
```

Added in v2.0.0

## getOrElseW

**Signature**

```ts
export declare const getOrElseW: <Q, E, B>(
  onLeft: (e: E) => R.Reader<Q, B>
) => <R, A>(ma: ReaderEither<R, E, A>) => R.Reader<R & Q, B | A>
```

Added in v2.6.0

# instances

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## getReaderValidation

**Signature**

```ts
export declare function getReaderValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadThrow3C<URI, E>
```

Added in v2.3.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>>
```

Added in v2.0.0

## readerEither

**Signature**

```ts
export declare const readerEither: Monad3<'ReaderEither'> &
  Bifunctor3<'ReaderEither'> &
  Alt3<'ReaderEither'> &
  MonadThrow3<'ReaderEither'>
```

Added in v2.0.0

# model

## ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
```

Added in v2.0.0

## URI

**Signature**

```ts
export declare const URI: 'ReaderEither'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0
