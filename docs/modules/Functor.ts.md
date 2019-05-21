---
title: Functor.ts
nav_order: 36
parent: Modules
---

# Overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) = fa`
2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`

---

<h2 class="text-delta">Table of contents</h2>

- [Functor (interface)](#functor-interface)
- [Functor1 (interface)](#functor1-interface)
- [Functor2 (interface)](#functor2-interface)
- [Functor2C (interface)](#functor2c-interface)
- [Functor3 (interface)](#functor3-interface)
- [Functor4 (interface)](#functor4-interface)
- [FunctorComposition (interface)](#functorcomposition-interface)
- [FunctorComposition01 (interface)](#functorcomposition01-interface)
- [FunctorComposition02 (interface)](#functorcomposition02-interface)
- [FunctorComposition11 (interface)](#functorcomposition11-interface)
- [FunctorComposition12 (interface)](#functorcomposition12-interface)
- [FunctorComposition12C (interface)](#functorcomposition12c-interface)
- [FunctorComposition21 (interface)](#functorcomposition21-interface)
- [FunctorComposition22 (interface)](#functorcomposition22-interface)
- [FunctorComposition22C (interface)](#functorcomposition22c-interface)
- [FunctorComposition2C1 (interface)](#functorcomposition2c1-interface)
- [getFunctorComposition (function)](#getfunctorcomposition-function)

---

# Functor (interface)

**Signature**

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

Added in v2.0.0

# Functor1 (interface)

**Signature**

```ts
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Type<F, A>, f: (a: A) => B) => Type<F, B>
}
```

Added in v2.0.0

# Functor2 (interface)

**Signature**

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

Added in v2.0.0

# Functor2C (interface)

**Signature**

```ts
export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly map: <A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

Added in v2.0.0

# Functor3 (interface)

**Signature**

```ts
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => B) => Type3<F, U, L, B>
}
```

Added in v2.0.0

# Functor4 (interface)

**Signature**

```ts
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <X, U, L, A, B>(fa: Type4<F, X, U, L, A>, f: (a: A) => B) => Type4<F, X, U, L, B>
}
```

Added in v2.0.0

# FunctorComposition (interface)

**Signature**

```ts
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}
```

Added in v2.0.0

# FunctorComposition01 (interface)

**Signature**

```ts
export interface FunctorComposition01<F, G extends URIS> {
  readonly map: <A, B>(fa: HKT<F, Type<G, A>>, f: (a: A) => B) => HKT<F, Type<G, B>>
}
```

Added in v2.0.0

# FunctorComposition02 (interface)

**Signature**

```ts
export interface FunctorComposition02<F, G extends URIS2> {
  readonly map: <LG, A, B>(fa: HKT<F, Type2<G, LG, A>>, f: (a: A) => B) => HKT<F, Type2<G, LG, B>>
}
```

Added in v2.0.0

# FunctorComposition11 (interface)

**Signature**

```ts
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Type<F, Type<G, A>>, f: (a: A) => B) => Type<F, Type<G, B>>
}
```

Added in v2.0.0

# FunctorComposition12 (interface)

**Signature**

```ts
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <LG, A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => B) => Type<F, Type2<G, LG, B>>
}
```

Added in v2.0.0

# FunctorComposition12C (interface)

**Signature**

```ts
export interface FunctorComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly map: <A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => B) => Type<F, Type2<G, LG, B>>
}
```

Added in v2.0.0

# FunctorComposition21 (interface)

**Signature**

```ts
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <LF, A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => B) => Type2<F, LF, Type<G, B>>
}
```

Added in v2.0.0

# FunctorComposition22 (interface)

**Signature**

```ts
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <LF, LG, A, B>(fa: Type2<F, LF, Type2<G, LG, A>>, f: (a: A) => B) => Type2<F, LF, Type2<G, LG, B>>
}
```

Added in v2.0.0

# FunctorComposition22C (interface)

**Signature**

```ts
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly map: <LF, A, B>(fa: Type2<F, LF, Type2<G, LG, A>>, f: (a: A) => B) => Type2<F, LF, Type2<G, LG, B>>
}
```

Added in v2.0.0

# FunctorComposition2C1 (interface)

**Signature**

```ts
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly map: <A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => B) => Type2<F, LF, Type<G, B>>
}
```

Added in v2.0.0

# getFunctorComposition (function)

**Signature**

```ts
export function getFunctorComposition<F extends URIS2, G extends URIS2, LG>(
  F: Functor2<F>,
  G: Functor2C<G, LG>
): FunctorComposition22C<F, G, LG>
export function getFunctorComposition<F extends URIS2, G extends URIS2>(
  F: Functor2<F>,
  G: Functor2<G>
): FunctorComposition22<F, G>
export function getFunctorComposition<F extends URIS2, G extends URIS, LF>(
  F: Functor2C<F, LF>,
  G: Functor1<G>
): FunctorComposition2C1<F, G, LF>
export function getFunctorComposition<F extends URIS2, G extends URIS>(
  F: Functor2<F>,
  G: Functor1<G>
): FunctorComposition21<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS2, LG>(
  F: Functor1<F>,
  G: Functor2C<G, LG>
): FunctorComposition12C<F, G, LG>
export function getFunctorComposition<F extends URIS, G extends URIS2>(
  F: Functor1<F>,
  G: Functor2<G>
): FunctorComposition12<F, G>
export function getFunctorComposition<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Functor1<G>
): FunctorComposition11<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> { ... }
```

Added in v2.0.0
