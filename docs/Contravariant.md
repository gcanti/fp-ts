---
id: Contravariant
title: Contravariant
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts)

# Contravariant

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts#L7-L10)

```ts
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

Added in v1.0.0

## lift

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts#L59-L61)

```ts
export function lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>  { ... }
```

Added in v1.0.0
