---
id: Comonad
title: Module Comonad
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts)

# Comonad

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts#L8-L10)

```ts
export interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```

Added in v1.0.0
