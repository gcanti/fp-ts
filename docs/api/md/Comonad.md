MODULE [Comonad](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts)
# Comonad
*type class*
```ts
interface Comonad<F> extends Extend<F> {
  extract: <A>(ca: HKT<F, A>) => A
}
```