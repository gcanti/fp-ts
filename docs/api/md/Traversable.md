MODULE [Traversable](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)

# Traversable

_type class_

```ts
interface Traversable<T> extends Functor<T>, Foldable<T> {
  readonly traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```

# getTraversableComposition

_function_

_since 1.0.0_

```ts
getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
```

# sequence

_function_

_since 1.0.0_

```ts
sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```

# traverse

_function_

_since 1.0.0_

```ts
traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
```
