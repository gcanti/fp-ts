---
id: Apply
title: Module Apply
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Apply.ts)

# Apply

```ts
interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v1.0.0 (type class)

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Instances must satisfy the following law in addition to the `Functor` laws:

1.  Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) = F.ap(fbc, F.ap(fab, fa))`

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

## applyFirst

```ts
applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A>
```

Added in v1.0.0 (function)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B>
```

Added in v1.0.0 (function)

Combine two effectful actions, keeping only the result of the second

## getSemigroup

```ts
getSemigroup<F, A>(F: Apply<F>, S: Semigroup<A>): () => Semigroup<HKT<F, A>>
```

Added in v1.4.0 (function)

If `F` is a `Apply` and `S` is a `Semigroup` over `A` then `HKT<F, A>` is a `Semigroup` over `A` as well

_Example_

```ts
import { getSemigroup } from 'fp-ts/lib/Apply'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidSum } from 'fp-ts/lib/Monoid'

const S = getSemigroup(option, monoidSum)()
assert.deepEqual(S.concat(none, none), none)
assert.deepEqual(S.concat(some(1), none), none)
assert.deepEqual(S.concat(none, some(2)), none)
assert.deepEqual(S.concat(some(1), some(2)), some(3))
```

## liftA2

```ts
liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>>
```

Added in v1.0.0 (function)

Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`

## liftA3

```ts
liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>>
```

Added in v1.0.0 (function)

Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor
`F`

## liftA4

```ts
liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>>
```

Added in v1.0.0 (function)

Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor
`F`

## sequenceT

```ts
sequenceT<F>(F: Apply<F>): SequenceT<F>
```

Added in v1.5.0 (function)

Tuple sequencing, i.e., take a tuple of monadic actions and do them from left-to-right, returning the resulting tuple.

_Example_

```ts
import { sequenceT } from 'fp-ts/lib/Apply'
import { option, some, none } from 'fp-ts/lib/Option'

const sequenceTOption = sequenceT(option)
assert.deepEqual(sequenceTOption(some(1)), some([1]))
assert.deepEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
assert.deepEqual(sequenceTOption(some(1), some('2'), none), none)
```
