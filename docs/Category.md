---
id: Category
title: Module Category
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Category.ts)

## Type classes

### Category

_type class_

_Signature_

```ts
interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```
