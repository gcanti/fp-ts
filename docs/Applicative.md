---
id: Applicative
title: Module Applicative
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Applicative.ts)

# Applicative

```ts
interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}
```

Added in v1.0.0 (type class)

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
of type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
any number of function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1.  Identity: `A.ap(A.of(a => a), fa) = fa`
2.  Homomorphism: `A.ap(A.of(ab), A.of(a)) = A.of(ab(a))`
3.  Interchange: A.ap(fab, A.of(a)) = A.ap(A.of(ab => ab(a)), fab)

Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`

## getApplicativeComposition

```ts
getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
```

Added in v1.0.0 (function)

## getMonoid

```ts
getMonoid<F, A>(F: Applicative<F>, M: Monoid<A>): () => Monoid<HKT<F, A>>
```

Added in v1.4.0 (function)

If `F` is a `Applicative` and `M` is a `Monoid` over `A` then `HKT<F, A>` is a `Monoid` over `A` as well.
Adapted from http://hackage.haskell.org/package/monoids-0.2.0.2/docs/Data-Monoid-Applicative.html

_Example_

```ts
import { getMonoid } from 'fp-ts/lib/Applicative'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidSum } from 'fp-ts/lib/Monoid'

const M = getMonoid(option, monoidSum)()
assert.deepEqual(M.concat(none, none), none)
assert.deepEqual(M.concat(some(1), none), none)
assert.deepEqual(M.concat(none, some(2)), none)
assert.deepEqual(M.concat(some(1), some(2)), some(3))
```

## when

```ts
when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
```

Added in v1.0.0 (function)

Perform a applicative action when a condition is true

_Example_

```ts
import { IO, io } from 'fp-ts/lib/IO'
import { when } from 'fp-ts/lib/Applicative'

const log: Array<string> = []
const action = new IO(() => {
  log.push('action called')
})
when(io)(false, action).run()
assert.deepEqual(log, [])
when(io)(true, action).run()
assert.deepEqual(log, ['action called'])
```
