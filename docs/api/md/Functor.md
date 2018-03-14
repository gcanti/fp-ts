MODULE [Functor](https://github.com/gcanti/fp-ts/blob/master/src/Functor.ts)

# Functor

_type class_

```ts
interface Functor<F> {
  readonly URI: F
  readonly map: <A, B>(fa: HKT<F, A>, f: (a: A) => B) => HKT<F, B>
}
```

A `Functor` is a type constructor which supports a mapping operation `map`.

`map` can be used to turn functions `a -> b` into functions
`f a -> f b` whose argument and return types use the type constructor `f`
to represent some computational context.

Instances must satisfy the following laws:

1.  Identity: `F.map(fa, a => a) = fa`
2.  Composition: `F.map(fa, a => bc(ab(a))) = F.map(F.map(fa, ab), bc)`

# flap

_function_
_since 1.0.0_

```ts
flap<F>(functor: Functor<F>): <A, B>(a: A, ff: HKT<F, (a: A) => B>) => HKT<F, B>
```

Apply a value in a computational context to a value in no context. Generalizes `flip`

# getFunctorComposition

_function_
_since 1.0.0_

```ts
getFunctorComposition<F, G>(F: Functor<F>, G: Functor<G>): FunctorComposition<F, G>
```

# lift

_function_
_since 1.0.0_

```ts
lift<F>(F: Functor<F>): <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
```

Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`

# voidLeft

_function_
_since 1.0.0_

```ts
voidLeft<F>(F: Functor<F>): <A, B>(fa: HKT<F, A>, b: B) => HKT<F, B>
```

A version of `voidRight` with its arguments flipped (`$>`)

# voidRight

_function_
_since 1.0.0_

```ts
voidRight<F>(F: Functor<F>): <A, B>(a: A, fb: HKT<F, B>) => HKT<F, A>
```

Ignore the return value of a computation, using the specified return value instead (`<$`)
