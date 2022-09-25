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
  - [getFoldMapComposition](#getfoldmapcomposition)
  - [getReduceComposition](#getreducecomposition)
  - [getReduceRightComposition](#getreducerightcomposition)
- [type classes](#type-classes)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [intercalate](#intercalate)
  - [reduceWithEffect](#reducewitheffect)
  - [toReadonlyArray](#toreadonlyarray)

---

# combinators

## getFoldMapComposition

`foldMap` composition.

**Signature**

```ts
export declare const getFoldMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <M>(
  M: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => M
```

Added in v3.0.0

## getReduceComposition

`reduce` composition.

**Signature**

```ts
export declare const getReduceComposition: <F extends TypeLambda, G extends TypeLambda>(
  F: Foldable<F>,
  G: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FS, FR, FW, FE, GS, GR, GW, GE>(fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>) => B
```

Added in v3.0.0

## getReduceRightComposition

`reduceRight` composition.

**Signature**

```ts
export declare const getReduceRightComposition: <F extends TypeLambda, G extends TypeLambda>(
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
export interface Foldable<F extends TypeLambda> extends Typeclass<F> {
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S, R, W, E>(self: Kind<F, S, R, W, E, A>) => B
}
```

Added in v3.0.0

# utils

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator.

**Signature**

```ts
export declare function intercalate<F extends TypeLambda>(
  F: Foldable<F>
): <M>(M: Monoid<M>) => (sep: M) => <S, R, W, E>(fm: Kind<F, S, R, W, E, M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/Foldable'
import { Monoid } from 'fp-ts/string'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
assert.strictEqual(pipe(tree, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
```

Added in v3.0.0

## reduceWithEffect

Similar to 'reduce', but the result is encapsulated in a monad.

Note: this function is not generally stack-safe, e.g., for monads which build up thunks a la `IO`.

**Signature**

```ts
export declare function reduceWithEffect<F extends TypeLambda>(
  F: Foldable<F>
): <M extends TypeLambda>(
  M: Flattenable<M>
) => <GS, GR, GW, GE, B, A>(
  mb: Kind<M, GS, GR, GW, GE, B>,
  f: (b: B, a: A) => Kind<M, GS, GR, GW, GE, B>
) => <FS, FR, FW, FE>(self: Kind<F, FS, FR, FW, FE, A>) => Kind<M, GS, GR, GW, GE, B>
```

**Example**

```ts
import { reduceWithEffect } from 'fp-ts/Foldable'
import { Flattenable, some } from 'fp-ts/Option'
import { make, Foldable } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const tree = make(1, [make(2), make(3), make(4)])
assert.deepStrictEqual(
  pipe(
    tree,
    reduceWithEffect(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))
  ),
  some(7)
)
```

Added in v3.0.0

## toReadonlyArray

Transforms a `Foldable` into a read-only array.

**Signature**

```ts
export declare function toReadonlyArray<F extends TypeLambda>(
  F: Foldable<F>
): <S, R, W, E, A>(self: Kind<F, S, R, W, E, A>) => ReadonlyArray<A>
```

**Example**

```ts
import { toReadonlyArray } from 'fp-ts/Foldable'
import { Foldable, make } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/function'

const tree = make(1, [make(2), make(3), make(4)])
assert.deepStrictEqual(pipe(tree, toReadonlyArray(Foldable)), [1, 2, 3, 4])
```

Added in v3.0.0
