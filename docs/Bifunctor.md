---
id: Bifunctor
title: Module Bifunctor
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Bifunctor.ts)

# Bifunctor

```ts
interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
}
```

Added in v1.0.0 (type class)
