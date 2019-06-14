---
title: Foldable2v.ts
nav_order: 33
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Foldable2v (interface)](#foldable2v-interface)
- [Foldable2v1 (interface)](#foldable2v1-interface)
- [Foldable2v2 (interface)](#foldable2v2-interface)
- [Foldable2v2C (interface)](#foldable2v2c-interface)
- [Foldable2v3 (interface)](#foldable2v3-interface)
- [Foldable2v3C (interface)](#foldable2v3c-interface)
- [Foldable2v4 (interface)](#foldable2v4-interface)
- [Foldable2vComposition (interface)](#foldable2vcomposition-interface)
- [Foldable2vComposition11 (interface)](#foldable2vcomposition11-interface)
- [Foldable2vComposition12 (interface)](#foldable2vcomposition12-interface)
- [Foldable2vComposition12C (interface)](#foldable2vcomposition12c-interface)
- [Foldable2vComposition21 (interface)](#foldable2vcomposition21-interface)
- [Foldable2vComposition22 (interface)](#foldable2vcomposition22-interface)
- [Foldable2vComposition22C (interface)](#foldable2vcomposition22c-interface)
- [Foldable2vComposition2C1 (interface)](#foldable2vcomposition2c1-interface)
- [Foldable2vComposition3C1 (interface)](#foldable2vcomposition3c1-interface)
- [~~elem~~ (function)](#elem-function)
- [~~findFirst~~ (function)](#findfirst-function)
- [~~fold~~ (function)](#fold-function)
- [foldM (function)](#foldm-function)
- [getFoldableComposition (function)](#getfoldablecomposition-function)
- [intercalate (function)](#intercalate-function)
- [~~max~~ (function)](#max-function)
- [~~member~~ (function)](#member-function)
- [~~min~~ (function)](#min-function)
- [~~oneOf~~ (function)](#oneof-function)
- [~~product~~ (function)](#product-function)
- [~~sequence\_~~ (function)](#sequence_-function)
- [~~sum~~ (function)](#sum-function)
- [~~toArray~~ (function)](#toarray-function)
- [traverse\_ (function)](#traverse_-function)

---

# Foldable2v (interface)

**Signature**

```ts
export interface Foldable2v<F> extends Foldable<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

Added in v1.10.0

# Foldable2v1 (interface)

**Signature**

```ts
export interface Foldable2v1<F extends URIS> extends Foldable1<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind<F, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2v2 (interface)

**Signature**

```ts
export interface Foldable2v2<F extends URIS2> extends Foldable2<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Kind2<F, L, A>, f: (a: A) => M) => M
  readonly foldr: <L, A, B>(fa: Kind2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2v2C (interface)

**Signature**

```ts
export interface Foldable2v2C<F extends URIS2, L> extends Foldable2C<F, L> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, L, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2v3 (interface)

**Signature**

```ts
export interface Foldable2v3<F extends URIS3> extends Foldable3<F> {
  readonly foldMap: <M>(M: Monoid<M>) => <U, L, A>(fa: Kind3<F, U, L, A>, f: (a: A) => M) => M
  readonly foldr: <U, L, A, B>(fa: Kind3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2v3C (interface)

**Signature**

```ts
export interface Foldable2v3C<F extends URIS3, U, L> extends Foldable3C<F, U, L> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind3<F, U, L, A>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2v4 (interface)

**Signature**

```ts
export interface Foldable2v4<F extends URIS4> {
  readonly URI: F
  readonly reduce: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, b: B, f: (b: B, a: A) => B) => B
  readonly foldMap: <M>(M: Monoid<M>) => <X, U, L, A>(fa: Kind4<F, X, U, L, A>, f: (a: A) => M) => M
  readonly reduceRight: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition (interface)

**Signature**

```ts
export interface Foldable2vComposition<F, G> extends FoldableComposition<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: HKT<F, HKT<G, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: HKT<F, HKT<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition11 (interface)

**Signature**

```ts
export interface Foldable2vComposition11<F extends URIS, G extends URIS> extends FoldableComposition11<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, Kind<G, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind<F, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition12 (interface)

**Signature**

```ts
export interface Foldable2vComposition12<F extends URIS, G extends URIS2> extends FoldableComposition12<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Kind<F, Kind2<G, L, A>>, f: (a: A) => M) => M
  readonly foldr: <LG, A, B>(fa: Kind<F, Kind2<G, LG, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition12C (interface)

**Signature**

```ts
export interface Foldable2vComposition12C<F extends URIS, G extends URIS2, LG>
  extends FoldableComposition12C<F, G, LG> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind<F, Kind2<G, LG, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind<F, Kind2<G, LG, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition21 (interface)

**Signature**

```ts
export interface Foldable2vComposition21<F extends URIS2, G extends URIS> extends FoldableComposition21<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <L, A>(fa: Kind2<F, L, Kind<G, A>>, f: (a: A) => M) => M
  readonly foldr: <LF, A, B>(fa: Kind2<F, LF, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition22 (interface)

**Signature**

```ts
export interface Foldable2vComposition22<F extends URIS2, G extends URIS2> extends FoldableComposition22<F, G> {
  readonly foldMap: <M>(M: Monoid<M>) => <LF, LG, A>(fa: Kind2<F, LF, Kind2<G, LG, A>>, f: (a: A) => M) => M
  readonly foldr: <LF, LG, A, B>(fa: Kind2<F, LF, Kind2<G, LG, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition22C (interface)

**Signature**

```ts
export interface Foldable2vComposition22C<F extends URIS2, G extends URIS2, LG>
  extends FoldableComposition22C<F, G, LG> {
  readonly foldMap: <M>(M: Monoid<M>) => <LF, A>(fa: Kind2<F, LF, Kind2<G, LG, A>>, f: (a: A) => M) => M
  readonly foldr: <LF, A, B>(fa: Kind2<F, LF, Kind2<G, LG, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition2C1 (interface)

**Signature**

```ts
export interface Foldable2vComposition2C1<F extends URIS2, G extends URIS, LF>
  extends FoldableComposition2C1<F, G, LF> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind2<F, LF, Kind<G, A>>, f: (a: A) => M) => M
  readonly foldr: <A, B>(fa: Kind2<F, LF, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# Foldable2vComposition3C1 (interface)

**Signature**

```ts
export interface Foldable2vComposition3C1<F extends URIS3, G extends URIS, UF, LF>
  extends FoldableComposition3C1<F, G, UF, LF> {
  readonly foldMap: <M>(M: Monoid<M>) => <A>(fa: Kind3<F, UF, LF, Kind<G, A>>, f: (a: A) => M) => M
  readonly foldr: <LF, A, B>(fa: Kind3<F, UF, LF, Kind<G, A>>, b: B, f: (a: A, b: B) => B) => B
}
```

# ~~elem~~ (function)

Test whether a value is an element of a data structure

**Signature**

```ts
export function elem<F extends URIS3, A>(E: Eq<A>, F: Foldable2v3<F>): <U, L>(a: A, fa: Kind3<F, U, L, A>) => boolean
export function elem<F extends URIS3, A, U, L>(
  E: Eq<A>,
  F: Foldable2v3C<F, U, L>
): (a: A, fa: Kind3<F, U, L, A>) => boolean
export function elem<F extends URIS2, A>(E: Eq<A>, F: Foldable2v2<F>): <L>(a: A, fa: Kind2<F, L, A>) => boolean
export function elem<F extends URIS2, A, L>(E: Eq<A>, F: Foldable2v2C<F, L>): (a: A, fa: Kind2<F, L, A>) => boolean
export function elem<F extends URIS, A>(E: Eq<A>, F: Foldable2v1<F>): (a: A, fa: Kind<F, A>) => boolean
export function elem<F, A>(E: Eq<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean { ... }
```

**Example**

```ts
import { elem } from 'fp-ts/lib/Foldable2v'
import { eqNumber } from 'fp-ts/lib/Eq'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(elem(eqNumber, tree)(2, t), true)
assert.strictEqual(elem(eqNumber, tree)(5, t), false)
```

Added in v1.14.0

# ~~findFirst~~ (function)

Find the first element which satisfies a predicate function

**Signature**

```ts
export function findFirst<F extends URIS3>(
  F: Foldable2v3<F>
): <U, L, A>(fa: Kind3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS3, U, L>(
  F: Foldable2v3C<F, U, L>
): <A>(fa: Kind3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS2>(F: Foldable2v2<F>): <L, A>(fa: Kind2<F, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS2, L>(
  F: Foldable2v2C<F, L>
): <A>(fa: Kind2<F, L, A>, p: Predicate<A>) => Option<A>
export function findFirst<F extends URIS>(F: Foldable2v1<F>): <A>(fa: Kind<F, A>, p: Predicate<A>) => Option<A>
export function findFirst<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> { ... }
```

**Example**

```ts
import { findFirst } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'
import { some } from 'fp-ts/lib/Option'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(findFirst(tree)(t, a => a > 2), some(3))
```

Added in v1.10.0

# ~~fold~~ (function)

A generalization of monoidal `fold`

**Signature**

```ts
export function fold<M, F extends URIS3>(M: Monoid<M>, F: Foldable2v3<F>): <U, L>(fa: Kind3<F, U, L, M>) => M
export function fold<M, F extends URIS3, U, L>(M: Monoid<M>, F: Foldable2v3C<F, U, L>): (fa: Kind3<F, U, L, M>) => M
export function fold<M, F extends URIS2>(M: Monoid<M>, F: Foldable2v2<F>): <L>(fa: Kind2<F, L, M>) => M
export function fold<M, F extends URIS2, L>(M: Monoid<M>, F: Foldable2v2C<F, L>): (fa: Kind2<F, L, M>) => M
export function fold<M, F extends URIS>(M: Monoid<M>, F: Foldable2v1<F>): (fa: Kind<F, M>) => M
export function fold<M, F>(M: Monoid<M>, F: Foldable2v<F>): (fa: HKT<F, M>) => M { ... }
```

**Example**

```ts
import { fold } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'
import { monoidSum } from 'fp-ts/lib/Monoid'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(fold(monoidSum, tree)(t), 10)
```

Added in v1.10.0

# foldM (function)

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export function foldM<M extends URIS3, F extends URIS>(
  M: Monad3<M>,
  F: Foldable2v1<F>
): <U, L, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, B>
export function foldM<M extends URIS3, F extends URIS, U, L>(
  M: Monad3C<M, U, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, B>
export function foldM<M extends URIS2, F extends URIS>(
  M: Monad2<M>,
  F: Foldable2v1<F>
): <L, A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, L, B>) => Kind2<M, L, B>
export function foldM<M extends URIS2, F extends URIS, L>(
  M: Monad2C<M, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind2<M, L, B>) => Kind2<M, L, B>
export function foldM<M extends URIS, F extends URIS>(
  M: Monad1<M>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => Kind<M, B>) => Kind<M, B>
export function foldM<M, F>(
  M: Monad<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => HKT<M, B>) => HKT<M, B> { ... }
```

**Example**

```ts
import { foldM } from 'fp-ts/lib/Foldable2v'
import { option, some } from 'fp-ts/lib/Option'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(foldM(option, tree)(t, 0, (b, a) => (a > 2 ? some(b + a) : some(b))), some(7))
```

Added in v1.10.0

# getFoldableComposition (function)

Returns the composition of two foldables

**Signature**

```ts
export function getFoldableComposition<F extends URIS3, G extends URIS, UF, LF>(
  F: Foldable2v3C<F, UF, LF>,
  G: Foldable2v1<G>
): Foldable2vComposition3C1<F, G, UF, LF>
export function getFoldableComposition<F extends URIS2, G extends URIS2, LG>(
  F: Foldable2v2<F>,
  G: Foldable2v2C<G, LG>
): Foldable2vComposition22C<F, G, LG>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  F: Foldable2v2<F>,
  G: Foldable2v2<G>
): Foldable2vComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS, LF>(
  F: Foldable2v2C<F, LF>,
  G: Foldable2v1<G>
): Foldable2vComposition2C1<F, G, LF>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  F: Foldable2v2<F>,
  G: Foldable2v1<G>
): Foldable2vComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2, LG>(
  F: Foldable2v1<F>,
  G: Foldable2v2C<G, LG>
): Foldable2vComposition12C<F, G, LG>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  F: Foldable2v1<F>,
  G: Foldable2v2<G>
): Foldable2vComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  F: Foldable2v1<F>,
  G: Foldable2v1<G>
): Foldable2vComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable2v<F>, G: Foldable2v<G>): Foldable2vComposition<F, G> { ... }
```

**Example**

```ts
import { getFoldableComposition } from 'fp-ts/lib/Foldable2v'
import { array } from 'fp-ts/lib/Array'
import { option, some, none } from 'fp-ts/lib/Option'
import { monoidString } from 'fp-ts/lib/Monoid'

const F = getFoldableComposition(array, option)
assert.strictEqual(F.reduce([some('a'), some('b'), some('c')], '', monoidString.concat), 'abc')
assert.strictEqual(F.reduce([some('a'), none, some('c')], '', monoidString.concat), 'ac')
```

Added in v1.10.0

# intercalate (function)

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator

**Signature**

```ts
export function intercalate<M, F extends URIS3>(
  M: Monoid<M>,
  F: Foldable2v3<F>
): <U, L>(sep: M, fm: Kind3<F, U, L, M>) => M
export function intercalate<M, F extends URIS3, U, L>(
  M: Monoid<M>,
  F: Foldable2v3C<F, U, L>
): (sep: M, fm: Kind3<F, U, L, M>) => M
export function intercalate<M, F extends URIS2>(M: Monoid<M>, F: Foldable2v2<F>): <L>(sep: M, fm: Kind2<F, L, M>) => M
export function intercalate<M, F extends URIS2, L>(
  M: Monoid<M>,
  F: Foldable2v2C<F, L>
): (sep: M, fm: Kind2<F, L, M>) => M
export function intercalate<M, F extends URIS>(M: Monoid<M>, F: Foldable2v1<F>): (sep: M, fm: Kind<F, M>) => M
export function intercalate<M, F>(M: Monoid<M>, F: Foldable2v<F>): (sep: M, fm: HKT<F, M>) => M { ... }
```

**Example**

```ts
import { intercalate } from 'fp-ts/lib/Foldable2v'
import { monoidString } from 'fp-ts/lib/Monoid'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree('a', [new Tree('b', []), new Tree('c', []), new Tree('d', [])])
assert.strictEqual(intercalate(monoidString, tree)('|', t), 'a|b|c|d')
```

Added in v1.10.0

# ~~max~~ (function)

Find the largest element of a structure, according to its `Ord` instance

**Signature**

```ts
export function max<F extends URIS3, A>(O: Ord<A>, F: Foldable2v3<F>): <U, L>(fa: Kind3<F, U, L, A>) => Option<A>
export function max<F extends URIS3, A, U, L>(O: Ord<A>, F: Foldable2v3C<F, U, L>): (fa: Kind3<F, U, L, A>) => Option<A>
export function max<F extends URIS2, A>(O: Ord<A>, F: Foldable2v2<F>): <L>(fa: Kind2<F, L, A>) => Option<A>
export function max<F extends URIS2, A, L>(O: Ord<A>, F: Foldable2v2C<F, L>): (fa: Kind2<F, L, A>) => Option<A>
export function max<F extends URIS, A>(O: Ord<A>, F: Foldable2v1<F>): (fa: Kind<F, A>) => Option<A>
export function max<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A> { ... }
```

**Example**

```ts
import { max } from 'fp-ts/lib/Foldable2v'
import { some } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(max(ordNumber, tree)(t), some(4))
```

Added in v1.10.0

# ~~member~~ (function)

**Signature**

```ts
export function member<F extends URIS3, A>(E: Eq<A>, F: Foldable2v3<F>): <U, L>(a: A, fa: Kind3<F, U, L, A>) => boolean
export function member<F extends URIS3, A, U, L>(
  E: Eq<A>,
  F: Foldable2v3C<F, U, L>
): (a: A, fa: Kind3<F, U, L, A>) => boolean
export function member<F extends URIS2, A>(E: Eq<A>, F: Foldable2v2<F>): <L>(a: A, fa: Kind2<F, L, A>) => boolean
export function member<F extends URIS2, A, L>(E: Eq<A>, F: Foldable2v2C<F, L>): (a: A, fa: Kind2<F, L, A>) => boolean
export function member<F extends URIS, A>(E: Eq<A>, F: Foldable2v1<F>): (a: A, fa: Kind<F, A>) => boolean
export function member<F, A>(E: Eq<A>, F: Foldable2v<F>): (a: A, fa: HKT<F, A>) => boolean { ... }
```

Added in v1.10.0

# ~~min~~ (function)

Find the smallest element of a structure, according to its `Ord` instance

**Signature**

```ts
export function min<F extends URIS3, A>(O: Ord<A>, F: Foldable2v3<F>): <U, L>(fa: Kind3<F, U, L, A>) => Option<A>
export function min<F extends URIS3, A, U, L>(O: Ord<A>, F: Foldable2v3C<F, U, L>): (fa: Kind3<F, U, L, A>) => Option<A>
export function min<F extends URIS2, A>(O: Ord<A>, F: Foldable2v2<F>): <L>(fa: Kind2<F, L, A>) => Option<A>
export function min<F extends URIS2, A, L>(O: Ord<A>, F: Foldable2v2C<F, L>): (fa: Kind2<F, L, A>) => Option<A>
export function min<F extends URIS, A>(O: Ord<A>, F: Foldable2v1<F>): (fa: Kind<F, A>) => Option<A>
export function min<F, A>(O: Ord<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => Option<A> { ... }
```

**Example**

```ts
import { min } from 'fp-ts/lib/Foldable2v'
import { some } from 'fp-ts/lib/Option'
import { ordNumber } from 'fp-ts/lib/Ord'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(min(ordNumber, tree)(t), some(1))
```

Added in v1.10.0

# ~~oneOf~~ (function)

Combines a collection of elements using the `Alt` operation

**Signature**

```ts
export function oneOf<P extends URIS3, F extends URIS>(
  P: Plus3<P>,
  F: Foldable2v1<F>
): <U, L, A>(fga: Kind<F, Kind3<P, U, L, A>>) => Kind3<P, U, L, A>
export function oneOf<P extends URIS3, U, L, F extends URIS>(
  P: Plus3C<P, U, L>,
  F: Foldable2v1<F>
): <A>(fga: Kind<F, Kind3<P, U, L, A>>) => Kind3<P, U, L, A>
export function oneOf<P extends URIS2, F extends URIS>(
  P: Plus2<P>,
  F: Foldable2v1<F>
): <L, A>(fga: Kind<F, Kind2<P, L, A>>) => Kind2<P, L, A>
export function oneOf<P extends URIS2, F extends URIS, L>(
  P: Plus2C<P, L>,
  F: Foldable2v1<F>
): <A>(fga: Kind<F, Kind2<P, L, A>>) => Kind2<P, L, A>
export function oneOf<P extends URIS, F extends URIS>(
  P: Plus1<P>,
  F: Foldable2v1<F>
): <A>(fga: Kind<F, Kind<P, A>>) => Kind<P, A>
export function oneOf<P, F>(P: Plus<P>, F: Foldable2v<F>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { oneOf } from 'fp-ts/lib/Foldable2v'
import { option, some } from 'fp-ts/lib/Option'

assert.deepStrictEqual(oneOf(option, array)([some(2), some(1)]), some(2))
```

Added in v1.10.0

# ~~product~~ (function)

Find the product of the numeric values in a data structure

**Signature**

```ts
export function product<F extends URIS3, A>(S: Semiring<A>, F: Foldable2v3<F>): <U, L>(fa: Kind3<F, U, L, A>) => A
export function product<F extends URIS3, A, U, L>(
  S: Semiring<A>,
  F: Foldable2v3C<F, U, L>
): (fa: Kind3<F, U, L, A>) => A
export function product<F extends URIS2, A>(S: Semiring<A>, F: Foldable2v2<F>): <L>(fa: Kind2<F, L, A>) => A
export function product<F extends URIS2, A, L>(S: Semiring<A>, F: Foldable2v2C<F, L>): (fa: Kind2<F, L, A>) => A
export function product<F extends URIS, A>(S: Semiring<A>, F: Foldable2v1<F>): (fa: Kind<F, A>) => A
export function product<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A { ... }
```

**Example**

```ts
import { fieldNumber } from 'fp-ts/lib/Field'
import { product } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(product(fieldNumber, tree)(t), 24)
```

Added in v1.10.0

# ~~sequence\_~~ (function)

Perform all of the effects in some data structure in the order given by the `Foldable2v` instance, ignoring the final result.

**Signature**

```ts
export function sequence_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable2v1<F>
): <U, L, A>(fa: Kind<F, Kind3<M, U, L, A>>) => Kind3<M, U, L, void>
export function sequence_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable2v1<F>
): <A>(fa: Kind<F, Kind3<M, U, L, A>>) => Kind3<M, U, L, void>
export function sequence_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable2v1<F>
): <L, A>(fa: Kind<F, Kind2<M, L, A>>) => Kind2<M, L, void>
export function sequence_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable2v1<F>
): <A>(fa: Kind<F, Kind2<M, L, A>>) => Kind2<M, L, void>
export function sequence_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable2v1<F>
): <A>(fa: Kind<F, Kind<M, A>>) => Kind<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable2v<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { sequence_ } from 'fp-ts/lib/Foldable2v'
import { io, IO } from 'fp-ts/lib/IO'

let log = ''
const append = (s: string) => new IO(() => (log += s))
sequence_(io, array)([append('a'), append('b'), append('c')]).run()
assert.strictEqual(log, 'abc')
```

Added in v1.10.0

# ~~sum~~ (function)

Find the sum of the numeric values in a data structure

**Signature**

```ts
export function sum<F extends URIS3, A>(S: Semiring<A>, F: Foldable2v3<F>): <U, L>(fa: Kind3<F, U, L, A>) => A
export function sum<F extends URIS3, A, U, L>(S: Semiring<A>, F: Foldable2v3C<F, U, L>): (fa: Kind3<F, U, L, A>) => A
export function sum<F extends URIS2, A>(S: Semiring<A>, F: Foldable2v2<F>): <L>(fa: Kind2<F, L, A>) => A
export function sum<F extends URIS2, A, L>(S: Semiring<A>, F: Foldable2v2C<F, L>): (fa: Kind2<F, L, A>) => A
export function sum<F extends URIS, A>(S: Semiring<A>, F: Foldable2v1<F>): (fa: Kind<F, A>) => A
export function sum<F, A>(S: Semiring<A>, F: Foldable2v<F>): (fa: HKT<F, A>) => A { ... }
```

**Example**

```ts
import { fieldNumber } from 'fp-ts/lib/Field'
import { sum } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.strictEqual(sum(fieldNumber, tree)(t), 10)
```

Added in v1.10.0

# ~~toArray~~ (function)

Transforms a foldable into an array

**Signature**

```ts
export function toArray<F extends URIS3>(F: Foldable2v3<F>): <U, L, A>(fa: Kind3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS3, U, L>(F: Foldable2v3C<F, U, L>): <A>(fa: Kind3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS2>(F: Foldable2v2<F>): <L, A>(fa: Kind2<F, L, A>) => Array<A>
export function toArray<F extends URIS2, L>(F: Foldable2v2C<F, L>): <A>(fa: Kind2<F, L, A>) => Array<A>
export function toArray<F extends URIS>(F: Foldable2v1<F>): <A>(fa: Kind<F, A>) => Array<A>
export function toArray<F>(F: Foldable2v<F>): <A>(fa: HKT<F, A>) => Array<A> { ... }
```

**Example**

```ts
import { toArray } from 'fp-ts/lib/Foldable2v'
import { Tree, tree } from 'fp-ts/lib/Tree'

const t = new Tree(1, [new Tree(2, []), new Tree(3, []), new Tree(4, [])])
assert.deepStrictEqual(toArray(tree)(t), [1, 2, 3, 4])
```

Added in v1.10.0

# traverse\_ (function)

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature**

```ts
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  F: Foldable2v1<F>
): <U, L, A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, void>
export function traverse_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  F: Foldable2v1<F>
): <L, A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, void>
export function traverse_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  F: Foldable2v1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<M, B>) => Kind<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  F: Foldable2v<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> { ... }
```

**Example**

```ts
import { array } from 'fp-ts/lib/Array'
import { traverse_ } from 'fp-ts/lib/Foldable2v'
import { io, IO } from 'fp-ts/lib/IO'

let log = ''
const append = (s: string) => new IO(() => (log += s))
traverse_(io, array)(['a', 'b', 'c'], append).run()
assert.strictEqual(log, 'abc')
```

Added in v1.10.0
