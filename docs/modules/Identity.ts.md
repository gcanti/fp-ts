---
title: Identity.ts
nav_order: 47
parent: Modules
---

## Identity overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Alt](#alt)
  - [alt](#alt)
  - [altW](#altw)
- [Apply](#apply)
  - [ap](#ap)
- [Chain](#chain)
  - [chain](#chain)
- [ChainRec](#chainrec)
  - [chainRec](#chainrec)
- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [Pointed](#pointed)
  - [of](#of)
- [combinators](#combinators)
  - [flap](#flap)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [chainFirst](#chainfirst)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [instances](#instances)
  - [Alt](#alt-1)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Chain](#chain-1)
  - [ChainRec](#chainrec-1)
  - [Comonad](#comonad)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [Traversable](#traversable)
  - [URI (type alias)](#uri-type-alias)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [model](#model)
  - [Identity (type alias)](#identity-type-alias)
- [utils](#utils)
  - [ApT](#apt)
  - [Do](#do)
  - [apS](#aps)
  - [apT](#apt)
  - [bind](#bind)
  - [bindTo](#bindto)
  - [traverse](#traverse)
  - [tupled](#tupled)

---

# Alt

## alt

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const alt: <A>(second: Lazy<A>) => (first: A) => A
```

Added in v3.0.0

## altW

Less strict version of [`alt`](#alt).

**Signature**

```ts
export declare const altW: <B>(second: () => B) => <A>(first: A) => B | A
```

Added in v3.0.0

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

# Chain

## chain

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const chain: <A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v3.0.0

# ChainRec

## chainRec

**Signature**

```ts
export declare const chainRec: <A, B>(f: (a: A) => Either<A, B>) => (a: A) => B
```

Added in v3.0.0

# Extend

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: A) => B) => (wa: A) => B
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v3.0.0

# Foldable

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: A) => B
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: A) => B
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

# derivable combinators

## apFirst

Combine two effectful actions, keeping only the result of the first.

Derivable from `Apply`.

**Signature**

```ts
export declare const apFirst: <B>(second: B) => <A>(first: A) => A
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: B) => <A>(first: A) => B
```

Added in v3.0.0

## chainFirst

Composes computations in sequence, using the return value of one computation to determine the next computation and
keeping only the result of the first.

Derivable from `Chain`.

**Signature**

```ts
export declare const chainFirst: <A, B>(f: (a: A) => B) => (first: A) => A
```

Added in v3.0.0

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <A>(ma: A) => A
```

Added in v3.0.0

## flatten

Derivable from `Chain`.

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v3.0.0

# instances

## Alt

**Signature**

```ts
export declare const Alt: Alt1<'Identity'>
```

Added in v3.0.0

## Applicative

**Signature**

```ts
export declare const Applicative: Applicative1<'Identity'>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: Apply1<'Identity'>
```

Added in v3.0.0

## Chain

**Signature**

```ts
export declare const Chain: Chain1<'Identity'>
```

Added in v3.0.0

## ChainRec

**Signature**

```ts
export declare const ChainRec: ChainRec1<'Identity'>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad1<'Identity'>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: Foldable1<'Identity'>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor1<'Identity'>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: Monad1<'Identity'>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: Pointed1<'Identity'>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: Traversable1<'Identity'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Identity'
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <A>(E: Eq<A>) => Eq<A>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <A>(S: Show<A>) => Show<A>
```

Added in v3.0.0

# model

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v3.0.0

# utils

## ApT

**Signature**

```ts
export declare const ApT: readonly []
```

Added in v3.0.0

## Do

**Signature**

```ts
export declare const Do: {}
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <N, A, B>(
  name: Exclude<N, keyof A>,
  fb: B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: B) => <A>(fas: A) => readonly [...A, B]
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2>(a: A | A2) => B
) => (ma: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N>(name: N) => <A>(fa: A) => { [K in N]: A }
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: Traverse1<'Identity'>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: A) => readonly [A]
```

Added in v3.0.0
