---
id: Comonad
title: Module Comonad
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts)

# Comonad

```ts
interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```

Added in v1.0.0 (type class)
