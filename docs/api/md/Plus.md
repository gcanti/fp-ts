MODULE [Plus](https://github.com/gcanti/fp-ts/blob/master/src/Plus.ts)
# Plus
*type class*
```ts
interface Plus<F> extends Alt<F> {
  zero: <A>() => HKT<F, A>
}
```