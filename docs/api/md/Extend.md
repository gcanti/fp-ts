MODULE [Extend](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)
# Extend
*type class*
```ts
interface Extend<F> extends Functor<F> {
  extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```
# duplicate
*function*
```ts
duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> 
```