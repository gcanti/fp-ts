---
title: FromIO.ts
nav_order: 31
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [FromIO (interface)](#fromio-interface)
  - [FromIO1 (interface)](#fromio1-interface)
  - [FromIO2 (interface)](#fromio2-interface)
  - [FromIO2C (interface)](#fromio2c-interface)
  - [FromIO3 (interface)](#fromio3-interface)
  - [FromIO3C (interface)](#fromio3c-interface)
  - [FromIO4 (interface)](#fromio4-interface)

---

# type classes

## FromIO (interface)

**Signature**

```ts
export interface FromIO<M> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Added in v3.0.0

## FromIO1 (interface)

**Signature**

```ts
export interface FromIO1<M extends URIS> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind<M, A>
}
```

Added in v3.0.0

## FromIO2 (interface)

**Signature**

```ts
export interface FromIO2<M extends URIS2> {
  readonly URI: M
  readonly fromIO: <A, E>(fa: IO<A>) => Kind2<M, E, A>
}
```

Added in v3.0.0

## FromIO2C (interface)

**Signature**

```ts
export interface FromIO2C<M extends URIS2, E> {
  readonly URI: M
  readonly fromIO: <A>(fa: IO<A>) => Kind2<M, E, A>
}
```

Added in v3.0.0

## FromIO3 (interface)

**Signature**

```ts
export interface FromIO3<M extends URIS3> {
  readonly URI: M
  readonly fromIO: <A, R, E>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

Added in v3.0.0

## FromIO3C (interface)

**Signature**

```ts
export interface FromIO3C<M extends URIS3, E> {
  readonly URI: M
  readonly fromIO: <A, R>(fa: IO<A>) => Kind3<M, R, E, A>
}
```

Added in v3.0.0

## FromIO4 (interface)

**Signature**

```ts
export interface FromIO4<M extends URIS4> {
  readonly URI: M
  readonly fromIO: <A, S, R, E>(fa: IO<A>) => Kind4<M, S, R, E, A>
}
```

Added in v3.0.0
