---
id: Extend
title: Module Extend
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)

# Extend

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts#L9-L11)

```ts
export interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v1.0.0

## duplicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts#L47-L49)

```ts
export function duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>  { ... }
```

Added in v1.0.0
