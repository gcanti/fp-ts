MODULE [Apply](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts)

# Apply

_type class_

```ts
interface Apply<F> extends Functor<F> {
  ap<A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>): HKT<F, B>
}
```

# applyFirst

_function_

```ts
applyFirst<F>(apply: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, A>
```

Combine two effectful actions, keeping only the result of the first

# applySecond

_function_

```ts
applySecond<F>(apply: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, B>
```

Combine two effectful actions, keeping only the result of the second

# liftA2

_function_

```ts
liftA2<F>(
  apply: Apply<F>
): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
```

Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`

# liftA3

_function_

```ts
liftA3<F>(
  apply: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
```

Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`

# liftA4

_function_

```ts
liftA4<F>(
  apply: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
```

Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
