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

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
- [derivables](#derivables)
  - [apFirst](#apfirst)
  - [apS](#aps)
  - [apSecond](#apsecond)
  - [apT](#apt)
- [type classes](#type-classes)
  - [Apply (interface)](#apply-interface)
  - [Apply1 (interface)](#apply1-interface)
  - [Apply2 (interface)](#apply2-interface)
  - [Apply2C (interface)](#apply2c-interface)
  - [Apply3 (interface)](#apply3-interface)
  - [Apply3C (interface)](#apply3c-interface)
  - [Apply4 (interface)](#apply4-interface)
- [utils](#utils)
  - [getApplySemigroup](#getapplysemigroup)

---

# combinators

## ap

`ap` composition.

**Signature**

```ts
export declare function ap<F extends URIS2, G extends URIS2, E>(
  F: Apply2<F>,
  G: Apply2C<G, E>
): <FE, A>(
  fa: Kind2<F, FE, Kind2<G, E, A>>
) => <B>(fab: Kind2<F, FE, Kind2<G, E, (a: A) => B>>) => Kind2<F, FE, Kind2<G, E, B>>
export declare function ap<F extends URIS, G extends URIS2, E>(
  F: Apply1<F>,
  G: Apply2C<G, E>
): <A>(fa: Kind<F, Kind2<G, E, A>>) => <B>(fab: Kind<F, Kind2<G, E, (a: A) => B>>) => Kind<F, Kind2<G, E, B>>
export declare function ap<F, G extends URIS2>(
  F: Apply<F>,
  G: Apply2<G>
): <E, A>(fa: HKT<F, Kind2<G, E, A>>) => <B>(fab: HKT<F, Kind2<G, E, (a: A) => B>>) => HKT<F, Kind2<G, E, B>>
export declare function ap<F, G extends URIS2, E>(
  F: Apply<F>,
  G: Apply2C<G, E>
): <A>(fa: HKT<F, Kind2<G, E, A>>) => <B>(fab: HKT<F, Kind2<G, E, (a: A) => B>>) => HKT<F, Kind2<G, E, B>>
export declare function ap<F, G extends URIS>(
  F: Apply<F>,
  G: Apply1<G>
): <A>(fa: HKT<F, Kind<G, A>>) => <B>(fab: HKT<F, Kind<G, (a: A) => B>>) => HKT<F, Kind<G, B>>
export declare function ap<F, G>(
  F: Apply<F>,
  G: Apply<G>
): <A>(fa: HKT<F, HKT<G, A>>) => <B>(fab: HKT<F, HKT<G, (a: A) => B>>) => HKT<F, HKT<G, B>>
```

Added in v3.0.0

# derivables

## apFirst

**Signature**

```ts
export declare function apFirst<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
export declare function apFirst<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export declare function apFirst<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, A>
export declare function apFirst<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export declare function apFirst<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, A>
export declare function apFirst<F extends URIS>(
  A: Apply1<F>
): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, A>
export declare function apFirst<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, A>
```

Added in v3.0.0

## apS

**Signature**

```ts
export declare function apS<F extends URIS4>(
  F: Apply4<F>
): <N extends string, A, S, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind4<F, S, R, E, B>
) => (fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F extends URIS3>(
  F: Apply3<F>
): <N extends string, A, R, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F extends URIS3, E>(
  F: Apply3C<F, E>
): <N extends string, A, R, B>(
  name: Exclude<N, keyof A>,
  fb: Kind3<F, R, E, B>
) => (fa: Kind3<F, R, E, A>) => Kind3<F, R, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F extends URIS2>(
  F: Apply2<F>
): <N extends string, A, E, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F extends URIS2, E>(
  F: Apply2C<F, E>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind2<F, E, B>
) => (fa: Kind2<F, E, A>) => Kind2<F, E, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F extends URIS>(
  F: Apply1<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: Kind<F, B>
) => (fa: Kind<F, A>) => Kind<F, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export declare function apS<F>(
  F: Apply<F>
): <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: HKT<F, B>
) => (fa: HKT<F, A>) => HKT<F, { [K in keyof A | N]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0

## apSecond

**Signature**

```ts
export declare function apSecond<F extends URIS4>(
  A: Apply4<F>
): <S, R, E, B>(second: Kind4<F, S, R, E, B>) => <A>(first: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
export declare function apSecond<F extends URIS3>(
  A: Apply3<F>
): <R, E, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export declare function apSecond<F extends URIS3, E>(
  A: Apply3C<F, E>
): <R, B>(second: Kind3<F, R, E, B>) => <A>(first: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
export declare function apSecond<F extends URIS2>(
  A: Apply2<F>
): <E, B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export declare function apSecond<F extends URIS2, E>(
  A: Apply2C<F, E>
): <B>(second: Kind2<F, E, B>) => <A>(first: Kind2<F, E, A>) => Kind2<F, E, B>
export declare function apSecond<F extends URIS>(
  A: Apply1<F>
): <B>(second: Kind<F, B>) => <A>(first: Kind<F, A>) => Kind<F, B>
export declare function apSecond<F>(A: Apply<F>): <B>(second: HKT<F, B>) => <A>(first: HKT<F, A>) => HKT<F, B>
```

Added in v3.0.0

## apT

**Signature**

```ts
export declare function apT<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, B>(
  fb: Kind4<F, S, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, readonly [...A, B]>
export declare function apT<F extends URIS3>(
  F: Apply3<F>
): <R, E, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export declare function apT<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, B>(
  fb: Kind3<F, R, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind3<F, R, E, A>) => Kind3<F, R, E, readonly [...A, B]>
export declare function apT<F extends URIS2>(
  F: Apply2<F>
): <E, B>(
  fb: Kind2<F, E, B>
) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export declare function apT<F extends URIS2, E>(
  F: Apply2C<F, E>
): <B>(fb: Kind2<F, E, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind2<F, E, A>) => Kind2<F, E, readonly [...A, B]>
export declare function apT<F extends URIS>(
  F: Apply1<F>
): <B>(fb: Kind<F, B>) => <A extends ReadonlyArray<unknown>>(fas: Kind<F, A>) => Kind<F, readonly [...A, B]>
export declare function apT<F>(
  F: Apply<F>
): <B>(fb: HKT<F, B>) => <A extends ReadonlyArray<unknown>>(fas: HKT<F, A>) => HKT<F, readonly [...A, B]>
```

Added in v3.0.0

# type classes

## Apply (interface)

**Signature**

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
}
```

Added in v3.0.0

## Apply1 (interface)

**Signature**

```ts
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}
```

Added in v3.0.0

## Apply2 (interface)

**Signature**

```ts
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Apply2C (interface)

**Signature**

```ts
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Apply3 (interface)

**Signature**

```ts
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Apply3C (interface)

**Signature**

```ts
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Apply4 (interface)

**Signature**

```ts
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0

# utils

## getApplySemigroup

Lift a semigroup into 'F', the inner values are concatenated using the provided `Semigroup`.

**Signature**

```ts
export declare function getApplySemigroup<F extends URIS4>(
  F: Apply4<F>
): <A, S, R, E>(S: Semigroup<A>) => Semigroup<Kind4<F, S, R, E, A>>
export declare function getApplySemigroup<F extends URIS3>(
  F: Apply3<F>
): <A, R, E>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export declare function getApplySemigroup<F extends URIS3, E>(
  F: Apply3C<F, E>
): <A, R>(S: Semigroup<A>) => Semigroup<Kind3<F, R, E, A>>
export declare function getApplySemigroup<F extends URIS2>(
  F: Apply2<F>
): <A, E>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export declare function getApplySemigroup<F extends URIS2, E>(
  F: Apply2C<F, E>
): <A>(S: Semigroup<A>) => Semigroup<Kind2<F, E, A>>
export declare function getApplySemigroup<F extends URIS>(F: Apply1<F>): <A>(S: Semigroup<A>) => Semigroup<Kind<F, A>>
export declare function getApplySemigroup<F>(F: Apply<F>): <A>(S: Semigroup<A>) => Semigroup<HKT<F, A>>
```

Added in v3.0.0
