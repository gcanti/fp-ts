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
- [URI (constant)](#uri-constant)
- [left (constant)](#left-constant)
- [leftReader (constant)](#leftreader-constant)
- [readerEither (constant)](#readereither-constant)
- [right (constant)](#right-constant)
- [rightReader (constant)](#rightreader-constant)
- [swap (constant)](#swap-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [chainEitherK (function)](#chaineitherk-function)
- [fold (function)](#fold-function)
- [fromEitherK (function)](#fromeitherk-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
- [getReaderValidation (function)](#getreadervalidation-function)
- [getSemigroup (function)](#getsemigroup-function)
- [local (function)](#local-function)
- [orElse (function)](#orelse-function)
- [alt (export)](#alt-export)
- [ap (export)](#ap-export)
- [apFirst (export)](#apfirst-export)
- [apSecond (export)](#apsecond-export)
- [bimap (export)](#bimap-export)
- [chain (export)](#chain-export)
- [chainFirst (export)](#chainfirst-export)
- [filterOrElse (export)](#filterorelse-export)
- [flatten (export)](#flatten-export)
- [fromEither (export)](#fromeither-export)
- [fromOption (export)](#fromoption-export)
- [fromPredicate (export)](#frompredicate-export)
- [map (export)](#map-export)
- [mapLeft (export)](#mapleft-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "ReaderEither" = ...
```

Added in v2.0.0

# left (constant)

**Signature**

```ts
export const left: <R, E = ...
```

Added in v2.0.0

# leftReader (constant)

**Signature**

```ts
export const leftReader: <R, E = ...
```

Added in v2.0.0

# readerEither (constant)

**Signature**

```ts
export const readerEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadThrow3<URI> = ...
```

Added in v2.0.0

# right (constant)

**Signature**

```ts
export const right: <R, E = ...
```

Added in v2.0.0

# rightReader (constant)

**Signature**

```ts
export const rightReader: <R, E = ...
```

Added in v2.0.0

# swap (constant)

**Signature**

```ts
export const swap: <R, E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<R, A, E> = ...
```

Added in v2.0.0

# ask (function)

**Signature**

```ts
export function ask<R, E = never>(): ReaderEither<R, E, R> { ... }
```

Added in v2.0.0

# asks (function)

**Signature**

```ts
export function asks<R, E = never, A = never>(f: (r: R) => A): ReaderEither<R, E, A> { ... }
```

Added in v2.0.0

# chainEitherK (function)

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B> { ... }
```

Added in v2.4.0

# fold (function)

**Signature**

```ts
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, B>,
  onRight: (a: A) => Reader<R, B>
): (ma: ReaderEither<R, E, A>) => Reader<R, B> { ... }
```

Added in v2.0.0

# fromEitherK (function)

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderEither<R, E, B> { ... }
```

Added in v2.4.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<R, E, A>(onLeft: (e: E) => Reader<R, A>): (ma: ReaderEither<R, E, A>) => Reader<R, A> { ... }
```

Added in v2.0.0

# getReaderValidation (function)

**Signature**

```ts
export function getReaderValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3C<URI, E> & Alt3C<URI, E> & MonadThrow3C<URI, E> { ... }
```

Added in v2.3.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderEither<R, E, A>> { ... }
```

Added in v2.0.0

# local (function)

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderEither<R, E, A>) => ReaderEither<Q, E, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderEither<R, M, A>
): (ma: ReaderEither<R, E, A>) => ReaderEither<R, M, A> { ... }
```

Added in v2.0.0

# alt (export)

**Signature**

```ts
<R, E, A>(that: () => ReaderEither<R, E, A>) => (fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<R, E, A>(fa: ReaderEither<R, E, A>) => <B>(fab: ReaderEither<R, E, (a: A) => B>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<R, E, B>(fb: ReaderEither<R, E, B>) => <A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderEither<R, E, B>) => (ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# filterOrElse (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderEither<R, E, A>) => ReaderEither<R, E, A>; }
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<R, E, A>(mma: ReaderEither<R, E, ReaderEither<R, E, A>>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fromEither (export)

**Signature**

```ts
<R, E, A>(ma: E.Either<E, A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderEither<R, E, A>
```

Added in v2.0.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderEither<R, E, A>; }
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: ReaderEither<R, E, A>) => ReaderEither<R, E, B>
```

Added in v2.0.0

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: ReaderEither<R, E, A>) => ReaderEither<R, G, A>
```

Added in v2.0.0
