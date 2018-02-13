MODULE [Plus](https://github.com/gcanti/fp-ts/blob/master/src/Plus.ts)

# Plus

_type class_

```ts
interface Plus<F> extends Alt<F> {
  zero: <A>() => HKT<F, A>
}
```
