---
title: Identity.ts
nav_order: 50
parent: Modules
---

## Identity overview

```ts
export type Identity<A> = A
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [succeed](#succeed)
- [do notation](#do-notation)
  - [Do](#do)
  - [bind](#bind)
  - [bindRight](#bindright)
  - [bindTo](#bindto)
  - [let](#let)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [CategoryKind](#categorykind)
  - [Comonad](#comonad)
  - [ComposableKind](#composablekind)
  - [Extendable](#extendable)
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec)
  - [Foldable](#foldable)
  - [FromIdentity](#fromidentity)
  - [Functor](#functor)
  - [Monad](#monad)
  - [SemigroupKind](#semigroupkind)
  - [Traversable](#traversable)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [lifting](#lifting)
  - [lift2](#lift2)
  - [lift3](#lift3)
- [mapping](#mapping)
  - [as](#as)
  - [flap](#flap)
  - [unit](#unit)
- [model](#model)
  - [Identity (type alias)](#identity-type-alias)
  - [IdentityTypeLambda (interface)](#identitytypelambda-interface)
- [sequencing](#sequencing)
  - [flatMap](#flatmap)
  - [flatMapRec](#flatmaprec)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [traversing](#traversing)
  - [sequence](#sequence)
  - [traverse](#traverse)
- [tuple sequencing](#tuple-sequencing)
  - [Zip](#zip)
  - [tupled](#tupled)
  - [zipFlatten](#zipflatten)
  - [zipWith](#zipwith)
- [utils](#utils)
  - [ap](#ap)
  - [composeKind](#composekind)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [extract](#extract)
  - [flatten](#flatten)
  - [foldMap](#foldmap)
  - [idKind](#idkind)
  - [map](#map)
  - [orElse](#orelse)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)

---

# constructors

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => A
```

Added in v3.0.0

# do notation

## Do

**Signature**

```ts
export declare const Do: {}
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## bindRight

A variant of `bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## bindTo

**Signature**

```ts
export declare const bindTo: <N extends string>(name: N) => <A>(self: A) => { readonly [K in N]: A }
```

Added in v3.0.0

## let

**Signature**

```ts
export declare const let: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

# instances

## Applicative

**Signature**

```ts
export declare const Applicative: applicative.Applicative<IdentityTypeLambda>
```

Added in v3.0.0

## Apply

**Signature**

```ts
export declare const Apply: apply.Apply<IdentityTypeLambda>
```

Added in v3.0.0

## CategoryKind

**Signature**

```ts
export declare const CategoryKind: categoryKind.CategoryKind<IdentityTypeLambda>
```

Added in v3.0.0

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<IdentityTypeLambda>
```

Added in v3.0.0

## ComposableKind

**Signature**

```ts
export declare const ComposableKind: composableKind.ComposableKind<IdentityTypeLambda>
```

Added in v3.0.0

## Extendable

**Signature**

```ts
export declare const Extendable: extendable.Extendable<IdentityTypeLambda>
```

Added in v3.0.0

## Flattenable

**Signature**

```ts
export declare const Flattenable: flattenable.Flattenable<IdentityTypeLambda>
```

Added in v3.0.0

## FlattenableRec

**Signature**

```ts
export declare const FlattenableRec: flattenableRec.FlattenableRec<IdentityTypeLambda>
```

Added in v3.0.0

## Foldable

**Signature**

```ts
export declare const Foldable: foldable.Foldable<IdentityTypeLambda>
```

Added in v3.0.0

## FromIdentity

**Signature**

```ts
export declare const FromIdentity: fromIdentity.FromIdentity<IdentityTypeLambda>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<IdentityTypeLambda>
```

Added in v3.0.0

## Monad

**Signature**

```ts
export declare const Monad: monad.Monad<IdentityTypeLambda>
```

Added in v3.0.0

## SemigroupKind

**Signature**

```ts
export declare const SemigroupKind: semigroupKind.SemigroupKind<IdentityTypeLambda>
```

Added in v3.0.0

## Traversable

**Signature**

```ts
export declare const Traversable: traversable.Traversable<IdentityTypeLambda>
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

# lifting

## lift2

Lifts a binary function into `Identity`.

**Signature**

```ts
export declare const lift2: <A, B, C>(f: (a: A, b: B) => C) => (fa: A, fb: B) => C
```

Added in v3.0.0

## lift3

Lifts a ternary function into `Identity`.

**Signature**

```ts
export declare const lift3: <A, B, C, D>(f: (a: A, b: B, c: C) => D) => (fa: A, fb: B, fc: C) => D
```

Added in v3.0.0

# mapping

## as

Maps the success value of this effect to the specified constant value.

**Signature**

```ts
export declare const as: <B>(b: B) => <A>(self: A) => B
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

## unit

Returns the effect resulting from mapping the success of this effect to unit.

**Signature**

```ts
export declare const unit: <A>(self: A) => Identity<void>
```

Added in v3.0.0

# model

## Identity (type alias)

**Signature**

```ts
export type Identity<A> = A
```

Added in v3.0.0

## IdentityTypeLambda (interface)

**Signature**

```ts
export interface IdentityTypeLambda extends TypeLambda {
  readonly type: Identity<this['Out1']>
}
```

Added in v3.0.0

# sequencing

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => B) => (self: A) => B
```

Added in v3.0.0

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, B>(f: (a: A) => Result<A, B>) => (a: A) => B
```

Added in v3.0.0

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: (that: Identity<unknown>) => <A>(self: A) => A
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: A) => (self: Identity<unknown>) => A
```

Added in v3.0.0

# traversing

## sequence

**Signature**

```ts
export declare const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (ta: A) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

# tuple sequencing

## Zip

**Signature**

```ts
export declare const Zip: readonly []
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: A) => readonly [A]
```

Added in v3.0.0

## zipFlatten

Sequentially zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <B>(fb: B) => <A extends readonly unknown[]>(self: A) => readonly [...A, B]
```

Added in v3.0.0

## zipWith

Sequentially zips this effect with the specified effect using the specified combiner function.

**Signature**

```ts
export declare const zipWith: <B, A, C>(that: B, f: (a: A, b: B) => C) => (self: A) => C
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <B, C>(bfc: (b: B) => C) => <A>(afb: (a: A) => B) => (a: A) => C
```

Added in v3.0.0

## duplicate

**Signature**

```ts
export declare const duplicate: <A>(ma: A) => A
```

Added in v3.0.0

## extend

**Signature**

```ts
export declare const extend: <A, B>(f: (wa: A) => B) => (wa: A) => B
```

Added in v3.0.0

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v3.0.0

## idKind

**Signature**

```ts
export declare const idKind: <A>() => (a: A) => A
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v3.0.0

## orElse

**Signature**

```ts
export declare const orElse: <B>(that: B) => <A>(self: A) => B | A
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
