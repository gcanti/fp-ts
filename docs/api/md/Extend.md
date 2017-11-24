MODULE [Extend](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)

# Extend

_type class_

```ts
interface Extend<F> extends Functor<F> {
  extend<A, B>(f: (fa: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}
```

# duplicate

_function_

```ts
duplicate<F>(extend: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
```
