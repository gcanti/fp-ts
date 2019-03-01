---
title: Tuple.ts
nav_order: 91
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Overview](#overview)
- [URI](#uri)
- [Tuple](#tuple)
  - [compose](#compose)
  - [map](#map)
  - [bimap](#bimap)
  - [extract](#extract)
  - [extend](#extend)
  - [reduce](#reduce)
  - [swap](#swap)
  - [inspect](#inspect)
  - [toString](#tostring)
  - [toTuple](#totuple)
- [URI](#uri-1)
- [tuple](#tuple)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getChain](#getchain)
- [getChainRec](#getchainrec)
- [getMonad](#getmonad)
- [getMonoid](#getmonoid)
- [getOrd](#getord)
- [getSemigroup](#getsemigroup)
- [getSetoid](#getsetoid)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Overview

Adapted from https://github.com/purescript/purescript-tuples

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Tuple

**Signature** (class)

```ts
export class Tuple<L, A> {
  constructor(readonly fst: L, readonly snd: A) { ... }
  ...
}
```

Added in v1.0.0

## compose

**Signature** (method)

```ts
compose<B>(ab: Tuple<A, B>): Tuple<L, B> { ... }
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Tuple<L, B> { ... }
```

## bimap

**Signature** (method)

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> { ... }
```

## extract

**Signature** (method)

```ts
extract(): A { ... }
```

## extend

**Signature** (method)

```ts
extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> { ... }
```

## reduce

**Signature** (method)

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## swap

Exchange the first and second components of a tuple

**Signature** (method)

```ts
swap(): Tuple<A, L> { ... }
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

## toTuple

**Signature** (method)

```ts
toTuple(): [L, A] { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# tuple

**Signature** (constant)

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# getApplicative

**Signature** (function)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v1.0.0

# getApply

**Signature** (function)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v1.0.0

# getChain

**Signature** (function)

```ts
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => ...
```

Added in v1.0.0

# getChainRec

**Signature** (function)

```ts
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => ...
```

Added in v1.0.0

# getMonad

**Signature** (function)

```ts
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getMonoid

**Signature** (function)

```ts
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => ...
```

Added in v1.0.0

# getOrd

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

**Signature** (function)

```ts
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => ...
```

Added in v1.0.0

# getSemigroup

**Signature** (function)

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => ...
```

Added in v1.0.0
