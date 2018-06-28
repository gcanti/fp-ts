---
id: Comonad
title: Module Comonad
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts)

## Type classes

### Comonad

_type class_

_since 1.0.0_

_Signature_

```ts
interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```
