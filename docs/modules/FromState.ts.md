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

- [constructors](#constructors)
  - [get](#get)
  - [gets](#gets)
  - [modify](#modify)
  - [put](#put)
- [type classes](#type-classes)
  - [FromState (interface)](#fromstate-interface)
  - [FromState2 (interface)](#fromstate2-interface)
  - [FromState3 (interface)](#fromstate3-interface)
  - [FromState3C (interface)](#fromstate3c-interface)
  - [FromState4 (interface)](#fromstate4-interface)

---

# constructors

## get

**Signature**

```ts
export declare function get<F extends URIS4>(F: FromState4<F>): <S, R, E>() => Kind4<F, S, R, E, S>
export declare function get<F extends URIS3>(F: FromState3<F>): <S, E>() => Kind3<F, S, E, S>
export declare function get<F extends URIS3, E>(F: FromState3C<F, E>): <S>() => Kind3<F, S, E, S>
export declare function get<F extends URIS2>(F: FromState2<F>): <S>() => Kind2<F, S, S>
export declare function get<F>(F: FromState<F>): <S>() => HKT2<F, S, S>
```

Added in v3.0.0

## gets

**Signature**

```ts
export declare function gets<F extends URIS4>(F: FromState4<F>): <S, R, E, A>(f: (s: S) => A) => Kind4<F, S, R, E, A>
export declare function gets<F extends URIS3>(F: FromState3<F>): <S, E, A>(f: (s: S) => A) => Kind3<F, S, E, A>
export declare function gets<F extends URIS3, E>(F: FromState3C<F, E>): <S, A>(f: (s: S) => A) => Kind3<F, S, E, A>
export declare function gets<F extends URIS2>(F: FromState2<F>): <S, A>(f: (s: S) => A) => Kind2<F, S, A>
export declare function gets<F>(F: FromState<F>): <S, A>(f: (s: S) => A) => HKT2<F, S, A>
```

Added in v3.0.0

## modify

**Signature**

```ts
export declare function modify<F extends URIS4>(
  F: FromState4<F>
): <S, R, E>(f: Endomorphism<S>) => Kind4<F, S, R, E, void>
export declare function modify<F extends URIS3>(F: FromState3<F>): <S, E>(f: Endomorphism<S>) => Kind3<F, S, E, void>
export declare function modify<F extends URIS3, E>(
  F: FromState3C<F, E>
): <S>(f: Endomorphism<S>) => Kind3<F, S, E, void>
export declare function modify<F extends URIS2>(F: FromState2<F>): <S>(f: Endomorphism<S>) => Kind2<F, S, void>
export declare function modify<F>(F: FromState<F>): <S>(f: Endomorphism<S>) => HKT2<F, S, void>
```

Added in v3.0.0

## put

**Signature**

```ts
export declare function put<F extends URIS4>(F: FromState4<F>): <S, R, E>(s: S) => Kind4<F, S, R, E, void>
export declare function put<F extends URIS3>(F: FromState3<F>): <S, E>(s: S) => Kind3<F, S, E, void>
export declare function put<F extends URIS3, E>(F: FromState3C<F, E>): <S>(s: S) => Kind3<F, S, E, void>
export declare function put<F extends URIS2>(F: FromState2<F>): <S>(s: S) => Kind2<F, S, void>
export declare function put<F>(F: FromState<F>): <S>(s: S) => HKT2<F, S, void>
```

Added in v3.0.0

# type classes

## FromState (interface)

**Signature**

```ts
export interface FromState<F> {
  readonly URI?: F
  readonly fromState: <S, A>(fa: State<S, A>) => HKT2<F, S, A>
}
```

Added in v3.0.0

## FromState2 (interface)

**Signature**

```ts
export interface FromState2<F extends URIS2> {
  readonly URI?: F
  readonly fromState: <S, A>(fa: State<S, A>) => Kind2<F, S, A>
}
```

Added in v3.0.0

## FromState3 (interface)

**Signature**

```ts
export interface FromState3<F extends URIS3> {
  readonly URI?: F
  readonly fromState: <S, A, E>(fa: State<S, A>) => Kind3<F, S, E, A>
}
```

Added in v3.0.0

## FromState3C (interface)

**Signature**

```ts
export interface FromState3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromState: <S, A>(fa: State<S, A>) => Kind3<F, S, E, A>
}
```

Added in v3.0.0

## FromState4 (interface)

**Signature**

```ts
export interface FromState4<F extends URIS4> {
  readonly URI?: F
  readonly fromState: <S, A, R, E>(fa: State<S, A>) => Kind4<F, S, R, E, A>
}
```

Added in v3.0.0
