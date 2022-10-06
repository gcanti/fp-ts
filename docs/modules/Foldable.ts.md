---
title: Foldable.ts
nav_order: 34
parent: Modules
---

## Foldable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [conversions](#conversions)
  - [toReadonlyArray](#toreadonlyarray)
- [model](#model)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [foldMapComposition](#foldmapcomposition)
  - [intercalate](#intercalate)
  - [reduceComposition](#reducecomposition)
  - [reduceKind](#reducekind)
  - [reduceRightComposition](#reducerightcomposition)

---

# conversions

## toReadonlyArray

Converts a `Foldable` into a `ReadonlyArray`.

**Signature**

```ts
export declare const toReadonlyArray: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <S, A>(self: Kind<F, S, never, unknown, unknown, A>) => readonly A[]
```

**Example**

```ts
import { toReadonlyArray } from 'fp-ts/Foldable'
import { Foldable, make } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = make(1, [make(2), make(3), make(4)])
assert.deepStrictEqual(pipe(tree, toReadonlyArray(Foldable)), [1, 2, 3, 4])
```

Added in v3.0.0

# model

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly reduce: <B, A>(b: B, f: (b: B, a: A) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => M
  readonly reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => <S>(self: Kind<F, S, never, unknown, unknown, A>) => B
}
```

Added in v3.0.0

# utils

## foldMapComposition

Returns a default `foldMap` composition.

**Signature**

```ts
export declare const foldMapComposition: <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
) => <M>(
  Monoid: Monoid<M>
) => <A>(
  f: (a: A) => M
) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => M
```

Added in v3.0.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
using the specified separator.

**Signature**

```ts
export declare const intercalate: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <M>(Monoid: Monoid<M>) => (separator: M) => <S>(fm: Kind<F, S, never, unknown, unknown, M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/Foldable'
import { Monoid } from 'fp-ts/string'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
assert.strictEqual(pipe(tree, intercalate(T.Foldable)(Monoid)('|')), 'a|b|c|d')
```

Added in v3.0.0

## reduceComposition

Returns a default `reduce` composition.

**Signature**

```ts
export declare const reduceComposition: <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
) => <B, A>(
  b: B,
  f: (b: B, a: A) => B
) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B
```

Added in v3.0.0

## reduceKind

Similar to 'reduce', but the result is encapsulated in a `Flattenable`.

Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.

**Signature**

```ts
export declare const reduceKind: <F extends TypeLambda>(
  Foldable: Foldable<F>
) => <G extends TypeLambda>(
  Flattenable: Flattenable<G>
) => <S, R, O, E, B, A>(
  gb: Kind<G, S, R, O, E, B>,
  f: (b: B, a: A) => Kind<G, S, R, O, E, B>
) => <FS>(self: Kind<F, FS, never, unknown, unknown, A>) => Kind<G, S, R, O, E, B>
```

**Example**

```ts
import { reduceKind } from 'fp-ts/Foldable'
import { Flattenable, some } from 'fp-ts/Option'
import { make, Foldable } from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = make(1, [make(2), make(3), make(4)])
assert.deepStrictEqual(
  pipe(
    tree,
    reduceKind(Foldable)(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))
  ),
  some(7)
)
```

Added in v3.0.0

## reduceRightComposition

Returns a default `reduceRight` composition.

**Signature**

```ts
export declare const reduceRightComposition: <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
) => <B, A>(
  b: B,
  f: (a: A, b: B) => B
) => <FS, GS>(fga: Kind<F, FS, never, unknown, unknown, Kind<G, GS, never, unknown, unknown, A>>) => B
```

Added in v3.0.0
