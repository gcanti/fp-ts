---
title: IO.ts
nav_order: 45
---

# Overview

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [URI](#uri)
- [IO](#io)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [applyFirst](#applyfirst)
  - [applySecond](#applysecond)
  - [chain](#chain)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [io](#io)
- [getMonoid](#getmonoid)
- [getSemigroup](#getsemigroup)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# IO

**Signature** (class)

```ts
export class IO<A> {
  constructor(readonly run: Lazy<A>) { ... }
  ...
}
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): IO<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: IO<(a: A) => B>): IO<B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> { ... }
```

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (method)

```ts
applyFirst<B>(fb: IO<B>): IO<A> { ... }
```

Added in v1.6.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (method)

```ts
applySecond<B>(fb: IO<B>): IO<B> { ... }
```

Added in v1.5.0

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => IO<B>): IO<B> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# io

**Signature** (constant)

```ts
export const io: Monad1<URI> & MonadIO1<URI> = ...
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ...
```

Added in v1.0.0
