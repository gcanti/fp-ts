---
title: FromState.ts
nav_order: 37
parent: Modules
---

## FromState overview

Lift a computation from the `State` monad.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [chainStateK](#chainstatek)
  - [fromStateK](#fromstatek)
- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [type classes](#type-classes)
  - [FromState (interface)](#fromstate-interface)

---

# combinators

## chainStateK

**Signature**

```ts
export declare const chainStateK: <M extends HKT>(
  F: FromState<M>,
  M: Chain<M>
) => <A, S, B>(f: (a: A) => S.State<S, B>) => <R, W, E>(ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
```

Added in v3.0.0

## fromStateK

**Signature**

```ts
export declare const fromStateK: <F extends HKT>(
  F: FromState<F>
) => <A extends readonly unknown[], S, B>(
  f: (...a: A) => S.State<S, B>
) => <R = unknown, W = never, E = never>(...a: A) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

# constructors

## get

**Signature**

```ts
export declare function get<F extends HKT>(
  F: FromState<F>
): <S, R = unknown, W = never, E = never>() => Kind<F, S, R, W, E, S>
```

Added in v3.0.0

## gets

**Signature**

```ts
export declare const gets: <F extends HKT>(
  F: FromState<F>
) => <S, A, R = unknown, W = never, E = never>(f: (s: S) => A) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0

## modify

**Signature**

```ts
export declare const modify: <F extends HKT>(
  F: FromState<F>
) => <S, R = unknown, W = never, E = never>(f: Endomorphism<S>) => Kind<F, S, R, W, E, void>
```

Added in v3.0.0

## put

**Signature**

```ts
export declare function put<F extends HKT>(
  F: FromState<F>
): <S, R = unknown, W = never, E = never>(s: S) => Kind<F, S, R, W, E, void>
```

Added in v3.0.0

# type classes

## FromState (interface)

**Signature**

```ts
export interface FromState<F extends HKT> extends Typeclass<F> {
  readonly fromState: <S, A, R = unknown, W = never, E = never>(fa: State<S, A>) => Kind<F, S, R, W, E, A>
}
```

Added in v3.0.0
