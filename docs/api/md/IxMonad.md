MODULE [IxMonad](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts)

# IxMonad

_type class_

```ts
interface IxMonad<F> {
  readonly URI: F
  iof<I, A>(a: A): HKT3<F, I, I, A>
  ichain<I, O, Z, A, B>(f: (a: A) => HKT3<F, O, Z, B>, fa: HKT3<F, I, O, A>): HKT3<F, I, Z, B>
}
```

# iapplyFirst

_function_

```ts
iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>
```

# iapplySecond

_function_

```ts
iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A>(fa: HKT3<F, I, O, A>) => <Z, B>(fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
```
