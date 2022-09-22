---
title: Separated.ts
nav_order: 89
parent: Modules
---

## Separated overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [mapBoth](#mapboth)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [HKT](#hkt)
  - [SeparatedF (interface)](#separatedf-interface)
- [combinators](#combinators)
  - [flap](#flap)
- [constructors](#constructors)
  - [separated](#separated)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Functor](#functor-1)
- [utils](#utils)
  - [Separated (interface)](#separated-interface)
  - [left](#left)
  - [right](#right)

---

# Bifunctor

## mapBoth

Returns an effect whose failure and success channels have been mapped by
the specified pair of functions, `f` and `g`.

**Signature**

```ts
export declare const mapBoth: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (self: Separated<E, A>) => Separated<G, B>
```

Added in v3.0.0

## mapLeft

Returns an effect with its error channel mapped using the specified
function. This can be used to lift a "smaller" error into a "larger" error.

**Signature**

```ts
export declare const mapLeft: <E, G>(f: (e: E) => G) => <A>(self: Separated<E, A>) => Separated<G, A>
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Separated<E, A>) => Separated<E, B>
```

Added in v3.0.0

# HKT

## SeparatedF (interface)

**Signature**

```ts
export interface SeparatedF extends HKT {
  readonly type: Separated<this['Covariant2'], this['Covariant1']>
}
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Separated<E, (a: A) => B>) => Separated<E, B>
```

Added in v3.0.0

# constructors

## separated

**Signature**

```ts
export declare const separated: <E, A>(left: E, right: A) => Separated<E, A>
```

Added in v3.0.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: bifunctor.Bifunctor<SeparatedF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<SeparatedF>
```

Added in v3.0.0

# utils

## Separated (interface)

**Signature**

```ts
export interface Separated<E, A> {
  readonly left: E
  readonly right: A
}
```

Added in v3.0.0

## left

**Signature**

```ts
export declare const left: <E, A>(s: Separated<E, A>) => E
```

Added in v3.0.0

## right

**Signature**

```ts
export declare const right: <E, A>(s: Separated<E, A>) => A
```

Added in v3.0.0
