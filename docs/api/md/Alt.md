MODULE [Alt](https://github.com/gcanti/fp-ts/blob/master/src/Alt.ts)
# Alt
```ts
interface Alt<F> extends Functor<F> {
  alt: <A>(fx: HKT<F, A>) => (fy: HKT<F, A>) => HKT<F, A>
}
```
# FantasyAlt
```ts
interface FantasyAlt<F, A> extends FantasyFunctor<F, A> {
  alt: (fy: HKT<F, A>) => HKT<F, A>
}
```