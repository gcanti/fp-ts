MODULE [Profunctor](https://github.com/gcanti/fp-ts/blob/master/src/Profunctor.ts)

# Profunctor

_type class_

```ts
interface Profunctor<F> extends Functor<F> {
  promap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fbc: HKT2<F, B, C>): HKT2<F, A, D>
}
```

# lmap

_function_

```ts
lmap<F>(profunctor: Profunctor<F>): <A, B>(f: (a: A) => B) => <C>(fbc: HKT2<F, B, C>) => HKT2<F, A, C>
```

# rmap

_function_

```ts
rmap<F>(profunctor: Profunctor<F>): <C, D>(g: (c: C) => D) => <B>(fbc: HKT2<F, B, C>) => HKT2<F, B, D>
```
