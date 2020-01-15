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
export const URI: "IOEither" = ...
```

Added in v2.0.0

# alt

**Signature**

```ts
<E, A>(that: () => IOEither<E, A>) => (fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# ap

**Signature**

```ts
<E, A>(fa: IOEither<E, A>) => <B>(fab: IOEither<E, (a: A) => B>) => IOEither<E, B>
```

Added in v2.0.0

# apFirst

**Signature**

```ts
<E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# apSecond

**Signature**

```ts
<E, B>(fb: IOEither<E, B>) => <A>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# bimap

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: IOEither<E, A>) => IOEither<G, B>
```

Added in v2.0.0

# bracket

Make sure that a resource is cleaned up in the event of an exception (_). The release action is called regardless of
whether the body action throws (_) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export function bracket<E, A, B>(
  acquire: IOEither<E, A>,
  use: (a: A) => IOEither<E, B>,
  release: (a: A, e: Either<E, B>) => IOEither<E, void>
): IOEither<E, B> { ... }
```

Added in v2.0.0

# chain

**Signature**

```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# chainEitherK

**Signature**

```ts
export function chainEitherK<E, A, B>(f: (a: A) => Either<E, B>): (ma: IOEither<E, A>) => IOEither<E, B> { ... }
```

Added in v2.4.0

# chainFirst

**Signature**

```ts
<E, A, B>(f: (a: A) => IOEither<E, B>) => (ma: IOEither<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# filterOrElse

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: IOEither<E, A>) => IOEither<E, A>; }
```

Added in v2.0.0

# flatten

**Signature**

```ts
<E, A>(mma: IOEither<E, IOEither<E, A>>) => IOEither<E, A>
```

Added in v2.0.0

# fold

**Signature**

```ts
export function fold<E, A, B>(onLeft: (e: E) => IO<B>, onRight: (a: A) => IO<B>): (ma: IOEither<E, A>) => IO<B> { ... }
```

Added in v2.0.0

# fromEither

**Signature**

```ts
<E, A>(ma: E.Either<E, A>) => IOEither<E, A>
```

Added in v2.0.0

# fromEitherK

**Signature**

```ts
export function fromEitherK<E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
): (...a: A) => IOEither<E, B> { ... }
```

Added in v2.4.0

# fromOption

**Signature**

```ts
<E>(onNone: () => E) => <A>(ma: Option<A>) => IOEither<E, A>
```

Added in v2.0.0

# fromPredicate

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => IOEither<E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => IOEither<E, A>; }
```

Added in v2.0.0

# getApplyMonoid

**Signature**

```ts
export function getApplyMonoid<E, A>(M: Monoid<A>): Monoid<IOEither<E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup

**Signature**

```ts
export function getApplySemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> { ... }
```

Added in v2.0.0

# getFilterable

**Signature**

```ts
export function getFilterable<E>(M: Monoid<E>): Filterable2C<URI, E> { ... }
```

Added in v2.1.0

# getIOValidation

**Signature**

```ts
export function getIOValidation<E>(
  S: Semigroup<E>
): Monad2C<URI, E> & Bifunctor2C<URI, E> & Alt2C<URI, E> & MonadIO2C<URI, E> & MonadThrow2C<URI, E> { ... }
```

Added in v2.0.0

# getOrElse

**Signature**

```ts
export function getOrElse<E, A>(onLeft: (e: E) => IO<A>): (ma: IOEither<E, A>) => IO<A> { ... }
```

Added in v2.0.0

# getSemigroup

**Signature**

```ts
export function getSemigroup<E, A>(S: Semigroup<A>): Semigroup<IOEither<E, A>> { ... }
```

Added in v2.0.0

# ioEither

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadThrow2<URI> = ...
```

Added in v2.0.0

# left

**Signature**

```ts
export const left: <E = never, A = never>(l: E) => IOEither<E, A> = ...
```

Added in v2.0.0

# leftIO

**Signature**

```ts
export const leftIO: <E = never, A = never>(me: IO<E>) => IOEither<E, A> = ...
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: IOEither<E, A>) => IOEither<E, B>
```

Added in v2.0.0

# mapLeft

**Signature**

```ts
<E, G>(f: (e: E) => G) => <A>(fa: IOEither<E, A>) => IOEither<G, A>
```

Added in v2.0.0

# orElse

**Signature**

```ts
export function orElse<E, A, M>(onLeft: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A> { ... }
```

Added in v2.0.0

# right

**Signature**

```ts
export const right: <E = never, A = never>(a: A) => IOEither<E, A> = ...
```

Added in v2.0.0

# rightIO

**Signature**

```ts
export const rightIO: <E = never, A = never>(ma: IO<A>) => IOEither<E, A> = ...
```

Added in v2.0.0

# swap

**Signature**

```ts
export const swap: <E, A>(ma: IOEither<E, A>) => IOEither<A, E> = ...
```

Added in v2.0.0

# tryCatch

Constructs a new `IOEither` from a function that performs a side effect and might throw

**Signature**

```ts
export function tryCatch<E, A>(f: Lazy<A>, onError: (reason: unknown) => E): IOEither<E, A> { ... }
```

Added in v2.0.0
