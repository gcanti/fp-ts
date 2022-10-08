---
title: Iterable.ts
nav_order: 55
parent: Modules
---

## Iterable overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [of](#of)
- [filtering](#filtering)
  - [filterMap](#filtermap)
- [folding](#folding)
  - [foldMap](#foldmap)
  - [foldMapWithIndex](#foldmapwithindex)
  - [reduce](#reduce)
  - [reduceKind](#reducekind)
  - [reduceRight](#reduceright)
  - [reduceRightWithIndex](#reducerightwithindex)
  - [reduceWithIndex](#reducewithindex)
- [mapping](#mapping)
  - [map](#map)
- [traversing](#traversing)
  - [traverse](#traverse)
  - [traverseWithIndex](#traversewithindex)
- [utils](#utils)
  - [append](#append)
  - [empty](#empty)
  - [intercalate](#intercalate)
  - [toEntries](#toentries)
  - [uniq](#uniq)

---

# constructors

## of

**Signature**

```ts
export declare const of: <A>(a: A) => Iterable<A>
```

Added in v3.0.0

# filtering

## filterMap

**Signature**

```ts
export declare const filterMap: <A, B>(f: (a: A) => Option<B>) => (self: Iterable<A>) => Iterable<B>
```

Added in v3.0.0

# folding

## foldMap

**Signature**

```ts
export declare const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: Iterable<A>) => M
```

Added in v3.0.0

## foldMapWithIndex

**Signature**

```ts
export declare const foldMapWithIndex: <M>(
  Monoid: Monoid<M>
) => <I, A>(f: (i: I, a: A) => M) => (self: Iterable<readonly [I, A]>) => M
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
import { reduceKind } from 'fp-ts/Iterable'
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

## reduceRightWithIndex

**Signature**

```ts
export declare const reduceRightWithIndex: <B, I, A>(
  b: B,
  f: (i: I, a: A, b: B) => B
) => (self: Iterable<readonly [I, A]>) => B
```

Added in v3.0.0

## reduceWithIndex

**Signature**

```ts
export declare const reduceWithIndex: <B, I, A>(
  b: B,
  f: (i: I, b: B, a: A) => B
) => (self: Iterable<readonly [I, A]>) => B
```

Added in v3.0.0

# mapping

## map

**Signature**

```ts
export declare const map: <A, B>(f: (a: A) => B) => (self: Iterable<A>) => Iterable<B>
```

Added in v3.0.0

# traversing

## traverse

**Signature**

```ts
export declare const traverse: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <A, S, R, O, E, B>(f: (a: A) => Kind<F, S, R, O, E, B>) => (self: Iterable<A>) => Kind<F, S, R, O, E, Iterable<B>>
```

Added in v3.0.0

## traverseWithIndex

**Signature**

```ts
export declare const traverseWithIndex: <F extends TypeLambda>(
  Applicative: applicative.Applicative<F>
) => <I, A, S, R, O, E, B>(
  f: (i: I, a: A) => Kind<F, S, R, O, E, B>
) => (self: Iterable<readonly [I, A]>) => Kind<F, S, R, O, E, Iterable<B>>
```

Added in v3.0.0

# utils

## append

**Signature**

```ts
export declare const append: <B>(end: B) => <A>(self: Iterable<A>) => Iterable<B | A>
```

Added in v3.0.0

## empty

**Signature**

```ts
export declare const empty: Iterable<never>
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
import { intercalate } from 'fp-ts/Iterable'
import { Monoid } from 'fp-ts/string'
import * as T from 'fp-ts/Tree'
import { pipe } from 'fp-ts/Function'

const tree = T.make('a', [T.make('b'), T.make('c'), T.make('d')])
assert.strictEqual(pipe(tree, T.toIterable, intercalate(Monoid)('|')), 'a|b|c|d')
```

Added in v3.0.0

## toEntries

**Signature**

```ts
export declare const toEntries: <A>(self: Iterable<A>) => Iterable<readonly [number, A]>
```

Added in v3.0.0

## uniq

**Signature**

```ts
export declare const uniq: <A>(Eq: Eq<A>) => (iterable: Iterable<A>) => readonly A[]
```

Added in v3.0.0
