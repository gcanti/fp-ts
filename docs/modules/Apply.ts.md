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
- [SequenceT (interface)](#sequencet-interface)
- [SequenceT1 (interface)](#sequencet1-interface)
- [SequenceT2 (interface)](#sequencet2-interface)
- [SequenceT2C (interface)](#sequencet2c-interface)
- [SequenceT3 (interface)](#sequencet3-interface)
- [SequenceT3C (interface)](#sequencet3c-interface)
- [applyFirst (function)](#applyfirst-function)
- [applySecond (function)](#applysecond-function)
- [getSemigroup (function)](#getsemigroup-function)
- [liftA2 (function)](#lifta2-function)
- [liftA3 (function)](#lifta3-function)
- [liftA4 (function)](#lifta4-function)
- [sequenceT (function)](#sequencet-function)

---

# Apply (interface)

**Signature**

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v1.0.0

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

# SequenceT (interface)

**Signature**

```ts
export interface SequenceT<H> {
  <A>(a: HKT<H, A>): HKT<H, [A]>
  <A, B>(a: HKT<H, A>, b: HKT<H, B>): HKT<H, [A, B]>
  <A, B, C>(a: HKT<H, A>, b: HKT<H, B>, c: HKT<H, C>): HKT<H, [A, B, C]>
  <A, B, C, D>(a: HKT<H, A>, b: HKT<H, B>, c: HKT<H, C>, d: HKT<H, D>): HKT<H, [A, B, C, D]>
  <A, B, C, D, E>(a: HKT<H, A>, b: HKT<H, B>, c: HKT<H, C>, d: HKT<H, D>, e: HKT<H, E>): HKT<H, [A, B, C, D, E]>
  <A, B, C, D, E, F>(a: HKT<H, A>, b: HKT<H, B>, c: HKT<H, C>, d: HKT<H, D>, e: HKT<H, E>, f: HKT<H, F>): HKT<
    H,
    [A, B, C, D, E, F]
  >
  <A, B, C, D, E, F, G>(
    a: HKT<H, A>,
    b: HKT<H, B>,
    c: HKT<H, C>,
    d: HKT<H, D>,
    e: HKT<H, E>,
    f: HKT<H, F>,
    g: HKT<H, G>
  ): HKT<H, [A, B, C, D, E, F, G]>
}
```

# SequenceT1 (interface)

**Signature**

```ts
export interface SequenceT1<H extends URIS> {
  <A>(a: Type<H, A>): Type<H, [A]>
  <A, B>(a: Type<H, A>, b: Type<H, B>): Type<H, [A, B]>
  <A, B, C>(a: Type<H, A>, b: Type<H, B>, c: Type<H, C>): Type<H, [A, B, C]>
  <A, B, C, D>(a: Type<H, A>, b: Type<H, B>, c: Type<H, C>, d: Type<H, D>): Type<H, [A, B, C, D]>
  <A, B, C, D, E>(a: Type<H, A>, b: Type<H, B>, c: Type<H, C>, d: Type<H, D>, e: Type<H, E>): Type<H, [A, B, C, D, E]>
  <A, B, C, D, E, F>(a: Type<H, A>, b: Type<H, B>, c: Type<H, C>, d: Type<H, D>, e: Type<H, E>, f: Type<H, F>): Type<
    H,
    [A, B, C, D, E, F]
  >
  <A, B, C, D, E, F, G>(
    a: Type<H, A>,
    b: Type<H, B>,
    c: Type<H, C>,
    d: Type<H, D>,
    e: Type<H, E>,
    f: Type<H, F>,
    g: Type<H, G>
  ): Type<H, [A, B, C, D, E, F, G]>
}
```

# SequenceT2 (interface)

**Signature**

```ts
export interface SequenceT2<H extends URIS2> {
  <L, A>(a: Type2<H, L, A>): Type2<H, L, [A]>
  <L, A, B>(a: Type2<H, L, A>, b: Type2<H, L, B>): Type2<H, L, [A, B]>
  <L, A, B, C>(a: Type2<H, L, A>, b: Type2<H, L, B>, c: Type2<H, L, C>): Type2<H, L, [A, B, C]>
  <L, A, B, C, D>(a: Type2<H, L, A>, b: Type2<H, L, B>, c: Type2<H, L, C>, d: Type2<H, L, D>): Type2<H, L, [A, B, C, D]>
  <L, A, B, C, D, E>(
    a: Type2<H, L, A>,
    b: Type2<H, L, B>,
    c: Type2<H, L, C>,
    d: Type2<H, L, D>,
    e: Type2<H, L, E>
  ): Type2<H, L, [A, B, C, D, E]>
  <L, A, B, C, D, E, F>(
    a: Type2<H, L, A>,
    b: Type2<H, L, B>,
    c: Type2<H, L, C>,
    d: Type2<H, L, D>,
    e: Type2<H, L, E>,
    f: Type2<H, L, F>
  ): Type2<H, L, [A, B, C, D, E, F]>
  <L, A, B, C, D, E, F, G>(
    a: Type2<H, L, A>,
    b: Type2<H, L, B>,
    c: Type2<H, L, C>,
    d: Type2<H, L, D>,
    e: Type2<H, L, E>,
    f: Type2<H, L, F>,
    g: Type2<H, L, G>
  ): Type2<H, L, [A, B, C, D, E, F, G]>
}
```

# SequenceT2C (interface)

**Signature**

```ts
export interface SequenceT2C<H extends URIS2, L> {
  <A>(a: Type2<H, L, A>): Type2<H, L, [A]>
  <A, B>(a: Type2<H, L, A>, b: Type2<H, L, B>): Type2<H, L, [A, B]>
  <A, B, C>(a: Type2<H, L, A>, b: Type2<H, L, B>, c: Type2<H, L, C>): Type2<H, L, [A, B, C]>
  <A, B, C, D>(a: Type2<H, L, A>, b: Type2<H, L, B>, c: Type2<H, L, C>, d: Type2<H, L, D>): Type2<H, L, [A, B, C, D]>
  <A, B, C, D, E>(a: Type2<H, L, A>, b: Type2<H, L, B>, c: Type2<H, L, C>, d: Type2<H, L, D>, e: Type2<H, L, E>): Type2<
    H,
    L,
    [A, B, C, D, E]
  >
  <A, B, C, D, E, F>(
    a: Type2<H, L, A>,
    b: Type2<H, L, B>,
    c: Type2<H, L, C>,
    d: Type2<H, L, D>,
    e: Type2<H, L, E>,
    f: Type2<H, L, F>
  ): Type2<H, L, [A, B, C, D, E, F]>
  <A, B, C, D, E, F, G>(
    a: Type2<H, L, A>,
    b: Type2<H, L, B>,
    c: Type2<H, L, C>,
    d: Type2<H, L, D>,
    e: Type2<H, L, E>,
    f: Type2<H, L, F>,
    g: Type2<H, L, G>
  ): Type2<H, L, [A, B, C, D, E, F, G]>
}
```

# SequenceT3 (interface)

**Signature**

```ts
export interface SequenceT3<H extends URIS3> {
  <U, L, A>(a: Type3<H, U, L, A>): Type3<H, U, L, [A]>
  <U, L, A, B>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>): Type3<H, U, L, [A, B]>
  <U, L, A, B, C>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>, c: Type3<H, U, L, C>): Type3<H, U, L, [A, B, C]>
  <U, L, A, B, C, D>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>, c: Type3<H, U, L, C>, d: Type3<H, U, L, D>): Type3<
    H,
    U,
    L,
    [A, B, C, D]
  >
  <U, L, A, B, C, D, E>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>
  ): Type3<H, U, L, [A, B, C, D, E]>
  <U, L, A, B, C, D, E, F>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>,
    f: Type3<H, U, L, F>
  ): Type3<H, U, L, [A, B, C, D, E, F]>
  <U, L, A, B, C, D, E, F, G>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>,
    f: Type3<H, U, L, F>,
    g: Type3<H, U, L, G>
  ): Type3<H, U, L, [A, B, C, D, E, F, G]>
}
```

# SequenceT3C (interface)

**Signature**

```ts
export interface SequenceT3C<H extends URIS3, U, L> {
  <A>(a: Type3<H, U, L, A>): Type3<H, U, L, [A]>
  <A, B>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>): Type3<H, U, L, [A, B]>
  <A, B, C>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>, c: Type3<H, U, L, C>): Type3<H, U, L, [A, B, C]>
  <A, B, C, D>(a: Type3<H, U, L, A>, b: Type3<H, U, L, B>, c: Type3<H, U, L, C>, d: Type3<H, U, L, D>): Type3<
    H,
    U,
    L,
    [A, B, C, D]
  >
  <A, B, C, D, E>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>
  ): Type3<H, U, L, [A, B, C, D, E]>
  <A, B, C, D, E, F>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>,
    f: Type3<H, U, L, F>
  ): Type3<H, U, L, [A, B, C, D, E, F]>
  <A, B, C, D, E, F, G>(
    a: Type3<H, U, L, A>,
    b: Type3<H, U, L, B>,
    c: Type3<H, U, L, C>,
    d: Type3<H, U, L, D>,
    e: Type3<H, U, L, E>,
    f: Type3<H, U, L, F>,
    g: Type3<H, U, L, G>
  ): Type3<H, U, L, [A, B, C, D, E, F, G]>
}
```

# applyFirst (function)

Combine two effectful actions, keeping only the result of the first

**Signature**

```ts
export function applyFirst<F extends URIS3>(
  F: Apply3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function applyFirst<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, A>
export function applyFirst<F extends URIS2>(
  F: Apply2<F>
): <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, A>
export function applyFirst<F extends URIS2, L>(
  F: Apply2C<F, L>
): <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, A>
export function applyFirst<F extends URIS>(F: Apply1<F>): <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, A>
export function applyFirst<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, A> { ... }
```

Added in v1.0.0

# applySecond (function)

Combine two effectful actions, keeping only the result of the second

**Signature**

```ts
export function applySecond<F extends URIS3>(
  F: Apply3<F>
): <U, L, A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, B>
export function applySecond<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <A, B>(fa: Type3<F, U, L, A>, fb: Type3<F, U, L, B>) => Type3<F, U, L, B>
export function applySecond<F extends URIS2>(
  F: Apply2<F>
): <L, A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, B>
export function applySecond<F extends URIS2, L>(
  F: Apply2C<F, L>
): <A, B>(fa: Type2<F, L, A>, fb: Type2<F, L, B>) => Type2<F, L, B>
export function applySecond<F extends URIS>(F: Apply1<F>): <A, B>(fa: Type<F, A>, fb: Type<F, B>) => Type<F, B>
export function applySecond<F>(F: Apply<F>): <A, B>(fa: HKT<F, A>, fb: HKT<F, B>) => HKT<F, B> { ... }
```

Added in v1.0.0

# getSemigroup (function)

If `F` is a `Apply` and `S` is a `Semigroup` over `A` then `HKT<F, A>` is a `Semigroup` over `A` as well

**Signature**

```ts
export function getSemigroup<F extends URIS3, A>(
  F: Apply3<F>,
  S: Semigroup<A>
): <U = never, L = never>() => Semigroup<Type3<F, U, L, A>>
export function getSemigroup<F extends URIS3, U, L, A>(
  F: Apply3C<F, U, L>,
  S: Semigroup<A>
): () => Semigroup<Type3<F, U, L, A>>
export function getSemigroup<F extends URIS2, A>(
  F: Apply2<F>,
  S: Semigroup<A>
): <L = never>() => Semigroup<Type2<F, L, A>>
export function getSemigroup<F extends URIS2, L, A>(F: Apply2C<F, L>, S: Semigroup<A>): () => Semigroup<Type2<F, L, A>>
export function getSemigroup<F extends URIS, A>(F: Apply1<F>, S: Semigroup<A>): () => Semigroup<Type<F, A>>
export function getSemigroup<F, A>(F: Apply<F>, S: Semigroup<A>): () => Semigroup<HKT<F, A>> { ... }
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

# liftA2 (function)

Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`

**Signature**

```ts
export function liftA2<F extends URIS3>(
  F: Apply3<F>
): <A, B, C>(f: Curried2<A, B, C>) => <U, L>(fa: Type3<F, U, L, A>) => (fb: Type3<F, U, L, B>) => Type3<F, U, L, C>
export function liftA2<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <A, B, C>(f: Curried2<A, B, C>) => (fa: Type3<F, U, L, A>) => (fb: Type3<F, U, L, B>) => Type3<F, U, L, C>
export function liftA2<F extends URIS2>(
  F: Apply2<F>
): <A, B, C>(f: Curried2<A, B, C>) => <L>(fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => Type2<F, L, C>
export function liftA2<F extends URIS2, L>(
  F: Apply2C<F, L>
): <A, B, C>(f: Curried2<A, B, C>) => (fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => Type2<F, L, C>
export function liftA2<F extends URIS>(
  F: Apply1<F>
): <A, B, C>(f: Curried2<A, B, C>) => Curried2<Type<F, A>, Type<F, B>, Type<F, C>>
export function liftA2<F>(F: Apply<F>): <A, B, C>(f: Curried2<A, B, C>) => Curried2<HKT<F, A>, HKT<F, B>, HKT<F, C>> { ... }
```

Added in v1.0.0

# liftA3 (function)

Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor
`F`

**Signature**

```ts
export function liftA3<F extends URIS3>(
  F: Apply3<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <U, L>(fa: Type3<F, U, L, A>) => (fb: Type3<F, U, L, B>) => (fc: Type3<F, U, L, C>) => Type3<F, U, L, D>
export function liftA3<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => (fa: Type3<F, U, L, A>) => (fb: Type3<F, U, L, B>) => (fc: Type3<F, U, L, C>) => Type3<F, U, L, D>
export function liftA3<F extends URIS2>(
  F: Apply2<F>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => <L>(fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => (fc: Type2<F, L, C>) => Type2<F, L, D>
export function liftA3<F extends URIS2, L>(
  F: Apply2C<F, L>
): <A, B, C, D>(
  f: Curried3<A, B, C, D>
) => (fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => (fc: Type2<F, L, C>) => Type2<F, L, D>
export function liftA3<F extends URIS>(
  F: Apply1<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<Type<F, A>, Type<F, B>, Type<F, C>, Type<F, D>>
export function liftA3<F>(
  F: Apply<F>
): <A, B, C, D>(f: Curried3<A, B, C, D>) => Curried3<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>> { ... }
```

Added in v1.0.0

# liftA4 (function)

Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor
`F`

**Signature**

```ts
export function liftA4<F extends URIS3>(
  F: Apply3<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <U, L>(
  fa: Type3<F, U, L, A>
) => (fb: Type3<F, U, L, B>) => (fc: Type3<F, U, L, C>) => (fd: Type3<F, U, L, D>) => Type3<F, U, L, E>
export function liftA4<F extends URIS3, U, L>(
  F: Apply3C<F, U, L>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => (
  fa: Type3<F, U, L, A>
) => (fb: Type3<F, U, L, B>) => (fc: Type3<F, U, L, C>) => (fd: Type3<F, U, L, D>) => Type3<F, U, L, E>
export function liftA4<F extends URIS2>(
  F: Apply2<F>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => <L>(fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => (fc: Type2<F, L, C>) => (fd: Type2<F, L, D>) => Type2<F, L, E>
export function liftA4<F extends URIS2, L>(
  F: Apply2C<F, L>
): <A, B, C, D, E>(
  f: Curried4<A, B, C, D, E>
) => (fa: Type2<F, L, A>) => (fb: Type2<F, L, B>) => (fc: Type2<F, L, C>) => (fd: Type2<F, L, D>) => Type2<F, L, E>
export function liftA4<F extends URIS>(
  F: Apply1<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<Type<F, A>, Type<F, B>, Type<F, C>, Type<F, D>, Type<F, E>>
export function liftA4<F>(
  F: Apply<F>
): <A, B, C, D, E>(f: Curried4<A, B, C, D, E>) => Curried4<HKT<F, A>, HKT<F, B>, HKT<F, C>, HKT<F, D>, HKT<F, E>> { ... }
```

Added in v1.0.0

# sequenceT (function)

Tuple sequencing, i.e., take a tuple of monadic actions and do them from left-to-right, returning the resulting tuple.

**Signature**

```ts
export function sequenceT<F extends URIS3, U, L>(F: Apply3<F>): SequenceT3<F>
export function sequenceT<F extends URIS3, U, L>(F: Apply3C<F, U, L>): SequenceT3C<F, U, L>
export function sequenceT<F extends URIS2>(F: Apply2<F>): SequenceT2<F>
export function sequenceT<F extends URIS2, L>(F: Apply2C<F, L>): SequenceT2C<F, L>
export function sequenceT<F extends URIS>(F: Apply1<F>): SequenceT1<F>
export function sequenceT<F>(F: Apply<F>): SequenceT<F> { ... }
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
