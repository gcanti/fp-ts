---
title: Apply.ts
nav_order: 2
parent: Modules
---

## Apply overview

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `fbc |> map(bc => ab => a => bc(ab(a))) |> ap(fab) <-> fbc |> ap(fab |> ap(fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Apply (interface)](#apply-interface)
- [utils](#utils)
  - [apComposition](#apcomposition)
  - [bindRight](#bindright)
  - [getApplySemigroup](#getapplysemigroup)
  - [lift2](#lift2)
  - [lift3](#lift3)
  - [zipFlatten](#zipflatten)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
  - [zipWith](#zipwith)

---

# model

## Apply (interface)

**Signature**

```ts
export interface Apply<F extends TypeLambda> extends Functor<F> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<F, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(self: Kind<F, S, R1, O1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## apComposition

Returns a default `ap` composition.

**Signature**

```ts
export declare const apComposition: <F extends TypeLambda, G extends TypeLambda>(
  ApplyF: Apply<F>,
  ApplyG: Apply<G>
) => <FS, FR2, FO2, FE2, GS, GR2, GO2, GE2, A>(
  fa: Kind<F, FS, FR2, FO2, FE2, Kind<G, GS, GR2, GO2, GE2, A>>
) => <FR1, FO1, FE1, GR1, GO1, GE1, B>(
  self: Kind<F, FS, FR1, FO1, FE1, Kind<G, GS, GR1, GO1, GE1, (a: A) => B>>
) => Kind<F, FS, FR1 & FR2, FO2 | FO1, FE2 | FE1, Kind<G, GS, GR1 & GR2, GO2 | GO1, GE2 | GE1, B>>
```

Added in v3.0.0

## bindRight

A variant of `Flattenable.bind` that sequentially ignores the scope.

**Signature**

```ts
export declare const bindRight: <F extends TypeLambda>(
  F: Apply<F>
) => <N extends string, A extends object, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<F, S, R1, O1, E1, A>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## getApplySemigroup

Lift a semigroup into 'F', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getApplySemigroup: <F extends TypeLambda>(
  Apply: Apply<F>
) => <A, S, R, O, E>(Semigroup: semigroup.Semigroup<A>) => semigroup.Semigroup<Kind<F, S, R, O, E, A>>
```

Added in v3.0.0

## lift2

Lifts a binary function into `F`.

**Signature**

```ts
export declare const lift2: <F extends TypeLambda>(
  F: Apply<F>
) => <A, B, C>(
  f: (a: A, b: B) => C
) => <S, R1, O1, E1, R2, O2, E2>(
  fa: Kind<F, S, R1, O1, E1, A>,
  fb: Kind<F, S, R2, O2, E2, B>
) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>
```

Added in v3.0.0

## lift3

Lifts a ternary function into 'F'.

**Signature**

```ts
export declare const lift3: <F extends TypeLambda>(
  F: Apply<F>
) => <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => <S, R1, O1, E1, R2, O2, E2, R3, O3, E3>(
  fa: Kind<F, S, R1, O1, E1, A>,
  fb: Kind<F, S, R2, O2, E2, B>,
  fc: Kind<F, S, R3, O3, E3, C>
) => Kind<F, S, R1 & R2 & R3, O1 | O2 | O3, E1 | E2 | E3, D>
```

Added in v3.0.0

## zipFlatten

Zips this effect with the specified effect.

**Signature**

```ts
export declare const zipFlatten: <F extends TypeLambda>(
  F: Apply<F>
) => <S, R2, O2, E2, B>(
  that: Kind<F, S, R2, O2, E2, B>
) => <R1, O1, E1, A extends readonly unknown[]>(
  self: Kind<F, S, R1, O1, E1, A>
) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <F extends TypeLambda>(
  F: Apply<F>
) => <S, R2, O2, E2, _>(
  that: Kind<F, S, R2, O2, E2, _>
) => <R1, O1, E1, A>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <F extends TypeLambda>(
  F: Apply<F>
) => <S, R2, O2, E2, A>(
  that: Kind<F, S, R2, O2, E2, A>
) => <R1, O1, E1, _>(self: Kind<F, S, R1, O1, E1, _>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

## zipWith

Zips this effect with the specified effect using the
specified combiner function.

**Signature**

```ts
export declare const zipWith: <F extends TypeLambda>(
  F: Apply<F>
) => <S, R2, O2, E2, B, A, C>(
  that: Kind<F, S, R2, O2, E2, B>,
  f: (a: A, b: B) => C
) => <R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O2 | O1, E2 | E1, C>
```

Added in v3.0.0
