---
title: Const.ts
nav_order: 16
parent: Modules
---

## Const overview

The `Const` type constructor, which wraps its first type argument and ignores its second.
That is, `Const<E, A>` is isomorphic to `E` for any `A`.

`Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
while ignoring return values.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [mapBoth](#mapboth)
  - [mapLeft](#mapleft)
- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [flap](#flap)
- [constructors](#constructors)
  - [make](#make)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Contravariant](#contravariant-1)
  - [Functor](#functor-1)
  - [getApplicative](#getapplicative)
  - [getApply](#getapply)
  - [getBooleanAlgebra](#getbooleanalgebra)
  - [getBounded](#getbounded)
  - [getEq](#geteq)
  - [getHeytingAlgebra](#getheytingalgebra)
  - [getMonoid](#getmonoid)
  - [getOrd](#getord)
  - [getRing](#getring)
  - [getSemigroup](#getsemigroup)
  - [getSemiring](#getsemiring)
  - [getShow](#getshow)
- [model](#model)
  - [Const (type alias)](#const-type-alias)
- [type lambdas](#type-lambdas)
  - [Constλ (interface)](#const%CE%BB-interface)
  - [ConstλBifunctor (interface)](#const%CE%BBbifunctor-interface)
  - [ConstλContravariant (interface)](#const%CE%BBcontravariant-interface)
  - [ConstλFix (interface)](#const%CE%BBfix-interface)

---

# Bifunctor

## mapBoth

**Signature**

```ts
export declare const mapBoth: <S, T, A, B>(f: (s: S) => T, g: (a: A) => B) => (self: Const<S, A>) => Const<T, B>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare const mapLeft: <S, G>(f: (s: S) => G) => <A>(self: Const<S, A>) => Const<G, A>
```

Added in v3.0.0

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B>
```

Added in v3.0.0

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B>
```

Added in v3.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <S>(s: S) => Const<S, never>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<ConstλBifunctor>
```

Added in v3.0.0

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<ConstλContravariant>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<Constλ>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <S>(M: Monoid<S>) => Applicative<ConstλFix<S>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <S>(S: Semigroup<S>) => Apply<ConstλFix<S>>
```

Added in v3.0.0

## getBooleanAlgebra

**Signature**

```ts
export declare const getBooleanAlgebra: <S, A>(H: BooleanAlgebra<S>) => BooleanAlgebra<Const<S, A>>
```

Added in v3.0.0

## getBounded

**Signature**

```ts
export declare const getBounded: <S, A>(B: Bounded<S>) => Bounded<Const<S, A>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <S, A>(E: Eq<S>) => Eq<Const<S, A>>
```

Added in v3.0.0

## getHeytingAlgebra

**Signature**

```ts
export declare const getHeytingAlgebra: <S, A>(H: HeytingAlgebra<S>) => HeytingAlgebra<Const<S, A>>
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <S, A>(M: Monoid<S>) => Monoid<Const<S, A>>
```

Added in v3.0.0

## getOrd

**Signature**

```ts
export declare const getOrd: <S, A>(O: Ord<S>) => Ord<Const<S, A>>
```

Added in v3.0.0

## getRing

**Signature**

```ts
export declare const getRing: <S, A>(S: Ring<S>) => Ring<Const<S, A>>
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <S, A>(S: Semigroup<S>) => Semigroup<Const<S, A>>
```

Added in v3.0.0

## getSemiring

**Signature**

```ts
export declare const getSemiring: <S, A>(S: Semiring<S>) => Semiring<Const<S, A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <S, A>(S: Show<S>) => Show<Const<S, A>>
```

Added in v3.0.0

# model

## Const (type alias)

**Signature**

```ts
export type Const</** in out */ S, /** out */ A> = S & { readonly [phantom]: A }
```

Added in v3.0.0

# type lambdas

## Constλ (interface)

**Signature**

```ts
export interface Constλ extends HKT {
  readonly type: Const<this['InOut1'], this['Out1']>
}
```

Added in v3.0.0

## ConstλBifunctor (interface)

**Signature**

```ts
export interface ConstλBifunctor extends HKT {
  readonly type: Const<this['Out2'], this['Out1']>
}
```

Added in v3.0.0

## ConstλContravariant (interface)

**Signature**

```ts
export interface ConstλContravariant extends HKT {
  readonly type: Const<this['InOut1'], this['In1']>
}
```

Added in v3.0.0

## ConstλFix (interface)

**Signature**

```ts
export interface ConstλFix<S> extends HKT {
  readonly type: Const<S, this['Out1']>
}
```

Added in v3.0.0
