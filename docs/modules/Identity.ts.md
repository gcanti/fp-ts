---
title: Identity.ts
nav_order: 40
parent: Modules
---

## Identity overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
- [Applicative](#applicative)
  - [of](#of)
- [Apply](#apply)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
- [Extend](#extend)
  - [duplicate](#duplicate)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Monad](#monad)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [instances](#instances)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [altIdentity](#altidentity)
  - [applicativeIdentity](#applicativeidentity)
  - [chainRecIdentity](#chainrecidentity)
  - [comonadIdentity](#comonadidentity)
  - [foldableIdentity](#foldableidentity)
  - [functorIdentity](#functoridentity)
  - [getEq](#geteq)
  - [getShow](#getshow)
  - [monadIdentity](#monadidentity)
  - [traversableIdentity](#traversableidentity)
  - [~~identity~~](#identity)
- [model](#model)
  - [Identity (type alias)](#identity-type-alias)
- [utils](#utils)
  - [sequence](#sequence)
  - [traverse](#traverse)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(that: () => A) => (fa: A) => A
```

Added in v2.0.0

# Applicative

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
```

Added in v2.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(fb: B) => <A>(fa: A) => A
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(fb: B) => <A>(fa: A) => B
```

Added in v2.0.0

# Extend

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: A) => A
```

Added in v2.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: A) => B) => (wa: A) => B
```

Added in v2.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v2.6.2

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v2.0.0

## reduce

**Signature**

```ts
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

Added in v2.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# Monad

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v2.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => B) => (ma: A) => A
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v2.0.0

# instances

## URI

**Signature**

```ts
export declare const URI: 'Identity'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## altIdentity

**Signature**

```ts
export declare const altIdentity: Alt1<'Identity'>
```

Added in v2.7.0

## applicativeIdentity

**Signature**

```ts
export declare const applicativeIdentity: Applicative1<'Identity'>
```

Added in v2.7.0

## chainRecIdentity

**Signature**

```ts
export declare const chainRecIdentity: ChainRec1<'Identity'>
```

Added in v2.7.0

## comonadIdentity

**Signature**

```ts
export declare const comonadIdentity: Comonad1<'Identity'>
```

Added in v2.7.0

## foldableIdentity

**Signature**

```ts
export declare const foldableIdentity: Foldable1<'Identity'>
```

Added in v2.7.0

## functorIdentity

**Signature**

```ts
export declare const functorIdentity: Functor1<'Identity'>
```

Added in v2.7.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<A>
```

Added in v2.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<A>
```

Added in v2.0.0

## monadIdentity

**Signature**

```ts
export declare const monadIdentity: Monad1<'Identity'>
```

Added in v2.7.0

## traversableIdentity

**Signature**

```ts
export declare const traversableIdentity: Traversable1<'Identity'>
```

Added in v2.7.0

## ~~identity~~

**Signature**

```ts
export declare const identity: Monad1<'Identity'> &
  Foldable1<'Identity'> &
  Traversable1<'Identity'> &
  Alt1<'Identity'> &
  Comonad1<'Identity'> &
  ChainRec1<'Identity'>
```

Added in v2.0.0

# model

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v2.0.0

# utils

## sequence

**Signature**

```ts
export declare const sequence: Sequence1<'Identity'>
```

Added in v2.6.3

## traverse

**Signature**

```ts
export declare const traverse: PipeableTraverse1<'Identity'>
```

Added in v2.6.3
