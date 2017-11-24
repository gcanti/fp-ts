MODULE [Functor](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)

# Functor

_type class_

```ts
interface Functor<F> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}
```

# flap

_function_

```ts
flap<F>(functor: Functor<F>): <A, B>(ff: HKT<F, (a: A) => B>) => (a: A) => HKT<F, B>
```

Apply a value in a computational context to a value in no context. Generalizes `flip`

# getFunctorComposition

_function_

```ts
getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
```
