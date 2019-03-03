---
title: Pair.ts
nav_order: 64
parent: Modules
---

# Overview

Adapted from https://github.com/parsonsmatt/purescript-pair

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Pair (class)](#pair-class)
  - [first (method)](#first-method)
  - [second (method)](#second-method)
  - [swap (method)](#swap-method)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [reduce (method)](#reduce-method)
  - [extract (method)](#extract-method)
  - [extend (method)](#extend-method)
- [URI (constant)](#uri-constant)
- [pair (constant)](#pair-constant)
- [getMonoid (function)](#getmonoid-function)
- [getOrd (function)](#getord-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Pair (class)

**Signature**

```ts
export class Pair<A> {
  constructor(readonly fst: A, readonly snd: A) { ... }
  ...
}
```

Added in v1.0.0

## first (method)

Map a function over the first field of a pair

**Signature**

```ts
first(f: Endomorphism<A>): Pair<A> { ... }
```

## second (method)

Map a function over the second field of a pair

**Signature**

```ts
second(f: Endomorphism<A>): Pair<A> { ... }
```

## swap (method)

Swaps the elements in a pair

**Signature**

```ts
swap(): Pair<A> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Pair<B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Pair<(a: A) => B>): Pair<B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## extract (method)

**Signature**

```ts
extract(): A { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (fb: Pair<A>) => B): Pair<B> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# pair (constant)

**Signature**

```ts
export const pair: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => ...
```

Added in v1.0.0

# getOrd (function)

**Signature**

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => ...
```

Added in v1.0.0
