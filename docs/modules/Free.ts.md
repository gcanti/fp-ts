---
title: Free.ts
nav_order: 34
parent: Modules
---

# Overview

Adapted from http://okmij.org/ftp/Computation/free-monad.html and https://github.com/purescript/purescript-free

---

<h2 class="text-delta">Table of contents</h2>

- [FoldFree2 (interface)](#foldfree2-interface)
- [FoldFree2C (interface)](#foldfree2c-interface)
- [FoldFree3 (interface)](#foldfree3-interface)
- [FoldFree3C (interface)](#foldfree3c-interface)
- [Free (type alias)](#free-type-alias)
- [URI (type alias)](#uri-type-alias)
- [Impure (class)](#impure-class)
  - [map (method)](#map-method)
  - [ap (method)](#ap-method)
  - [ap\_ (method)](#ap_-method)
  - [chain (method)](#chain-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
  - [isPure (method)](#ispure-method)
  - [isImpure (method)](#isimpure-method)
- [Pure (class)](#pure-class)
  - [map (method)](#map-method-1)
  - [ap (method)](#ap-method-1)
  - [ap\_ (method)](#ap_-method-1)
  - [chain (method)](#chain-method-1)
  - [inspect (method)](#inspect-method-1)
  - [toString (method)](#tostring-method-1)
  - [isPure (method)](#ispure-method-1)
  - [isImpure (method)](#isimpure-method-1)
- [URI (constant)](#uri-constant)
- [foldFree (function)](#foldfree-function)
- [hoistFree (function)](#hoistfree-function)
- [liftF (function)](#liftf-function)
- [of (function)](#of-function)

---

# FoldFree2 (interface)

**Signature**

```ts
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}
```

# FoldFree2C (interface)

**Signature**

```ts
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}
```

# FoldFree3 (interface)

**Signature**

```ts
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}
```

# FoldFree3C (interface)

**Signature**

```ts
export interface FoldFree3C<M extends URIS3, U, L> {
  <F extends URIS3, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}
```

# Free (type alias)

**Signature**

```ts
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

Added in v1.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Impure (class)

**Signature**

```ts
export class Impure<F, A, X> {
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Free<F, A>) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Free<F, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> { ... }
```

## ap\_ (method)

**Signature**

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B> { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## isPure (method)

**Signature**

```ts
isPure(): this is Pure<F, A> { ... }
```

## isImpure (method)

**Signature**

```ts
isImpure(): this is Impure<F, A, X> { ... }
```

# Pure (class)

**Signature**

```ts
export class Pure<F, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Free<F, B> { ... }
```

## ap (method)

**Signature**

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> { ... }
```

## ap\_ (method)

Flipped version of `ap`

**Signature**

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> { ... }
```

## chain (method)

**Signature**

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B> { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

## isPure (method)

**Signature**

```ts
isPure(): this is Pure<F, A> { ... }
```

## isImpure (method)

**Signature**

```ts
isImpure(): this is Impure<F, A, any> { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# foldFree (function)

**Signature**

```ts
export function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export function foldFree<M extends URIS3, U, L>(M: Monad3C<M, U, L>): FoldFree3C<M, U, L>
export function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type<M, X>, fa: Free<F, A>) => Type<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A> { ... }
```

Added in v1.0.0

# hoistFree (function)

Use a natural transformation to change the generating type constructor of a free monad

**Signature**

```ts
export function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(
  nt: <U, L, A>(fa: Type3<F, U, L, A>) => Type3<G, U, L, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(
  nt: <L, A>(fa: Type2<F, L, A>) => Type2<G, L, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F extends URIS = never, G extends URIS = never>(
  nt: <A>(fa: Type<F, A>) => Type<G, A>
): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) { ... }
```

Added in v1.0.0

# liftF (function)

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature**

```ts
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => ...
```

Added in v1.0.0

# of (function)

**Signature**

```ts
export const of = <F, A>(a: A): Free<F, A> => ...
```

Added in v1.0.0
