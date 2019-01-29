---
id: Monoidal
title: Module Monoidal
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts)

# Monoidal

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts#L16-L19)

```ts
export interface Monoidal<F> extends Functor<F> {
  readonly unit: () => HKT<F, void>
  readonly mult: <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, [A, B]>
}
```

Applicative functors are equivalent to strong lax monoidal functors

- https://wiki.haskell.org/Typeclassopedia#Alternative_formulation
- https://bartoszmilewski.com/2017/02/06/applicative-functors/

Added in v1.0.0

## fromApplicative

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts#L54-L61)

```ts
export function fromApplicative<F>(applicative: Applicative<F>): Monoidal<F>  { ... }
```

Added in v1.0.0

## toApplicative

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Monoidal.ts#L71-L78)

```ts
export function toApplicative<F>(monoidal: Monoidal<F>): Applicative<F>  { ... }
```

Added in v1.0.0
