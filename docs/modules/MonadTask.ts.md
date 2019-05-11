---
title: MonadTask.ts
nav_order: 55
parent: Modules
---

# Overview

Lift a computation from the `Task` monad

---

<h2 class="text-delta">Table of contents</h2>

- [MonadTask (interface)](#monadtask-interface)
- [MonadTask1 (interface)](#monadtask1-interface)
- [MonadTask2 (interface)](#monadtask2-interface)
- [MonadTask2C (interface)](#monadtask2c-interface)
- [MonadTask3 (interface)](#monadtask3-interface)

---

# MonadTask (interface)

**Signature**

```ts
export interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Added in v2.0.0

# MonadTask1 (interface)

**Signature**

```ts
export interface MonadTask1<M extends URIS> extends Monad1<M> {
  readonly fromTask: <A>(fa: Task<A>) => Type<M, A>
}
```

Added in v2.0.0

# MonadTask2 (interface)

**Signature**

```ts
export interface MonadTask2<M extends URIS2> extends Monad2<M> {
  readonly fromTask: <L, A>(fa: Task<A>) => Type2<M, L, A>
}
```

Added in v2.0.0

# MonadTask2C (interface)

**Signature**

```ts
export interface MonadTask2C<M extends URIS2, L> extends Monad2C<M, L> {
  readonly fromTask: <A>(fa: Task<A>) => Type2<M, L, A>
}
```

Added in v2.0.0

# MonadTask3 (interface)

**Signature**

```ts
export interface MonadTask3<M extends URIS3> extends Monad3<M> {
  readonly fromTask: <U, L, A>(fa: Task<A>) => Type3<M, U, L, A>
}
```

Added in v2.0.0
