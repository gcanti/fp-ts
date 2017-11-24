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

# lift

_function_

```ts
lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
```

Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`

# voidLeft

_function_

```ts
voidLeft<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => <B>(b: B) => HKT<F, B>
```

A version of `voidRight` with its arguments flipped (`$>`)

# voidRight

_function_

```ts
voidRight<F>(F: Functor<F>): <A>(a: A) => <B>(fb: HKT<F, B>) => HKT<F, A>
```

Ignore the return value of a computation, using the specified return value instead (`<$`)
