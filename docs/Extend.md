---
id: Extend
title: Extend
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)

# Extend

**Signature** (type class)

```ts
export interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v1.0.0

## duplicate

**Signature** (function)

```ts
export function duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>  { ... }
```

Added in v1.0.0
