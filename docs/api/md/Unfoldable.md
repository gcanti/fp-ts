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

# replicateA

_function_

```ts
replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>>
```

Perform an Applicative action `n` times, and accumulate all the results
