---
title: Applicative.ts
nav_order: 3
parent: Modules
---

## Applicative overview

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
of type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
any number of function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`

Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Applicative (interface)](#applicative-interface)
  - [Applicative1 (interface)](#applicative1-interface)
  - [Applicative2 (interface)](#applicative2-interface)
  - [Applicative2C (interface)](#applicative2c-interface)
  - [Applicative3 (interface)](#applicative3-interface)
  - [Applicative3C (interface)](#applicative3c-interface)
  - [Applicative4 (interface)](#applicative4-interface)
- [utils](#utils)
  - [getApplicativeMonoid](#getapplicativemonoid)
  - [~~ApplicativeComposition11~~ (interface)](#applicativecomposition11-interface)
  - [~~ApplicativeComposition12C~~ (interface)](#applicativecomposition12c-interface)
  - [~~ApplicativeComposition12~~ (interface)](#applicativecomposition12-interface)
  - [~~ApplicativeComposition21~~ (interface)](#applicativecomposition21-interface)
  - [~~ApplicativeComposition22C~~ (interface)](#applicativecomposition22c-interface)
  - [~~ApplicativeComposition22~~ (interface)](#applicativecomposition22-interface)
  - [~~ApplicativeComposition2C1~~ (interface)](#applicativecomposition2c1-interface)
  - [~~ApplicativeCompositionHKT1~~ (interface)](#applicativecompositionhkt1-interface)
  - [~~ApplicativeCompositionHKT2C~~ (interface)](#applicativecompositionhkt2c-interface)
  - [~~ApplicativeCompositionHKT2~~ (interface)](#applicativecompositionhkt2-interface)
  - [~~ApplicativeComposition~~ (interface)](#applicativecomposition-interface)
  - [~~getApplicativeComposition~~](#getapplicativecomposition)

---

# type classes

## Applicative (interface)

**Signature**

```ts
export interface Applicative<F> extends Apply<F>, Pointed<F> {}
```

Added in v2.0.0

## Applicative1 (interface)

**Signature**

```ts
export interface Applicative1<F extends URIS> extends Apply1<F>, Pointed1<F> {}
```

Added in v2.0.0

## Applicative2 (interface)

**Signature**

```ts
export interface Applicative2<F extends URIS2> extends Apply2<F>, Pointed2<F> {}
```

Added in v2.0.0

## Applicative2C (interface)

**Signature**

```ts
export interface Applicative2C<F extends URIS2, E> extends Apply2C<F, E>, Pointed2C<F, E> {}
```

Added in v2.0.0

## Applicative3 (interface)

**Signature**

```ts
export interface Applicative3<F extends URIS3> extends Apply3<F>, Pointed3<F> {}
```

Added in v2.0.0

## Applicative3C (interface)

**Signature**

```ts
export interface Applicative3C<F extends URIS3, E> extends Apply3C<F, E>, Pointed3C<F, E> {}
```

Added in v2.2.0

## Applicative4 (interface)

**Signature**

```ts
export interface Applicative4<F extends URIS4> extends Apply4<F>, Pointed4<F> {}
```

Added in v2.0.0

# utils

## getApplicativeMonoid

Lift a monoid into 'F', the inner values are concatenated using the provided `Monoid`.

**Signature**

```ts
export declare function getApplicativeMonoid<F extends URIS4>(
  F: Applicative4<F>
): <A, S, R, E>(M: Monoid<A>) => Monoid<Kind4<F, S, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS3>(
  F: Applicative3<F>
): <A, R, E>(M: Monoid<A>) => Monoid<Kind3<F, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <A, R>(M: Monoid<A>) => Monoid<Kind3<F, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS2>(
  F: Applicative2<F>
): <A, E>(M: Monoid<A>) => Monoid<Kind2<F, E, A>>
export declare function getApplicativeMonoid<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A>(M: Monoid<A>) => Monoid<Kind2<F, E, A>>
export declare function getApplicativeMonoid<F extends URIS>(
  F: Applicative1<F>
): <A>(M: Monoid<A>) => Monoid<Kind<F, A>>
export declare function getApplicativeMonoid<F>(F: Applicative<F>): <A>(M: Monoid<A>) => Monoid<HKT<F, A>>
```

Added in v2.10.0

## ~~ApplicativeComposition11~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  readonly of: <A>(a: A) => Kind<F, Kind<G, A>>
  readonly ap: <A, B>(fgab: Kind<F, Kind<G, (a: A) => B>>, fga: Kind<F, Kind<G, A>>) => Kind<F, Kind<G, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition12C~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, E> extends FunctorComposition12C<F, G, E> {
  readonly of: <A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <A, B>(fgab: Kind<F, Kind2<G, E, (a: A) => B>>, fga: Kind<F, Kind2<G, E, A>>) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition12~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  readonly of: <E, A>(a: A) => Kind<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(
    fgab: Kind<F, Kind2<G, E, (a: A) => B>>,
    fga: Kind<F, Kind2<G, E, A>>
  ) => Kind<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition21~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  readonly of: <E, A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <E, A, B>(
    fgab: Kind2<F, E, Kind<G, (a: A) => B>>,
    fga: Kind2<F, E, Kind<G, A>>
  ) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition22C~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition22C<F extends URIS2, G extends URIS2, E> extends FunctorComposition22C<F, G, E> {
  readonly of: <FE, A>(a: A) => Kind2<F, FE, Kind2<G, E, A>>
  readonly ap: <FE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, E, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, E, A>>
  ) => Kind2<F, FE, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition22~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  readonly of: <FE, GE, A>(a: A) => Kind2<F, FE, Kind2<G, GE, A>>
  readonly ap: <FE, GE, A, B>(
    fgab: Kind2<F, FE, Kind2<G, GE, (a: A) => B>>,
    fga: Kind2<F, FE, Kind2<G, GE, A>>
  ) => Kind2<F, FE, Kind2<G, GE, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition2C1~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition2C1<F extends URIS2, G extends URIS, E> extends FunctorComposition2C1<F, G, E> {
  readonly of: <A>(a: A) => Kind2<F, E, Kind<G, A>>
  readonly ap: <A, B>(fgab: Kind2<F, E, Kind<G, (a: A) => B>>, fga: Kind2<F, E, Kind<G, A>>) => Kind2<F, E, Kind<G, B>>
}
```

