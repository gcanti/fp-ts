---
id: Functor
title: Functor
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)

# Functor

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L18-L21)

```ts
export interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions `f a -> f b` whose argument and return types use the type
constructor `f` to represent some computational context.

Instances must satisfy the following laws:

1. Identity: `F.map(fa, a => a) = fa`
2. Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`

Added in v1.0.0

## flap

Apply a value in a computational context to a value in no context. Generalizes `flip`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L172-L174)

```ts
export function flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B>  { ... }
```

Added in v1.0.0

## getFunctorComposition

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L212-L216)

```ts
export function getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>  { ... }
```

Added in v1.0.0

## lift

Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L111-L113)

```ts
export function lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>  { ... }
```

Added in v1.0.0

## voidLeft

A version of [voidRight](#voidright) with its arguments flipped (`$>`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L149-L151)

```ts
export function voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B>  { ... }
```

Added in v1.0.0

## voidRight

Ignore the return value of a computation, using the specified return value instead (`<$`)

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts#L130-L132)

```ts
export function voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A>  { ... }
```

Added in v1.0.0
