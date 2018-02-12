MODULE [Chain](https://github.com/gcanti/fp-ts/blob/master/src/Chain.ts)
# Chain
*type class*
```ts
interface Chain<F> extends Apply<F> {
  chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```
# flatten
*function*
```ts
flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> 
```