Added in v2.0.0

## ~~ApplicativeCompositionHKT1~~ (interface)

**Signature**

```ts
export interface ApplicativeCompositionHKT1<F, G extends URIS> extends FunctorCompositionHKT1<F, G> {
  readonly of: <A>(a: A) => HKT<F, Kind<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, Kind<G, (a: A) => B>>, fga: HKT<F, Kind<G, A>>) => HKT<F, Kind<G, B>>
}
```

Added in v2.0.0

## ~~ApplicativeCompositionHKT2C~~ (interface)

**Signature**

```ts
export interface ApplicativeCompositionHKT2C<F, G extends URIS2, E> extends FunctorCompositionHKT2C<F, G, E> {
  readonly of: <A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <A, B>(fgab: HKT<F, Kind2<G, E, (a: A) => B>>, fga: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~ApplicativeCompositionHKT2~~ (interface)

**Signature**

```ts
export interface ApplicativeCompositionHKT2<F, G extends URIS2> extends FunctorCompositionHKT2<F, G> {
  readonly of: <E, A>(a: A) => HKT<F, Kind2<G, E, A>>
  readonly ap: <E, A, B>(fgab: HKT<F, Kind2<G, E, (a: A) => B>>, fga: HKT<F, Kind2<G, E, A>>) => HKT<F, Kind2<G, E, B>>
}
```

Added in v2.0.0

## ~~ApplicativeComposition~~ (interface)

**Signature**

```ts
export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  readonly of: <A>(a: A) => HKT<F, HKT<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}
```

Added in v2.0.0

## ~~getApplicativeComposition~~

Like `Functor`, `Applicative`s compose. If `F` and `G` have `Applicative` instances, then so does `F<G<_>>`

**Signature**

```ts
export declare function getApplicativeComposition<F extends URIS2, G extends URIS2, E>(
  F: Applicative2<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition22C<F, G, E>
export declare function getApplicativeComposition<F extends URIS2, G extends URIS2>(
  F: Applicative2<F>,
  G: Applicative2<G>
): ApplicativeComposition22<F, G>
export declare function getApplicativeComposition<F extends URIS2, G extends URIS2, E>(
  F: Applicative2<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition22C<F, G, E>
export declare function getApplicativeComposition<F extends URIS2, G extends URIS>(
  F: Applicative2<F>,
  G: Applicative1<G>
): ApplicativeComposition21<F, G>
export declare function getApplicativeComposition<F extends URIS, G extends URIS2>(
  F: Applicative1<F>,
  G: Applicative2<G>
): ApplicativeComposition12<F, G>
export declare function getApplicativeComposition<F extends URIS, G extends URIS2, E>(
  F: Applicative1<F>,
  G: Applicative2C<G, E>
): ApplicativeComposition12C<F, G, E>
export declare function getApplicativeComposition<F extends URIS, G extends URIS>(
  F: Applicative1<F>,
  G: Applicative1<G>
): ApplicativeComposition11<F, G>
export declare function getApplicativeComposition<F, G extends URIS2>(
  F: Applicative<F>,
  G: Applicative2<G>
): ApplicativeCompositionHKT2<F, G>
export declare function getApplicativeComposition<F, G extends URIS2, E>(
  F: Applicative<F>,
  G: Applicative2C<G, E>
): ApplicativeCompositionHKT2C<F, G, E>
export declare function getApplicativeComposition<F, G extends URIS>(
  F: Applicative<F>,
  G: Applicative1<G>
): ApplicativeCompositionHKT1<F, G>
export declare function getApplicativeComposition<F, G>(
  F: Applicative<F>,
  G: Applicative<G>
): ApplicativeComposition<F, G>
```

**Example**

```ts
import { getApplicativeComposition } from 'fp-ts/Applicative'
import { option, Option, some } from 'fp-ts/Option'
import { task, Task } from 'fp-ts/Task'

// an Applicative instance for Task<Option<A>>
const A = getApplicativeComposition(task, option)

const x: Task<Option<number>> = task.of(some(1))
const y: Task<Option<number>> = task.of(some(2))

const sum = (a: number) => (b: number): number => a + b

A.ap(A.map(x, sum), y)().then((result) => assert.deepStrictEqual(result, some(3)))
```

Added in v2.0.0
