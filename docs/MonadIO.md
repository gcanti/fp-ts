---
id: MonadIO
title: Module MonadIO
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/MonadIO.ts)

## Type classes

### MonadIO

_type class_

_since 1.10.0_

_Signature_

```ts
interface MonadIO<M> extends Monad<M> {
  readonly fromIO: <A>(fa: IO<A>) => HKT<M, A>
}
```

_Description_

Lift a computation from the `IO` monad
