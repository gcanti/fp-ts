MODULE [ChainRec](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts)

# ChainRec

_type class_

```ts
interface ChainRec<F> extends Chain<F> {
  chainRec<A, B>(f: (a: A) => HKT<F, Either<A, B>>, a: A): HKT<F, B>
}
```

# tailRec

_function_

```ts
<A, B>(f: (a: A) => Either<A, B>, a: A): B
```
