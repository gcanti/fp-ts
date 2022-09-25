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

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + String(c)
const fa: O.Option<string> = O.some('s')
const fb: O.Option<number> = O.some(1)
const fc: O.Option<boolean> = O.some(true)

assert.deepStrictEqual(
  pipe(
    // lift a function
    O.some(f),
    // apply the first argument
    O.ap(fa),
    // apply the second argument
    O.ap(fb),
    // apply the third argument
    O.ap(fc)
  ),
  O.some('s1true')
)
```

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [apT](#apt)
  - [bindPar](#bindpar)
  - [getApComposition](#getapcomposition)
  - [zipLeftPar](#zipleftpar)
  - [zipRightPar](#ziprightpar)
- [type classes](#type-classes)
  - [Apply (interface)](#apply-interface)
- [utils](#utils)
  - [getApplySemigroup](#getapplysemigroup)

---

# combinators

## apT

**Signature**

```ts
export declare const apT: <λ extends HKT>(
  Applyλ: Apply<λ>
) => <S, R2, O2, E2, B>(
  fb: Kind<λ, S, R2, O2, E2, B>
) => <R1, O1, E1, A extends readonly unknown[]>(
  fas: Kind<λ, S, R1, O1, E1, A>
) => Kind<λ, S, R1 & R2, O2 | O1, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

## bindPar

**Signature**

```ts
export declare const bindPar: <λ extends HKT>(
  Applyλ: Apply<λ>
) => <N extends string, A, S, R2, O2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<λ, S, R2, O2, E2, B>
) => <R1, O1, E1>(
  self: Kind<λ, S, R1, O1, E1, A>
) => Kind<λ, S, R1 & R2, O2 | O1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## getApComposition

`ap` composition.

**Signature**

```ts
export declare const getApComposition: <λ extends HKT, μ extends HKT>(
  Applyλ: Apply<λ>,
  Applyμ: Apply<μ>
) => <λS, λR2, λO2, λE2, μS, μR2, μO2, μE2, A>(
  fa: Kind<λ, λS, λR2, λO2, λE2, Kind<μ, μS, μR2, μO2, μE2, A>>
) => <λR1, λO1, λE1, μR1, μO1, μE1, B>(
  self: Kind<λ, λS, λR1, λO1, λE1, Kind<μ, μS, μR1, μO1, μE1, (a: A) => B>>
) => Kind<λ, λS, λR1 & λR2, λO2 | λO1, λE2 | λE1, Kind<μ, μS, μR1 & μR2, μO2 | μO1, μE2 | μE1, B>>
```

Added in v3.0.0

## zipLeftPar

Returns an effect that executes both this effect and the specified effect,
in parallel, this effect result returned. If either side fails, then the
other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipLeftPar: <λ extends HKT>(
  Applyλ: Apply<λ>
) => <S, R2, O2, E2, B>(
  second: Kind<λ, S, R2, O2, E2, B>
) => <R1, O1, E1, A>(self: Kind<λ, S, R1, O1, E1, A>) => Kind<λ, S, R1 & R2, O2 | O1, E2 | E1, A>
```

Added in v3.0.0

## zipRightPar

Returns an effect that executes both this effect and the specified effect,
in parallel, returning result of provided effect. If either side fails,
then the other side will **NOT** be interrupted.

**Signature**

```ts
export declare const zipRightPar: <λ extends HKT>(
  Applyλ: Apply<λ>
) => <S, R2, O2, E2, B>(
  second: Kind<λ, S, R2, O2, E2, B>
) => <R1, O1, E1, A>(self: Kind<λ, S, R1, O1, E1, A>) => Kind<λ, S, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v3.0.0

# type classes

## Apply (interface)

**Signature**

```ts
export interface Apply<λ extends HKT> extends Functor<λ> {
  readonly ap: <S, R2, O2, E2, A>(
    fa: Kind<λ, S, R2, O2, E2, A>
  ) => <R1, O1, E1, B>(self: Kind<λ, S, R1, O1, E1, (a: A) => B>) => Kind<λ, S, R1 & R2, O1 | O2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## getApplySemigroup

Lift a semigroup into 'λ', the inner values are combined using the provided `Semigroup`.

**Signature**

```ts
export declare const getApplySemigroup: <λ extends HKT>(
  Applyλ: Apply<λ>
) => <A, S, R, O, E>(S: semigroup.Semigroup<A>) => semigroup.Semigroup<Kind<λ, S, R, O, E, A>>
```

Added in v3.0.0
