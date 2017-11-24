MODULE [Invariant](https://github.com/gcanti/fp-ts/blob/master/src/Invariant.ts)

# Invariant

_type class_

```ts
interface Invariant<F> {
  readonly URI: F
  imap<A, B>(f: (a: A) => B, g: (b: B) => A, fa: HKT<F, A>): HKT<F, B>
}
```
