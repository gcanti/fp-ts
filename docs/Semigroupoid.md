---
id: Semigroupoid
title: Module Semigroupoid
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Semigroupoid.ts)

# Semigroupoid

```ts
interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <L, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, L, A>) => HKT2<F, L, B>
}
```

Added in v1.0.0 (type class)
