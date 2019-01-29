---
id: Invariant
title: Module Invariant
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Invariant.ts)

# Invariant

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Invariant.ts#L7-L10)

```ts
export interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => HKT<F, B>
}
```

Added in v1.0.0
