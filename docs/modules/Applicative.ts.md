---
title: Applicative.ts
nav_order: 3
parent: Modules
---

# Overview

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
of type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
any number of function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1. Identity: `A.ap(A.of(a => a), fa) = fa`
2. Homomorphism: `A.ap(A.of(ab), A.of(a)) = A.of(ab(a))`
3. Interchange: `A.ap(fab, A.of(a)) = A.ap(A.of(ab => ab(a)), fab)`

Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`

---

<h2 class="text-delta">Table of contents</h2>

- [Applicative (interface)](#applicative-interface)
- [Applicative1 (interface)](#applicative1-interface)
- [Applicative2 (interface)](#applicative2-interface)
- [Applicative2C (interface)](#applicative2c-interface)
- [Applicative3 (interface)](#applicative3-interface)
- [Applicative3C (interface)](#applicative3c-interface)
- [ApplicativeComposition (interface)](#applicativecomposition-interface)
- [ApplicativeComposition11 (interface)](#applicativecomposition11-interface)
- [ApplicativeComposition12 (interface)](#applicativecomposition12-interface)
- [ApplicativeComposition12C (interface)](#applicativecomposition12c-interface)
- [ApplicativeComposition21 (interface)](#applicativecomposition21-interface)
- [ApplicativeComposition22 (interface)](#applicativecomposition22-interface)
- [ApplicativeComposition22C (interface)](#applicativecomposition22c-interface)
- [ApplicativeComposition2C1 (interface)](#applicativecomposition2c1-interface)
- [ApplicativeComposition3C1 (interface)](#applicativecomposition3c1-interface)
- [getApplicativeComposition (function)](#getapplicativecomposition-function)
- [getMonoid (function)](#getmonoid-function)
- [when (function)](#when-function)

---

# Applicative (interface)

**Signature**

```ts
export interface Applicative<F> extends Apply<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}
```

Added in v1.0.0

# Applicative1 (interface)

**Signature**

```ts
export interface Applicative1<F extends URIS> extends Apply1<F> {
  readonly of: <A>(a: A) => Type<F, A>
}
```

# Applicative2 (interface)

**Signature**

```ts
export interface Applicative2<F extends URIS2> extends Apply2<F> {
  readonly of: <L, A>(a: A) => Type2<F, L, A>
}
```

# Applicative2C (interface)

**Signature**

```ts
export interface Applicative2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly of: <A>(a: A) => Type2<F, L, A>
}
```

# Applicative3 (interface)

**Signature**

```ts
export interface Applicative3<F extends URIS3> extends Apply3<F> {
  readonly of: <U, L, A>(a: A) => Type3<F, U, L, A>
}
```

# Applicative3C (interface)

**Signature**

```ts
export interface Applicative3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
  readonly of: <A>(a: A) => Type3<F, U, L, A>
}
```

# ApplicativeComposition (interface)

**Signature**

```ts
export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  readonly of: <A>(a: A) => HKT<F, HKT<G, A>>
  readonly ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>) => HKT<F, HKT<G, B>>
}
```

# ApplicativeComposition11 (interface)

**Signature**

```ts
export interface ApplicativeComposition11<F extends URIS, G extends URIS> extends FunctorComposition11<F, G> {
  readonly of: <A>(a: A) => Type<F, Type<G, A>>
  readonly ap: <A, B>(fgab: Type<F, Type<G, (a: A) => B>>, fga: Type<F, Type<G, A>>) => Type<F, Type<G, B>>
}
```

# ApplicativeComposition12 (interface)

**Signature**

```ts
export interface ApplicativeComposition12<F extends URIS, G extends URIS2> extends FunctorComposition12<F, G> {
  readonly of: <LG, A>(a: A) => Type<F, Type2<G, LG, A>>
  readonly ap: <LG, A, B>(
    fgab: Type<F, Type2<G, LG, (a: A) => B>>,
    fga: Type<F, Type2<G, LG, A>>
  ) => Type<F, Type2<G, LG, B>>
}
```

# ApplicativeComposition12C (interface)

**Signature**

```ts
export interface ApplicativeComposition12C<F extends URIS, G extends URIS2, LG>
  extends FunctorComposition12C<F, G, LG> {
  readonly of: <A>(a: A) => Type<F, Type2<G, LG, A>>
  readonly ap: <A, B>(
    fgab: Type<F, Type2<G, LG, (a: A) => B>>,
    fga: Type<F, Type2<G, LG, A>>
  ) => Type<F, Type2<G, LG, B>>
}
```

# ApplicativeComposition21 (interface)

**Signature**

```ts
export interface ApplicativeComposition21<F extends URIS2, G extends URIS> extends FunctorComposition21<F, G> {
  readonly of: <LF, A>(a: A) => Type2<F, LF, Type<G, A>>
  readonly ap: <LF, A, B>(
    fgab: Type2<F, LF, Type<G, (a: A) => B>>,
    fga: Type2<F, LF, Type<G, A>>
  ) => Type2<F, LF, Type<G, B>>
}
```

# ApplicativeComposition22 (interface)

**Signature**

```ts
export interface ApplicativeComposition22<F extends URIS2, G extends URIS2> extends FunctorComposition22<F, G> {
  readonly of: <LF, LG, A>(a: A) => Type2<F, LF, Type2<G, LG, A>>
  readonly ap: <L, M, A, B>(
    fgab: Type2<F, L, Type2<G, M, (a: A) => B>>,
    fga: Type2<F, L, Type2<G, M, A>>
  ) => Type2<F, L, Type2<G, M, B>>
}
```

# ApplicativeComposition22C (interface)

**Signature**

```ts
export interface ApplicativeComposition22C<F extends URIS2, G extends URIS2, LG>
  extends FunctorComposition22C<F, G, LG> {
  readonly of: <LF, A>(a: A) => Type2<F, LF, Type2<G, LG, A>>
  readonly ap: <LF, A, B>(
    fgab: Type2<F, LF, Type2<G, LG, (a: A) => B>>,
    fga: Type2<F, LF, Type2<G, LG, A>>
  ) => Type2<F, LF, Type2<G, LG, B>>
}
```

# ApplicativeComposition2C1 (interface)

**Signature**

```ts
export interface ApplicativeComposition2C1<F extends URIS2, G extends URIS, LF>
  extends FunctorComposition2C1<F, G, LF> {
  readonly of: <A>(a: A) => Type2<F, LF, Type<G, A>>
  readonly ap: <A, B>(
    fgab: Type2<F, LF, Type<G, (a: A) => B>>,
    fga: Type2<F, LF, Type<G, A>>
  ) => Type2<F, LF, Type<G, B>>
}
```

# ApplicativeComposition3C1 (interface)

**Signature**

```ts
export interface ApplicativeComposition3C1<F extends URIS3, G extends URIS, UF, LF>
  extends FunctorComposition3C1<F, G, UF, LF> {
  readonly of: <A>(a: A) => Type3<F, UF, LF, Type<G, A>>
  readonly ap: <A, B>(
    fgab: Type3<F, UF, LF, Type<G, (a: A) => B>>,
    fga: Type3<F, UF, LF, Type<G, A>>
  ) => Type3<F, UF, LF, Type<G, B>>
}
```

# getApplicativeComposition (function)

Like `Functor`, `Applicative`s compose. If `F` and `G` have `Applicative` instances, then so does `F<G<_>>`

**Signature**

```ts
export function getApplicativeComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Applicative3C<F, UF, LF>,
  G: Applicative1<G>
): ApplicativeComposition3C1<F, G, UF, LF>
export function getApplicativeComposition<F extends URIS2, G extends URIS2, LG>(
  F: Applicative2<F>,
  G: Applicative2C<G, LG>
): ApplicativeComposition22C<F, G, LG>
export function getApplicativeComposition<F extends URIS2, G extends URIS2>(
  F: Applicative2<F>,
  G: Applicative2<G>
): ApplicativeComposition22<F, G>
export function getApplicativeComposition<F extends URIS2, G extends URIS2, LG>(
  F: Applicative2<F>,
  G: Applicative2C<G, LG>
): ApplicativeComposition22C<F, G, LG>
export function getApplicativeComposition<F extends URIS2, G extends URIS>(
  F: Applicative2<F>,
  G: Applicative1<G>
): ApplicativeComposition21<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2>(
  F: Applicative1<F>,
  G: Applicative2<G>
): ApplicativeComposition12<F, G>
export function getApplicativeComposition<F extends URIS, G extends URIS2, LG>(
  F: Applicative1<F>,
  G: Applicative2C<G, LG>
): ApplicativeComposition12C<F, G, LG>
export function getApplicativeComposition<F extends URIS, G extends URIS>(
  F: Applicative1<F>,
  G: Applicative1<G>
): ApplicativeComposition11<F, G>
export function getApplicativeComposition<F, G extends URIS2>(
  F: Applicative<F>,
  G: Applicative2<G>
): ApplicativeComposition<F, G>
export function getApplicativeComposition<F, G extends URIS>(
  F: Applicative<F>,
  G: Applicative1<G>
): ApplicativeComposition<F, G>
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> { ... }
```

**Example**

```ts
import { getApplicativeComposition } from 'fp-ts/lib/Applicative'
import { option, Option, some } from 'fp-ts/lib/Option'
import { task, Task } from 'fp-ts/lib/Task'

