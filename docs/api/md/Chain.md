MODULE [Chain](https://github.com/gcanti/fp-ts/blob/master/src/Chain.ts)

# Chain

_type class_

```ts
interface Chain<F> extends Apply<F> {
  chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}
```

# flatten

_function_

```ts
flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
```
