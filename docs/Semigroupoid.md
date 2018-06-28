---
id: Semigroupoid
title: Module Semigroupoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroupoid.ts)

## Type classes

### Semigroupoid

_type class_

_since 1.0.0_

_Signature_

```ts
interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <L, A, B>(bc: HKT2<F, A, B>, ab: HKT2<F, L, A>) => HKT2<F, L, B>
}
```
