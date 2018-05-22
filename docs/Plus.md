---
id: Plus
title: Module Plus
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Plus.ts)

## Type classes

### Plus

_type class_

_Signature_

```ts
interface Plus<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

_Description_

The `Plus` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.

It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
concrete types like `string` or `number`.

`Plus` instances should satisfy the following laws:

1.  Left identity: `A.alt(zero, fa) == fa`
2.  Right identity: `A.alt(fa, zero) == fa`
3.  Annihilation: `A.map(zero, fa) == zero`
