---
title: ReaderEither.ts
nav_order: 65
parent: Modules
---

# ReaderEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderEither (interface)](#readereither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [alt](#alt)
- [ap](#ap)
- [apFirst](#apfirst)
- [apSecond](#apsecond)
- [ask](#ask)
- [asks](#asks)
- [bimap](#bimap)
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
- [getOrElse](#getorelse)
- [getReaderValidation](#getreadervalidation)
- [getSemigroup](#getsemigroup)
- [left](#left)
- [leftReader](#leftreader)
- [local](#local)
- [map](#map)
- [mapLeft](#mapleft)
- [orElse](#orelse)
- [readerEither](#readereither)
- [right](#right)
- [rightReader](#rightreader)
- [swap](#swap)

---

# ReaderEither (interface)

**Signature**

```ts
export interface ReaderEither<R, E, A> extends Reader<R, Either<E, A>> {}
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
export const URI: "ReaderEither" = ...
```

Added in v2.0.0

# alt

**Signature**

```ts
<R, E, A>(that: () => ReaderEither<R, E, A>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# ap

**Signature**

```ts
<R, E, A>(fa: ReaderEither<R, E, A>) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# ask

**Signature**

```ts
export function ask<R, E = never>(): ReaderEither<R, E, R> { ... }
```

Added in v2.0.0

# asks

**Signature**

```ts
export function asks<R, E = never, A = never>(f: (r: R) => A): ReaderEither<R, E, A> { ... }
```

Added in v2.0.0

# bimap

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v2.0.0

# chain

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> { ... }
```

Added in v2.4.0

# chainFirst

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>; }
```

Added in v2.0.0

# flatten

**Signature**

```ts
<R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
): (ma: ReaderEither<R, E, A>) => Reader<R, B> { ... }
```

Added in v2.0.0

# fromEither

**Signature**

```ts
<R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B> { ... }
```

Added in v2.4.0

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>; }
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup

**Signature**

```ts
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getOrElse

**Signature**

```ts
export function getOrElse<R, E, A>(onLeft: (e: E) => Reader<R, A>): (ma: ReaderEither<R, E, A>) => Reader<R, A> { ... }
```

Added in v2.0.0

# getReaderValidation

**Signature**

```ts
export function getReaderValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3C<URI, E> & Alt3C<URI, E> & MonadThrow3C<URI, E> { ... }
```

Added in v2.3.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# left

**Signature**

```ts
export const left: <R, E = never, A = never>(e: E) => ReaderEither<R, E, A> = ...
```

Added in v2.0.0

# leftReader

**Signature**

```ts
export const leftReader: <R, E = never, A = never>(me: Reader<R, E>) => ReaderEither<R, E, A> = ...
```

Added in v2.0.0

# local

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A> { ... }
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v2.0.0

# orElse

**Signature**

```ts
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderEither<R, M, A>
): (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> { ... }
```

Added in v2.0.0

# readerEither

**Signature**

```ts
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = ...
```

Added in v2.0.0

# right

**Signature**

```ts
export const right: <R, E = never, A = never>(a: A) => ReaderEither<R, E, A> = ...
```

Added in v2.0.0

# rightReader

**Signature**

```ts
export const rightReader: <R, E = never, A = never>(ma: Reader<R, A>) => ReaderEither<R, E, A> = ...
```

Added in v2.0.0

# swap

**Signature**

```ts
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = ...
```

Added in v2.0.0
