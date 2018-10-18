---
id: Category
title: Module Category
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Category.ts)

# Category

```ts
interface Category<F> extends Semigroupoid<F> {
  readonly id: <A>() => HKT2<F, A, A>
}
```

Added in v1.0.0 (type class)
