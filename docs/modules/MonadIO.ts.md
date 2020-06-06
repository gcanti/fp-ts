---
title: MonadIO.ts
nav_order: 52
parent: Modules
---

## MonadIO overview

Lift a computation from the `IO` monad

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [MonadIO (interface)](#monadio-interface)
  - [MonadIO1 (interface)](#monadio1-interface)
  - [MonadIO2 (interface)](#monadio2-interface)
  - [MonadIO2C (interface)](#monadio2c-interface)
  - [MonadIO3 (interface)](#monadio3-interface)
  - [MonadIO3C (interface)](#monadio3c-interface)
  - [MonadIO4 (interface)](#monadio4-interface)

---

# type classes

## MonadIO (interface)

**Signature**

```ts
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Added in v2.0.0

## MonadIO1 (interface)

**Signature**

```ts
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}
```

Added in v2.0.0

## MonadIO2 (interface)

**Signature**

```ts
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadIO2C (interface)

**Signature**

```ts
export interface MonadIO2C<M extends URIS2, E> extends Monad2C<M, E> {
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}
```

Added in v2.0.0

## MonadIO3 (interface)

**Signature**

```ts
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

Added in v2.0.0

## MonadIO3C (interface)

**Signature**

```ts
export interface MonadIO3C<M extends URIS3, E> extends Monad3C<M, E> {
  readonly fromIO: <R, A>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

Added in v2.2.0

## MonadIO4 (interface)

**Signature**

```ts
export interface MonadIO4<M extends URIS4> extends Monad4<M> {
  readonly fromIO: <S, R, E, A>(fa: IO<A>) => Kind4<M, S, R, E, A>
}
```

Added in v2.4.4
