---
id: Contravariant
title: Module Contravariant
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Contravariant.ts)

# Contravariant

```ts
interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

Added in v1.0.0 (type class)

## lift

```ts
lift<F>(contravariant: Contravariant<F>): <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
```

Added in v1.0.0 (function)
