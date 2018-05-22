---
id: Bifunctor
title: Module Bifunctor
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Bifunctor.ts)

## Type classes

### Bifunctor

_type class_

_Signature_

```ts
interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
}
```
