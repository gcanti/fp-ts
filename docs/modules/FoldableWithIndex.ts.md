---
title: FoldableWithIndex.ts
nav_order: 34
parent: Modules
---

# Overview

A `Foldable` with an additional index.
A `FoldableWithIndex` instance must be compatible with its `Foldable` instance

```ts
reduce(fa, b, f) = reduceWithIndex(fa, b, (_, b, a) => f(b, a))
foldMap(M)(fa, f) = foldMapWithIndex(M)(fa, (_, a) => f(a))
reduceRight(fa, b, f) = reduceRightWithIndex(fa, b, (_, a, b) => f(a, b))
```

---

<h2 class="text-delta">Table of contents</h2>

- [FoldableWithIndex (interface)](#foldablewithindex-interface)
- [FoldableWithIndex1 (interface)](#foldablewithindex1-interface)
- [FoldableWithIndex2 (interface)](#foldablewithindex2-interface)
- [FoldableWithIndex2C (interface)](#foldablewithindex2c-interface)
- [FoldableWithIndex3 (interface)](#foldablewithindex3-interface)
- [FoldableWithIndexComposition (interface)](#foldablewithindexcomposition-interface)
- [FoldableWithIndexComposition11 (interface)](#foldablewithindexcomposition11-interface)
- [FoldableWithIndexComposition12 (interface)](#foldablewithindexcomposition12-interface)
- [FoldableWithIndexComposition12C (interface)](#foldablewithindexcomposition12c-interface)
- [FoldableWithIndexComposition21 (interface)](#foldablewithindexcomposition21-interface)
- [FoldableWithIndexComposition22 (interface)](#foldablewithindexcomposition22-interface)
- [FoldableWithIndexComposition22C (interface)](#foldablewithindexcomposition22c-interface)
- [FoldableWithIndexComposition2C1 (interface)](#foldablewithindexcomposition2c1-interface)
- [getFoldableWithIndexComposition (function)](#getfoldablewithindexcomposition-function)

---

# FoldableWithIndex (interface)

**Signature**

```ts
export interface FoldableWithIndex<F, I> extends Foldable<F> {
  readonly reduceWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: HKT<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: HKT<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndex1 (interface)

**Signature**

```ts
export interface FoldableWithIndex1<F extends URIS, I> extends Foldable1<F> {
  readonly reduceWithIndex: <A, B>(fa: Type<F, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Type<F, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Type<F, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndex2 (interface)

**Signature**

```ts
export interface FoldableWithIndex2<F extends URIS2, I> extends Foldable2<F> {
  readonly reduceWithIndex: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <L, A>(fa: Type2<F, L, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndex2C (interface)

**Signature**

```ts
export interface FoldableWithIndex2C<F extends URIS2, I, L> extends Foldable2C<F, L> {
  readonly reduceWithIndex: <A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fa: Type2<F, L, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fa: Type2<F, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndex3 (interface)

**Signature**

```ts
export interface FoldableWithIndex3<F extends URIS3, I> extends Foldable3<F> {
  readonly reduceWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <U, L, A>(fa: Type3<F, U, L, A>, f: (i: I, a: A) => M) => M
  readonly reduceRightWithIndex: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (i: I, a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition<F, FI, G, GI> extends FoldableComposition<F, G> {
  readonly reduceWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: HKT<F, HKT<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition11 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition11<F extends URIS, FI, G extends URIS, GI>
  extends FoldableComposition11<F, G> {
  readonly reduceWithIndex: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type<F, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition12 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition12<F extends URIS, FI, G extends URIS2, GI>
  extends FoldableComposition12<F, G> {
  readonly reduceWithIndex: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LG, A>(fga: Type<F, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <LG, A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition12C (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition12C<F extends URIS, FI, G extends URIS2, GI, LG>
  extends FoldableComposition12C<F, G, LG> {
  readonly reduceWithIndex: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type<F, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Type<F, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition21 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition21<F extends URIS2, FI, G extends URIS, GI>
  extends FoldableComposition21<F, G> {
  readonly reduceWithIndex: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, A>(fga: Type2<F, LF, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <LF, A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition22 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition22<F extends URIS2, FI, G extends URIS2, GI>
  extends FoldableComposition22<F, G> {
  readonly reduceWithIndex: <LF, LG, A, B>(
    fga: Type2<F, LF, Type2<G, LG, A>>,
    b: B,
    f: (i: [FI, GI], b: B, a: A) => B
  ) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, LG, A>(fga: Type2<F, LF, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <LF, LG, A, B>(
    fga: Type2<F, LF, Type2<G, LG, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition22C (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition22C<F extends URIS2, FI, G extends URIS2, GI, LG>
  extends FoldableComposition22C<F, G, LG> {
  readonly reduceWithIndex: <LF, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(
    M: Monoid<M>
  ) => <LF, A>(fga: Type2<F, LF, Type2<G, LG, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <LF, A, B>(
    fga: Type2<F, LF, Type2<G, LG, A>>,
    b: B,
    f: (i: [FI, GI], a: A, b: B) => B
  ) => B
}
```

Added in v2.0.0

# FoldableWithIndexComposition2C1 (interface)

**Signature**

```ts
export interface FoldableWithIndexComposition2C1<F extends URIS2, FI, G extends URIS, GI, LF>
  extends FoldableComposition2C1<F, G, LF> {
  readonly reduceWithIndex: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], b: B, a: A) => B) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(fga: Type2<F, LF, Type<G, A>>, f: (i: [FI, GI], a: A) => M) => M
  readonly reduceRightWithIndex: <A, B>(fga: Type2<F, LF, Type<G, A>>, b: B, f: (i: [FI, GI], a: A, b: B) => B) => B
}
```

Added in v2.0.0

# getFoldableWithIndexComposition (function)

**Signature**

```ts
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
): FoldableWithIndexComposition<F, FI, G, GI> { ... }
```

Added in v2.0.0
