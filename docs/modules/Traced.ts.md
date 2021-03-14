---
title: Traced.ts
nav_order: 98
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
  - [URI (type alias)](#uri-type-alias)
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
export declare const map: <A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B>
```

Added in v3.0.0

# combinators

## flap

Derivable from `Functor`.

**Signature**

```ts
export declare const flap: <A>(a: A) => <E, B>(fab: Traced<E, (a: A) => B>) => Traced<E, B>
```

Added in v3.0.0

# instances

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Traced'>
```

Added in v3.0.0

## URI (type alias)

**Signature**

```ts
export type URI = 'Traced'
```

Added in v3.0.0

## getComonad

**Signature**

```ts
export declare const getComonad: <P>(monoid: Monoid<P>) => Comonad2C<'Traced', P>
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
export declare const censor: <P>(f: (p: P) => P) => <A>(wa: Traced<P, A>) => Traced<P, A>
```

Added in v3.0.0

## listen

Get the current position.

**Signature**

```ts
export declare const listen: <P, A>(wa: Traced<P, A>) => Traced<P, readonly [A, P]>
```

Added in v3.0.0

## listens

Get a value which depends on the current position.

**Signature**

```ts
export declare const listens: <P, B>(f: (p: P) => B) => <A>(wa: Traced<P, A>) => Traced<P, readonly [A, B]>
```

Added in v3.0.0

## tracks

Extracts a value at a relative position which depends on the current value.

**Signature**

```ts
export declare const tracks: <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (wa: Traced<P, A>) => A
```

Added in v3.0.0
