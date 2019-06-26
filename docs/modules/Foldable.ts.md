---
title: Foldable.ts
nav_order: 32
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [~~Foldable~~ (interface)](#foldable-interface)
- [~~Foldable1~~ (interface)](#foldable1-interface)
- [~~Foldable2~~ (interface)](#foldable2-interface)
- [~~Foldable2C~~ (interface)](#foldable2c-interface)
- [~~Foldable3~~ (interface)](#foldable3-interface)
- [~~Foldable3C~~ (interface)](#foldable3c-interface)
- [~~FoldableComposition~~ (interface)](#foldablecomposition-interface)
- [~~FoldableComposition11~~ (interface)](#foldablecomposition11-interface)
- [~~FoldableComposition12~~ (interface)](#foldablecomposition12-interface)
- [~~FoldableComposition12C~~ (interface)](#foldablecomposition12c-interface)
- [~~FoldableComposition21~~ (interface)](#foldablecomposition21-interface)
- [~~FoldableComposition22~~ (interface)](#foldablecomposition22-interface)
- [~~FoldableComposition22C~~ (interface)](#foldablecomposition22c-interface)
- [~~FoldableComposition2C1~~ (interface)](#foldablecomposition2c1-interface)
- [~~FoldableComposition3C1~~ (interface)](#foldablecomposition3c1-interface)
- [elem (function)](#elem-function)
- [~~find~~ (function)](#find-function)
- [~~fold~~ (function)](#fold-function)
- [~~foldM~~ (function)](#foldm-function)
- [~~foldMap~~ (function)](#foldmap-function)
- [~~foldr~~ (function)](#foldr-function)
- [~~getFoldableComposition~~ (function)](#getfoldablecomposition-function)
- [intercalate (function)](#intercalate-function)
- [~~maximum~~ (function)](#maximum-function)
- [~~minimum~~ (function)](#minimum-function)
- [~~oneOf~~ (function)](#oneof-function)
- [~~product~~ (function)](#product-function)
- [sequence\_ (function)](#sequence_-function)
- [~~sum~~ (function)](#sum-function)
- [toArray (function)](#toarray-function)
- [~~traverse~~ (function)](#traverse-function)
- [~~traverse\_~~ (function)](#traverse_-function)

---

# ~~Foldable~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable<F> {
  readonly URI: F
  readonly reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

Added in v1.0.0

# ~~Foldable1~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable1<F extends URIS> {
  readonly URI: F
  readonly reduce: <A, B>(fa: Kind<F, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~Foldable2~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable2<F extends URIS2> {
  readonly URI: F
  readonly reduce: <L, A, B>(fa: Kind2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~Foldable2C~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly reduce: <A, B>(fa: Kind2<F, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~Foldable3~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable3<F extends URIS3> {
  readonly URI: F
  readonly reduce: <U, L, A, B>(fa: Kind3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~Foldable3C~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface Foldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly reduce: <A, B>(fa: Kind3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition<F, G> {
  readonly reduce: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition11~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition11<F extends URIS, G extends URIS> {
  readonly reduce: <A, B>(fga: Kind<F, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition12~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
  readonly reduce: <LG, A, B>(fga: Kind<F, Kind2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition12C~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition12C<F extends URIS, G extends URIS2, LG> {
  readonly reduce: <A, B>(fga: Kind<F, Kind2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition21~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
  readonly reduce: <LF, A, B>(fga: Kind2<F, LF, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition22~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
  readonly reduce: <LF, LG, A, B>(fga: Kind2<F, LF, Kind2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition22C~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition22C<F extends URIS2, G extends URIS2, LG> {
  readonly reduce: <LF, A, B>(fga: Kind2<F, LF, Kind2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition2C1~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition2C1<F extends URIS2, G extends URIS, LF> {
  readonly reduce: <A, B>(fga: Kind2<F, LF, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# ~~FoldableComposition3C1~~ (interface)

Use `Foldable2v`

**Signature**

```ts
export interface FoldableComposition3C1<F extends URIS3, G extends URIS, UF, LF> {
  readonly reduce: <A, B>(fga: Kind3<F, UF, LF, Kind<G, A>>, b: B, f: (b: B, a: A) => B) => B
}
```

# elem (function)

Use `Foldable2v.elem`

**Signature**

```ts
export function elem<F extends URIS3, A>(F: Foldable3<F>, E: Eq<A>): <U, L>(a: A, fa: Kind3<F, U, L, A>) => boolean
export function elem<F extends URIS3, A, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>,
  E: Eq<A>
): (a: A, fa: Kind3<F, U, L, A>) => boolean
export function elem<F extends URIS2, A>(F: Foldable2<F>, E: Eq<A>): <L>(a: A, fa: Kind2<F, L, A>) => boolean
export function elem<F extends URIS2, A, L>(F: Foldable2C<F, L>, E: Eq<A>): (a: A, fa: Kind2<F, L, A>) => boolean
export function elem<F extends URIS, A>(F: Foldable1<F>, E: Eq<A>): (a: A, fa: Kind<F, A>) => boolean
export function elem<F, A>(F: Foldable<F>, E: Eq<A>): (a: A, fa: HKT<F, A>) => boolean { ... }
```

Added in v1.0.0

# ~~find~~ (function)

Try to find an element in a data structure which satisfies a predicate

**Signature**

```ts
export function find<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Kind3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS3, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>
): <A>(fa: Kind3<F, U, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Kind2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Kind2<F, L, A>, p: Predicate<A>) => Option<A>
export function find<F extends URIS>(F: Foldable1<F>): <A>(fa: Kind<F, A>, p: Predicate<A>) => Option<A>
export function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A> { ... }
```

Added in v1.0.0

# ~~fold~~ (function)

**Signature**

```ts
export function fold<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): <U, L>(fa: Kind3<F, U, L, M>) => M
export function fold<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): (fa: Kind3<F, U, L, M>) => M
export function fold<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): <L>(fa: Kind2<F, L, M>) => M
export function fold<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): (fa: Kind2<F, L, M>) => M
export function fold<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (fa: Kind<F, M>) => M
export function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M { ... }
```

Added in v1.0.0

# ~~foldM~~ (function)

Use `Foldable2v.foldM`

**Signature**

```ts
export function foldM<F extends URIS, M extends URIS3>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  M: Monad3<M>
): <U, L, A, B>(f: (b: B, a: A) => Kind3<M, U, L, B>, b: B, fa: Kind<F, A>) => Kind3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS3, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  M: Monad3C<M, U, L>
): <A, B>(f: (b: B, a: A) => Kind3<M, U, L, B>, b: B, fa: Kind<F, A>) => Kind3<M, U, L, B>
export function foldM<F extends URIS, M extends URIS2>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  M: Monad2<M>
): <L, A, B>(f: (b: B, a: A) => Kind2<M, L, B>, b: B, fa: Kind<F, A>) => Kind2<M, L, B>
export function foldM<F extends URIS, M extends URIS2, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  M: Monad2C<M, L>
): <A, B>(f: (b: B, a: A) => Kind2<M, L, B>, b: B, fa: Kind<F, A>) => Kind2<M, L, B>
export function foldM<F extends URIS, M extends URIS>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  M: Monad1<M>
): <A, B>(f: (b: B, a: A) => Kind<M, B>, b: B, fa: Kind<F, A>) => Kind<M, B>
export function foldM<F, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable<F>,
  M: Monad<M>
): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B> { ... }
```

Added in v1.0.0

# ~~foldMap~~ (function)

Use `Foldable2v.foldMap`

**Signature**

```ts
export function foldMap<F extends URIS3, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable3<F>,
  M: Monoid<M>
): <U, L, A>(fa: Kind3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS3, M, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): <A>(fa: Kind3<F, U, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable2<F>,
  M: Monoid<M>
): <L, A>(fa: Kind2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS2, M, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable2C<F, L>,
  M: Monoid<M>
): <A>(fa: Kind2<F, L, A>, f: (a: A) => M) => M
export function foldMap<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): <A>(fa: Kind<F, A>, f: (a: A) => M) => M
export function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M { ... }
```

Added in v1.0.0

# ~~foldr~~ (function)

Use `Foldable2v.foldr`

**Signature**

```ts
export function foldr<F extends URIS3>(
  // tslint:disable-next-line: deprecation
  F: Foldable3<F>
): <U, L, A, B>(fa: Kind3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS3, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>
): <A, B>(fa: Kind3<F, U, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2>(F: Foldable2<F>): <L, A, B>(fa: Kind2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS2, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable2C<F, L>
): <A, B>(fa: Kind2<F, L, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F extends URIS>(F: Foldable1<F>): <A, B>(fa: Kind<F, A>, b: B, f: (a: A, b: B) => B) => B
export function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A, b: B) => B) => B { ... }
```

Added in v1.0.0

# ~~getFoldableComposition~~ (function)

Use `Foldable2v.getFoldableComposition`

**Signature**

```ts
export function getFoldableComposition<F extends URIS3, G extends URIS, UF, LF>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, UF, LF>,
  // tslint:disable-next-line: deprecation
  G: Foldable1<G>
): // tslint:disable-next-line: deprecation
FoldableComposition3C1<F, G, UF, LF>
export function getFoldableComposition<F extends URIS2, G extends URIS2, LG>(
  // tslint:disable-next-line: deprecation
  F: Foldable2C<F, LG>,
  // tslint:disable-next-line: deprecation
  G: Foldable2<G>
): // tslint:disable-next-line: deprecation
FoldableComposition22C<F, G, LG>
export function getFoldableComposition<F extends URIS2, G extends URIS2>(
  // tslint:disable-next-line: deprecation
  F: Foldable2<F>,
  // tslint:disable-next-line: deprecation
  G: Foldable2<G>
): // tslint:disable-next-line: deprecation
FoldableComposition22<F, G>
export function getFoldableComposition<F extends URIS2, G extends URIS>(
  // tslint:disable-next-line: deprecation
  F: Foldable2<F>,
  // tslint:disable-next-line: deprecation
  G: Foldable1<G>
): // tslint:disable-next-line: deprecation
FoldableComposition21<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS2>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  // tslint:disable-next-line: deprecation
  G: Foldable2<G>
): // tslint:disable-next-line: deprecation
FoldableComposition12<F, G>
export function getFoldableComposition<F extends URIS, G extends URIS>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  // tslint:disable-next-line: deprecation
  G: Foldable1<G>
): // tslint:disable-next-line: deprecation
FoldableComposition11<F, G>
export function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G> { ... }
```

Added in v1.0.0

# intercalate (function)

Use `Foldable2v.intercalate`

**Signature**

```ts
export function intercalate<F extends URIS3, M>(
  // tslint:disable-next-line: deprecation
  F: Foldable3<F>,
  M: Monoid<M>
): (sep: M) => <U, L>(fm: Kind3<F, U, L, M>) => M
export function intercalate<F extends URIS3, M, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>,
  M: Monoid<M>
): (sep: M) => (fm: Kind3<F, U, L, M>) => M
export function intercalate<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): (sep: M) => <L>(fm: Kind2<F, L, M>) => M
export function intercalate<F extends URIS2, M, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable2C<F, L>,
  M: Monoid<M>
): (sep: M) => (fm: Kind2<F, L, M>) => M
export function intercalate<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (sep: M) => (fm: Kind<F, M>) => M
export function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M { ... }
```

Added in v1.0.0

# ~~maximum~~ (function)

Find the largest element of a structure, according to its `Ord` instance

**Signature**

```ts
export function maximum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Kind3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS3, A, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Kind3<F, U, L, A>) => Option<A>
export function maximum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Kind2<F, L, A>) => Option<A>
export function maximum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Kind2<F, L, A>) => Option<A>
export function maximum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Kind<F, A>) => Option<A>
export function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> { ... }
```

Added in v1.0.0

# ~~minimum~~ (function)

Find the smallest element of a structure, according to its `Ord` instance

**Signature**

```ts
export function minimum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Kind3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS3, A, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable3C<F, U, L>,
  O: Ord<A>
): (fa: Kind3<F, U, L, A>) => Option<A>
export function minimum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Kind2<F, L, A>) => Option<A>
export function minimum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Kind2<F, L, A>) => Option<A>
export function minimum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Kind<F, A>) => Option<A>
export function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A> { ... }
```

Added in v1.0.0

# ~~oneOf~~ (function)

Combines a collection of elements using the `Alt` operation

**Signature**

```ts
export function oneOf<F extends URIS, P extends URIS3>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  P: Plus3<P>
): <U, L, A>(fga: Kind<F, Kind3<P, U, L, A>>) => Kind3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS3, U, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  P: Plus3C<P, U, L>
): <A>(fga: Kind<F, Kind3<P, U, L, A>>) => Kind3<P, U, L, A>
export function oneOf<F extends URIS, P extends URIS2>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  P: Plus2<P>
): <L, A>(fga: Kind<F, Kind2<P, L, A>>) => Kind2<P, L, A>
export function oneOf<F extends URIS, P extends URIS2, L>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  P: Plus2C<P, L>
): <A>(fga: Kind<F, Kind2<P, L, A>>) => Kind2<P, L, A>
export function oneOf<F extends URIS, P extends URIS>(
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>,
  P: Plus1<P>
): <A>(fga: Kind<F, Kind<P, A>>) => Kind<P, A>
export function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A> { ... }
```

Added in v1.0.0

# ~~product~~ (function)

Find the product of the numeric values in a data structure

**Signature**

```ts
export function product<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Kind3<F, U, L, A>) => A
export function product<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Kind3<F, U, L, A>) => A
export function product<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Kind2<F, L, A>) => A
export function product<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Kind2<F, L, A>) => A
export function product<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Kind<F, A>) => A
export function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A { ... }
```

Added in v1.0.0

# sequence\_ (function)

Use `Foldable2v.sequence_`

**Signature**

```ts
export function sequence_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <U, L, A>(fa: Kind<F, Kind3<M, U, L, A>>) => Kind3<M, U, L, void>
export function sequence_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A>(fa: Kind<F, Kind3<M, U, L, A>>) => Kind3<M, U, L, void>
export function sequence_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <L, A>(fa: Kind<F, Kind2<M, L, A>>) => Kind2<M, L, void>
export function sequence_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A>(fa: Kind<F, Kind2<M, L, A>>) => Kind2<M, L, void>
export function sequence_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A>(fa: Kind<F, Kind<M, A>>) => Kind<M, void>
export function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void> { ... }
```

Added in v1.0.0

# ~~sum~~ (function)

Find the sum of the numeric values in a data structure

**Signature**

```ts
export function sum<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Kind3<F, U, L, A>) => A
export function sum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Kind3<F, U, L, A>) => A
export function sum<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Kind2<F, L, A>) => A
export function sum<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Kind2<F, L, A>) => A
export function sum<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Kind<F, A>) => A
export function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A { ... }
```

Added in v1.0.0

# toArray (function)

Use `Foldable2v`'s `toArray`

**Signature**

```ts
export function toArray<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Kind3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A>(fa: Kind3<F, U, L, A>) => Array<A>
export function toArray<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Kind2<F, L, A>) => Array<A>
export function toArray<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Kind2<F, L, A>) => Array<A>
export function toArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Kind<F, A>) => Array<A>
export function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A> { ... }
```

Added in v1.0.0

# ~~traverse~~ (function)

Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the
final result.

**Signature**

```ts
export function traverse<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <U, L, A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, void>
export function traverse<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind3<M, U, L, B>) => Kind3<M, U, L, void>
export function traverse<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <L, A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, void>
export function traverse<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind2<M, L, B>) => Kind2<M, L, void>
export function traverse<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<M, B>) => Kind<M, void>
export function traverse<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<M, B>) => HKT<M, void> { ... }
```

Added in v1.7.0

# ~~traverse\_~~ (function)

Use `Foldable2v.traverse_`

**Signature**

```ts
export function traverse_<M extends URIS3, F extends URIS>(
  M: Applicative3<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <U, L, A, B>(f: (a: A) => Kind3<M, U, L, B>, fa: Kind<F, A>) => Kind3<M, U, L, void>
export function traverse_<M extends URIS3, F extends URIS, U, L>(
  M: Applicative3C<M, U, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(f: (a: A) => Kind3<M, U, L, B>, fa: Kind<F, A>) => Kind3<M, U, L, void>
export function traverse_<M extends URIS2, F extends URIS>(
  M: Applicative2<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <L, A, B>(f: (a: A) => Kind2<M, L, B>, fa: Kind<F, A>) => Kind2<M, L, void>
export function traverse_<M extends URIS2, F extends URIS, L>(
  M: Applicative2C<M, L>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(f: (a: A) => Kind2<M, L, B>, fa: Kind<F, A>) => Kind2<M, L, void>
export function traverse_<M extends URIS, F extends URIS>(
  M: Applicative1<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable1<F>
): <A, B>(f: (a: A) => Kind<M, B>, fa: Kind<F, A>) => Kind<M, void>
export function traverse_<M, F>(
  M: Applicative<M>,
  // tslint:disable-next-line: deprecation
  F: Foldable<F>
): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void> { ... }
```

Added in v1.0.0
