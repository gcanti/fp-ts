---
title: IOEither.ts
nav_order: 46
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [URI](#uri)
- [IOEither](#ioeither)
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
- [URI](#uri-1)
- [ioEither](#ioeither)
- [fromEither](#fromeither)
- [fromLeft](#fromleft)
- [left](#left)
- [right](#right)
- [~~tryCatch~~](#trycatch)
- [tryCatch2v](#trycatch2v)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

`IOEither<L, A>` represents a synchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent a synchronous computation that never fails, please see `IO`.

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# IOEither

**Signature** (class)

```ts
export class IOEither<L, A> {
  constructor(readonly value: IO<Either<L, A>>) { ... }
  ...
}
```

Added in v1.6.0

## run

Runs the inner io

**Signature** (method)

```ts
run(): Either<L, A> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IOEither<L, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C> { ... }
```

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: IOEither<L, B>): IOEither<L, A> { ... }
```

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: IOEither<L, B>): IOEither<L, B> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<R>(left: (l: L) => R, right: (a: A) => R): IO<R> { ... }
```

## mapLeft

**Signature** (method)

```ts
mapLeft<M>(f: (l: L) => M): IOEither<M, A> { ... }
```

## orElse

**Signature** (method)

```ts
orElse<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A> { ... }
```

## alt

**Signature** (method)

```ts
alt(fy: IOEither<L, A>): IOEither<L, A> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# ioEither

**Signature** (constant)

```ts
export const ioEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> = ...
```

Added in v1.6.0

# fromEither

**Signature** (function)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): IOEither<L, A> => ...
```

Added in v1.6.0

# fromLeft

**Signature** (function)

```ts
export const fromLeft = <L, A>(l: L): IOEither<L, A> => ...
```

Added in v1.6.0

# left

**Signature** (function)

```ts
export const left = <L, A>(fa: IO<L>): IOEither<L, A> => ...
```

Added in v1.6.0

# right

**Signature** (function)

```ts
export const right = <L, A>(fa: IO<A>): IOEither<L, A> => ...
```

Added in v1.6.0

# ~~tryCatch~~

Use `tryCatch2v` instead

**Signature** (function)

```ts
export const tryCatch = <A>(f: Lazy<A>, onerror: (reason: unknown) => Error = toError): IOEither<Error, A> => ...
```

Added in v1.6.0

# tryCatch2v

**Signature** (function)

```ts
export const tryCatch2v = <L, A>(f: Lazy<A>, onerror: (reason: unknown) => L): IOEither<L, A> => ...
```

Added in v1.11.0