const x: Task<Option<number>> = task.of(some(1))
const y: Task<Option<number>> = task.of(some(2))

const A = getApplicativeComposition(task, option)

const sum = (a: number) => (b: number): number => a + b
A.ap(A.map(x, sum), y)().then(result => assert.deepStrictEqual(result, some(3)))
```

Added in v1.0.0

# getMonoid (function)

If `F` is a `Applicative` and `M` is a `Monoid` over `A` then `HKT<F, A>` is a `Monoid` over `A` as well.
Adapted from http://hackage.haskell.org/package/monoids-0.2.0.2/docs/Data-Monoid-Applicative.html

**Signature**

```ts
export function getMonoid<F extends URIS3, A>(
  F: Applicative3<F>,
  M: Monoid<A>
): <U = never, L = never>() => Monoid<Type3<F, U, L, A>>
export function getMonoid<F extends URIS3, U, L, A>(
  F: Applicative3C<F, U, L>,
  M: Monoid<A>
): () => Monoid<Type3<F, U, L, A>>
export function getMonoid<F extends URIS2, A>(F: Applicative2<F>, M: Monoid<A>): <L = never>() => Monoid<Type2<F, L, A>>
export function getMonoid<F extends URIS2, L, A>(F: Applicative2C<F, L>, M: Monoid<A>): () => Monoid<Type2<F, L, A>>
export function getMonoid<F extends URIS, A>(F: Applicative1<F>, M: Monoid<A>): () => Monoid<Type<F, A>>
export function getMonoid<F, A>(F: Applicative<F>, M: Monoid<A>): () => Monoid<HKT<F, A>> { ... }
```

**Example**

```ts
import { getMonoid } from 'fp-ts/lib/Applicative'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidSum } from 'fp-ts/lib/Monoid'

