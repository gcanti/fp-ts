---
title: Apply.ts
nav_order: 4
parent: Modules
---

# Overview

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) = F.ap(fbc, F.ap(fab, fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

---

<h2 class="text-delta">Table of contents</h2>

- [Apply (interface)](#apply-interface)
- [Apply1 (interface)](#apply1-interface)
- [Apply2 (interface)](#apply2-interface)
- [Apply2C (interface)](#apply2c-interface)
- [Apply3 (interface)](#apply3-interface)
- [Apply3C (interface)](#apply3c-interface)
- [Apply4 (interface)](#apply4-interface)
- [sequenceS (function)](#sequences-function)
- [sequenceT (function)](#sequencet-function)

---

# Apply (interface)

**Signature**

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v2.0.0

# Apply1 (interface)

**Signature**

```ts
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: Type<F, (a: A) => B>, fa: Type<F, A>) => Type<F, B>
}
```

# Apply2 (interface)

**Signature**

```ts
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <L, A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# Apply2C (interface)

**Signature**

```ts
export interface Apply2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly ap: <A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# Apply3 (interface)

**Signature**

```ts
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <U, L, A, B>(fab: Type3<F, U, L, (a: A) => B>, fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Apply3C (interface)

**Signature**

```ts
export interface Apply3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly ap: <A, B>(fab: Type3<F, U, L, (a: A) => B>, fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# Apply4 (interface)

**Signature**

```ts
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <X, U, L, A, B>(fab: Type4<F, X, U, L, (a: A) => B>, fa: Type4<F, X, U, L, A>) => Type4<F, X, U, L, B>
}
```

# sequenceS (function)

Like `Apply.sequenceT` but works with structs instead of tuples.

**Signature**

```ts
export function sequenceS<F extends URIS3>(
  F: Apply3<F>
): <U, L, R extends Record<string, Type3<F, U, L, any>>>(
  r: EnforceNonEmptyRecord<R> & Record<string, Type3<F, U, L, any>>
) => Type3<F, U, L, { [K in keyof R]: [R[K]] extends [Type3<F, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <R extends Record<string, Type3<F, U, L, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type3<F, U, L, { [K in keyof R]: [R[K]] extends [Type3<F, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2>(
  F: Apply2<F>
): <L, R extends Record<string, Type2<F, L, any>>>(
  r: EnforceNonEmptyRecord<R> & Record<string, Type2<F, L, any>>
) => Type2<F, L, { [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2, L>(
  F: Apply2C<F, L>
): <R extends Record<string, Type2<F, L, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type2<F, L, { [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS>(
  F: Apply1<F>
): <R extends Record<string, Type<F, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type<F, { [K in keyof R]: [R[K]] extends [Type<F, infer A>] ? A : never }>
export function sequenceS<F>(
  F: Apply<F>
): <R extends Record<string, HKT<F, any>>>(
  r: EnforceNonEmptyRecord<R>
) => HKT<F, { [K in keyof R]: [R[K]] extends [HKT<F, infer A>] ? A : never }> { ... }
```

**Example**

```ts
import { either, right, left } from 'fp-ts/lib/Either'
import { sequenceS } from 'fp-ts/lib/Apply'

const ado = sequenceS(either)

assert.deepStrictEqual(
  ado({
    a: right(1),
    b: right(true)
  }),
  right({ a: 1, b: true })
)
assert.deepStrictEqual(
  ado({
    a: right(1),
    b: left('error')
  }),
  left('error')
)
```

Added in v2.0.0

# sequenceT (function)

Tuple sequencing, i.e., take a tuple of monadic actions and does them from left-to-right, returning the resulting tuple.

**Signature**

```ts
export function sequenceT<F extends URIS3>(
  F: Apply3<F>
): <U, L, T extends Array<Type3<F, U, L, any>>>(
  ...t: T & { 0: Type3<F, U, L, any> }
) => Type3<F, U, L, { [K in keyof T]: [T[K]] extends [Type3<F, U, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <T extends Array<Type3<F, U, L, any>>>(
  ...t: T & { 0: Type3<F, U, L, any> }
) => Type3<F, U, L, { [K in keyof T]: [T[K]] extends [Type3<F, U, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS2>(
  F: Apply2<F>
): <L, T extends Array<Type2<F, L, any>>>(
  ...t: T & { 0: Type2<F, L, any> }
) => Type2<F, L, { [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS2, L>(
  F: Apply2C<F, L>
): <T extends Array<Type2<F, L, any>>>(
  ...t: T & { 0: Type2<F, L, any> }
) => Type2<F, L, { [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS>(
  F: Apply1<F>
): <T extends Array<Type<F, any>>>(
  ...t: T & { 0: Type<F, any> }
) => Type<F, { [K in keyof T]: [T[K]] extends [Type<F, infer A>] ? A : never }>
export function sequenceT<F>(
  F: Apply<F>
): <T extends Array<HKT<F, any>>>(
  ...t: T & { 0: HKT<F, any> }
) => HKT<F, { [K in keyof T]: [T[K]] extends [HKT<F, infer A>] ? A : never }> { ... }
```

**Example**

```ts
import { sequenceT } from 'fp-ts/lib/Apply'
import { option, some, none } from 'fp-ts/lib/Option'

const sequenceTOption = sequenceT(option)
assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)
```

Added in v2.0.0
