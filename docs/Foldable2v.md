---
id: Foldable2v
title: Module Foldable2v
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Foldable2v.ts)

# Foldable2v

```ts
interface Foldable2v<F> extends Foldable<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v1.10.0 (type class)

## findFirst

```ts
findFirst<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>
```

Added in v1.10.0 (function)

Find the first element which satisfies a predicate function

## fold

```ts
fold<M, F>(M: Monoid<M>, F: Foldable2v<F>): (fa: HKT<F, M>) => M
```

Added in v1.10.0 (function)

## foldM

```ts
foldM<M, F>(
  M: Monad<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B>
```

Added in v1.10.0 (function)

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

## getFoldableComposition

```ts
getFoldableComposition<F, G>(F: Foldable2v<F>, G: Foldable2v<G>): Foldable2vComposition<F, G>
```

Added in v1.10.0 (function)

## intercalate

```ts
intercalate<M, F>(M: Monoid<M>, F: Foldable2v<F>): (sep: M) => (fm: HKT<F, M>) => M
```

Added in v1.10.0 (function)

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

## max

```ts
max<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>
```

Added in v1.10.0 (function)

Find the largest element of a structure, according to its `Ord` instance

## member

```ts
member<F, A>(S: Setoid<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean
```

Added in v1.10.0 (function)

Test whether a value is an element of a data structure

## min

```ts
min<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A>
```

Added in v1.10.0 (function)

Find the smallest element of a structure, according to its `Ord` instance

## oneOf

```ts
oneOf<P, F>(P: Plus<P>, F: Foldable2v<F>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>
```

Added in v1.10.0 (function)

Combines a collection of elements using the `Alt` operation

## product

```ts
product<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A
```

Added in v1.10.0 (function)

Find the product of the numeric values in a data structure

## sequence\_

```ts
sequence_<M, F>(M: Applicative<M>, F: Foldable2v<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
```

Added in v1.10.0 (function)

Perform all of the effects in some data structure in the order given by the `Foldable2v` instance, ignoring the final result.

## sum

```ts
sum<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A
```

Added in v1.10.0 (function)

Find the sum of the numeric values in a data structure

## toArray

```ts
toArray<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>) => Array<A>
```

Added in v1.10.0 (function)

## traverse\_

```ts
traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void>
```

Added in v1.10.0 (function)

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.
