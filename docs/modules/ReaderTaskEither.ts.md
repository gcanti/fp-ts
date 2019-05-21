---
title: ReaderTaskEither.ts
nav_order: 68
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
- [getOrElse (function)](#getorelse-function)
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
export const ask: <R>() => ReaderTaskEither<R, never, R> = ...
```

Added in v2.0.0

# asks (constant)

**Signature**

```ts
export const asks: <R, A>(f: (r: R) => A) => ReaderTaskEither<R, never, A> = ...
```

Added in v2.0.0

# fromTaskEither (constant)

**Signature**

```ts
export const fromTaskEither: <E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<unknown, E, A> = ...
```

Added in v2.0.0

# local (constant)

**Signature**

```ts
export const  = ...
```

Added in v2.0.0

# readerTaskEither (constant)

**Signature**

```ts
export const readerTaskEither: Monad3<URI> & Bifunctor3<URI> & Alt3<URI> & MonadIO3<URI> & MonadTask3<URI> = ...
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
export const rightReader: <R, A>(ma: Reader<R, A>) => ReaderTaskEither<R, never, A> = ...
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

# fromEither (function)

**Signature**

```ts
export function fromEither<E, A>(ma: Either<E, A>): ReaderTaskEither<unknown, E, A> { ... }
```

Added in v2.0.0

# fromIOEither (function)

**Signature**

```ts
export function fromIOEither<E, A>(ma: IOEither<E, A>): ReaderTaskEither<unknown, E, A> { ... }
```

Added in v2.0.0

# fromOption (function)

**Signature**

```ts
export function fromOption<E, A>(ma: Option<A>, onNone: () => E): ReaderTaskEither<unknown, E, A> { ... }
```

Added in v2.0.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<E, A, B extends A>(
  refinement: Refinement<A, B>,
  onFalse: (a: A) => E
): (a: A) => ReaderTaskEither<unknown, E, B>
export function fromPredicate<E, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => E
): (a: A) => ReaderTaskEither<unknown, E, A> { ... }
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

# left (function)

**Signature**

```ts
export function left<E>(e: E): ReaderTaskEither<unknown, E, never> { ... }
```

Added in v2.0.0

# leftIO (function)

**Signature**

```ts
export function leftIO<E>(me: IO<E>): ReaderTaskEither<unknown, E, never> { ... }
```

Added in v2.0.0

# leftReader (function)

**Signature**

```ts
export function leftReader<R, E>(me: Reader<R, E>): ReaderTaskEither<R, E, never> { ... }
```

Added in v2.0.0

# leftTask (function)

**Signature**

```ts
export function leftTask<E>(me: Task<E>): ReaderTaskEither<unknown, E, never> { ... }
```

Added in v2.0.0

# orElse (function)

**Signature**

```ts
export function orElse<R, E, A, M>(
  f: (e: E) => ReaderTaskEither<R, M, A>
): (ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, M, A> { ... }
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
export function run<R, E, A>(ma: ReaderTaskEither<R, E, A>, r: R): Promise<Either<E, A>> { ... }
```

Added in v2.0.0