const M = getMonoid(option, monoidSum)()
assert.deepStrictEqual(M.concat(none, none), none)
assert.deepStrictEqual(M.concat(some(1), none), none)
assert.deepStrictEqual(M.concat(none, some(2)), none)
assert.deepStrictEqual(M.concat(some(1), some(2)), some(3))
```

Added in v1.4.0

# when (function)

Perform a applicative action when a condition is true

**Signature**

```ts
export function when<F extends URIS3>(
  F: Applicative3<F>
): <U, L>(condition: boolean, fu: Type3<F, U, L, void>) => Type3<F, U, L, void>
export function when<F extends URIS3, U, L>(
  F: Applicative3C<F, U, L>
): (condition: boolean, fu: Type3<F, U, L, void>) => Type3<F, U, L, void>
export function when<F extends URIS2>(
  F: Applicative2<F>
): <L>(condition: boolean, fu: Type2<F, L, void>) => Type2<F, L, void>
export function when<F extends URIS2, L>(
  F: Applicative2C<F, L>
): (condition: boolean, fu: Type2<F, L, void>) => Type2<F, L, void>
export function when<F extends URIS>(F: Applicative1<F>): (condition: boolean, fu: Type<F, void>) => Type<F, void>
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> { ... }
```

**Example**

```ts
import { io } from 'fp-ts/lib/IO'
import { when } from 'fp-ts/lib/Applicative'

const log: Array<string> = []
const action = () => {
  log.push('action called')
}
when(io)(false, action)()
assert.deepStrictEqual(log, [])
when(io)(true, action)()
assert.deepStrictEqual(log, ['action called'])
```

Added in v1.0.0
