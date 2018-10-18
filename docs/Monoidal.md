---
id: Monoidal
title: Module Monoidal
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts)

# Monoidal

```ts
interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}
```

Added in v1.0.0 (type class)

Applicative functors are equivalent to strong lax monoidal functors

- https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
- https://bartoszmilewski.com/2017/02/06/applicative-functors/
