---
title: ReaderTaskEither.ts
nav_order: 68
parent: Modules
---

# ReaderTaskEither overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderTaskEither (interface)](#readertaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ask (constant)](#ask-constant)
- [asks (constant)](#asks-constant)
- [fromTaskEither (constant)](#fromtaskeither-constant)
- [readerTaskEither (constant)](#readertaskeither-constant)
- [readerTaskEitherSeq (constant)](#readertaskeitherseq-constant)
- [right (constant)](#right-constant)
- [rightReader (constant)](#rightreader-constant)
- [bracket (function)](#bracket-function)
- [chainEitherK (function)](#chaineitherk-function)
- [chainIOEitherK (function)](#chainioeitherk-function)
- [chainTaskEitherK (function)](#chaintaskeitherk-function)
- [fold (function)](#fold-function)
- [fromEitherK (function)](#fromeitherk-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromIOEitherK (function)](#fromioeitherk-function)
- [fromReaderEither (function)](#fromreadereither-function)
- [fromTaskEitherK (function)](#fromtaskeitherk-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
- [getReaderTaskValidation (function)](#getreadertaskvalidation-function)
- [getSemigroup (function)](#getsemigroup-function)
- [left (function)](#left-function)
- [leftIO (function)](#leftio-function)
- [leftReader (function)](#leftreader-function)
- [leftTask (function)](#lefttask-function)
- [local (function)](#local-function)
- [orElse (function)](#orelse-function)
- [rightIO (function)](#rightio-function)
- [rightTask (function)](#righttask-function)
- [run (function)](#run-function)
- [swap (function)](#swap-function)
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

# ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}
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
export const URI: "ReaderTaskEither" = ...
```

Added in v2.0.0

# ask (constant)

**Signature**

```ts
export const ask: <R, E = ...
```

Added in v2.0.0

# asks (constant)

**Signature**

```ts
export const asks: <R, E = ...
```

Added in v2.0.0

# fromTaskEither (constant)

**Signature**

```ts
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> = ...
```

Added in v2.0.0

# readerTaskEither (constant)

**Signature**

```ts
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadTask3<URI> & MonadThrow3<URI> = ...
```

Added in v2.0.0

# readerTaskEitherSeq (constant)

Like `readerTaskEither` but `ap` is sequential

**Signature**

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
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

# bracket (function)

Make sure that a resource is cleaned up in the event of an exception (_). The release action is called regardless of
whether the body action throws (_) or returns.

(\*) i.e. returns a `Left`

**Signature**

```ts
export function bracket<R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B> { ... }
```

Added in v2.0.4

# chainEitherK (function)

**Signature**

```ts
export function chainEitherK<E, A, B>(
  f: (a: A) => Either<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# chainIOEitherK (function)

**Signature**

```ts
export function chainIOEitherK<E, A, B>(
  f: (a: A) => IOEither<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# chainTaskEitherK (function)

**Signature**

```ts
export function chainTaskEitherK<E, A, B>(
  f: (a: A) => TaskEither<E, B>
): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# fold (function)

**Signature**

```ts
export function fold<R, E, A, B>(
  onLeft: (e: E) => ReaderTask<R, B>,
  onRight: (a: A) => ReaderTask<R, B>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, B> { ... }
```

Added in v2.0.0

# fromEitherK (function)

**Signature**

```ts
export function fromEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => Either<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# fromIOEitherK (function)

**Signature**

```ts
export function fromIOEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => IOEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# fromReaderEither (function)

**Signature**

```ts
export function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# fromTaskEitherK (function)

**Signature**

```ts
export function fromTaskEitherK<E, A extends Array<unknown>, B>(
  f: (...a: A) => TaskEither<E, B>
): <R>(...a: A) => ReaderTaskEither<R, E, B> { ... }
```

Added in v2.4.0

# getApplyMonoid (function)

**Signature**

```ts
export function getApplyMonoid<R, E, A>(M: Monoid<A>): Monoid<ReaderTaskEither<R, E, A>> { ... }
```

Added in v2.0.0

# getApplySemigroup (function)

**Signature**

```ts
export function getApplySemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> { ... }
```

Added in v2.0.0

# getOrElse (function)

**Signature**

```ts
export function getOrElse<R, E, A>(
  onLeft: (e: E) => ReaderTask<R, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTask<R, A> { ... }
```

Added in v2.0.0

# getReaderTaskValidation (function)

**Signature**

```ts
export function getReaderTaskValidation<E>(
  S: Semigroup<E>
): Monad3C<URI, E> & Bifunctor3C<URI, E> & Alt3C<URI, E> & MonadTask3C<URI, E> & MonadThrow3C<URI, E> { ... }
```

Added in v2.3.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<R, E, A>(S: Semigroup<A>): Semigroup<ReaderTaskEither<R, E, A>> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<R, E = never, A = never>(e: E): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<R, E = never, A = never>(me: IO<E>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# leftReader (function)

**Signature**

```ts
export function leftReader<R, E = never, A = never>(me: Reader<R, E>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# leftTask (function)

**Signature**

```ts
export function leftTask<R, E = never, A = never>(me: Task<E>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# local (function)

**Signature**

```ts
export function local<Q, R>(f: (f: Q) => R): <E, A>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<Q, E, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<R, E, A, M>(
  onLeft: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> { ... }
```

Added in v2.0.0

# rightIO (function)

**Signature**

```ts
export function rightIO<R, E = never, A = never>(ma: IO<A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# rightTask (function)

**Signature**

```ts
export function rightTask<R, E = never, A = never>(ma: Task<A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> { ... }
```

Added in v2.0.0

# swap (function)

**Signature**

```ts
export function swap<R, E, A>(ma: ReaderTaskEither<R, E, A>): ReaderTaskEither<R, A, E> { ... }
```

Added in v2.0.0

# alt (export)

**Signature**

```ts
<R, E, A>(that: () => ReaderTaskEither<R, E, A>) => (fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# ap (export)

**Signature**

```ts
<R, E, A>(fa: ReaderTaskEither<R, E, A>) => <B>(fab: ReaderTaskEither<R, E, (a: A) => B>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

# apFirst (export)

**Signature**

```ts
<R, E, B>(fb: ReaderTaskEither<R, E, B>) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# apSecond (export)

**Signature**

```ts
<R, E, B>(fb: ReaderTaskEither<R, E, B>) => <A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

# bimap (export)

**Signature**

```ts
<E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, B>
```

Added in v2.0.0

# chain (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

# chainFirst (export)

**Signature**

```ts
<R, E, A, B>(f: (a: A) => ReaderTaskEither<R, E, B>) => (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# filterOrElse (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, A>; }
```

Added in v2.0.0

# flatten (export)

**Signature**

```ts
<R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# fromEither (export)

**Signature**

```ts
<R, E, A>(ma: Either<E, A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# fromOption (export)

**Signature**

```ts
<E>(onNone: () => E) => <R, A>(ma: Option<A>) => ReaderTaskEither<R, E, A>
```

Added in v2.0.0

# fromPredicate (export)

**Signature**

```ts
{ <E, A, B>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => ReaderTaskEither<U, E, B>; <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <R>(a: A) => ReaderTaskEither<R, E, A>; }
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B>
```

Added in v2.0.0

# mapLeft (export)

**Signature**

```ts
<E, G>(f: (e: E) => G) => <R, A>(fa: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, G, A>
```

Added in v2.0.0
