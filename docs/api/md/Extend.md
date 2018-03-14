MODULE [Extend](https://github.com/gcanti/fp-ts/blob/master/src/Extend.ts)

# Extend

_type class_

```ts
interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

# duplicate

_function_

_since 1.0.0_

```ts
duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
```
