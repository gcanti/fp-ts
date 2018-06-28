---
id: Monad
title: Module Monad
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monad.ts)

## Type classes

### Monad

_type class_

_since 1.0.0_

_Signature_

```ts
interface Monad<F> extends Applicative<F>, Chain<F> {}
```

_Description_

The `Monad` type class combines the operations of the `Bind` and
`Applicative` type classes. Therefore, `Monad` instances represent type
constructors which support sequential composition, and also lifting of
functions of arbitrary arity.

Instances must satisfy the following laws in addition to the `Applicative` and `Bind` laws:

1.  Left identity: `M.chain(M.of(a), f) = f(a)`
2.  Right identity: `M.chain(fa, M.of) = fa`

Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`
