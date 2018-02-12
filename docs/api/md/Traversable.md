MODULE [Traversable](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)
# Traversable
*type class*
```ts
interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```
# getTraversableComposition
*function*
```ts
getTraversableComposition<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G> 
```

# sequence
*function*
```ts
sequence<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>> 
```

# traverse
*function*
```ts
traverse<F, T>(
  F: Applicative<F>,
  T: Traversable<T>
): <A, B>(ta: HKT<T, A>, f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>> 
```