MODULE [ChainRec](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts)

# ChainRec

_type class_

```ts
interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

# tailRec

_function_

_since 1.0.0_

```ts
<A, B>(f: (a: A) => Either<A, B>, a: A): B
```
