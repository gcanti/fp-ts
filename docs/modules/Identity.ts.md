---
title: Identity.ts
nav_order: 47
parent: Modules
---

## Identity overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Extract](#extract)
  - [extract](#extract)
- [constructors](#constructors)
  - [of](#of)
- [do notation](#do-notation)
  - [Do](#do)
  - [apS](#aps)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [let](#let)
- [error handling](#error-handling)
  - [alt](#alt)
  - [altW](#altw)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [instances](#instances)
  - [Alt](#alt)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Chain](#chain)
  - [ChainRec](#chainrec)
  - [Comonad](#comonad)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [Traversable](#traversable)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [Identity (type alias)](#identity-type-alias)
- [sequencing](#sequencing)
  - [chain](#chain)
  - [chainFirst](#chainfirst)
  - [flatten](#flatten)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [type lambdas](#type-lambdas)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [utils](#utils)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [duplicate](#duplicate)
  - [extend](#extend)
- [zone of death](#zone-of-death)
  - [~~identity~~](#identity)

---

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v2.6.2

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
```

Added in v2.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: {}
```

Added in v2.9.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v2.8.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (ma: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v2.8.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: A) => { readonly [K in N]: A }
```

Added in v2.8.0

## let

**Signature**

```ts
export declare const let: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v2.13.0

# error handling

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(that: () => A) => (fa: A) => A
```

Added in v2.0.0

## altW

Less strict version of [`alt`](#alt).

The `W` suffix (short for **W**idening) means that the return types will be merged.

**Signature**

```ts
export declare const altW: <B>(that: () => B) => <A>(fa: A) => B | A
```

Added in v2.9.0

# folding

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

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'Identity'>
```

Added in v2.7.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Identity'>
```

Added in v2.7.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Identity'>
```

Added in v2.10.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'Identity'>
```

Added in v2.10.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec1<'Identity'>
```

Added in v2.7.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'Identity'>
```

Added in v2.7.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Identity'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Identity'>
```

Added in v2.7.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Identity'>
```

Added in v2.7.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Identity'>
```

Added in v2.10.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Identity'>
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

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.10.0

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v2.0.0

# model

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v2.0.0

# sequencing

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
export declare const chainFirst: <A, B>(f: (a: A) => B) => (first: A) => A
```

Added in v2.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v2.0.0

# traversing

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

# type lambdas

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

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v2.0.0

## apFirst

Combine two effectful actions, keeping only the result of the first.

**Signature**

```ts
export declare const apFirst: <B>(second: B) => <A>(first: A) => A
```

Added in v2.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

**Signature**

```ts
export declare const apSecond: <B>(second: B) => <A>(first: A) => B
```

Added in v2.0.0

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

# zone of death

## ~~identity~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Functor` instance, pass `I.Functor` instead of `I.identity`
(where `I` is from `import I from 'fp-ts/Identity'`)

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
