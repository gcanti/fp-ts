MODULE [Apply](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts)
# Apply
```ts
interface Apply<F> extends Functor<F> {
  ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```
# FantasyApply
```ts
interface FantasyApply<F, A> extends FantasyFunctor<F, A> {
  ap: <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
}
```
# applyFirst
```ts
<F>(apply: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, A>
```
Combine two effectful actions, keeping only the result of the first
# applySecond
```ts
<F>(apply: Apply<F>): <A>(fa: HKT<F, A>) => <B>(fb: HKT<F, B>) => HKT<F, B>
```
Combine two effectful actions, keeping only the result of the second
# liftA2
```ts
<F>(apply: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
```
Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
# liftA3
```ts
<F>(apply: Apply<F>): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
```
Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`
# liftA4
```ts
<F>(apply: Apply<F>): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
```
Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`