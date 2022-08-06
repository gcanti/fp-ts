---
title: Zero.ts
nav_order: 123
parent: Modules
---

## Zero overview

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [guard](#guard)
- [type classes](#type-classes)
  - [Zero (interface)](#zero-interface)
  - [Zero1 (interface)](#zero1-interface)
  - [Zero2 (interface)](#zero2-interface)
  - [Zero2C (interface)](#zero2c-interface)
  - [Zero3 (interface)](#zero3-interface)
  - [Zero3C (interface)](#zero3c-interface)
  - [Zero4 (interface)](#zero4-interface)

---

# constructors

## guard

**Signature**

```ts
export declare function guard<F extends URIS4>(
  F: Zero4<F>,
  P: Pointed4<F>
): <S, R, E>(b: boolean) => Kind4<F, S, R, E, void>
export declare function guard<F extends URIS3>(F: Zero3<F>, P: Pointed3<F>): <R, E>(b: boolean) => Kind3<F, R, E, void>
export declare function guard<F extends URIS3, E>(
  F: Zero3C<F, E>,
  P: Pointed3C<F, E>
): <R>(b: boolean) => Kind3<F, R, E, void>
export declare function guard<F extends URIS2>(F: Zero2<F>, P: Pointed2<F>): <E>(b: boolean) => Kind2<F, E, void>
export declare function guard<F extends URIS2, E>(
  F: Zero2C<F, E>,
  P: Pointed2C<F, E>
): (b: boolean) => Kind2<F, E, void>
export declare function guard<F extends URIS>(F: Zero1<F>, P: Pointed1<F>): (b: boolean) => Kind<F, void>
export declare function guard<F>(F: Zero<F>, P: Pointed<F>): (b: boolean) => HKT<F, void>
```

Added in v2.11.0

# type classes

## Zero (interface)

**Signature**

```ts
export interface Zero<F> {
  readonly URI: F
  readonly zero: <A>() => HKT<F, A>
}
```

Added in v2.11.0

## Zero1 (interface)

**Signature**

```ts
export interface Zero1<F extends URIS> {
  readonly URI: F
  readonly zero: <A>() => Kind<F, A>
}
```

Added in v2.11.0

## Zero2 (interface)

**Signature**

```ts
export interface Zero2<F extends URIS2> {
  readonly URI: F
  readonly zero: <E, A>() => Kind2<F, E, A>
}
```

Added in v2.11.0

## Zero2C (interface)

**Signature**

```ts
export interface Zero2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly zero: <A>() => Kind2<F, E, A>
}
```

Added in v2.11.0

## Zero3 (interface)

**Signature**

```ts
export interface Zero3<F extends URIS3> {
  readonly URI: F
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}
```

Added in v2.11.0

## Zero3C (interface)

**Signature**

```ts
export interface Zero3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly zero: <R, A>() => Kind3<F, R, E, A>
}
```

Added in v2.11.0

## Zero4 (interface)

**Signature**

```ts
export interface Zero4<F extends URIS4> {
  readonly URI: F
  readonly zero: <S, R, E, A>() => Kind4<F, S, R, E, A>
}
```

Added in v2.11.0
