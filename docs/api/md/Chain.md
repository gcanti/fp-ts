MODULE [Chain](https://github.com/gcanti/fp-ts/blob/master/src/Chain.ts)
# Chain
```ts
interface Chain<F> extends Apply<F> {
  chain: <A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>) => HKT<F, B>
}
```
# FantasyChain
```ts
interface FantasyChain<F, A> extends FantasyApply<F, A> {
  chain: <B>(f: Kleisli<F, A, B>) => HKT<F, B>
}
```
# flatten
```ts
<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
```