---
title: MonadIO.ts
nav_order: 54
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

Added in v2.0.0

# MonadIO2 (interface)

**Signature**

```ts
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <L, A>(fa: IO<A>) => Type2<M, L, A>
}
```

Added in v2.0.0

# MonadIO2C (interface)

**Signature**

```ts
export interface MonadIO2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type2<M, L, A>
}
```

Added in v2.0.0

# MonadIO3 (interface)

**Signature**

```ts
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <U, L, A>(fa: IO<A>) => Type3<M, U, L, A>
}
```

Added in v2.0.0
