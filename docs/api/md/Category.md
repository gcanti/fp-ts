MODULE [Category](https://github.com/gcanti/fp-ts/blob/master/src/Category.ts)
# Category
*type class*
```ts
interface Category<F> extends Semigroupoid<F> {
  id: <A>() => HKT2<F, A, A>
}
```