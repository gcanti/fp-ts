---
title: FromIO.ts
nav_order: 35
parent: Modules
---

## FromIO overview

Lift a computation from the `IO` monad

Added in v2.10.0

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
export interface FromIO<F> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => HKT<F, A>
}
```

Added in v2.10.0

## FromIO1 (interface)

**Signature**

```ts
export interface FromIO1<F extends URIS> {
  readonly URI: F
  readonly fromIO: <A>(fa: IO<A>) => Kind<F, A>
}
```

Added in v2.10.0

## FromIO2 (interface)

**Signature**

```ts
export interface FromIO2<F extends URIS2> {
  readonly URI: F
  readonly fromIO: <E, A>(fa: IO<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromIO2C (interface)

**Signature**

```ts
export interface FromIO2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <A>(fa: IO<A>) => Kind2<F, E, A>
}
```

Added in v2.10.0

## FromIO3 (interface)

**Signature**

```ts
export interface FromIO3<F extends URIS3> {
  readonly URI: F
  readonly fromIO: <R, E, A>(fa: IO<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromIO3C (interface)

**Signature**

```ts
export interface FromIO3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromIO: <R, A>(fa: IO<A>) => Kind3<F, R, E, A>
}
```

Added in v2.10.0

## FromIO4 (interface)

**Signature**

```ts
export interface FromIO4<F extends URIS4> {
  readonly URI: F
  readonly fromIO: <S, R, E, A>(fa: IO<A>) => Kind4<F, S, R, E, A>
}
```

Added in v2.10.0
