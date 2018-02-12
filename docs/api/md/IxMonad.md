MODULE [IxMonad](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts)
# IxMonad
*type class*
```ts
interface IxMonad<F> {
  readonly URI: F
  iof: <I, A>(a: A) => HKT3<F, I, I, A>
  ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}
```
# iapplyFirst
*function*
```ts
iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A> 
```

# iapplySecond
*function*
```ts
iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B> 
```