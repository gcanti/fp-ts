MODULE [Traversable](https://github.com/gcanti/fp-ts/blob/master/src/Traversable.ts)
# FantasyTraversable
```ts
interface FantasyTraversable<T, A> extends FantasyFunctor<T, A>, FantasyFoldable<A> {
  traverse: <F>(F: Applicative<F>) => <B>(f: (a: A) => HKT<F, B>) => HKT<F, HKT<T, B>>
}
```
# Traversable
```ts
interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse: <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>, ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}
```
# TraversableComposition
```ts
interface TraversableComposition<F, G> extends FoldableComposition<F, G>, FunctorComposition<F, G> {
  traverse: <H>(H: Applicative<H>) => <A, B>(f: (a: A) => HKT<H, B>, fga: HKT<F, HKT<G, A>>) => HKT<H, HKT<F, HKT<G, B>>>
}
```
# getTraversableComposition
```ts
<F, G>(F: Traversable<F>, G: Traversable<G>): TraversableComposition<F, G>
```
# sequence
```ts
<F, T>(F: Applicative<F>, T: Traversable<T>): <A>(tfa: HKT<T, HKT<F, A>>) => HKT<F, HKT<T, A>>
```