---
title: IOEither.ts
nav_order: 44
parent: Modules
---

# IOEither overview

`IOEither<E, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `E`. If you want to represent a synchronous computation that never fails, please see `IO`.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [IOEither (interface)](#ioeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [bimap](#bimap)
- [bracket](#bracket)
- [chain](#chain)
- [chainEitherK](#chaineitherk)
- [chainFirst](#chainfirst)
- [filterOrElse](#filterorelse)
- [flatten](#flatten)
- [fold](#fold)
- [fromEither](#fromeither)
- [fromEitherK](#fromeitherk)
- [fromOption](#fromoption)
- [fromPredicate](#frompredicate)
- [getApplyMonoid](#getapplymonoid)
- [getApplySemigroup](#getapplysemigroup)
- [getFilterable](#getfilterable)
- [getIOValidation](#getiovalidation)
- [getOrElse](#getorelse)
- [getSemigroup](#getsemigroup)
- [ioEither](#ioeither)
- [left](#left)
- [leftIO](#leftio)
- [map](#map)
- [mapLeft](#mapleft)
- [orElse](#orelse)
- [right](#right)
- [rightIO](#rightio)
- [swap](#swap)
- [tryCatch](#trycatch)

---

# IOEither (interface)

**Signature**

```ts
export interface IOEither<E, A> extends IO<Either<E, A>> {}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export declare const URI: 'IOEither'
```

Added in v2.0.0

# alt

**Signature**

```ts
export declare const alt: <E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# ap

**Signature**

```ts
export declare const ap: <E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
export declare const apFirst: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
export declare const apSecond: <E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# bimap

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
```

Added in v2.0.0

# bracket

Make sure that a resource is cleaned up in the event of an exception (_). The release action is called regardless of
whether the body action throws (_) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export declare function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B>
```

Added in v2.0.0

# chain

**Signature**

```ts
export declare const chain: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# chainEitherK

**Signature**

```ts
export declare function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.4.0

# chainFirst

**Signature**

```ts
export declare const chainFirst: <E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# filterOrElse

**Signature**

```ts
export declare const filterOrElse: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>
}
```

Added in v2.0.0

# flatten

**Signature**

```ts
export declare const flatten: <E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export declare function fold<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>): (ma: IOEither<E, A>) => IO<B>
```

Added in v2.0.0

# fromEither

**Signature**

```ts
export declare const fromEither: <E, A>(ma: E.Either<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# fromEitherK

**Signature**

```ts
export declare function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B>
```

Added in v2.4.0

# fromOption

**Signature**

```ts
export declare const fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => IOEither<E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
export declare const fromPredicate: {
  <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>
  <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>
}
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export declare function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>>
```

Added in v2.0.0

# getApplySemigroup

Semigroup returning the left-most `Left` value. If both operands are `Right`s then the inner values
are appended using the provided `Semigroup`

**Signature**

```ts
export declare function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
```

Added in v2.0.0

# getFilterable

**Signature**

```ts
export declare function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E>
```

Added in v2.1.0

# getIOValidation

**Signature**

```ts
export declare function getIOValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2<URI> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E>
```

Added in v2.0.0

# getOrElse

**Signature**

```ts
export declare function getOrElse<E, A>(onLeft: (e: E) => IO<A>): (ma: IOEither<E, A>) => IO<A>
```

Added in v2.0.0

# getSemigroup

Semigroup returning the left-most non-`Left` value. If both operands are `Right`s then the inner values are
appended using the provided `Semigroup`

**Signature**

```ts
export declare function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>>
```

Added in v2.0.0

# ioEither

**Signature**

```ts
export declare const ioEither: Monad2<'IOEither'> &
  Bifunctor2<'IOEither'> &
  Alt2<'IOEither'> &
  MonadIO2<'IOEither'> &
  MonadThrow2<'IOEither'>
```

Added in v2.0.0

# left

**Signature**

```ts
export declare const left: <E = never, A = never>(l: E) => IOEither<E, A>
```

Added in v2.0.0

# leftIO

**Signature**

```ts
export declare const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A>
```

Added in v2.0.0

# map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
```

Added in v2.0.0

# orElse

**Signature**

```ts
export declare function orElse<E, A, M>(onLeft: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A>
```

Added in v2.0.0

# right

**Signature**

```ts
export declare const right: <E = never, A = never>(a: A) => IOEither<E, A>
```

Added in v2.0.0

# rightIO

**Signature**

```ts
export declare const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A>
```

Added in v2.0.0

# swap

**Signature**

```ts
export declare const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E>
```

Added in v2.0.0

# tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw

**Signature**

```ts
export declare function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A>
```

Added in v2.0.0
