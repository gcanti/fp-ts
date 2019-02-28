---
title: Pair.ts
nav_order: 64
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [Pair](#pair)
  - [first](#first)
  - [second](#second)
  - [swap](#swap)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [reduce](#reduce)
  - [extract](#extract)
  - [extend](#extend)
- [URI](#uri-1)
- [pair](#pair)
- [getMonoid](#getmonoid)
- [getOrd](#getord)
- [getSemigroup](#getsemigroup)
- [getSetoid](#getsetoid)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Pair

**Signature** (class)

```ts
export class Pair<A> {
  constructor(readonly fst: A, readonly snd: A) { ... }
  ...
}
```

Added in v1.0.0

## first

Map a function over the first field of a pair

**Signature** (method)

```ts
first(f: Endomorphism<A>): Pair<A> { ... }
```

## second

Map a function over the second field of a pair

**Signature** (method)

```ts
second(f: Endomorphism<A>): Pair<A> { ... }
```

## swap

Swaps the elements in a pair

**Signature** (method)

```ts
swap(): Pair<A> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Pair<B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Pair<(a: A) => B>): Pair<B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## extract

**Signature** (method)

```ts
extract(): A { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (fb: Pair<A>) => B): Pair<B> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# pair

**Signature** (constant)

```ts
export const pair: Applicative1<URI> & Foldable2v1<URI> & Traversable2v1<URI> & Comonad1<URI> = ...
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <A>(M: Monoid<A>): Monoid<Pair<A>> => ...
```

Added in v1.0.0

# getOrd

**Signature** (function)

```ts
export const getOrd = <A>(O: Ord<A>): Ord<Pair<A>> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <A>(S: Semigroup<A>): Semigroup<Pair<A>> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <A>(S: Setoid<A>): Setoid<Pair<A>> => ...
```

Added in v1.0.0
