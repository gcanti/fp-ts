MODULE [IxMonad](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts)

# IxMonad

_type class_

_Signature_

```ts
interface IxMonad<F> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}
```

# iapplyFirst

_function_

_since 1.0.0_

_Signature_

```ts
iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>
```

# iapplySecond

_function_

_since 1.0.0_

_Signature_

```ts
iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
```
