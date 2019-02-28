---
title: Free.ts
nav_order: 34
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [FoldFree2](#foldfree2)
- [FoldFree2C](#foldfree2c)
- [FoldFree3](#foldfree3)
- [FoldFree3C](#foldfree3c)
- [Free](#free)
- [URI](#uri)
- [Impure](#impure)
  - [map](#map)
  - [ap](#ap)
  - [ap\_](#ap%5C_)
  - [chain](#chain)
  - [inspect](#inspect)
  - [toString](#tostring)
  - [isPure](#ispure)
  - [isImpure](#isimpure)
- [Pure](#pure)
  - [map](#map-1)
  - [ap](#ap-1)
  - [ap\_](#ap%5C_-1)
  - [chain](#chain-1)
  - [inspect](#inspect-1)
  - [toString](#tostring-1)
  - [isPure](#ispure-1)
  - [isImpure](#isimpure-1)
- [URI](#uri-1)
- [foldFree](#foldfree)
- [hoistFree](#hoistfree)
- [liftF](#liftf)
- [of](#of)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# FoldFree2

**Signature** (interface)

```ts
export interface FoldFree2<M extends URIS2> {
  <F extends URIS2, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, L, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}
```

# FoldFree2C

**Signature** (interface)

```ts
export interface FoldFree2C<M extends URIS2, L> {
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type2<M, L, X>, fa: Free<F, A>): Type2<M, L, A>
}
```

# FoldFree3

**Signature** (interface)

```ts
export interface FoldFree3<M extends URIS3> {
  <F extends URIS3, U, L, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, U, L, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, U, L, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}
```

# FoldFree3C

**Signature** (interface)

```ts
export interface FoldFree3C<M extends URIS3, U, L> {
  <F extends URIS3, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
  <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type3<M, U, L, X>, fa: Free<F, A>): Type3<M, U, L, A>
}
```

# Free

**Signature** (type alias)

```ts
export type Free<F, A> = Pure<F, A> | Impure<F, A, any>
```

Added in v1.0.0

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Impure

**Signature** (class)

```ts
export class Impure<F, A, X> {
  constructor(readonly fx: HKT<F, X>, readonly f: (x: X) => Free<F, A>) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Free<F, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> { ... }
```

## ap\_

**Signature** (method)

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

## isPure

**Signature** (method)

```ts
isPure(): this is Pure<F, A> { ... }
```

## isImpure

**Signature** (method)

```ts
isImpure(): this is Impure<F, A, X> { ... }
```

# Pure

**Signature** (class)

```ts
export class Pure<F, A> {
  constructor(readonly value: A) { ... }
  ...
}
```

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Free<F, B> { ... }
```

## ap

**Signature** (method)

```ts
ap<B>(fab: Free<F, (a: A) => B>): Free<F, B> { ... }
```

## ap\_

Flipped version of `ap`

**Signature** (method)

```ts
ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C> { ... }
```

## chain

**Signature** (method)

```ts
chain<B>(f: (a: A) => Free<F, B>): Free<F, B> { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

## isPure

**Signature** (method)

```ts
isPure(): this is Pure<F, A> { ... }
```

## isImpure

**Signature** (method)

```ts
isImpure(): this is Impure<F, A, any> { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# foldFree

**Signature** (function)

```ts
export function foldFree<M extends URIS3>(M: Monad3<M>): FoldFree3<M>
export function foldFree<M extends URIS3, U, L>(M: Monad3C<M, U, L>): FoldFree3C<M, U, L>
export function foldFree<M extends URIS2>(M: Monad2<M>): FoldFree2<M>
export function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): FoldFree2C<M, L>
export function foldFree<M extends URIS>(
  M: Monad1<M>
): <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type<M, X>, fa: Free<F, A>) => Type<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A>
export function foldFree<M>(M: Monad<M>): <F, A>(nt: any, fa: Free<F, A>) => HKT<M, A> { ... }
```

Added in v1.0.0

# hoistFree

Use a natural transformation to change the generating type constructor of a free monad

**Signature** (function)

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
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>)
export function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>) { ... }
```

Added in v1.0.0

# liftF

Lift an impure value described by the generating type constructor `F` into the free monad

**Signature** (function)

```ts
export const liftF = <F, A>(fa: HKT<F, A>): Free<F, A> => ...
```

Added in v1.0.0

# of

**Signature** (function)

```ts
export const of = <F, A>(a: A): Free<F, A> => ...
```

Added in v1.0.0
