---
id: Monad
title: Monad
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monad.ts)

# Monad

**Signature** (type class)

```ts
export interface Monad<F> extends Applicative<F>, Chain<F> {}
```

The `Monad` type class combines the operations of the [Chain](./Chain.md) and
[Applicative](./Applicative.md) type classes. Therefore, `Monad` instances represent type
constructors which support sequential composition, and also lifting of
functions of arbitrary arity.

Instances must satisfy the following laws in addition to the [Applicative](./Applicative.md) and [Chain](./Chain.md) laws:

1. Left identity: `M.chain(M.of(a), f) = f(a)`
2. Right identity: `M.chain(fa, M.of) = fa`

Note. [Functor](./Functor.md)'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`

Added in v1.0.0
