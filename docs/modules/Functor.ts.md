---
title: Functor.ts
nav_order: 37
parent: Modules
---

# Overview

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) = fa`
2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`

<h2 class="text-delta">Table of contents</h2>

- [Functor (interface)](#functor-interface)
- [Functor1 (interface)](#functor1-interface)
- [Functor2 (interface)](#functor2-interface)
- [Functor2C (interface)](#functor2c-interface)
- [Functor3 (interface)](#functor3-interface)
- [Functor3C (interface)](#functor3c-interface)
- [Functor4 (interface)](#functor4-interface)
- [FunctorComposition (interface)](#functorcomposition-interface)
- [FunctorComposition11 (interface)](#functorcomposition11-interface)
- [FunctorComposition12 (interface)](#functorcomposition12-interface)
- [FunctorComposition12C (interface)](#functorcomposition12c-interface)
- [FunctorComposition21 (interface)](#functorcomposition21-interface)
- [FunctorComposition22 (interface)](#functorcomposition22-interface)
- [FunctorComposition22C (interface)](#functorcomposition22c-interface)
- [FunctorComposition2C1 (interface)](#functorcomposition2c1-interface)
- [FunctorComposition3C1 (interface)](#functorcomposition3c1-interface)
- [flap (function)](#flap-function)
- [getFunctorComposition (function)](#getfunctorcomposition-function)
- [lift (function)](#lift-function)
- [voidLeft (function)](#voidleft-function)
- [voidRight (function)](#voidright-function)

# Functor (interface)

**Signature**

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

Added in v1.0.0

# Functor1 (interface)

**Signature**

```ts
export interface Functor1<F extends URIS> {
  readonly URI: F
  readonly map: <A, B>(fa: Type<F, A>, f: (a: A) => B) => Type<F, B>
}
```

# Functor2 (interface)

**Signature**

```ts
export interface Functor2<F extends URIS2> {
  readonly URI: F
  readonly map: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

# Functor2C (interface)

**Signature**

```ts
export interface Functor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly map: <A, B>(fa: Type2<F, L, A>, f: (a: A) => B) => Type2<F, L, B>
}
```

# Functor3 (interface)

**Signature**

```ts
export interface Functor3<F extends URIS3> {
  readonly URI: F
  readonly map: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => B) => Type3<F, U, L, B>
}
```

# Functor3C (interface)

**Signature**

```ts
export interface Functor3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly map: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => B) => Type3<F, U, L, B>
}
```

# Functor4 (interface)

**Signature**

```ts
export interface Functor4<F extends URIS4> {
  readonly URI: F
  readonly map: <X, U, L, A, B>(fa: Type4<F, X, U, L, A>, f: (a: A) => B) => Type4<F, X, U, L, B>
}
```

# FunctorComposition (interface)

**Signature**

```ts
export interface FunctorComposition<F, G> {
  readonly map: <A, B>(fa: HKT<F, HKT<G, A>>, f: (a: A) => B) => HKT<F, HKT<G, B>>
}
```

# FunctorComposition11 (interface)

**Signature**

```ts
export interface FunctorComposition11<F extends URIS, G extends URIS> {
  readonly map: <A, B>(fa: Type<F, Type<G, A>>, f: (a: A) => B) => Type<F, Type<G, B>>
}
```

# FunctorComposition12 (interface)

**Signature**

```ts
export interface FunctorComposition12<F extends URIS, G extends URIS2> {
  readonly map: <LG, A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => B) => Type<F, Type2<G, LG, B>>
}
```

# FunctorComposition12C (interface)

**Signature**

```ts
export interface FunctorComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly map: <A, B>(fa: Type<F, Type2<G, LG, A>>, f: (a: A) => B) => Type<F, Type2<G, LG, B>>
}
```

# FunctorComposition21 (interface)

**Signature**

```ts
export interface FunctorComposition21<F extends URIS2, G extends URIS> {
  readonly map: <LF, A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => B) => Type2<F, LF, Type<G, B>>
}
```

# FunctorComposition22 (interface)

**Signature**

```ts
export interface FunctorComposition22<F extends URIS2, G extends URIS2> {
  readonly map: <LF, LG, A, B>(fa: Type2<F, LF, Type2<G, LG, A>>, f: (a: A) => B) => Type2<F, LF, Type2<G, LG, B>>
}
```

# FunctorComposition22C (interface)

**Signature**

```ts
export interface FunctorComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly map: <LF, A, B>(fa: Type2<F, LF, Type2<G, LG, A>>, f: (a: A) => B) => Type2<F, LF, Type2<G, LG, B>>
}
```

# FunctorComposition2C1 (interface)

**Signature**

```ts
export interface FunctorComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly map: <A, B>(fa: Type2<F, LF, Type<G, A>>, f: (a: A) => B) => Type2<F, LF, Type<G, B>>
}
```

# FunctorComposition3C1 (interface)

**Signature**

```ts
export interface FunctorComposition3C1<F extends URIS3, G extends URIS, UF, LF> {
  readonly map: <A, B>(fa: Type3<F, UF, LF, Type<G, A>>, f: (a: A) => B) => Type3<F, UF, LF, Type<G, B>>
}
```

# flap (function)

Apply a value in a computational context to a value in no context. Generalizes `flip`

**Signature**

```ts
export function flap<F extends URIS3>(
  functor: Functor3<F>
): <U, L, A, B>(a: A, ff: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
export function flap<F extends URIS3, U, L>(
  functor: Functor3C<F, U, L>
): <A, B>(a: A, ff: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
export function flap<F extends URIS2>(
  functor: Functor2<F>
): <L, A, B>(a: A, ff: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
export function flap<F extends URIS2, L>(
  functor: Functor2C<F, L>
): <A, B>(a: A, ff: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
export function flap<F extends URIS>(functor: Functor1<F>): <A, B>(a: A, ff: Type<F, (a: A) => B>) => Type<F, B>
export function flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B>
export function flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B> { ... }
```

Added in v1.0.0

# getFunctorComposition (function)

**Signature**

```ts
export function getFunctorComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Functor3C<F, UF, LF>,
  G: Functor1<G>
): FunctorComposition3C1<F, G, UF, LF>
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
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> { ... }
```

Added in v1.0.0

# lift (function)

Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`

**Signature**

```ts
export function lift<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function lift<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(f: (a: A) => B) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function lift<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS2, L>(
  F: Functor2C<F, L>
): <A, B>(f: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function lift<F extends URIS>(F: Functor1<F>): <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> { ... }
```

Added in v1.0.0

# voidLeft (function)

A version of `voidRight` with its arguments flipped (`$>`)

**Signature**

```ts
export function voidLeft<F extends URIS3>(
  F: Functor3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, b: B) => Type3<F, U, L, B>
export function voidLeft<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, b: B) => Type3<F, U, L, B>
export function voidLeft<F extends URIS2>(F: Functor2<F>): <L, A, B>(fa: Type2<F, L, A>, b: B) => Type2<F, L, B>
export function voidLeft<F extends URIS2, L>(F: Functor2C<F, L>): <A, B>(fa: Type2<F, L, A>, b: B) => Type2<F, L, B>
export function voidLeft<F extends URIS>(F: Functor1<F>): <A, B>(fa: Type<F, A>, b: B) => Type<F, B>
export function voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B>
export function voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B> { ... }
```

Added in v1.0.0

# voidRight (function)

Ignore the return value of a computation, using the specified return value instead (`<$`)

**Signature**

```ts
export function voidRight<F extends URIS3>(
  F: Functor3<F>
): <U, L, A, B>(a: A, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function voidRight<F extends URIS3, U, L>(
  F: Functor3C<F, U, L>
): <A, B>(a: A, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function voidRight<F extends URIS2>(F: Functor2<F>): <L, A, B>(a: A, fb: Type2<F, L, B>) => Type2<F, L, A>
export function voidRight<F extends URIS2, L>(F: Functor2C<F, L>): <A, B>(a: A, fb: Type2<F, L, B>) => Type2<F, L, A>
export function voidRight<F extends URIS>(F: Functor1<F>): <A, B>(a: A, fb: Type<F, B>) => Type<F, A>
export function voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A>
export function voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A> { ... }
```

Added in v1.0.0
