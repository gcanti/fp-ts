---
title: ReaderTaskEither.ts
nav_order: 69
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [ReaderTaskEither (interface)](#readertaskeither-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [ask (constant)](#ask-constant)
- [asks (constant)](#asks-constant)
- [fromReader (constant)](#fromreader-constant)
- [fromRight (constant)](#fromright-constant)
- [fromTaskEither (constant)](#fromtaskeither-constant)
- [local (constant)](#local-constant)
- [readerTaskEither (constant)](#readertaskeither-constant)
- [readerTaskEitherSeq (constant)](#readertaskeitherseq-constant)
- [fold (function)](#fold-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromLeft (function)](#fromleft-function)
- [fromPredicate (function)](#frompredicate-function)
- [left (function)](#left-function)
- [mapLeft (function)](#mapleft-function)
- [orElse (function)](#orelse-function)
- [right (function)](#right-function)
- [run (function)](#run-function)
- [tryCatch (function)](#trycatch-function)

---

# ReaderTaskEither (interface)

**Signature**

```ts
export interface ReaderTaskEither<E, L, A> {
  (e: E): TaskEither<L, A>
}
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# ask (constant)

**Signature**

```ts
export const ask: <E>() => ReaderTaskEither<E, never, E> = ...
```

Added in v2.0.0

# asks (constant)

**Signature**

```ts
export const asks: <E, A>(f: (e: E) => A) => ReaderTaskEither<E, never, A> = ...
```

Added in v2.0.0

# fromReader (constant)

**Signature**

```ts
export const fromReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A> = ...
```

Added in v2.0.0

# fromRight (constant)

**Signature**

```ts
export const fromRight: <A>(a: A) => ReaderTaskEither<unknown, never, A> = ...
```

Added in v2.0.0

# fromTaskEither (constant)

**Signature**

```ts
export const fromTaskEither: <E, L, A>(ma: TaskEither<L, A>) => ReaderTaskEither<E, L, A> = ...
```

Added in v2.0.0

# local (constant)

**Signature**

```ts
export const local: <E, L, A, D>(ma: ReaderTaskEither<E, L, A>, f: (f: D) => E) => ReaderTaskEither<D, L, A> = ...
```

Added in v2.0.0

# readerTaskEither (constant)

**Signature**

```ts
export const readerTaskEither: Monad3<URI> &
  Bifunctor3<URI> &
  Alt3<URI> &
  MonadIO3<URI> &
  MonadTask3<URI> &
  MonadThrow3<URI> = ...
```

Added in v2.0.0

# readerTaskEitherSeq (constant)

Like `readerTaskEither` but `ap` is sequential

**Signature**

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
```

Added in v2.0.0

# fold (function)

**Signature**

```ts
export function fold<E, L, A, R>(
  ma: ReaderTaskEither<E, L, A>,
  onLeft: (l: L) => R,
  onRight: (a: A) => R
): Reader<E, Task<R>> { ... }
```

Added in v2.0.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<L, A>(ma: IOEither<L, A>): ReaderTaskEither<unknown, L, A> { ... }
```

Added in v2.0.0

# fromLeft (function)

**Signature**

```ts
export function fromLeft<L>(l: L): ReaderTaskEither<unknown, L, never> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<L, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<unknown, L, B>
export function fromPredicate<L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<unknown, L, A> { ... }
```

Added in v2.0.0

# left (function)

**Signature**

```ts
export function left<E, L>(ma: Task<L>): ReaderTaskEither<E, L, never> { ... }
```

Added in v2.0.0

# mapLeft (function)

**Signature**

```ts
export function mapLeft<E, L, A, M>(ma: ReaderTaskEither<E, L, A>, f: (l: L) => M): ReaderTaskEither<E, M, A> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<E, L, A, M>(
  ma: ReaderTaskEither<E, L, A>,
  f: (l: L) => ReaderTaskEither<E, M, A>
): ReaderTaskEither<E, M, A> { ... }
```

Added in v2.0.0

# right (function)

**Signature**

```ts
export function right<E, A>(ma: Task<A>): ReaderTaskEither<E, never, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<E, L, A>(ma: ReaderTaskEither<E, L, A>, e: E): Promise<Either<L, A>> { ... }
```

Added in v2.0.0

# tryCatch (function)

**Signature**

```ts
export function tryCatch<E, L, A>(
  f: (e: E) => Promise<A>,
  onError: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> { ... }
```

Added in v2.0.0
