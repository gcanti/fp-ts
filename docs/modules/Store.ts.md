---
title: Store.ts
nav_order: 102
parent: Modules
---

## Store overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [duplicate](#duplicate)
  - [flap](#flap)
- [instances](#instances)
  - [Comonad](#comonad)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [~~store~~](#store)
- [model](#model)
  - [Store (interface)](#store-interface)
- [utils](#utils)
  - [experiment](#experiment)
  - [peeks](#peeks)
  - [seek](#seek)
  - [seeks](#seeks)

---

# Extend

## extend

**Signature**

```ts
export declare const extend: <E, A, B>(f: (wa: Store<E, A>) => B) => (wa: Store<E, A>) => Store<E, B>
```

Added in v2.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <E, A>(wa: Store<E, A>) => A
```

Added in v2.6.2

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Store<E, A>) => Store<E, B>
```

Added in v2.0.0

# combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <E, A>(wa: Store<E, A>) => Store<E, Store<E, A>>
```

Added in v2.0.0

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Store<E, (a: A) => B>) => Store<E, B>
```

Added in v2.10.0

# instances

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad2<'Store'>
```

Added in v2.7.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Store'>
```

Added in v2.7.0

## URI

**Signature**

```ts
export declare const URI: 'Store'
```

Added in v2.0.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

## ~~store~~

This instance is deprecated, use small, specific instances instead.
For example if a function needs a `Comonad` instance, pass `S.Comonad` instead of `S.store`
(where `S` is from `import S from 'fp-ts/Store'`)

**Signature**

```ts
export declare const store: Comonad2<'Store'>
```

Added in v2.0.0

# model

## Store (interface)

**Signature**

```ts
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}
```

Added in v2.0.0

# utils

## experiment

Extract a collection of values from positions which depend on the current position

**Signature**

```ts
export declare function experiment<F extends URIS3>(
  F: Functor3<F>
): <R, E, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export declare function experiment<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, S>(f: (s: S) => Kind3<F, R, E, S>) => <A>(wa: Store<S, A>) => Kind3<F, R, E, A>
export declare function experiment<F extends URIS2>(
  F: Functor2<F>
): <E, S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export declare function experiment<F extends URIS2, E>(
  F: Functor2C<F, E>
): <S>(f: (s: S) => Kind2<F, E, S>) => <A>(wa: Store<S, A>) => Kind2<F, E, A>
export declare function experiment<F extends URIS>(
  F: Functor1<F>
): <S>(f: (s: S) => Kind<F, S>) => <A>(wa: Store<S, A>) => Kind<F, A>
export declare function experiment<F>(
  F: FunctorHKT<F>
): <S>(f: (s: S) => HKT<F, S>) => <A>(wa: Store<S, A>) => HKT<F, A>
```

Added in v2.0.0

## peeks

Extract a value from a position which depends on the current position

**Signature**

```ts
export declare function peeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => A
```

Added in v2.0.0

## seek

Reposition the focus at the specified position

**Signature**

```ts
export declare function seek<S>(s: S): <A>(wa: Store<S, A>) => Store<S, A>
```

Added in v2.0.0

## seeks

Reposition the focus at the specified position, which depends on the current position

**Signature**

```ts
export declare function seeks<S>(f: Endomorphism<S>): <A>(wa: Store<S, A>) => Store<S, A>
```

Added in v2.0.0
