MODULE [Functor](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)
# Functor
*type class*
```ts
interface Functor<F> {
  readonly URI: F
  map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```
# flap
*function*
```ts
flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B> 
```
Apply a value in a computational context to a value in no context. Generalizes `flip`

# getFunctorComposition
*function*
```ts
getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G> 
```

# lift
*function*
```ts
lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B> 
```
Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`

# voidLeft
*function*
```ts
voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B> 
```
A version of `voidRight` with its arguments flipped (`$>`)

# voidRight
*function*
```ts
voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A> 
```
Ignore the return value of a computation, using the specified return value instead (`<$`)