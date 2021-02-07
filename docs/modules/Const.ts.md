---
title: Const.ts
nav_order: 21
parent: Modules
---

## Const overview

The `Const` type constructor, which wraps its first type argument and ignores its second.
That is, `Const<E, A>` is isomorphic to `E` for any `A`.

`Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
while ignoring return values.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
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
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
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
  - [~~const\_~~](#const_)
- [model](#model)
  - [Const (type alias)](#const-type-alias)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Const<E, A>) => Const<G, B>
```

Added in v2.6.2

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(fa: Const<E, A>) => Const<G, A>
```

Added in v2.6.2

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Const<E, (a: A) => B>) => Const<E, B>
```

Added in v2.10.0

# constructors

## make

**Signature**

```ts
export declare const make: <E, A = never>(e: E) => Const<E, A>
```

Added in v2.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Const'>
```

Added in v2.7.0

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant2<'Const'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Const'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Const'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## getApplicative

**Signature**

```ts
export declare function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E>
```

Added in v2.0.0

## getApply

**Signature**

```ts
export declare function getApply<E>(S: Semigroup<E>): Apply2C<URI, E>
```

Added in v2.0.0

## getBooleanAlgebra

**Signature**

```ts
export declare const getBooleanAlgebra: <E, A>(H: BooleanAlgebra<E>) => BooleanAlgebra<Const<E, A>>
```

Added in v2.6.0

## getBounded

**Signature**

```ts
export declare const getBounded: <E, A>(B: Bounded<E>) => Bounded<Const<E, A>>
```

Added in v2.6.0

## getEq

**Signature**

```ts
export declare const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>>
```

Added in v2.0.0

## getHeytingAlgebra

**Signature**

```ts
export declare const getHeytingAlgebra: <E, A>(H: HeytingAlgebra<E>) => HeytingAlgebra<Const<E, A>>
```

Added in v2.6.0

## getMonoid

**Signature**

```ts
export declare const getMonoid: <E, A>(M: Monoid<E>) => Monoid<Const<E, A>>
```

Added in v2.6.0

## getOrd

**Signature**

```ts
export declare const getOrd: <E, A>(O: Ord<E>) => Ord<Const<E, A>>
```

Added in v2.6.0

## getRing

**Signature**

```ts
export declare const getRing: <E, A>(S: Ring<E>) => Ring<Const<E, A>>
```

Added in v2.6.0

## getSemigroup

**Signature**

```ts
export declare const getSemigroup: <E, A>(S: Semigroup<E>) => Semigroup<Const<E, A>>
```

Added in v2.6.0

## getSemiring

**Signature**

```ts
export declare const getSemiring: <E, A>(S: Semiring<E>) => Semiring<Const<E, A>>
```

Added in v2.6.0

## getShow

**Signature**

```ts
export declare function getShow<E, A>(S: Show<E>): Show<Const<E, A>>
```

Added in v2.0.0

## ~~const\_~~

Use small, specific instances instead.

**Signature**

```ts
export declare const const_: Functor2<'Const'> & Contravariant2<'Const'> & Bifunctor2<'Const'>
```

Added in v2.0.0

# model

## Const (type alias)

**Signature**

```ts
export type Const<E, A> = E & { readonly _A: A }
```

Added in v2.0.0
