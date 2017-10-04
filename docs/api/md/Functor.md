MODULE [Functor](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)
# FantasyFunctor
```ts
interface FantasyFunctor<F, A> {
  map: <B>(f: (a: A) => B) => HKT<F, B>
}
```
# Functor
```ts
interface Functor<F> {
  readonly URI: F
  map: <A, B>(f: (a: A) => B, fa: HKT<F, A>) => HKT<F, B>
}
```
# FunctorComposition
```ts
interface FunctorComposition<F, G> {
  map: <A, B>(f: (a: A) => B, fa: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}
```
# flap
```ts
<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>) => (a: A): HKT<F, B>
```
Apply a value in a computational context to a value in no context. Generalizes `flip`
# getFunctorComposition
```ts
<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
```
Ignore the return value of a computation, using the specified return value instead (`<$`)
# lift
```ts
<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>): HKT<F, B>
```
Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
# voidLeft
```ts
<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => <B>(b: B): HKT<F, B>
```
A version of `voidRight` with its arguments flipped (`$>`)
# voidRight
```ts
<F>(F: Functor<F>): <A>(a: A) => <B>(fb: HKT<F, B>): HKT<F, A>
```
Ignore the return value of a computation, using the specified return value instead (`<$`)