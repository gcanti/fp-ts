---
title: Traced.ts
nav_order: 103
parent: Modules
---

## Traced overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Functor](#functor)
  - [getComonad](#getcomonad)
- [mapping](#mapping)
  - [flap](#flap)
  - [map](#map)
- [model](#model)
  - [Traced (interface)](#traced-interface)
- [type lambdas](#type-lambdas)
  - [TracedFFix (interface)](#tracedffix-interface)
  - [TracedTypeLambda (interface)](#tracedtypelambda-interface)
- [utils](#utils)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [tracks](#tracks)

---

# instances

## Functor

**Signature**

```ts
export declare const Functor: functor.Functor<TracedTypeLambda>
```

Added in v3.0.0

## getComonad

**Signature**

```ts
export declare const getComonad: <W>(M: Monoid<W>) => Comonad<TracedFFix<W>>
```

Added in v3.0.0

# mapping

## flap

**Signature**

```ts
export declare const flap: <A>(a: A) => <O, B>(self: Traced<O, (a: A) => B>) => Traced<O, B>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => <W>(self: Traced<W, A>) => Traced<W, B>
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

## TracedFFix (interface)

**Signature**

```ts
export interface TracedFFix<W> extends TypeLambda {
  readonly type: Traced<W, this['Out1']>
}
```

Added in v3.0.0

## TracedTypeLambda (interface)

**Signature**

```ts
export interface TracedTypeLambda extends TypeLambda {
  readonly type: Traced<this['In1'], this['Out1']>
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
