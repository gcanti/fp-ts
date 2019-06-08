---
title: ReaderTaskEither.ts
nav_order: 74
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [ReaderTaskEither (class)](#readertaskeither-class)
  - [run (method)](#run-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [mapLeft (method)](#mapleft-method)
  - [orElse (method)](#orelse-method)
  - [alt (method)](#alt-method)
  - [bimap (method)](#bimap-method)
  - [local (method)](#local-method)
- [URI (constant)](#uri-constant)
- [left2v (constant)](#left2v-constant)
- [leftTask (constant)](#lefttask-constant)
- [readerTaskEither (constant)](#readertaskeither-constant)
- [readerTaskEitherSeq (constant)](#readertaskeitherseq-constant)
- [right2v (constant)](#right2v-constant)
- [rightIO (constant)](#rightio-constant)
- [rightReader (constant)](#rightreader-constant)
- [rightTask (constant)](#righttask-constant)
- [ask (function)](#ask-function)
- [asks (function)](#asks-function)
- [fromEither (function)](#fromeither-function)
- [~~fromIO~~ (function)](#fromio-function)
- [fromIOEither (function)](#fromioeither-function)
- [~~fromLeft~~ (function)](#fromleft-function)
- [fromPredicate (function)](#frompredicate-function)
- [~~fromReader~~ (function)](#fromreader-function)
- [fromTaskEither (function)](#fromtaskeither-function)
- [~~left~~ (function)](#left-function)
- [local (function)](#local-function)
- [~~right~~ (function)](#right-function)
- [tryCatch (function)](#trycatch-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# ReaderTaskEither (class)

**Signature**

```ts
export class ReaderTaskEither<E, L, A> {
  constructor(readonly value: (e: E) => TaskEither<L, A>) { ... }
  ...
}
```

Added in v1.6.0

## run (method)

Runs the inner `TaskEither`

**Signature**

```ts
run(e: E): Promise<Either<L, A>> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): ReaderTaskEither<E, L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, A> { ... }
```

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): Reader<E, Task<R>> { ... }
```

## mapLeft (method)

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): ReaderTaskEither<E, M, A> { ... }
```

## orElse (method)

Transforms the failure value of the `ReaderTaskEither` into a new `ReaderTaskEither`

**Signature**

```ts
orElse<M>(f: (l: L) => ReaderTaskEither<E, M, A>): ReaderTaskEither<E, M, A> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): ReaderTaskEither<E, V, B> { ... }
```

## local (method)

**Signature**

```ts
local<E2 = E>(f: (e: E2) => E): ReaderTaskEither<E2, L, A> { ... }
```

Added in v1.6.1

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# left2v (constant)

**Signature**

```ts
export const left2v: <E, L>(e: L) => ReaderTaskEither<E, L, never> = ...
```

Added in v1.19.0

# leftTask (constant)

**Signature**

```ts
export const leftTask: <E, L, A>(fa: Task<L>) => ReaderTaskEither<E, L, A> = ...
```

Added in v1.19.0

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

Added in v1.6.0

# readerTaskEitherSeq (constant)

Like `readerTaskEither` but `ap` is sequential

**Signature**

```ts
export const readerTaskEitherSeq: typeof readerTaskEither = ...
```

Added in v1.10.0

# right2v (constant)

**Signature**

```ts
export const right2v: <E, A>(a: A) => ReaderTaskEither<E, never, A> = ...
```

Added in v1.19.0

# rightIO (constant)

**Signature**

```ts
export const rightIO: <E, A>(ma: IO<A>) => ReaderTaskEither<E, never, A> = ...
```

Added in v1.19.0

# rightReader (constant)

**Signature**

```ts
export const rightReader: <E, A>(ma: Reader<E, A>) => ReaderTaskEither<E, never, A> = ...
```

Added in v1.19.0

# rightTask (constant)

**Signature**

```ts
export const rightTask: <E, L, A>(fa: Task<A>) => ReaderTaskEither<E, L, A> = ...
```

Added in v1.19.0

# ask (function)

**Signature**

```ts
export const ask = <E, L>(): ReaderTaskEither<E, L, E> => ...
```

Added in v1.6.0

# asks (function)

**Signature**

```ts
export const asks = <E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# ~~fromIO~~ (function)

Use `rightIO`

**Signature**

```ts
export const fromIO = <E, L, A>(fa: IO<A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromIOEither (function)

**Signature**

```ts
export const fromIOEither = <E, L, A>(fa: IOEither<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# ~~fromLeft~~ (function)

Use `left2v`

**Signature**

```ts
export const fromLeft = <E, L, A>(l: L): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromPredicate (function)

**Signature**

```ts
export function fromPredicate<E, L, A, B extends A>(
  predicate: Refinement<A, B>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<E, L, B>
export function fromPredicate<E, L, A>(
  predicate: Predicate<A>,
  onFalse: (a: A) => L
): (a: A) => ReaderTaskEither<E, L, A> { ... }
```

Added in v1.6.0

# ~~fromReader~~ (function)

Use `rightReader`

**Signature**

```ts
export const fromReader = <E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# fromTaskEither (function)

**Signature**

```ts
export const fromTaskEither = <E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# ~~left~~ (function)

Use `leftTask`

**Signature**

```ts
export const left = <E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# local (function)

**Signature**

```ts
export const local = <E, E2 = E>(f: (e: E2) => E) => <L, A>(
  fa: ReaderTaskEither<E, L, A>
): ReaderTaskEither<E2, L, A> => ...
```

Added in v1.6.0

# ~~right~~ (function)

Use `rightTask`

**Signature**

```ts
export const right = <E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0

# tryCatch (function)

**Signature**

```ts
export const tryCatch = <E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: unknown, e: E) => L
): ReaderTaskEither<E, L, A> => ...
```

Added in v1.6.0
