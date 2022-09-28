---
title: Identity.ts
nav_order: 48
parent: Modules
---

## Identity overview

```ts
export type Identity<A> = A
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
  - [combineK](#combinek)
  - [duplicate](#duplicate)
  - [extend](#extend)
  - [flatMap](#flatmap)
  - [flatten](#flatten)
  - [map](#map)
  - [sequence](#sequence)
  - [traverse](#traverse)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [constructors](#constructors)
  - [of](#of)
- [instances](#instances)
  - [Applicative](#applicative)
  - [Apply](#apply)
  - [Comonad](#comonad)
  - [Extendable](#extendable)
  - [Flattenable](#flattenable)
  - [FlattenableRec](#flattenablerec)
  - [Foldable](#foldable)
  - [Functor](#functor)
  - [Monad](#monad)
  - [Pointed](#pointed)
  - [SemigroupK](#semigroupk)
  - [Traversable](#traversable)
  - [getEq](#geteq)
  - [getShow](#getshow)
- [model](#model)
  - [Identity (type alias)](#identity-type-alias)
  - [IdentityTypeLambda (interface)](#identitytypelambda-interface)
- [struct sequencing](#struct-sequencing)
  - [Do](#do)
  - [bind](#bind)
  - [bindPar](#bindpar)
  - [bindTo](#bindto)
  - [let](#let)
- [tuple sequencing](#tuple-sequencing)
  - [DoTuple](#dotuple)
  - [flatZip](#flatzip)
  - [flatZipPar](#flatzippar)
  - [tupled](#tupled)
- [utils](#utils)
  - [extract](#extract)
  - [flap](#flap)
  - [flatMapRec](#flatmaprec)
  - [foldMap](#foldmap)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
  - [unit](#unit)

---

# combinators

## ap

**Signature**

```ts
export declare const ap: <A>(fa: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

## combineK

**Signature**

```ts
export declare const combineK: <B>(second: LazyArg<B>) => <A>(self: A) => B | A
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

## flatMap

**Signature**

```ts
export declare const flatMap: <A, B>(f: (a: A) => B) => (self: A) => B
```

Added in v3.0.0

## flatten

**Signature**

```ts
export declare const flatten: <A>(mma: A) => A
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (fa: A) => B
```

Added in v3.0.0

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

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <_>(that: _) => <A>(self: A) => A
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <A>(that: A) => <_>(self: _) => A
```

Added in v3.0.0

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => A
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

## Comonad

**Signature**

```ts
export declare const Comonad: comonad.Comonad<IdentityTypeLambda>
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

## Pointed

**Signature**

```ts
export declare const Pointed: pointed.Pointed<IdentityTypeLambda>
```

Added in v3.0.0

## SemigroupK

**Signature**

```ts
export declare const SemigroupK: semigroupK.SemigroupK<IdentityTypeLambda>
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

# struct sequencing

## Do

**Signature**

```ts
export declare const Do: {}
```

Added in v3.0.0

## bind

**Signature**

```ts
export declare const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <N extends string, A, B>(
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
export declare const let: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: A) => { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }
```

Added in v3.0.0

# tuple sequencing

## DoTuple

**Signature**

```ts
export declare const DoTuple: readonly []
```

Added in v3.0.0

## flatZip

**Signature**

```ts
export declare const flatZip: <A extends readonly unknown[], B>(f: (a: A) => B) => (self: A) => readonly [...A, B]
```

Added in v3.0.0

## flatZipPar

**Signature**

```ts
export declare const flatZipPar: <B>(fb: B) => <A extends readonly unknown[]>(self: A) => readonly [...A, B]
```

Added in v3.0.0

## tupled

**Signature**

```ts
export declare const tupled: <A>(self: A) => readonly [A]
```

Added in v3.0.0

# utils

## extract

**Signature**

```ts
export declare const extract: <A>(wa: A) => A
```

Added in v3.0.0

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <B>(fab: (a: A) => B) => B
```

Added in v3.0.0

## flatMapRec

**Signature**

```ts
export declare const flatMapRec: <A, B>(f: (a: A) => Either<A, B>) => (a: A) => B
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: A) => M
```

Added in v3.0.0

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

## unit

**Signature**

```ts
export declare const unit: void
```

Added in v3.0.0
