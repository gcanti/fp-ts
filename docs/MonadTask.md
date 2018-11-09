---
id: MonadTask
title: Module MonadTask
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadTask.ts)

# MonadTask

```ts
interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

Added in v1.10.0 (type class)

Lift a computation from the `Task` monad
