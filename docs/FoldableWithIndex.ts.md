---
title: FoldableWithIndex.ts
nav_order: 33
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [FoldableWithIndex](#foldablewithindex)
- [FoldableWithIndex1](#foldablewithindex1)
- [FoldableWithIndex2](#foldablewithindex2)
- [FoldableWithIndex2C](#foldablewithindex2c)
- [FoldableWithIndex3](#foldablewithindex3)
- [FoldableWithIndex3C](#foldablewithindex3c)
- [FoldableWithIndexComposition](#foldablewithindexcomposition)
- [FoldableWithIndexComposition11](#foldablewithindexcomposition11)
- [FoldableWithIndexComposition12](#foldablewithindexcomposition12)
- [FoldableWithIndexComposition12C](#foldablewithindexcomposition12c)
- [FoldableWithIndexComposition21](#foldablewithindexcomposition21)
- [FoldableWithIndexComposition22](#foldablewithindexcomposition22)
- [FoldableWithIndexComposition22C](#foldablewithindexcomposition22c)
- [FoldableWithIndexComposition2C1](#foldablewithindexcomposition2c1)
- [FoldableWithIndexComposition3C1](#foldablewithindexcomposition3c1)
- [getFoldableWithIndexComposition](#getfoldablewithindexcomposition)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# FoldableWithIndex

A `Foldable` with an additional index.
A `FoldableWithIndex` instance must be compatible with its `Foldable` instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
foldr(fa, b, f) = foldrWithIndex(fa, b, (_, a, b) => f(a, b))
```

**Signature** (interface)

```ts
export interface FoldableWithIndex<F, I> extends Foldable2v<F> {
  readonly reduceWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v1.12.0

# FoldableWithIndex1

**Signature** (interface)

```ts
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable2v1<F> {
  readonly reduceWithIndex: <A, B>(fa: Type<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Type<F, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fa: Type<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

# FoldableWithIndex2

**Signature** (interface)

```ts
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2v2<F> {
  readonly reduceWithIndex: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <L, A>(fa: Type2<F, L, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

# FoldableWithIndex2C

**Signature** (interface)

```ts
export interface FoldableWithIndex2C<F extends URIS2, I, L> extends Foldable2v2C<F, L> {
  readonly reduceWithIndex: <A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Type2<F, L, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

# FoldableWithIndex3

**Signature** (interface)

```ts
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable2v3<F> {
  readonly reduceWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <U, L, A>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

# FoldableWithIndex3C

**Signature** (interface)

```ts
export interface FoldableWithIndex3C<F extends URIS3, I, U, L> extends Foldable2v3C<F, U, L> {
  readonly reduceWithIndex: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition<F, FI, G, GI> extends Foldable2vComposition<F, G> {
  readonly reduceWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: HKT<F, HKT<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition11

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition11<F extends URIS, FI, G extends URIS, GI>
  extends Foldable2vComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type<F, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition12

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition12<F extends URIS, FI, G extends URIS2, GI>
  extends Foldable2vComposition12<F, G> {
  readonly reduceWithIndex: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LG, A>(fga: Type<F, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition12C

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition12C<F extends URIS, FI, G extends URIS2, GI, LG>
  extends Foldable2vComposition12C<F, G, LG> {
  readonly reduceWithIndex: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type<F, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition21

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition21<F extends URIS2, FI, G extends URIS, GI>
  extends Foldable2vComposition21<F, G> {
  readonly reduceWithIndex: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, A>(fga: Type2<F, LF, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition22

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition22<F extends URIS2, FI, G extends URIS2, GI>
  extends Foldable2vComposition22<F, G> {
  readonly reduceWithIndex: <LF, LG, A, B>(
    fga: Type2<F, LF, Type2<G, LG, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, LG, A>(fga: Type2<F, LF, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <LF, LG, A, B>(
    fga: Type2<F, LF, Type2<G, LG, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

# FoldableWithIndexComposition22C

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition22C<F extends URIS2, FI, G extends URIS2, GI, LG>
  extends Foldable2vComposition22C<F, G, LG> {
  readonly reduceWithIndex: <LF, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, A>(fga: Type2<F, LF, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <LF, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition2C1

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition2C1<F extends URIS2, FI, G extends URIS, GI, LF>
  extends Foldable2vComposition2C1<F, G, LF> {
  readonly reduceWithIndex: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type2<F, LF, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# FoldableWithIndexComposition3C1

**Signature** (interface)

```ts
export interface FoldableWithIndexComposition3C1<F extends URIS3, FI, G extends URIS, GI, UF, LF>
  extends Foldable2vComposition3C1<F, G, UF, LF> {
  readonly reduceWithIndex: <A, B>(fga: Type3<F, UF, LF, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <A>(fga: Type3<F, UF, LF, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly foldrWithIndex: <A, B>(fga: Type3<F, UF, LF, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

# getFoldableWithIndexComposition

**Signature** (function)

```ts
export function getFoldableWithIndexComposition<F extends URIS3, FI, G extends URIS, GI, UF, LF>(
  F: FoldableWithIndex3C<F, FI, UF, LF>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition3C1<F, FI, G, GI, UF, LF>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI, LG>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2C<G, GI, LG>
): FoldableWithIndexComposition22C<F, FI, G, GI, LG>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS2, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition22<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI, LF>(
  F: FoldableWithIndex2C<F, FI, LF>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition2C1<F, FI, G, GI, LF>
export function getFoldableWithIndexComposition<F extends URIS2, FI, G extends URIS, GI>(
  F: FoldableWithIndex2<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition21<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS2, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex2<G, GI>
): FoldableWithIndexComposition12<F, FI, G, GI>
export function getFoldableWithIndexComposition<F extends URIS, FI, G extends URIS, GI>(
  F: FoldableWithIndex1<F, FI>,
  G: FoldableWithIndex1<G, GI>
): FoldableWithIndexComposition11<F, FI, G, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI>
export function getFoldableWithIndexComposition<F, FI, G, GI>(
  F: FoldableWithIndex<F, FI>,
  G: FoldableWithIndex<G, GI>
): FoldableWithIndexComposition<F, FI, G, GI> { ... }
```

Added in v1.12.0
