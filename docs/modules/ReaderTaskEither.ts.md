---
title: ReaderTaskEither.ts
nav_order: 68
parent: Modules
---

## ReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Applicative](#applicative)
  - [of](#of)
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
  - [chainFirst](#chainfirst)
  - [chainW](#chainw)
  - [flatten](#flatten)
- [MonadIO](#monadio)
  - [fromIO](#fromio)
- [MonadTask](#monadtask)
  - [fromTask](#fromtask)
- [MonadThrow](#monadthrow)
  - [throwError](#throwerror)
- [combinators](#combinators)
  - [chainEitherK](#chaineitherk)
  - [chainEitherKW](#chaineitherkw)
  - [chainIOEitherK](#chainioeitherk)
  - [chainIOEitherKW](#chainioeitherkw)
  - [chainTaskEitherK](#chaintaskeitherk)
  - [chainTaskEitherKW](#chaintaskeitherkw)
  - [filterOrElse](#filterorelse)
  - [fromEitherK](#fromeitherk)
  - [fromIOEitherK](#fromioeitherk)
  - [fromTaskEitherK](#fromtaskeitherk)
  - [local](#local)
  - [orElse](#orelse)
  - [swap](#swap)
- [constructors](#constructors)
  - [ask](#ask)
  - [asks](#asks)
  - [fromEither](#fromeither)
  - [fromIOEither](#fromioeither)
  - [fromOption](#fromoption)
  - [fromPredicate](#frompredicate)
  - [fromReaderEither](#fromreadereither)
  - [fromTaskEither](#fromtaskeither)
  - [left](#left)
  - [leftIO](#leftio)
  - [leftReader](#leftreader)
  - [leftReaderTask](#leftreadertask)
  - [leftTask](#lefttask)
  - [right](#right)
  - [rightIO](#rightio)
  - [rightReader](#rightreader)
  - [rightReaderTask](#rightreadertask)
  - [rightTask](#righttask)
- [destructors](#destructors)
  - [fold](#fold)
  - [getOrElse](#getorelse)
  - [getOrElseW](#getorelsew)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [altReaderTaskEither](#altreadertaskeither)
  - [applicativeReaderTaskEitherPar](#applicativereadertaskeitherpar)
  - [applicativeReaderTaskEitherSeq](#applicativereadertaskeitherseq)
  - [bifunctorReaderTaskEither](#bifunctorreadertaskeither)
  - [functorReaderTaskEither](#functorreadertaskeither)
  - [getAltReaderTaskValidation](#getaltreadertaskvalidation)
  - [getApplicativeReaderTaskValidation](#getapplicativereadertaskvalidation)
  - [getApplyMonoid](#getapplymonoid)
  - [getApplySemigroup](#getapplysemigroup)
  - [getReaderTaskValidation](#getreadertaskvalidation)
  - [getSemigroup](#getsemigroup)
  - [readerTaskEither](#readertaskeither)
  - [readerTaskEitherSeq](#readertaskeitherseq)
- [model](#model)
  - [ReaderTaskEither (interface)](#readertaskeither-interface)
- [utils](#utils)
  - [bracket](#bracket)
  - [run](#run)

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

# Applicative

## of

**Signature**

```ts
export declare const of: <R, E, A>(a: A) => ReaderTaskEither<R, E, A>
```

Added in v2.7.0

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

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <R, E, B>(
  fb: ReaderTaskEither<R, E, B>
) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <R, E, B>(
  fb: ReaderTaskEither<R, E, B>
) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
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

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## chainW

Less strict version of [`chain`](#chain).

**Signature**

```ts
export declare const chainW: <R, E, A, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
) => <Q, D>(ma: ReaderTaskEither<Q, D, A>) => ReaderTaskEither<Q & R, E | D, B>
```

Added in v2.6.0

## flatten

**Signature**

```ts
export declare const flatten: <R, E, A>(
  mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# MonadIO

## fromIO

**Signature**

```ts
export declare const fromIO: <R, E, A>(fa: IO<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# MonadTask

## fromTask

**Signature**

```ts
export declare const fromTask: <R, E, A>(fa: T.Task<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# MonadThrow

## throwError

**Signature**

```ts
export declare const throwError: <R, E, A>(e: E) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# combinators

## chainEitherK

**Signature**

```ts
export declare const chainEitherK: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainEitherKW

Less strict version of [`chainEitherK`](#chainEitherK).

**Signature**

```ts
export declare const chainEitherKW: <E, A, B>(
  f: (a: A) => E.Either<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

Added in v2.6.1

## chainIOEitherK

**Signature**

```ts
export declare const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainIOEitherKW

Less strict version of [`chainIOEitherK`](#chainIOEitherK).

**Signature**

```ts
export declare const chainIOEitherKW: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

Added in v2.6.1

## chainTaskEitherK

**Signature**

```ts
export declare const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TE.TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## chainTaskEitherKW

Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).

**Signature**

```ts
export declare const chainTaskEitherKW: <E, A, B>(
  f: (a: A) => TE.TaskEither<E, B>
) => <R, D>(ma: ReaderTaskEither<R, D, A>) => ReaderTaskEither<R, E | D, B>
```

Added in v2.6.1

## filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(
    ma: ReaderTaskEither<R, E, A>
  ) => ReaderTaskEither<R, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
}
```

Added in v2.0.0

## fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## fromIOEitherK

**Signature**

```ts
export declare function fromIOEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## fromTaskEitherK

**Signature**

```ts
export declare function fromTaskEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B>
```

Added in v2.4.0

## local

**Signature**

```ts
export declare const local: <Q, R>(f: (f: Q) => R) => <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A>
```

Added in v2.0.0

## orElse

**Signature**

```ts
export declare function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A>
```

Added in v2.0.0

## swap

**Signature**

```ts
export declare function swap<R, E, A>(ma: ReaderTaskEither<R, E, A>): ReaderTaskEither<R, A, E>
```

Added in v2.0.0

# constructors

## ask

**Signature**

```ts
export declare const ask: <R, E = never>() => ReaderTaskEither<R, E, R>
```

Added in v2.0.0

## asks

**Signature**

```ts
export declare const asks: <R, E = never, A = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromEither

**Signature**

```ts
export declare const fromEither: <R, E, A>(ma: E.Either<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromIOEither

**Signature**

```ts
export declare function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: Lazy<E>) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<R, E, A>
}
```

Added in v2.0.0

## fromReaderEither

**Signature**

```ts
export declare function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## fromTaskEither

**Signature**

```ts
export declare const fromTaskEither: <R, E, A>(ma: TE.TaskEither<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## left

**Signature**

```ts
export declare function left<R, E = never, A = never>(e: E): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftIO

**Signature**

```ts
export declare function leftIO<R, E = never, A = never>(me: IO<E>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftReader

**Signature**

```ts
export declare function leftReader<R, E = never, A = never>(me: Reader<R, E>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## leftReaderTask

**Signature**

```ts
export declare function leftReaderTask<R, E = never, A = never>(me: ReaderTask<R, E>): ReaderTaskEither<R, E, A>
```

Added in v2.5.0

## leftTask

**Signature**

```ts
export declare function leftTask<R, E = never, A = never>(me: Task<E>): ReaderTaskEither<R, E, A>
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
export declare function rightIO<R, E = never, A = never>(ma: IO<A>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## rightReader

**Signature**

```ts
export declare const rightReader: <R, E = never, A = never>(ma: R.Reader<R, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

## rightReaderTask

**Signature**

```ts
export declare function rightReaderTask<R, E = never, A = never>(ma: ReaderTask<R, A>): ReaderTaskEither<R, E, A>
```

Added in v2.5.0

## rightTask

**Signature**

```ts
export declare function rightTask<R, E = never, A = never>(ma: Task<A>): ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# destructors

## fold

**Signature**

```ts
export declare function fold<R, E, A, B>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B>
```

Added in v2.0.0

## getOrElse

**Signature**

```ts
export declare const getOrElse: <R, E, A>(
  onLeft: (e: E) => RT.ReaderTask<R, A>
) => (ma: ReaderTaskEither<R, E, A>) => RT.ReaderTask<R, A>
```

Added in v2.0.0

## getOrElseW

Less strict version of [`getOrElse`](#getOrElse).

**Signature**

```ts
export declare const getOrElseW: <R, E, B>(
  onLeft: (e: E) => RT.ReaderTask<R, B>
) => <Q, A>(ma: ReaderTaskEither<Q, E, A>) => RT.ReaderTask<Q & R, B | A>
```

Added in v2.6.0

# instances

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

## altReaderTaskEither

**Signature**

```ts
export declare const altReaderTaskEither: Alt3<'ReaderTaskEither'>
```

Added in v2.7.0

## applicativeReaderTaskEitherPar

**Signature**

```ts
export declare const applicativeReaderTaskEitherPar: Applicative3<'ReaderTaskEither'>
```

Added in v2.7.0

## applicativeReaderTaskEitherSeq

**Signature**

```ts
export declare const applicativeReaderTaskEitherSeq: Applicative3<'ReaderTaskEither'>
```

Added in v2.7.0

## bifunctorReaderTaskEither

**Signature**

```ts
export declare const bifunctorReaderTaskEither: Bifunctor3<'ReaderTaskEither'>
```

Added in v2.7.0

## functorReaderTaskEither

**Signature**

```ts
export declare const functorReaderTaskEither: Functor3<'ReaderTaskEither'>
```

Added in v2.7.0

## getAltReaderTaskValidation

**Signature**

```ts
export declare function getAltReaderTaskValidation<E>(SE: Semigroup<E>): Alt3C<URI, E>
```

Added in v2.7.0

## getApplicativeReaderTaskValidation

**Signature**

```ts
export declare function getApplicativeReaderTaskValidation<E>(A: Apply1<T.URI>, SE: Semigroup<E>): Applicative3C<URI, E>
```

Added in v2.7.0

## getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## getReaderTaskValidation

**Signature**

```ts
export declare function getReaderTaskValidation<E>(
  SE: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3<URI> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E>
```

Added in v2.3.0

## getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
concatenated using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>>
```

Added in v2.0.0

## readerTaskEither

**Signature**

```ts
export declare const readerTaskEither: Monad3<'ReaderTaskEither'> &
  Bifunctor3<'ReaderTaskEither'> &
  Alt3<'ReaderTaskEither'> &
  MonadTask3<'ReaderTaskEither'> &
  MonadThrow3<'ReaderTaskEither'>
```

Added in v2.0.0

## readerTaskEitherSeq

Like `readerTaskEither` but `ap` is sequential

**Signature**

```ts
export declare const readerTaskEitherSeq: Monad3<'ReaderTaskEither'> &
  Bifunctor3<'ReaderTaskEither'> &
  Alt3<'ReaderTaskEither'> &
  MonadTask3<'ReaderTaskEither'> &
  MonadThrow3<'ReaderTaskEither'>
```

Added in v2.0.0

# model

## ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
```

Added in v2.0.0

# utils

## bracket

Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
whether the body action throws (\*) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare function bracket<R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B>
```

Added in v2.0.4

## run

**Signature**

```ts
export declare function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>>
```

Added in v2.0.0
