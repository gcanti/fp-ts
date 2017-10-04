MODULE [Foldable](https://github.com/gcanti/fp-ts/blob/master/src/Foldable.ts)
# FantasyFoldable
```ts
interface FantasyFoldable<A> {
  reduce: <B>(f: (b: B, a: A) => B, b: B) => B
}
```
# Foldable
```ts
interface Foldable<F> {
  readonly URI: F
  reduce: <A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>) => B
}
```
# FoldableComposition
```ts
interface FoldableComposition<F, G> {
  reduce: <A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<F, HKT<G, A>>) => B
}
```
# fold
```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => (fa: HKT<F, M>): M
```
# foldMap
```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>): M
```
A default implementation of `foldMap` using `foldl`
# foldr
```ts
<F>(F: Foldable<F>) => <A, B>(f: (a: A) => (b: B) => B) => (b: B) => (fa: HKT<F, A>): B
```
A default implementation of `foldr` using `foldMap`
# getFoldableComposition
```ts
<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>
```
# getRecordSemigroup
```ts
<O extends { [key: string]: any }>(semigroups: { [K in keyof O]: Semigroup<O[K]> }): Semigroup<{ [K in keyof O]: O[K] }>
```
Returns a monoid under array concatenation
# intercalate
```ts
<F, M>(F: Foldable<F>, M: Monoid<M>) => (sep: M) => (fm: HKT<F, M>): M
```
Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
# sequence_
```ts
<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>
```
Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
# toArray
```ts
<F>(F: Foldable<F>) => <A>(fa: HKT<F, A>): Array<A>
```
# traverse_
```ts
<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>
```
Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result