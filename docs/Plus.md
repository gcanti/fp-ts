---
id: Plus
title: Module Plus
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Plus.ts)

# Plus

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Plus.ts#L19-L21)

```ts
export interface Plus<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}
```

The `Plus` type class extends the [Alt](./Alt.md) type class with a value that should be the left and right identity for `alt`.

It is similar to [Monoid](./Monoid.md), except that it applies to types of kind `* -> *`, like [Array](./Array.md) or [Option](./Option.md), rather than
concrete types like `string` or `number`.

`Plus` instances should satisfy the following laws:

1. Left identity: `A.alt(zero, fa) == fa`
2. Right identity: `A.alt(fa, zero) == fa`
3. Annihilation: `A.map(zero, fa) == zero`

Added in v1.0.0
