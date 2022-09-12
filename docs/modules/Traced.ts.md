---
title: Traced.ts
nav_order: 104
parent: Modules
---

## Traced overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Functor](#functor)
  - [map](#map)
- [combinators](#combinators)
  - [flap](#flap)
- [instances](#instances)
  - [Functor](#functor-1)
  - [TracedF (interface)](#tracedf-interface)
  - [TracedFE (interface)](#tracedfe-interface)
  - [getComonad](#getcomonad)
- [model](#model)
  - [Traced (interface)](#traced-interface)
- [utils](#utils)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [tracks](#tracks)

---

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <P>(fa: Traced<P, A>) => Traced<P, B>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <P, B>(fab: Traced<P, (a: A) => B>) => Traced<P, B>
```

Added in v3.0.0

# instances

## Functor

**Signature**

```ts
export declare const Functor: Functor_<TracedF>
```

Added in v3.0.0

## TracedF (interface)

**Signature**

```ts
export interface TracedF extends HKT {
  readonly type: Traced<this['E'], this['A']>
}
```

Added in v3.0.0

## TracedFE (interface)

**Signature**

```ts
export interface TracedFE<E> extends HKT {
  readonly type: Traced<E, this['A']>
}
```

Added in v3.0.0

## getComonad

**Signature**

```ts
export declare const getComonad: <P>(monoid: Monoid<P>) => Comonad<TracedFE<P>>
```

Added in v3.0.0

# model

## Traced (interface)

**Signature**

```ts
export interface Traced<P, A> {
  (p: P): A
}
```

Added in v3.0.0

# utils

## censor

Apply a function to the current position.

**Signature**

```ts
export declare const censor: <P>(f: (p: P) => P) => <A>(pa: Traced<P, A>) => Traced<P, A>
```

Added in v3.0.0

## listen

Get the current position.

**Signature**

```ts
export declare const listen: <P, A>(pa: Traced<P, A>) => Traced<P, readonly [A, P]>
```

Added in v3.0.0

## listens

Get a value which depends on the current position.

**Signature**

```ts
export declare const listens: <P, B>(f: (p: P) => B) => <A>(pa: Traced<P, A>) => Traced<P, readonly [A, B]>
```

Added in v3.0.0

## tracks

Extracts a value at a relative position which depends on the current value.

**Signature**

```ts
export declare const tracks: <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (pa: Traced<P, A>) => A
```

Added in v3.0.0
