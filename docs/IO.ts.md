---
title: IO.ts
nav_order: 45
---

# Overview

`IO<A>` represents a synchronous computation that yields a value of type `A` and **never fails**.
If you want to represent a synchronous computation that may fail, please see `IOEither`.

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [IO (class)](#io-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [applyFirst (method)](#applyfirst-method)
  - [applySecond (method)](#applysecond-method)
  - [chain (method)](#chain-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [io (constant)](#io-constant)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# IO (class)

**Signature**

```ts
export class IO<A> {
  constructor(readonly run: Lazy<A>) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): IO<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: IO<(a: A) => B>): IO<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C> { ... }
```

## applyFirst (method)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
applyFirst<B>(fb: IO<B>): IO<A> { ... }
```

Added in v1.6.0

## applySecond (method)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
applySecond<B>(fb: IO<B>): IO<B> { ... }
```

Added in v1.5.0

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => IO<B>): IO<B> { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# io (constant)

**Signature**

```ts
export const io: Monad1<URI> & MonadIO1<URI> = ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<IO<A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<IO<A>> => ...
```

Added in v1.0.0
