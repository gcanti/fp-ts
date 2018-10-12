---
id: MonadTask
title: Module MonadTask
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadTask.ts)

## Type classes

### MonadTask

_type class_

_since 1.10.0_

_Signature_

```ts
interface MonadTask<M> extends Monad<M> {
  readonly fromTask: <A>(fa: Task<A>) => HKT<M, A>
}
```

_Description_

Lift a computation from the `Task` monad
