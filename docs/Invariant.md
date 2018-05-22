---
id: Invariant
title: Module Invariant
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Invariant.ts)

## Type classes

### Invariant

_type class_

_Signature_

```ts
interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => HKT<F, B>
}
```
