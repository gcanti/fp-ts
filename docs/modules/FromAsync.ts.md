---
title: FromAsync.ts
nav_order: 38
parent: Modules
---

## FromAsync overview

Lift a computation from the `Async` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [sleep](#sleep)
- [lifting](#lifting)
  - [liftAsync](#liftasync)
- [model](#model)
  - [FromAsync (interface)](#fromasync-interface)
- [sequencing](#sequencing)
  - [flatMapAsync](#flatmapasync)
- [utils](#utils)
  - [delay](#delay)

---

# constructors

## sleep

Returns an effect that suspends for the specified `duration` (in millis).

**Signature**

```ts
export declare const sleep: <F extends TypeLambda>(
  FromAsync: FromAsync<F>
) => <S>(duration: number) => Kind<F, S, unknown, never, never, void>
```

Added in v3.0.0

# lifting

## liftAsync

**Signature**

```ts
export declare const liftAsync: <F extends TypeLambda>(
  FromAsync: FromAsync<F>
) => <A extends readonly unknown[], B>(f: (...a: A) => Async<B>) => <S>(...a: A) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# model

## FromAsync (interface)

**Signature**

```ts
export interface FromAsync<F extends TypeLambda> extends FromSync<F> {
  readonly fromAsync: <A, S>(fa: Async<A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapAsync

**Signature**

```ts
export declare const flatMapAsync: <F extends TypeLambda>(
  FromAsync: FromAsync<F>,
  Flattenable: Flattenable<F>
) => <A, B>(f: (a: A) => Async<B>) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
```

Added in v3.0.0

# utils

## delay

Returns an effect that is delayed from this effect by the specified `duration` (in millis).

**Signature**

```ts
export declare const delay: <F extends TypeLambda>(
  FromAsync: FromAsync<F>,
  Flattenable: Flattenable<F>
) => (duration: number) => <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0
