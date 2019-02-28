---
id: Semigroupoid
title: Semigroupoid
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroupoid.ts)

# Semigroupoid

**Signature** (type class)

```ts
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, L, A>) => HKT2<F, L, B>
}
```

Added in v1.0.0
