---
title: ReaderTaskEither.ts
nav_order: 66
parent: Modules
---

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
- [fold (function)](#fold-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromReaderEither (function)](#fromreadereither-function)
- [getApplyMonoid (function)](#getapplymonoid-function)
- [getApplySemigroup (function)](#getapplysemigroup-function)
- [getOrElse (function)](#getorelse-function)
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
export const URI = ...
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

# fold (function)

**Signature**

```ts
export function fold<R, E, A, B>(
  onLeft: (e: E) => Reader<R, Task<B>>,
  onRight: (a: A) => Reader<R, Task<B>>
): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<B>> { ... }
```

Added in v2.0.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<R, E, A>(ma: IOEither<E, A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

# fromReaderEither (function)

**Signature**

```ts
export function fromReaderEither<R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> { ... }
```

Added in v2.0.0

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
  onLeft: (e: E) => Reader<R, Task<A>>
): (ma: ReaderTaskEither<R, E, A>) => Reader<R, Task<A>> { ... }
```

Added in v2.0.0

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
