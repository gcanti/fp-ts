MODULE [Bifunctor](https://github.com/gcanti/fp-ts/blob/master/src/Bifunctor.ts)

# Bifunctor

_type class_

```ts
interface Bifunctor<F> {
  readonly URI: F
  bimap<L, A, M, B>(f: (l: L) => M, g: (a: A) => B, fla: HKT2<F, L, A>): HKT2<F, M, B>
}
```
