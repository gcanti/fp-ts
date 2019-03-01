---
title: ReaderTaskEither.ts
nav_order: 70
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [ReaderTaskEither](#readertaskeither)
  - [run](#run)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [applyFirst](#applyfirst)
  - [applySecond](#applysecond)
  - [chain](#chain)
  - [fold](#fold)
  - [mapLeft](#mapleft)
  - [orElse](#orelse)
  - [alt](#alt)
  - [bimap](#bimap)
  - [local](#local)
- [URI](#uri-1)
- [readerTaskEither](#readertaskeither)
- [readerTaskEitherSeq](#readertaskeitherseq)
- [ask](#ask)
- [asks](#asks)
- [fromEither](#fromeither)
- [fromIO](#fromio)
- [fromIOEither](#fromioeither)
- [fromLeft](#fromleft)
- [fromPredicate](#frompredicate)
- [fromReader](#fromreader)
- [fromTaskEither](#fromtaskeither)
- [left](#left)
- [local](#local-1)
- [right](#right)
- [tryCatch](#trycatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# ReaderTaskEither

**Signature** (class)

```ts
export class ReaderTaskEither<E, L, A> {
  constructor(readonly value: (e: E) => TaskEither<L, A>) { ... }
  ...
}
```

Added in v1.6.0

## run

Runs the inner `TaskEither`

**Signature** (method)

```ts
run(e: E): Promise<Either<L, A>> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C> { ... }
```

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A> { ... }
```

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>> { ... }
```

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A> { ... }
```

## orElse

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

**Signature** (method)

```ts
orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A> { ... }
```

## alt

**Signature** (method)

```ts
alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B> { ... }
```

## local

**Signature** (method)

```ts
local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A> { ... }
```

Added in v1.6.1

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# readerTaskEither

**Signature** (constant)

```ts
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = ...
```

Added in v1.6.0

# readerTaskEitherSeq

Like `readerTaskEither` but `ap` is sequential

**Signature** (constant)

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
```

Added in v1.10.0

# ask

**Signature** (function)

```ts
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => ...
```

Added in v1.6.0

# asks

**Signature** (function)

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromEither

**Signature** (function)

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromIO

**Signature** (function)

```ts
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromIOEither

**Signature** (function)

```ts
export const fromIOEither = <E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromLeft

**Signature** (function)

```ts
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromPredicate

**Signature** (function)

```ts
export function fromPredicate<E, L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, B>)
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>)
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): ((a: A) => ReaderTaskEither<E, L, A>) { ... }
```

Added in v1.6.0

# fromReader

**Signature** (function)

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromTaskEither

**Signature** (function)

```ts
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# left

**Signature** (function)

```ts
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# local

**Signature** (function)

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A> => ...
```

Added in v1.6.0

# right

**Signature** (function)

```ts
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# tryCatch

**Signature** (function)

```ts
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0
