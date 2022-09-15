---
title: Const.ts
nav_order: 20
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
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [ConstF (interface)](#constf-interface)
  - [ConstFContravariant (interface)](#constfcontravariant-interface)
  - [ConstFFixedW (interface)](#constffixedw-interface)
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

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <W, X, A, B>(f: (w: W) => X, g: (a: A) => B) => (fea: Const<W, A>) => Const<X, B>
```

Added in v3.0.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <W, G>(f: (w: W) => G) => <A>(fea: Const<W, A>) => Const<G, A>
```

Added in v3.0.0

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => <W>(fa: Const<W, A>) => Const<W, B>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <W>(fa: Const<W, A>) => Const<W, B>
```

Added in v3.0.0

# HKT

## ConstF (interface)

**Signature**

```ts
export interface ConstF extends HKT {
  readonly type: Const<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

## ConstFContravariant (interface)

**Signature**

```ts
export interface ConstFContravariant extends HKT {
  readonly type: Const<this['Covariant1'], this['Contravariant1']>
}
```

Added in v3.0.0

## ConstFFixedW (interface)

**Signature**

```ts
export interface ConstFFixedW<W> extends HKT {
  readonly type: Const<W, this['Covariant1']>
}
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <W, B>(fab: Const<W, (a: A) => B>) => Const<W, B>
```

Added in v3.0.0

# constructors

## make

**Signature**

```ts
export declare const make: <W, A = never>(w: W) => Const<W, A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor_<ConstF>
```

Added in v3.0.0

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant_<ConstFContravariant>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<ConstF>
```

Added in v3.0.0

## getApplicative

**Signature**

```ts
export declare const getApplicative: <W>(M: Monoid<W>) => Applicative<ConstFFixedW<W>>
```

Added in v3.0.0

## getApply

**Signature**

```ts
export declare const getApply: <W>(S: Semigroup<W>) => Apply<ConstFFixedW<W>>
```

Added in v3.0.0

## getBooleanAlgebra

**Signature**

```ts
export declare const getBooleanAlgebra: <W, A = never>(H: BooleanAlgebra<W>) => BooleanAlgebra<Const<W, A>>
```

Added in v3.0.0

## getBounded

**Signature**

```ts
export declare const getBounded: <W, A = never>(B: Bounded<W>) => Bounded<Const<W, A>>
```

Added in v3.0.0

## getEq

**Signature**

```ts
export declare const getEq: <W, A = never>(E: Eq<W>) => Eq<Const<W, A>>
```

Added in v3.0.0

## getHeytingAlgebra

**Signature**

```ts
export declare const getHeytingAlgebra: <W, A = never>(H: HeytingAlgebra<W>) => HeytingAlgebra<Const<W, A>>
```

Added in v3.0.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <W, A = never>(M: Monoid<W>) => Monoid<Const<W, A>>
```

Added in v3.0.0

## getOrd

**Signature**

```ts
export declare const getOrd: <W, A = never>(O: Ord<W>) => Ord<Const<W, A>>
```

Added in v3.0.0

## getRing

**Signature**

```ts
export declare const getRing: <W, A = never>(S: Ring<W>) => Ring<Const<W, A>>
```

Added in v3.0.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <W, A = never>(S: Semigroup<W>) => Semigroup<Const<W, A>>
```

Added in v3.0.0

## getSemiring

**Signature**

```ts
export declare const getSemiring: <W, A = never>(S: Semiring<W>) => Semiring<Const<W, A>>
```

Added in v3.0.0

## getShow

**Signature**

```ts
export declare const getShow: <W, A = never>(S: Show<W>) => Show<Const<W, A>>
```

Added in v3.0.0

# model

## Const (type alias)

**Signature**

```ts
export type Const<W, A> = W & { readonly _A: A }
```

Added in v3.0.0
