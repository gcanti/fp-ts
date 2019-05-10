---
title: Tuple.ts
nav_order: 90
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-tuples

---

<h2 class="text-delta">Table of contents</h2>

- [Tuple (type alias)](#tuple-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [tuple (constant)](#tuple-constant)
- [fst (function)](#fst-function)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getChain (function)](#getchain-function)
- [getChainRec (function)](#getchainrec-function)
- [getEq (function)](#geteq-function)
- [getMonad (function)](#getmonad-function)
- [getMonoid (function)](#getmonoid-function)
- [getOrd (function)](#getord-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getShow (function)](#getshow-function)
- [snd (function)](#snd-function)
- [swap (function)](#swap-function)

---

# Tuple (type alias)

**Signature**

```ts
export type Tuple<L, A> = [L, A]
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# tuple (constant)

**Signature**

```ts
export const tuple: Semigroupoid2<URI> & Bifunctor2<URI> & Comonad2<URI> & Foldable2<URI> & Traversable2<URI> = ...
```

Added in v2.0.0

# fst (function)

**Signature**

```ts
export const fst = <L, A>(fa: Tuple<L, A>): L => ...
```

Added in v2.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v2.0.0

# getApply (function)

**Signature**

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v2.0.0

# getChain (function)

**Signature**

```ts
export const getChain = <L>(S: Semigroup<L>): Chain2C<URI, L> => ...
```

Added in v2.0.0

# getChainRec (function)

**Signature**

```ts
export const getChainRec = <L>(M: Monoid<L>): ChainRec2C<URI, L> => ...
```

Added in v2.0.0

# getEq (function)

**Signature**

```ts
export const getEq = <L, A>(SA: Eq<L>, SB: Eq<A>): Eq<Tuple<L, A>> => ...
```

Added in v2.0.0

# getMonad (function)

**Signature**

```ts
export const getMonad = <L>(M: Monoid<L>): Monad2C<URI, L> => ...
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <L, A>(ML: Monoid<L>, MA: Monoid<A>): Monoid<Tuple<L, A>> => ...
```

Added in v2.0.0

# getOrd (function)

To obtain the result, the `fst`s are `compare`d, and if they are `EQ`ual, the
`snd`s are `compare`d.

**Signature**

```ts
export const getOrd = <L, A>(OL: Ord<L>, OA: Ord<A>): Ord<Tuple<L, A>> => ...
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Tuple<L, A>> => ...
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(SL: Show<L>, SA: Show<A>): Show<Tuple<L, A>> => ...
```

Added in v2.0.0

# snd (function)

**Signature**

```ts
export const snd = <L, A>(fa: Tuple<L, A>): A => ...
```

Added in v2.0.0

# swap (function)

**Signature**

```ts
export const swap = <L, A>(fa: Tuple<L, A>): Tuple<A, L> => ...
```

Added in v2.0.0
