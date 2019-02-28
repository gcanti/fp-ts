---
id: Foldable
title: Foldable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)

# ~~Foldable~~

**Signature** (type class)

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

Use `Foldable2v`

Added in v1.0.0

## elem

Test whether a value is an element of a data structure

**Signature** (function)

```ts
export function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean  { ... }
```

Added in v1.0.0

## find

Try to find an element in a data structure which satisfies a predicate

**Signature** (function)

```ts
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>  { ... }
```

Added in v1.0.0

## fold

**Signature** (function)

```ts
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M  { ... }
```

Added in v1.0.0

## foldM

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature** (function)

```ts
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>  { ... }
```

Added in v1.0.0

## foldMap

A default implementation of `foldMap` using `foldl`.
Map each element of the structure to a monoid, and combine the results.

**Signature** (function)

```ts
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M  { ... }
```

Added in v1.0.0

## foldr

A default implementation of `foldr` using `foldMap`

**Signature** (function)

```ts
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B  { ... }
```

Added in v1.0.0

## getFoldableComposition

**Signature** (function)

```ts
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>  { ... }
```

Added in v1.0.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature** (function)

```ts
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M  { ... }
```

Added in v1.0.0

## maximum

Find the largest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>  { ... }
```

Added in v1.0.0

## minimum

Find the smallest element of a structure, according to its `Ord` instance

**Signature** (function)

```ts
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>  { ... }
```

Added in v1.0.0

## oneOf

Combines a collection of elements using the `Alt` operation

**Signature** (function)

```ts
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>  { ... }
```

Added in v1.0.0

## product

Find the product of the numeric values in a data structure

**Signature** (function)

```ts
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A  { ... }
```

Added in v1.0.0

## sequence\_

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

**Signature** (function)

```ts
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>  { ... }
```

Added in v1.0.0

## sum

Find the sum of the numeric values in a data structure

**Signature** (function)

```ts
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A  { ... }
```

Added in v1.0.0

## toArray

**Signature** (function)

```ts
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>  { ... }
```

Added in v1.0.0

## traverse

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature** (function)

```ts
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>  { ... }
```

Added in v1.7.0

## ~~traverse\_~~

Use `traverse` instead

**Signature** (function)

```ts
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>  { ... }
```

Added in v1.0.0
