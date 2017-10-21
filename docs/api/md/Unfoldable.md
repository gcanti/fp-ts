MODULE [Unfoldable](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts)
# Unfoldable
*type class*
```ts
interface Unfoldable<F> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => option.Option<[A, B]>, b: B) => HKT<F, A>
}
```
This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.
# none
*function*
```ts
<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>
```
The container with no elements - unfolded with zero iterations.

# replicate
*function*
```ts
<F>(unfoldable: Unfoldable<F>) => (n: number) => <A>(a: A): HKT<F, A>
```
Replicate a value some natural number of times.

# replicateA
*function*
```ts
replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): (n: number) => <A>(ma: HKT<F, A>) => HKT<F, HKT<T, A>> 
```
Perform an Applicative action `n` times, and accumulate all the results

# singleton
*function*
```ts
<F>(unfoldable: Unfoldable<F>) => <A>(a: A): HKT<F, A>
```