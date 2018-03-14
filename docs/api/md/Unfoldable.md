MODULE [Unfoldable](https://github.com/gcanti/fp-ts/blob/master/src/Unfoldable.ts)

# Unfoldable

_type class_

```ts
interface Unfoldable<F> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}
```

This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.

# empty

_function_

_since 1.0.0_

```ts
empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>
```

The container with no elements - unfolded with zero iterations.

# replicate

_function_

_since 1.0.0_

```ts
replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>
```

Replicate a value some natural number of times.

# replicateA

_function_

_since 1.0.0_

```ts
replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>>
```

Perform an Applicative action `n` times, and accumulate all the results

# singleton

_function_

_since 1.0.0_

```ts
singleton<F>(unfoldable: Unfoldable<F>): <A>(a: A) => HKT<F, A>
```
