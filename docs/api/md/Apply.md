MODULE [Apply](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts)

# Apply

_type class_

```ts
interface Apply<F> extends Functor<F> {
  ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor `f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `F.ap(F.ap(F.map(f => g => x => f(g(x)), fbc), fab), fa) = F.ap(fbc, F.ap(fab, fa))`
   # applyFirst
   _function_

```ts
applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>
```

Combine two effectful actions, keeping only the result of the first

# applySecond

_function_

```ts
applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>
```

Combine two effectful actions, keeping only the result of the second

# liftA2

_function_

```ts
liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
```

Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`

# liftA3

_function_

```ts
liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
```

Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`

# liftA4

_function_

```ts
liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
```

Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
