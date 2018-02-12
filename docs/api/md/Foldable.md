MODULE [Foldable](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)
# Foldable
*type class*
```ts
interface Foldable<F> {
  readonly URI: F
  reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```
# elem
*function*
```ts
elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean 
```
Test whether a value is an element of a data structure

# find
*function*
```ts
find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> 
```
Try to find an element in a data structure which satisfies a predicate

# fold
*function*
```ts
fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M 
```

# foldM
*function*
```ts
foldM<F, M>(
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B> 
```
Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which
build up thunks a la `IO`.

# foldMap
*function*
```ts
foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M 
```
A default implementation of `foldMap` using `foldl`

# getFoldableComposition
*function*
```ts
getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> 
```

# intercalate
*function*
```ts
intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M 
```
Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

# maximum
*function*
```ts
maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> 
```
Find the largest element of a structure, according to its `Ord` instance

# minimum
*function*
```ts
minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> 
```
Find the smallest element of a structure, according to its `Ord` instance

# oneOf
*function*
```ts
oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> 
```
Combines a collection of elements using the `Alt` operation

# product
*function*
```ts
product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A 
```
Find the product of the numeric values in a data structure

# sequence_
*function*
```ts
sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> 
```
Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.

# sum
*function*
```ts
sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A 
```
Find the sum of the numeric values in a data structure

# toArray
*function*
```ts
toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A> 
```

# traverse_
*function*
```ts
traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> 
```
Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result.