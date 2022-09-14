---
title: Apply.ts
nav_order: 4
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
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apS](#aps)
  - [apSecond](#apsecond)
  - [apT](#apt)
- [type classes](#type-classes)
  - [Apply (interface)](#apply-interface)
- [utils](#utils)
  - [getApplySemigroup](#getapplysemigroup)

---

# combinators

## ap

`ap` composition.

**Signature**

```ts
export declare const ap: <F extends HKT, G extends HKT>(
  F: Apply<F>,
  G: Apply<G>
) => <FS, FR2, FW2, FE2, GS, GR2, GW2, GE2, A>(
  fa: Kind<F, FS, FR2, FW2, FE2, Kind<G, GS, GR2, GW2, GE2, A>>
) => <FR1, FW1, FE1, GR1, GW1, GE1, B>(
  fab: Kind<F, FS, FR1, FW1, FE1, Kind<G, GS, GR1, GW1, GE1, (a: A) => B>>
) => Kind<F, FS, FR1 & FR2, FW2 | FW1, FE2 | FE1, Kind<G, GS, GR1 & GR2, GW2 | GW1, GE2 | GE1, B>>
```

Added in v3.0.0

## apFirst

**Signature**

```ts
export declare const apFirst: <F extends HKT>(
  A: Apply<F>
) => <S, R2, W2, E2, B>(
  second: Kind<F, S, R2, W2, E2, B>
) => <R1, W1, E1, A>(first: Kind<F, S, R1, W1, E1, A>) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, A>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare const apS: <F extends HKT>(
  F: Apply<F>
) => <N extends string, A, S, R2, W2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, S, R2, W2, E2, B>
) => <R1, W1, E1>(
  fa: Kind<F, S, R1, W1, E1, A>
) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSecond

**Signature**

```ts
export declare const apSecond: <F extends HKT>(
  A: Apply<F>
) => <S, R2, W2, E2, B>(
  second: Kind<F, S, R2, W2, E2, B>
) => <R1, W1, E1, A>(first: Kind<F, S, R1, W1, E1, A>) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, B>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare const apT: <F extends HKT>(
  F: Apply<F>
) => <S, R2, W2, E2, B>(
  fb: Kind<F, S, R2, W2, E2, B>
) => <R1, W1, E1, A extends readonly unknown[]>(
  fas: Kind<F, S, R1, W1, E1, A>
) => Kind<F, S, R1 & R2, W2 | W1, E2 | E1, readonly [...A, B]>
```

Added in v3.0.0

# type classes

## Apply (interface)

**Signature**

```ts
export interface Apply<F extends HKT> extends Functor<F> {
  readonly ap: <S, R2, W2, E2, A>(
    fa: Kind<F, S, R2, W2, E2, A>
  ) => <R1, W1, E1, B>(fab: Kind<F, S, R1, W1, E1, (a: A) => B>) => Kind<F, S, R1 & R2, W1 | W2, E1 | E2, B>
}
```

Added in v3.0.0

# utils

## getApplySemigroup

Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.

**Signature**

```ts
export declare const getApplySemigroup: <F extends HKT>(
  F: Apply<F>
) => <A, S, R, W, E>(S: Semigroup<A>) => Semigroup<Kind<F, S, R, W, E, A>>
```

Added in v3.0.0
