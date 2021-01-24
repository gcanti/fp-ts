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

1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) <-> F.ap(fbc, F.ap(fab, fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

**Example**

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

const f = (a: string) => (b: number) => (c: boolean) => a + String(b) + (c ? 'true' : 'false')
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

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Apply (interface)](#apply-interface)
  - [Apply1 (interface)](#apply1-interface)
  - [Apply2 (interface)](#apply2-interface)
  - [Apply2C (interface)](#apply2c-interface)
  - [Apply3 (interface)](#apply3-interface)
  - [Apply3C (interface)](#apply3c-interface)
  - [Apply4 (interface)](#apply4-interface)
- [utils](#utils)
  - [ap](#ap)
  - [apFirst](#apfirst)
  - [apS](#aps)
  - [apSecond](#apsecond)
  - [getApplySemigroup](#getapplysemigroup)
  - [sequenceS](#sequences)
  - [sequenceT](#sequencet)

---

# type classes

## Apply (interface)

**Signature**

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v2.0.0

## Apply1 (interface)

**Signature**

```ts
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: Kind<F, (a: A) => B>, fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v2.0.0

## Apply2 (interface)

**Signature**

```ts
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A, B>(fab: Kind2<F, E, (a: A) => B>, fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Apply2C (interface)

**Signature**

```ts
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A, B>(fab: Kind2<F, E, (a: A) => B>, fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Apply3 (interface)

**Signature**

```ts
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A, B>(fab: Kind3<F, R, E, (a: A) => B>, fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Apply3C (interface)

**Signature**

```ts
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A, B>(fab: Kind3<F, R, E, (a: A) => B>, fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Apply4 (interface)

**Signature**

```ts
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A, B>(fab: Kind4<F, S, R, E, (a: A) => B>, fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0

# utils

## ap

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

Added in v2.10.0

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

Added in v2.10.0

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

Added in v2.10.0

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

Added in v2.10.0

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

Added in v2.10.0

## sequenceS

Like `Apply.sequenceT` but works with structs instead of tuples.

**Signature**

```ts
export declare function sequenceS<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, NER extends Record<string, Kind4<F, S, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind4<F, S, R, E, any>>
) => Kind4<F, S, R, E, { [K in keyof NER]: [NER[K]] extends [Kind4<F, any, any, any, infer A>] ? A : never }>
export declare function sequenceS<F extends URIS3>(
  F: Apply3<F>
): <R, E, NER extends Record<string, Kind3<F, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind3<F, R, E, any>>
) => Kind3<F, R, E, { [K in keyof NER]: [NER[K]] extends [Kind3<F, any, any, infer A>] ? A : never }>
export declare function sequenceS<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, NER extends Record<string, Kind3<F, R, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind3<F, R, E, any>>
) => Kind3<F, R, E, { [K in keyof NER]: [NER[K]] extends [Kind3<F, any, any, infer A>] ? A : never }>
export declare function sequenceS<F extends URIS2>(
  F: Apply2<F>
): <E, NER extends Record<string, Kind2<F, E, any>>>(
  r: EnforceNonEmptyRecord<NER> & Record<string, Kind2<F, E, any>>
) => Kind2<F, E, { [K in keyof NER]: [NER[K]] extends [Kind2<F, any, infer A>] ? A : never }>
export declare function sequenceS<F extends URIS2, E>(
  F: Apply2C<F, E>
): <NER extends Record<string, Kind2<F, E, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => Kind2<F, E, { [K in keyof NER]: [NER[K]] extends [Kind2<F, any, infer A>] ? A : never }>
export declare function sequenceS<F extends URIS>(
  F: Apply1<F>
): <NER extends Record<string, Kind<F, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => Kind<F, { [K in keyof NER]: [NER[K]] extends [Kind<F, infer A>] ? A : never }>
export declare function sequenceS<F>(
  F: Apply<F>
): <NER extends Record<string, HKT<F, any>>>(
  r: EnforceNonEmptyRecord<NER>
) => HKT<F, { [K in keyof NER]: [NER[K]] extends [HKT<F, infer A>] ? A : never }>
```

**Example**

```ts
import { either, right, left } from 'fp-ts/Either'
import { sequenceS } from 'fp-ts/Apply'

const ado = sequenceS(either)

assert.deepStrictEqual(
  ado({
    a: right(1),
    b: right(true),
  }),
  right({ a: 1, b: true })
)
assert.deepStrictEqual(
  ado({
    a: right(1),
    b: left('error'),
  }),
  left('error')
)
```

Added in v2.0.0

## sequenceT

Tuple sequencing, i.e., take a tuple of monadic actions and does them from left-to-right, returning the resulting tuple.

**Signature**

```ts
export declare function sequenceT<F extends URIS4>(
  F: Apply4<F>
): <S, R, E, T extends Array<Kind4<F, S, R, E, any>>>(
  ...t: T & { readonly 0: Kind4<F, S, R, E, any> }
) => Kind4<F, S, R, E, { [K in keyof T]: [T[K]] extends [Kind4<F, S, R, E, infer A>] ? A : never }>
export declare function sequenceT<F extends URIS3>(
  F: Apply3<F>
): <R, E, T extends Array<Kind3<F, R, E, any>>>(
  ...t: T & { readonly 0: Kind3<F, R, E, any> }
) => Kind3<F, R, E, { [K in keyof T]: [T[K]] extends [Kind3<F, R, E, infer A>] ? A : never }>
export declare function sequenceT<F extends URIS3, E>(
  F: Apply3C<F, E>
): <R, T extends Array<Kind3<F, R, E, any>>>(
  ...t: T & { readonly 0: Kind3<F, R, E, any> }
) => Kind3<F, R, E, { [K in keyof T]: [T[K]] extends [Kind3<F, R, E, infer A>] ? A : never }>
export declare function sequenceT<F extends URIS2>(
  F: Apply2<F>
): <E, T extends Array<Kind2<F, E, any>>>(
  ...t: T & { readonly 0: Kind2<F, E, any> }
) => Kind2<F, E, { [K in keyof T]: [T[K]] extends [Kind2<F, E, infer A>] ? A : never }>
export declare function sequenceT<F extends URIS2, E>(
  F: Apply2C<F, E>
): <T extends Array<Kind2<F, E, any>>>(
  ...t: T & { readonly 0: Kind2<F, E, any> }
) => Kind2<F, E, { [K in keyof T]: [T[K]] extends [Kind2<F, E, infer A>] ? A : never }>
export declare function sequenceT<F extends URIS>(
  F: Apply1<F>
): <T extends Array<Kind<F, any>>>(
  ...t: T & { readonly 0: Kind<F, any> }
) => Kind<F, { [K in keyof T]: [T[K]] extends [Kind<F, infer A>] ? A : never }>
export declare function sequenceT<F>(
  F: Apply<F>
): <T extends Array<HKT<F, any>>>(
  ...t: T & { readonly 0: HKT<F, any> }
) => HKT<F, { [K in keyof T]: [T[K]] extends [HKT<F, infer A>] ? A : never }>
```

**Example**

```ts
import { sequenceT } from 'fp-ts/Apply'
import { option, some, none } from 'fp-ts/Option'

const sequenceTOption = sequenceT(option)
assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)
```

Added in v2.0.0
