---
title: ReaderTaskEither.ts
nav_order: 70
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
- [local (constant)](#local-constant)
- [readerTaskEither (constant)](#readertaskeither-constant)
- [readerTaskEitherSeq (constant)](#readertaskeitherseq-constant)
- [right (constant)](#right-constant)
- [rightReader (constant)](#rightreader-constant)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [fromIOEither (function)](#fromioeither-function)
- [fromOption (function)](#fromoption-function)
- [fromPredicate (function)](#frompredicate-function)
- [left (function)](#left-function)
- [leftIO (function)](#leftio-function)
- [leftReader (function)](#leftreader-function)
- [leftTask (function)](#lefttask-function)
- [orElse (function)](#orelse-function)
- [rightIO (function)](#rightio-function)
- [rightTask (function)](#righttask-function)
- [run (function)](#run-function)

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

# fromTaskEither (constant)

**Signature**

```ts
export const fromTaskEither: <L, A>(ma: TaskEither<L, A>) => ReaderTaskEither<unknown, L, A> = ...
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

# right (constant)

**Signature**

```ts
export const right: <A>(a: A) => ReaderTaskEither<unknown, never, A> = ...
```

Added in v2.0.0

# rightReader (constant)

**Signature**

```ts
export const rightReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A> = ...
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

# fromEither (function)

**Signature**

```ts
export function fromEither<L, A>(ma: Either<L, A>): ReaderTaskEither<unknown, L, A> { ... }
```

Added in v2.0.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<L, A>(ma: IOEither<L, A>): ReaderTaskEither<unknown, L, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<L, A>(ma: Option<A>, onNone: () => L): ReaderTaskEither<unknown, L, A> { ... }
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
export function left<L>(l: L): ReaderTaskEither<unknown, L, never> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<L>(ml: IO<L>): ReaderTaskEither<unknown, L, never> { ... }
```

Added in v2.0.0

# leftReader (function)

**Signature**

```ts
export function leftReader<E, L>(ml: Reader<E, L>): ReaderTaskEither<E, L, never> { ... }
```

Added in v2.0.0

# leftTask (function)

**Signature**

```ts
export function leftTask<L>(ma: Task<L>): ReaderTaskEither<unknown, L, never> { ... }
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

# rightIO (function)

**Signature**

```ts
export function rightIO<A>(ma: IO<A>): ReaderTaskEither<unknown, never, A> { ... }
```

Added in v2.0.0

# rightTask (function)

**Signature**

```ts
export function rightTask<A>(ma: Task<A>): ReaderTaskEither<unknown, never, A> { ... }
```

Added in v2.0.0

# run (function)

**Signature**

```ts
export function run<E, L, A>(ma: ReaderTaskEither<E, L, A>, e: E): Promise<Either<L, A>> { ... }
```

Added in v2.0.0
