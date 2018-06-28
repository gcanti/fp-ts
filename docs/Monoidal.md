---
id: Monoidal
title: Module Monoidal
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts)

## Type classes

### Monoidal

_type class_

_since 1.0.0_

_Signature_

```ts
interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}
```

_Description_

Applicative functors are equivalent to strong lax monoidal functors

- https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
- https://bartoszmilewski.com/2017/02/06/applicative-functors/
