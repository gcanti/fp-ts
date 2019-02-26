---
id: Apply
title: Apply
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts)

# Apply

**Signature** (type class) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L21-L23)

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) = F.ap(fbc, F.ap(fab, fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

Added in v1.0.0

## applyFirst

Combine two effectful actions, keeping only the result of the first

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L64-L66)

```ts
export function applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>  { ... }
```

Added in v1.0.0

## applySecond

Combine two effectful actions, keeping only the result of the second

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L87-L89)

```ts
export function applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>  { ... }
```

Added in v1.0.0

## getSemigroup

If `F` is a `Apply` and `S` is a `Semigroup` over `A` then `HKT<F, A>` is a `Semigroup` over `A` as well

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L227-L232)

```ts
export function getSemigroup<F, A>(F: Apply<F>, S: Semigroup<A>): () => Semigroup<HKT<F, A>>  { ... }
```

**Example**

```ts
import { getSemigroup } from 'fp-ts/lib/Apply'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidSum } from 'fp-ts/lib/Monoid'

const S = getSemigroup(option, monoidSum)()
assert.deepStrictEqual(S.concat(none, none), none)
assert.deepStrictEqual(S.concat(some(1), none), none)
assert.deepStrictEqual(S.concat(none, some(2)), none)
assert.deepStrictEqual(S.concat(some(1), some(2)), some(3))
```

Added in v1.4.0

## liftA2

Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L112-L114)

```ts
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>  { ... }
```

Added in v1.0.0

## liftA3

Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor
`F`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L148-L152)

```ts
export function liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>  { ... }
```

Added in v1.0.0

## liftA4

Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor
`F`

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L190-L194)

```ts
export function liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>  { ... }
```

Added in v1.0.0

## sequenceT

Tuple sequencing, i.e., take a tuple of monadic actions and do them from left-to-right, returning the resulting tuple.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts#L331-L344)

```ts
export function sequenceT<F>(F: Apply<F>): SequenceT<F>  { ... }
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

Added in v1.5.0
