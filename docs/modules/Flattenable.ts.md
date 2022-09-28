---
title: Flattenable.ts
nav_order: 29
parent: Modules
---

## Flattenable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
  - [bindT](#bindt)
  - [tap](#tap)
- [type classes](#type-classes)
  - [Flattenable (interface)](#flattenable-interface)
- [utils](#utils)
  - [bind](#bind)

---

# combinators

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  M: Flattenable<F>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v3.0.0

## bindT

**Signature**

```ts
export declare const bindT: <F extends TypeLambda>(
  F: Flattenable<F>
) => <A extends readonly unknown[], S, R2, O2, E2, B>(
  f: (a: A) => Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <M extends TypeLambda>(
  M: Flattenable<M>
) => <A, S, R2, O2, E2, _>(
  f: (a: A) => Kind<M, S, R2, O2, E2, _>
) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

# type classes

## Flattenable (interface)

**Signature**

```ts
export interface Flattenable<M extends TypeLambda> extends Functor<M> {
  readonly flatMap: <A, S, R2, O2, E2, B>(
    f: (a: A) => Kind<M, S, R2, O2, E2, B>
  ) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## bind

**Signature**

```ts
export declare const bind: <M extends TypeLambda>(
  M: Flattenable<M>
) => <N extends string, A, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, S, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<M, S, R1, O1, E1, A>
) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0
