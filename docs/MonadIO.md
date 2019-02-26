---
id: MonadIO
title: MonadIO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadIO.ts)

# MonadIO

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadIO.ts#L10-L12)

```ts
export interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

Lift a computation from the `IO` monad

Added in v1.10.0
