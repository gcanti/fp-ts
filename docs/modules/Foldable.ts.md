---
title: Foldable.ts
nav_order: 31
parent: Modules
---

## Foldable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [foldMap](#foldmap)
  - [reduce](#reduce)
  - [reduceRight](#reduceright)
- [type classes](#type-classes)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [intercalate](#intercalate)
  - [reduceE](#reducee)
  - [toReadonlyArray](#toreadonlyarray)

---

# combinators

## foldMap

`foldMap` composition.

**Signature**

```ts
export declare const foldMap: <F extends HKT, G extends HKT>(
  F: Foldable<F>,
  G: Foldable<G>
) => <M>(
  M: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => M
```

Added in v3.0.0

## reduce

`reduce` composition.

**Signature**

```ts
export declare const reduce: <F extends HKT, G extends HKT>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B
```

Added in v3.0.0

## reduceRight

`reduceRight` composition.

**Signature**

```ts
export declare const reduceRight: <F extends HKT, G extends HKT>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (a: A, b: B) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B
```

Added in v3.0.0

# type classes

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends HKT> extends Typeclass<F> {
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => B
}
```

Added in v3.0.0

# utils

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator.

**Signature**

```ts
export declare function intercalate<F extends HKT>(
  F: Foldable<F>
): <M>(M: Monoid<M>) => (sep: M) => <S, R, W, E>(fm: Kind<F, S, R, W, E, M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/Foldable'
import { Monoid } from 'fp-ts/string'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const t = T.tree('a', [T.tree('b', []), T.tree('c', []), T.tree('d', [])])
assert.strictEqual(pipe(t, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
```

Added in v3.0.0

## reduceE

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export declare function reduceE<F extends HKT>(
  F: Foldable<F>
): <M extends HKT>(
  M: Flattenable<M>
) => <GS, GR, GW, GE, B, A>(
  mb: Kind<M, GS, GR, GW, GE, B>,
  f: (b: B, a: A) => Kind<M, GS, GR, GW, GE, B>
) => <FS, FR, FW, FE>(fa: Kind<F, FS, FR, FW, FE, A>) => Kind<M, GS, GR, GW, GE, B>
```

**Example**

```ts
import { reduceE } from 'fp-ts/Foldable'
import { Flattenable, some } from 'fp-ts/Option'
import { tree, Foldable } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const t = tree(1, [tree(2, []), tree(3, []), tree(4, [])])
assert.deepStrictEqual(
  pipe(
    t,
    reduceE(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))
  ),
  some(7)
)
```

Added in v3.0.0

## toReadonlyArray

Transforms a `Foldable` into a read-only array.

**Signature**

```ts
export declare function toReadonlyArray<F extends HKT>(
  F: Foldable<F>
): <S, R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => ReadonlyArray<A>
```

**Example**

```ts
import { toReadonlyArray } from 'fp-ts/Foldable'
import { Foldable, tree } from 'fp-ts/Tree'

const t = tree(1, [tree(2, []), tree(3, []), tree(4, [])])
assert.deepStrictEqual(toReadonlyArray(Foldable)(t), [1, 2, 3, 4])
```

Added in v3.0.0
