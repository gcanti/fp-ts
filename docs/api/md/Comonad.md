MODULE [Comonad](https://github.com/gcanti/fp-ts/blob/master/src/Comonad.ts)

# Comonad

_type class_

_Signature_

```ts
interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```
