MODULE [Foldable](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)

# Foldable

_type class_

```ts
interface Foldable<F> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B
}
```

# fold

_function_

```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => (fa: HKT<F, M>): M
```

# foldMap

_function_

```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>): M
```

A default implementation of `foldMap` using `foldl`

# foldr

_function_

```ts
<F>(F: Foldable<F>) => <A, B>(f: (a: A) => (b: B) => B) => (b: B) => (fa: HKT<F, A>): B
```

A default implementation of `foldr` using `foldMap`

# getFoldableComposition

_function_

```ts
<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
```

# intercalate

_function_

```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>): M
```

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

# sequence_

_function_

```ts
sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
```

Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final
result.

# toArray

_function_

```ts
<F>(F: Foldable<F>) => <A>(fa: HKT<F, A>): Array<A>
```

# traverse_

_function_

```ts
traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
```

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final
result.
