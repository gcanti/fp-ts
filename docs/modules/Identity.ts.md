---
title: Identity.ts
nav_order: 48
parent: Modules
---

## Identity overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Apply](#apply)
  - [ap](#ap)
- [Extendable](#extendable)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Flat](#flat)
  - [flatMap](#flatmap)
- [FlatRec](#flatrec)
  - [flatMapRec](#flatmaprec)
- [Foldable](#foldable)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [IdentityF (interface)](#identityf-interface)
- [Pointed](#pointed)
  - [of](#of)
- [SemigroupK](#semigroupk)
  - [combineK](#combinek)
- [Traversable](#traversable)
  - [traverse](#traverse)
- [combinators](#combinators)
  - [flap](#flap)
- [derivable combinators](#derivable-combinators)
  - [apFirst](#apfirst)
  - [apSecond](#apsecond)
  - [duplicate](#duplicate)
  - [flatten](#flatten)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply-1)
  - [Comonad](#comonad)
  - [Flat](#flat-1)
  - [FlatRec](#flatrec-1)
  - [Foldable](#foldable-1)
  - [Functor](#functor-1)
  - [Monad](#monad)
  - [Pointed](#pointed-1)
  - [SemigroupK](#semigroupk-1)
  - [Traversable](#traversable-1)
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
  - [let](#let)
  - [sequence](#sequence)
  - [tupled](#tupled)

---

# Apply

## ap

Apply a function to an argument under a type constructor.

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

# Extendable

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

# Flat

## flatMap

Composes computations in sequence, using the return value of one computation to determine the next computation.

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => B) => (ma: A) => B
```

Added in v3.0.0

# FlatRec

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, B>(f: (a: A) => Either<A, B>) => (a: A) => B
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

# HKT

## IdentityF (interface)

**Signature**

```ts
export interface IdentityF extends HKT {
  readonly type: Identity<this['Covariant1']>
}
```

Added in v3.0.0

# Pointed

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
```

Added in v3.0.0

# SemigroupK

## combineK

Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
types of kind `* -> *`.

**Signature**

```ts
export declare const combineK: <B>(second: LazyArg<B>) => <A>(self: A) => B | A
```

Added in v3.0.0

# Traversable

## traverse

**Signature**

```ts
export declare const traverse: <F extends HKT>(
  F: applicative.Applicative<F>
) => <A, S, R, W, E, B>(f: (a: A) => Kind<F, S, R, W, E, B>) => (ta: A) => Kind<F, S, R, W, E, B>
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
export declare const apFirst: <B>(second: B) => <A>(self: A) => A
```

Added in v3.0.0

## apSecond

Combine two effectful actions, keeping only the result of the second.

Derivable from `Apply`.

**Signature**

```ts
export declare const apSecond: <B>(second: B) => <A>(self: A) => B
```

Added in v3.0.0

## duplicate

Derivable from `Extendable`.

**Signature**

```ts
export declare const duplicate: <A>(ma: A) => A
```

Added in v3.0.0

## flatten

Derivable from `Flat`.

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IdentityF>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<IdentityF>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<IdentityF>
```

Added in v3.0.0

## Flat

**Signature**

```ts
export declare const Flat: flat.Flat<IdentityF>
```

Added in v3.0.0

## FlatRec

**Signature**

```ts
export declare const FlatRec: flatRec.FlatRec<IdentityF>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<IdentityF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<IdentityF>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IdentityF>
```

Added in v3.0.0

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IdentityF>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<IdentityF>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<IdentityF>
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
export declare const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <B>(fb: B) => <A extends readonly unknown[]>(fas: A) => readonly [...A, B]
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (ma: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(fa: A) => { readonly [K in N]: A }
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## sequence

**Signature**

```ts
export declare const sequence: <F extends HKT>(
  F: applicative.Applicative<F>
) => <S, R, W, E, A>(fas: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(fa: A) => readonly [A]
```

Added in v3.0.0
