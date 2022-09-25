---
title: Traced.ts
nav_order: 102
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
  - [getComonad](#getcomonad)
- [model](#model)
  - [Traced (interface)](#traced-interface)
- [type lambdas](#type-lambdas)
  - [Tracedλ (interface)](#traced%CE%BB-interface)
  - [TracedλFix (interface)](#traced%CE%BBfix-interface)
- [utils](#utils)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [tracks](#tracks)

---

# Functor

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <W>(self: Traced<W, A>) => Traced<W, B>
```

Added in v3.0.0

# combinators

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <W, B>(self: Traced<W, (a: A) => B>) => Traced<W, B>
```

Added in v3.0.0

# instances

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<Tracedλ>
```

Added in v3.0.0

## getComonad

**Signature**

```ts
export declare const getComonad: <W>(M: Monoid<W>) => Comonad<TracedλFix<W>>
```

Added in v3.0.0

# model

## Traced (interface)

**Signature**

```ts
export interface Traced<W, A> {
  (w: W): A
}
```

Added in v3.0.0

# type lambdas

## Tracedλ (interface)

**Signature**

```ts
export interface Tracedλ extends HKT {
  readonly type: Traced<this['In1'], this['Out1']>
}
```

Added in v3.0.0

## TracedλFix (interface)

**Signature**

```ts
export interface TracedλFix<W> extends HKT {
  readonly type: Traced<W, this['Out1']>
}
```

Added in v3.0.0

# utils

## censor

Apply a function to the current position.

**Signature**

```ts
export declare const censor: <W>(f: (p: W) => W) => <A>(pa: Traced<W, A>) => Traced<W, A>
```

Added in v3.0.0

## listen

Get the current position.

**Signature**

```ts
export declare const listen: <W, A>(fa: Traced<W, A>) => Traced<W, readonly [A, W]>
```

Added in v3.0.0

## listens

Get a value which depends on the current position.

**Signature**

```ts
export declare const listens: <W, B>(f: (w: W) => B) => <A>(pa: Traced<W, A>) => Traced<W, readonly [A, B]>
```

Added in v3.0.0

## tracks

Extracts a value at a relative position which depends on the current value.

**Signature**

```ts
export declare const tracks: <W>(M: Monoid<W>) => <A>(f: (a: A) => W) => (fa: Traced<W, A>) => A
```

Added in v3.0.0
