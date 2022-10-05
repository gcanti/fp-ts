---
title: Flattenable.ts
nav_order: 33
parent: Modules
---

## Flattenable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [do notation](#do-notation)
  - [bind](#bind)
- [model](#model)
  - [Flattenable (interface)](#flattenable-interface)
- [sequencing](#sequencing)
  - [zipLeft](#zipleft)
  - [zipRight](#zipright)
- [utils](#utils)
  - [ap](#ap)
  - [composeKind](#composekind)
  - [tap](#tap)

---

# do notation

## bind

**Signature**

```ts
export declare const bind: <M extends TypeLambda>(
  Flattenable: Flattenable<M>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind<M, S, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<M, S, R1, O1, E1, A>
) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

# model

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

# sequencing

## zipLeft

Sequences the specified effect after this effect, but ignores the value
produced by the effect.

**Signature**

```ts
export declare const zipLeft: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2>(
  that: Kind<F, S, R2, O2, E2, unknown>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

## zipRight

A variant of `flatMap` that ignores the value produced by this effect.

**Signature**

```ts
export declare const zipRight: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2, A>(
  that: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, unknown>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

# utils

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R2, O2, E2, A>(
  fa: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v3.0.0

## composeKind

**Signature**

```ts
export declare const composeKind: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <B, S, R2, O2, E2, C>(
  bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
) => <A, R1, O1, E1>(afb: (a: A) => Kind<F, S, R1, O1, E1, B>) => (a: A) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, C>
```

Added in v3.0.0

## tap

Returns an effect that effectfully "peeks" at the success of this effect.

**Signature**

```ts
export declare const tap: <M extends TypeLambda>(
  Flattenable: Flattenable<M>
) => <A, S, R2, O2, E2>(
  f: (a: A) => Kind<M, S, R2, O2, E2, unknown>
) => <R1, O1, E1>(self: Kind<M, S, R1, O1, E1, A>) => Kind<M, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0
