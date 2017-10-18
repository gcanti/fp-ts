MODULE [Semigroupoid](https://github.com/gcanti/fp-ts/blob/master/src/Semigroupoid.ts)
# Semigroupoid
Type class
```ts
interface Semigroupoid<F> {
  readonly URI: F
  compose<L, A, B>(bc: HKT2<F, A, B>, ab: HKT2<F, L, A>): HKT2<F, L, B>
}
```