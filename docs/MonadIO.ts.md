---
title: MonadIO.ts
nav_order: 55
---

# Overview

Lift a computation from the `IO` monad

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [MonadIO](#monadio)
- [MonadIO1](#monadio1)
- [MonadIO2](#monadio2)
- [MonadIO2C](#monadio2c)
- [MonadIO3](#monadio3)
- [MonadIO3C](#monadio3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MonadIO

**Signature** (interface)

```ts
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Added in v1.10.0

# MonadIO1

**Signature** (interface)

```ts
export interface MonadIO1<M extends URIS> extends Monad1<M> {
  readonly fromIO: <A>(fa: IO<A>) => Type<M, A>
}
```

# MonadIO2

**Signature** (interface)

```ts
export interface MonadIO2<M extends URIS2> extends Monad2<M> {
  readonly fromIO: <L, A>(fa: IO<A>) => Type2<M, L, A>
}
```

# MonadIO2C

**Signature** (interface)

```ts
export interface MonadIO2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type2<M, L, A>
}
```

# MonadIO3

**Signature** (interface)

```ts
export interface MonadIO3<M extends URIS3> extends Monad3<M> {
  readonly fromIO: <U, L, A>(fa: IO<A>) => Type3<M, U, L, A>
}
```

# MonadIO3C

**Signature** (interface)

```ts
export interface MonadIO3C<M extends URIS3, U, L> extends Monad3C<M, U, L> {
  readonly fromIO: <A>(fa: IO<A>) => Type3<M, U, L, A>
}
```
