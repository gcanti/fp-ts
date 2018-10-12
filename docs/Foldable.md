---
id: Foldable
title: Module Foldable
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)

# ~~Foldable~~ (deprecated)

```ts
interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

Added in v1.0.0 (type class)

Use [Foldable2v](./Foldable2v.md)

## elem

```ts
elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean
```

Added in v1.0.0 (function)

Test whether a value is an element of a data structure

## find

```ts
find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
```

Added in v1.0.0 (function)

Try to find an element in a data structure which satisfies a predicate

## fold

```ts
fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M
```

Added in v1.0.0 (function)

## foldM

```ts
foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>
```

Added in v1.0.0 (function)

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

## foldMap

```ts
foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M
```

Added in v1.0.0 (function)

A default implementation of `foldMap` using `foldl`.
Map each element of the structure to a monoid, and combine the results.

## foldr

```ts
foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
```

Added in v1.0.0 (function)

A default implementation of `foldr` using `foldMap`

## getFoldableComposition

```ts
getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
```

Added in v1.0.0 (function)

## intercalate

```ts
intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M
```

Added in v1.0.0 (function)

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

## maximum

```ts
maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
```

Added in v1.0.0 (function)

Find the largest element of a structure, according to its `Ord` instance

## minimum

```ts
minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>
```

Added in v1.0.0 (function)

Find the smallest element of a structure, according to its `Ord` instance

## oneOf

```ts
oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
```

Added in v1.0.0 (function)

Combines a collection of elements using the `Alt` operation

## product

```ts
product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
```

Added in v1.0.0 (function)

Find the product of the numeric values in a data structure

## sequence\_

```ts
sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
```

Added in v1.0.0 (function)

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

## sum

```ts
sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A
```

Added in v1.0.0 (function)

Find the sum of the numeric values in a data structure

## toArray

```ts
toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>
```

Added in v1.0.0 (function)

## traverse

```ts
traverse<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
```

Added in v1.7.0 (function)

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

## ~~traverse\_~~ (deprecated)

```ts
traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
```

Added in v1.0.0 (function)

Use [traverse](#traverse)
