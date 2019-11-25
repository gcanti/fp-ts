---
title: Foldable.ts
nav_order: 32
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Foldable (interface)](#foldable-interface)
- [Foldable1 (interface)](#foldable1-interface)
- [Foldable2 (interface)](#foldable2-interface)
- [Foldable2C (interface)](#foldable2c-interface)
- [Foldable3 (interface)](#foldable3-interface)
- [Foldable3C (interface)](#foldable3c-interface)
- [Foldable4 (interface)](#foldable4-interface)
- [FoldableComposition (interface)](#foldablecomposition-interface)
- [FoldableComposition11 (interface)](#foldablecomposition11-interface)
- [FoldableComposition12 (interface)](#foldablecomposition12-interface)
- [FoldableComposition12C (interface)](#foldablecomposition12c-interface)
- [FoldableComposition21 (interface)](#foldablecomposition21-interface)
- [FoldableComposition22 (interface)](#foldablecomposition22-interface)
- [FoldableComposition22C (interface)](#foldablecomposition22c-interface)
- [FoldableComposition2C1 (interface)](#foldablecomposition2c1-interface)
- [foldM (function)](#foldm-function)
- [getFoldableComposition (function)](#getfoldablecomposition-function)
- [intercalate (function)](#intercalate-function)
- [traverse\_ (function)](#traverse_-function)

---

# Foldable (interface)

**Signature**

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# Foldable1 (interface)

**Signature**

```ts
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# Foldable2 (interface)

**Signature**

```ts
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <E, A>(fa: Kind2<F, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(fa: Kind2<F, E, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# Foldable2C (interface)

**Signature**

```ts
export interface Foldable2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <A, B>(fa: Kind2<F, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind2<F, E, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# Foldable3 (interface)

**Signature**

```ts
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <R, E, A>(fa: Kind3<F, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <R, E, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# Foldable3C (interface)

**Signature**

```ts
export interface Foldable3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly reduce: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <R, A>(fa: Kind3<F, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <R, A, B>(fa: Kind3<F, R, E, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.2.0

# Foldable4 (interface)

**Signature**

```ts
export interface Foldable4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>, f: (a: A) => M) => M
  readonly reduceRight: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition (interface)

**Signature**

```ts
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, HKT<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: HKT<F, HKT<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition11 (interface)

**Signature**

```ts
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind<F, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition12 (interface)

**Signature**

```ts
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <E, A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <E, A>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(fa: Kind<F, Kind2<G, E, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition12C (interface)

**Signature**

```ts
export interface FoldableComposition12C<F extends URIS, G extends URIS2, E> {
  readonly reduce: <A, B>(fga: Kind<F, Kind2<G, E, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind<F, Kind2<G, E, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition21 (interface)

**Signature**

```ts
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <E, A, B>(fga: Kind2<F, E, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <E, A>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <E, A, B>(fa: Kind2<F, E, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition22 (interface)

**Signature**

```ts
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <FE, GE, A, B>(fga: Kind2<F, FE, Kind2<G, GE, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <FE, GE, A>(fa: Kind2<F, FE, Kind2<G, GE, A>>, f: (a: A) => M) => M
  readonly reduceRight: <FE, GE, A, B>(fa: Kind2<F, FE, Kind2<G, GE, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition22C (interface)

**Signature**

```ts
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, E> {
  readonly reduce: <FE, A, B>(fga: Kind2<F, FE, Kind2<G, E, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <FE, A>(fa: Kind2<F, FE, Kind2<G, E, A>>, f: (a: A) => M) => M
  readonly reduceRight: <FE, A, B>(fa: Kind2<F, FE, Kind2<G, E, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableComposition2C1 (interface)

**Signature**

```ts
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, E> {
  readonly reduce: <A, B>(fga: Kind2<F, E, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, E, Kind<G, A>>, f: (a: A) => M) => M
  readonly reduceRight: <A, B>(fa: Kind2<F, E, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v2.0.0

# foldM (function)

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export function foldM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable1<F>
): <R, E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export function foldM<M extends URIS3, F extends URIS, E>(
  M: Monad3C<M, E>,
  F: Foldable1<F>
): <R, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, B>
export function foldM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable1<F>
): <E, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export function foldM<M extends URIS2, F extends URIS, E>(
  M: Monad2C<M, E>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, E, B>) => Kind2<M, E, B>
export function foldM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind<M, B>) => Kind<M, B>
export function foldM<M, F>(
  M: Monad<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B> { ... }
```

**Example**

```ts
import { foldM } from 'fp-ts/lib/Foldable'
import { option, some } from 'fp-ts/lib/Option'
import { make, tree } from 'fp-ts/lib/Tree'

const t = make(1, [make(2, []), make(3, []), make(4, [])])
assert.deepStrictEqual(
  foldM(option, tree)(t, 0, (b, a) => (a > 2 ? some(b + a) : some(b))),
  some(7)
)
```

Added in v2.0.0

# getFoldableComposition (function)

Returns the composition of two foldables

**Signature**

```ts
export function getFoldableComposition<F extends URIS2, G extends URIS2, E>(
  F: Foldable2<F>,
  G: Foldable2C<G, E>
): FoldableComposition22C<F, G, E>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2<F>,
  G: Foldable2<G>
): FoldableComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS, E>(
  F: Foldable2C<F, E>,
  G: Foldable1<G>
): FoldableComposition2C1<F, G, E>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2<F>,
  G: Foldable1<G>
): FoldableComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2, E>(
  F: Foldable1<F>,
  G: Foldable2C<G, E>
): FoldableComposition12C<F, G, E>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable1<F>,
  G: Foldable2<G>
): FoldableComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable1<F>,
  G: Foldable1<G>
): FoldableComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> { ... }
```

**Example**

```ts
import { getFoldableComposition } from 'fp-ts/lib/Foldable'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidString } from 'fp-ts/lib/Monoid'

const F = getFoldableComposition(array, option)
assert.strictEqual(F.reduce([some('a'), some('b'), some('c')], '', monoidString.concat), 'abc')
assert.strictEqual(F.reduce([some('a'), none, some('c')], '', monoidString.concat), 'ac')
```

Added in v2.0.0

# intercalate (function)

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature**

```ts
export function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable3<F>
): <R, E>(sep: M, fm: Kind3<F, R, E, M>) => M
export function intercalate<M, F extends URIS2>(M: Monoid<M>, F: Foldable2<F>): <E>(sep: M, fm: Kind2<F, E, M>) => M
export function intercalate<M, F extends URIS2, E>(M: Monoid<M>, F: Foldable2C<F, E>): (sep: M, fm: Kind2<F, E, M>) => M
export function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable1<F>): (sep: M, fm: Kind<F, M>) => M
export function intercalate<M, F>(M: Monoid<M>, F: Foldable<F>): (sep: M, fm: HKT<F, M>) => M { ... }
```

**Example**

```ts
import { intercalate } from 'fp-ts/lib/Foldable'
import { monoidString } from 'fp-ts/lib/Monoid'
import { make, tree } from 'fp-ts/lib/Tree'

const t = make('a', [make('b', []), make('c', []), make('d', [])])
assert.strictEqual(intercalate(monoidString, tree)('|', t), 'a|b|c|d')
```

Added in v2.0.0

# traverse\_ (function)

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature**

```ts
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable1<F>
): <R, E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, R, E, B>) => Kind3<M, R, E, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable1<F>
): <E, A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
export function traverse_<M extends URIS2, F extends URIS, E>(
  M: Applicative2C<M, E>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, E, B>) => Kind2<M, E, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<M, B>) => Kind<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { traverse_ } from 'fp-ts/lib/Foldable'
import { io } from 'fp-ts/lib/IO'

let log = ''
const append = (s: string) => () => (log += s)
traverse_(io, array)(['a', 'b', 'c'], append)()
assert.strictEqual(log, 'abc')
```

Added in v2.0.0
