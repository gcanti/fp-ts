---
title: Tuple.ts
nav_order: 91
---

# Overview

Adapted from https://github.com/purescript/purescript-tuples

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [Tuple (class)](#tuple-class)
  - [compose (method)](#compose-method)
  - [map (method)](#map-method)
  - [bimap (method)](#bimap-method)
  - [extract (method)](#extract-method)
  - [extend (method)](#extend-method)
  - [reduce (method)](#reduce-method)
  - [swap (method)](#swap-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [toTuple (method)](#totuple-method)
- [URI (constant)](#uri-constant)
- [tuple (constant)](#tuple-constant)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getChain (function)](#getchain-function)
- [getChainRec (function)](#getchainrec-function)
- [getMonad (function)](#getmonad-function)
- [getMonoid (function)](#getmonoid-function)
- [getOrd (function)](#getord-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getSetoid (function)](#getsetoid-function)# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Tuple (class)

**Signature**

```ts
export class Tuple<L, A> {
  constructor(readonly fst: L, readonly snd: A) { ... }
  ...
}
```

Added in v1.0.0

## compose (method)

**Signature**

```ts
compose<B>(ab: Tuple<A, B>): Tuple<L, B> { ... }
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Tuple<L, B> { ... }
```

## bimap (method)

**Signature**

```ts
bimap<M, B>(f: (l: L) => M, g: (a: A) => B): Tuple<M, B> { ... }
```

## extract (method)

**Signature**

```ts
extract(): A { ... }
```

## extend (method)

**Signature**

```ts
extend<B>(f: (fa: Tuple<L, A>) => B): Tuple<L, B> { ... }
```

## reduce (method)

**Signature**

```ts
reduce<B>(b: B, f: (b: B, a: A) => B): B { ... }
```

## swap (method)

Exchange the first and second components of a tuple

**Signature**

```ts
swap(): Tuple<A, L> { ... }
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

## toTuple (method)

**Signature**

```ts
toTuple(): [L, A] { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# tuple (constant)

**Signature**

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2v2<URI> & Traversable2v2<URI> = ...
```

Added in v1.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v1.0.0

# getApply (function)

**Signature**

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v1.0.0

# getChain (function)

**Signature**

```ts
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => ...
```

Added in v1.0.0

# getChainRec (function)

**Signature**

```ts
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => ...
```

Added in v1.0.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => ...
```

Added in v1.0.0

# getOrd (function)

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

**Signature**

```ts
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <L, A>(SA: Setoid<L>, SB: Setoid<A>): Setoid<Tuple<L, A>> => ...
```

Added in v1.0.0
