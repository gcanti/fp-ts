---
id: IxMonad
title: Module IxMonad
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts)

# IxMonad

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts#L10-L14)

```ts
export interface IxMonad<F> {
  readonly URI: F
  readonly iof: <I, A>(a: A) => HKT3<F, I, I, A>
  readonly ichain: <I, O, Z, A, B>(fa: HKT3<F, I, O, A>, f: (a: A) => HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>
}
```

Added in v1.0.0

## iapplyFirst

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts#L31-L35)

```ts
export function iapplyFirst<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, A>  { ... }
```

Added in v1.0.0

## iapplySecond

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/IxMonad.ts#L46-L50)

```ts
export function iapplySecond<F>(
  ixmonad: IxMonad<F>
): <I, O, A, Z, B>(fa: HKT3<F, I, O, A>, fb: HKT3<F, O, Z, B>) => HKT3<F, I, Z, B>  { ... }
```

Added in v1.0.0
