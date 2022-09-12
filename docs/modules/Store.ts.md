---
title: Store.ts
nav_order: 94
parent: Modules
---

## Store overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Extend](#extend)
  - [extend](#extend)
- [Extract](#extract)
  - [extract](#extract)
- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [flap](#flap)
- [derivable combinators](#derivable-combinators)
  - [duplicate](#duplicate)
- [instances](#instances)
  - [Comonad](#comonad)
  - [Functor](#functor-1)
  - [StoreF (interface)](#storef-interface)
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
export declare const extend: <S, A, B>(f: (wa: Store<S, A>) => B) => (wa: Store<S, A>) => Store<S, B>
```

Added in v3.0.0

# Extract

## extract

**Signature**

```ts
export declare const extract: <S, A>(wa: Store<S, A>) => A
```

Added in v3.0.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <S>(fa: Store<S, A>) => Store<S, B>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <S, B>(fab: Store<S, (a: A) => B>) => Store<S, B>
```

Added in v3.0.0

# derivable combinators

## duplicate

Derivable from `Extend`.

**Signature**

```ts
export declare const duplicate: <S, A>(wa: Store<S, A>) => Store<S, Store<S, A>>
```

Added in v3.0.0

# instances

## Comonad

**Signature**

```ts
export declare const Comonad: Comonad_<StoreF>
```

Added in v3.0.0

## Functor

**Signature**

```ts
export declare const Functor: Functor_<StoreF>
```

Added in v3.0.0

## StoreF (interface)

**Signature**

```ts
export interface StoreF extends HKT {
  readonly type: Store<this['S'], this['A']>
}
```

Added in v3.0.0

# model

## Store (interface)

**Signature**

```ts
export interface Store<S, A> {
  readonly peek: (s: S) => A
  readonly pos: S
}
```

Added in v3.0.0

# utils

## experiment

Extract a collection of values from positions which depend on the current position.

**Signature**

```ts
export declare function experiment<F extends HKT>(
  F: Functor_<F>
): <S1, S2, R, E>(f: (s: S1) => Kind<F, S2, R, E, S1>) => <A>(wa: Store<S1, A>) => Kind<F, S2, R, E, A>
```

Added in v3.0.0

## peeks

Extract a value from a position which depends on the current position.

**Signature**

```ts
export declare const peeks: <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>) => A
```

Added in v3.0.0

## seek

Reposition the focus at the specified position.

**Signature**

```ts
export declare const seek: <S>(s: S) => <A>(wa: Store<S, A>) => Store<S, A>
```

Added in v3.0.0

## seeks

Reposition the focus at the specified position, which depends on the current position.

**Signature**

```ts
export declare const seeks: <S>(f: Endomorphism<S>) => <A>(wa: Store<S, A>) => Store<S, A>
```

Added in v3.0.0
