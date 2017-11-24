MODULE [Unfoldable](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts)

# Unfoldable

_type class_

```ts
interface Unfoldable<F> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => option.Option<[A, B]>, b: B) => HKT<F, A>
}
```

This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.

# none

_function_

```ts
<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>
```

The container with no elements - unfolded with zero iterations.

# replicate

_function_

```ts
<F>(unfoldable: Unfoldable<F>) => (n: number) => <A>(a: A): HKT<F, A>
```

Replicate a value some natural number of times.

# replicateA

_function_

```ts
replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): (n: number) => <A>(ma: HKT<F, A>) => HKT<F, HKT<T, A>>
```

Perform an Applicative action `n` times, and accumulate all the results

# singleton

_function_

```ts
<F>(unfoldable: Unfoldable<F>) => <A>(a: A): HKT<F, A>
```
