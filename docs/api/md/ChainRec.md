MODULE [ChainRec](https://github.com/gcanti/fp-ts/blob/master/src/ChainRec.ts)
# ChainRec
*type class*
```ts
interface ChainRec<F> extends Chain<F> {
  chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```
# tailRec
*function*
```ts
<A, B>(f: (a: A) => Either<A, B>, a: A): B
```