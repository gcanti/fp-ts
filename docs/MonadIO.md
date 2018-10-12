---
id: MonadIO
title: Module MonadIO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadIO.ts)

# MonadIO

```ts
interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Added in v1.10.0 (type class)

Lift a computation from the `IO` monad
