---
title: Foldable.ts
nav_order: 34
parent: Modules
---

## Foldable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Foldable (interface)](#foldable-interface)
- [utils](#utils)
  - [empty](#empty)
  - [filterMap](#filtermap)
  - [foldMap](#foldmap)
  - [intercalate](#intercalate)
  - [map](#map)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [succeed](#succeed)
  - [toIterableComposition](#toiterablecomposition)

---

# model

## Foldable (interface)

**Signature**

```ts
export interface Foldable<F extends TypeLambda> extends TypeClass<F> {
  readonly toIterable: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Iterable<A>
}
```

Added in v3.0.0

# utils

## empty

**Signature**

```ts
export declare const empty: Iterable<never>
```

Added in v3.0.0

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (self: Iterable<A>) => Iterable<B>
```

Added in v3.0.0

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: Iterable<A>) => M
```

Added in v3.0.0

## intercalate

Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements
using the specified separator.

**Signature**

```ts
export declare const intercalate: <M>(Monoid: Monoid<M>) => (separator: M) => (self: Iterable<M>) => M
```

**Example**

```ts
import { intercalate } from 'fp-ts/Foldable'
import { Monoid } from 'fp-ts/string'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
assert.strictEqual(pipe(tree, T.toIterable, intercalate(Monoid)('|')), 'a|b|c|d')
```

Added in v3.0.0

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: Iterable<A>) => Iterable<B>
```

Added in v3.0.0

## reduce

**Signature**

```ts
export declare const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: Iterable<A>) => B
```

Added in v3.0.0

## reduceKind

Similar to 'reduce', but the result is encapsulated in a `Flattenable`.

Note: this function is not generally stack-safe, e.g., for type constructors which build up thunks a la `Sync`.

**Signature**

```ts
export declare const reduceKind: <F extends TypeLambda>(
  Flattenable: Flattenable<F>
) => <S, R, O, E, B, A>(
  fb: Kind<F, S, R, O, E, B>,
  f: (b: B, a: A) => Kind<F, S, R, O, E, B>
) => (self: Iterable<A>) => Kind<F, S, R, O, E, B>
```

**Example**

```ts
import { reduceKind } from 'fp-ts/Foldable'
import { Flattenable, some } from 'fp-ts/Option'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = T.make(1, [T.make(2), T.make(3), T.make(4)])
assert.deepStrictEqual(
  pipe(
    tree,
    T.toIterable,
    reduceKind(Flattenable)(some(0), (b, a) => (a > 2 ? some(b + a) : some(b)))
  ),
  some(7)
)
```

Added in v3.0.0

## reduceRight

**Signature**

```ts
export declare const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (self: Iterable<A>) => B
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <A>(a: A) => Iterable<A>
```

Added in v3.0.0

## toIterableComposition

Returns a default `toIterable` composition.

**Signature**

```ts
export declare const toIterableComposition: <F extends TypeLambda, G extends TypeLambda>(
  FoldableF: Foldable<F>,
  FoldableG: Foldable<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>) => Iterable<A>
```

Added in v3.0.0
