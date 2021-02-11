---
title: Unfoldable.ts
nav_order: 105
parent: Modules
---

## Unfoldable overview

This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Unfoldable (interface)](#unfoldable-interface)
  - [Unfoldable1 (interface)](#unfoldable1-interface)
  - [Unfoldable2 (interface)](#unfoldable2-interface)
  - [Unfoldable2C (interface)](#unfoldable2c-interface)
  - [Unfoldable3 (interface)](#unfoldable3-interface)
  - [Unfoldable3C (interface)](#unfoldable3c-interface)
  - [Unfoldable4 (interface)](#unfoldable4-interface)

---

# type classes

## Unfoldable (interface)

**Signature**

```ts
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

Added in v2.0.0

## Unfoldable1 (interface)

**Signature**

```ts
export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind<F, A>
}
```

Added in v2.0.0

## Unfoldable2 (interface)

**Signature**

```ts
export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfold: <E, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, E, A>
}
```

Added in v2.0.0

## Unfoldable2C (interface)

**Signature**

```ts
export interface Unfoldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly unfold: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, E, A>
}
```

Added in v2.0.0

## Unfoldable3 (interface)

**Signature**

```ts
export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfold: <R, E, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, R, E, A>
}
```

Added in v2.0.0

## Unfoldable3C (interface)

**Signature**

```ts
export interface Unfoldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly unfold: <R, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## Unfoldable4 (interface)

**Signature**

```ts
export interface Unfoldable4<F extends URIS4> {
  readonly URI: F
  readonly unfold: <S, R, E, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind4<F, S, R, E, A>
}
```

Added in v2.0.0
