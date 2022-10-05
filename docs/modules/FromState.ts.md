---
title: FromState.ts
nav_order: 41
parent: Modules
---

## FromState overview

Lift a computation from the `State` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [lifting](#lifting)
  - [liftState](#liftstate)
- [model](#model)
  - [FromState (interface)](#fromstate-interface)
- [sequencing](#sequencing)
  - [flatMapState](#flatmapstate)

---

# constructors

## get

**Signature**

```ts
export declare function get<F extends TypeLambda>(F: FromState<F>): <S>() => Kind<F, S, unknown, never, never, S>
```

Added in v3.0.0

## gets

**Signature**

```ts
export declare const gets: <F extends TypeLambda>(
  F: FromState<F>
) => <S, A>(f: (s: S) => A) => Kind<F, S, unknown, never, never, A>
```

Added in v3.0.0

## modify

**Signature**

```ts
export declare const modify: <F extends TypeLambda>(
  F: FromState<F>
) => <S>(f: Endomorphism<S>) => Kind<F, S, unknown, never, never, void>
```

Added in v3.0.0

## put

**Signature**

```ts
export declare function put<F extends TypeLambda>(F: FromState<F>): <S>(s: S) => Kind<F, S, unknown, never, never, void>
```

Added in v3.0.0

# lifting

## liftState

**Signature**

```ts
export declare const liftState: <F extends TypeLambda>(
  F: FromState<F>
) => <A extends readonly unknown[], S, B>(
  f: (...a: A) => state.State<S, B>
) => (...a: A) => Kind<F, S, unknown, never, never, B>
```

Added in v3.0.0

# model

## FromState (interface)

**Signature**

```ts
export interface FromState<F extends TypeLambda> extends TypeClass<F> {
  readonly fromState: <S, A>(fa: State<S, A>) => Kind<F, S, unknown, never, never, A>
}
```

Added in v3.0.0

# sequencing

## flatMapState

**Signature**

```ts
export declare const flatMapState: <M extends TypeLambda>(
  F: FromState<M>,
  M: Flattenable<M>
) => <A, S, B>(f: (a: A) => state.State<S, B>) => <R, O, E>(self: Kind<M, S, R, O, E, A>) => Kind<M, S, R, O, E, B>
```

Added in v3.0.0
