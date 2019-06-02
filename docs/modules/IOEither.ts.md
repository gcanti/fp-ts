---
title: IOEither.ts
nav_order: 47
parent: Modules
---

# Overview

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [IOEither (class)](#ioeither-class)
  - [run (method)](#run-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [fold (method)](#fold-method)
  - [foldIO (method)](#foldio-method)
  - [foldIOEither (method)](#foldioeither-method)
  - [mapLeft (method)](#mapleft-method)
  - [orElse (method)](#orelse-method)
  - [alt (method)](#alt-method)
  - [bimap (method)](#bimap-method)
- [URI (constant)](#uri-constant)
- [ioEither (constant)](#ioeither-constant)
- [left2v (constant)](#left2v-constant)
- [leftIO (constant)](#leftio-constant)
- [rightIO (constant)](#rightio-constant)
- [fold (function)](#fold-function)
- [fromEither (function)](#fromeither-function)
- [~~fromLeft~~ (function)](#fromleft-function)
- [~~left~~ (function)](#left-function)
- [orElse (function)](#orelse-function)
- [~~right~~ (function)](#right-function)
- [right2v (function)](#right2v-function)
- [~~tryCatch~~ (function)](#trycatch-function)
- [tryCatch2v (function)](#trycatch2v-function)

---

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# IOEither (class)

**Signature**

```ts
export class IOEither<L, A> {
  constructor(readonly value: IO<Either<L, A>>) { ... }
  ...
}
```

Added in v1.6.0

## run (method)

Runs the inner io

**Signature**

```ts
run(): Either<L, A> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): IOEither<L, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A> { ... }
```

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> { ... }
```

## foldIO (method)

Similar to `fold`, but the result is flattened.

**Signature**

```ts
foldIO<R>(left: (l: L) => IO<R>, right: (a: A) => IO<R>): IO<R> { ... }
```

Added in v1.19.0

## foldIOEither (method)

Similar to `fold`, but the result is flattened.

**Signature**

```ts
foldIOEither<M, B>(onLeft: (l: L) => IOEither<M, B>, onRight: (a: A) => IOEither<M, B>): IOEither<M, B> { ... }
```

Added in v1.19.0

## mapLeft (method)

**Signature**

```ts
mapLeft<M>(f: (l: L) => M): IOEither<M, A> { ... }
```

## orElse (method)

**Signature**

```ts
orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> { ... }
```

## alt (method)

**Signature**

```ts
alt(fy: IOEither<L, A>): IOEither<L, A> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# ioEither (constant)

**Signature**

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadThrow2<URI> = ...
```

Added in v1.6.0

# left2v (constant)

**Signature**

```ts
export const left2v: <L>(l: L) => IOEither<L, never> = ...
```

Added in v1.19.0

# leftIO (constant)

**Signature**

```ts
export const leftIO: <E>(me: IO<E>) => IOEither<E, never> = ...
```

Added in v1.19.0

# rightIO (constant)

**Signature**

```ts
export const rightIO: <A>(ma: IO<A>) => IOEither<never, A> = ...
```

Added in v1.19.0

# fold (function)

**Signature**

```ts
export function fold<E, A, R>(onLeft: (e: E) => IO<R>, onRight: (a: A) => IO<R>): (ma: IOEither<E, A>) => IO<R> { ... }
```

Added in v1.19.0

# fromEither (function)

**Signature**

```ts
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => ...
```

Added in v1.6.0

# ~~fromLeft~~ (function)

Use `left2v`

**Signature**

```ts
export const fromLeft = <L, A>(l: L): IOEither<L, A> => ...
```

Added in v1.6.0

# ~~left~~ (function)

Use `leftIO`

**Signature**

```ts
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => ...
```

Added in v1.6.0

# orElse (function)

**Signature**

```ts
export function orElse<E, A, M>(f: (e: E) => IOEither<M, A>): (ma: IOEither<E, A>) => IOEither<M, A> { ... }
```

Added in v1.19.0

# ~~right~~ (function)

Use `rightIO`

**Signature**

```ts
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => ...
```

Added in v1.6.0

# right2v (function)

**Signature**

```ts
export function right2v<A>(a: A): IOEither<never, A> { ... }
```

Added in v1.19.0

# ~~tryCatch~~ (function)

Use `tryCatch2v` instead

**Signature**

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => ...
```

Added in v1.6.0

# tryCatch2v (function)

**Signature**

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => ...
```

Added in v1.11.0
