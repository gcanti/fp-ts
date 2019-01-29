---
id: MonadTask
title: Module MonadTask
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadTask.ts)

# MonadTask

**Signature** (type class)

```ts
export interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Lift a computation from the `Task` monad

Added in v1.10.0
