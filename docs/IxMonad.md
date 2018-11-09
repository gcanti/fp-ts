---
id: IxMonad
title: Module IxMonad
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts)

# IxMonad

```ts
interface IxMonad<F> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}
```

Added in v1.0.0 (type class)

## iapplyFirst

```ts
iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>
```

Added in v1.0.0 (function)

## iapplySecond

```ts
iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
```

Added in v1.0.0 (function)
