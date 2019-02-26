---
id: Category
title: Category
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Category.ts)

# Category

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Category.ts#L8-L10)

```ts
export interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v1.0.0
