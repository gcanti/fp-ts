---
id: Extend
title: Module Extend
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)

# Extend

```ts
interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v1.0.0 (type class)

## duplicate

```ts
duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
```

Added in v1.0.0 (function)
