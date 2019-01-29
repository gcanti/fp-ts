---
id: Profunctor
title: Module Profunctor
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Profunctor.ts)

# Profunctor

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Profunctor.ts#L8-L12)

```ts
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => B) => HKT2<F, L, B>
  readonly promap: <A, B, C, D>(fbc: HKT2<F, B, C>, f: (a: A) => B, g: (c: C) => D) => HKT2<F, A, D>
}
```

Added in v1.0.0

## lmap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Profunctor.ts#L37-L39)

```ts
export function lmap<F>(profunctor: Profunctor<F>): <A, B, C>(fbc: HKT2<F, B, C>, f: (a: A) => B) => HKT2<F, A, C>  { ... }
```

Added in v1.0.0

## rmap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Profunctor.ts#L52-L54)

```ts
export function rmap<F>(profunctor: Profunctor<F>): <B, C, D>(fbc: HKT2<F, B, C>, g: (c: C) => D) => HKT2<F, B, D>  { ... }
```

Added in v1.0.0
