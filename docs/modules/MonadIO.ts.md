---
title: MonadIO.ts
nav_order: 55
parent: Modules
---

# Overview

Lift a computation from the `IO` monad

---

<h2 class="text-delta">Table of contents</h2>

- [MonadIO (interface)](#monadio-interface)
- [MonadIO1 (interface)](#monadio1-interface)
- [MonadIO2 (interface)](#monadio2-interface)
- [MonadIO2C (interface)](#monadio2c-interface)
- [MonadIO3 (interface)](#monadio3-interface)
- [MonadIO3C (interface)](#monadio3c-interface)

---

# MonadIO (interface)

**Signature**

```ts
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Added in v2.0.0

# MonadIO1 (interface)

**Signature**

```ts
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Type<M, A>
}
```

# MonadIO2 (interface)

**Signature**

```ts
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <L, A>(fa: IO<A>) => Type2<M, L, A>
}
```

# MonadIO2C (interface)

**Signature**

```ts
export interface MonadIO2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type2<M, L, A>
}
```

# MonadIO3 (interface)

**Signature**

```ts
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <U, L, A>(fa: IO<A>) => Type3<M, U, L, A>
}
```

# MonadIO3C (interface)

**Signature**

```ts
export interface MonadIO3C<M extends URIS3, U, L> extends Monad3C<M, U, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type3<M, U, L, A>
}
```
