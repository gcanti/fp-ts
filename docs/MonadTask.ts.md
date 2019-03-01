---
title: MonadTask.ts
nav_order: 56
---

# Overview

Lift a computation from the `Task` monad

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [MonadTask](#monadtask)
- [MonadTask1](#monadtask1)
- [MonadTask2](#monadtask2)
- [MonadTask2C](#monadtask2c)
- [MonadTask3](#monadtask3)
- [MonadTask3C](#monadtask3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MonadTask

**Signature** (interface)

```ts
export interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Added in v1.10.0

# MonadTask1

**Signature** (interface)

```ts
export interface MonadTask1<M extends URIS> extends Monad1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Type<M, A>
}
```

# MonadTask2

**Signature** (interface)

```ts
export interface MonadTask2<M extends URIS2> extends Monad2<M> {
  readonly fromTask: <L, A>(fa: Task<A>) => Type2<M, L, A>
}
```

# MonadTask2C

**Signature** (interface)

```ts
export interface MonadTask2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromTask: <A>(fa: Task<A>) => Type2<M, L, A>
}
```

# MonadTask3

**Signature** (interface)

```ts
export interface MonadTask3<M extends URIS3> extends Monad3<M> {
  readonly fromTask: <U, L, A>(fa: Task<A>) => Type3<M, U, L, A>
}
```

# MonadTask3C

**Signature** (interface)

```ts
export interface MonadTask3C<M extends URIS3, U, L> extends Monad3C<M, U, L> {
  readonly fromTask: <A>(fa: Task<A>) => Type3<M, U, L, A>
}
```
