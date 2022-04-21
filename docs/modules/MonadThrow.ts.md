---
title: MonadThrow.ts
nav_order: 64
parent: Modules
---

## MonadThrow overview

The `MonadThrow` type class represents those monads which support errors via
`throwError`, where `throwError(e)` halts, yielding the error `e`.

Laws:

- Left zero: `M.chain(M.throwError(e), f) = M.throwError(e)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [MonadThrow (interface)](#monadthrow-interface)
  - [MonadThrow1 (interface)](#monadthrow1-interface)
  - [MonadThrow2 (interface)](#monadthrow2-interface)
  - [MonadThrow2C (interface)](#monadthrow2c-interface)
  - [MonadThrow3 (interface)](#monadthrow3-interface)
  - [MonadThrow3C (interface)](#monadthrow3c-interface)
  - [MonadThrow4 (interface)](#monadthrow4-interface)

---

# type classes

## MonadThrow (interface)

**Signature**

```ts
export interface MonadThrow<M> extends Monad<M> {
  readonly throwError: <E, A>(e: E) => HKT<M, A>
}
```

Added in v2.0.0

## MonadThrow1 (interface)

**Signature**

```ts
export interface MonadThrow1<M extends URIS> extends Monad1<M> {
  readonly throwError: <E, A>(e: E) => Kind<M, A>
}
```

Added in v2.0.0

## MonadThrow2 (interface)

**Signature**

```ts
export interface MonadThrow2<M extends URIS2> extends Monad2<M> {
  readonly throwError: <E, A>(e: E) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadThrow2C (interface)

**Signature**

```ts
export interface MonadThrow2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly throwError: <A>(e: E) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadThrow3 (interface)

**Signature**

```ts
export interface MonadThrow3<M extends URIS3> extends Monad3<M> {
  readonly throwError: <R, E, A>(e: E) => Kind3<M, R, E, A>
}
```

Added in v2.0.0

## MonadThrow3C (interface)

**Signature**

```ts
export interface MonadThrow3C<M extends URIS3, E> extends Monad3C<M, E> {
  readonly throwError: <R, A>(e: E) => Kind3<M, R, E, A>
}
```

Added in v2.2.0

## MonadThrow4 (interface)

**Signature**

```ts
export interface MonadThrow4<M extends URIS4> extends Monad4<M> {
  readonly throwError: <S, R, E, A>(e: E) => Kind4<M, S, R, E, A>
}
```

Added in v2.0.0
