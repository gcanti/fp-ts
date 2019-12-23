---
title: Witherable.ts
nav_order: 93
parent: Modules
---

# Witherable overview

`Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

`wilt` signature (see `Compactable` `Separated`):

```ts
<F>(F: Applicative<F>) => <A, B, C>(wa: HKT<W, A>, f: (a: A) => HKT<F, Either<B, C>>) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
```

`wither` signature:

```ts
<F>(F: Applicative<F>) => <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
```

Adapted from https://github.com/LiamGoodacre/purescript-filterable/blob/master/src/Data/Witherable.purs

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Wilt (interface)](#wilt-interface)
- [Wilt1 (interface)](#wilt1-interface)
- [Wilt2 (interface)](#wilt2-interface)
- [Wilt2C (interface)](#wilt2c-interface)
- [Wilt3 (interface)](#wilt3-interface)
- [Wither (interface)](#wither-interface)
- [Wither1 (interface)](#wither1-interface)
- [Wither2 (interface)](#wither2-interface)
- [Wither2C (interface)](#wither2c-interface)
- [Wither3 (interface)](#wither3-interface)
- [Witherable (interface)](#witherable-interface)
- [Witherable1 (interface)](#witherable1-interface)
- [Witherable2 (interface)](#witherable2-interface)
- [Witherable2C (interface)](#witherable2c-interface)
- [Witherable3 (interface)](#witherable3-interface)

---

# Wilt (interface)

**Signature**

```ts
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<HKT<W, B>, HKT<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: HKT<W, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
}
```

Added in v2.0.0

# Wilt1 (interface)

**Signature**

```ts
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind<W, B>, Kind<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: Kind<W, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind<W, B>, Kind<W, C>>>
}
```

Added in v2.0.0

# Wilt2 (interface)

**Signature**

```ts
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WE, A, R, FE, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <WE, A, FE, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <WE, A, B, C>(
    wa: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F>(F: Applicative<F>): <E, A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
}
```

Added in v2.0.0

# Wilt2C (interface)

**Signature**

```ts
export interface Wilt2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => Kind3<F, R, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    wa: Kind2<W, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
}
```

Added in v2.0.0

# Wilt3 (interface)

**Signature**

```ts
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WR, WE, A, FR, FE, B, C>(
    wa: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind3<F, FR, FE, Either<B, C>>
  ) => Kind3<F, FR, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <R, WE, A, FE, B, C>(
    wa: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, WE, A, B, C>(
    wa: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B, C>(
    wa: Kind3<W, R, E, A>,
    f: (a: A) => Kind<F, Either<B, C>>
  ) => Kind<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
  <F>(F: Applicative<F>): <R, E, A, B, C>(
    wa: Kind3<W, R, E, A>,
    f: (a: A) => HKT<F, Either<B, C>>
  ) => HKT<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
}
```

Added in v2.0.0

# Wither (interface)

**Signature**

```ts
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, HKT<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: HKT<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => Kind<F, Option<B>>) => Kind<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: HKT<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, HKT<W, B>>
}
```

Added in v2.0.0

# Wither1 (interface)

**Signature**

```ts
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, Kind<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    ta: Kind<W, A>,
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => Kind2<F, E, Kind<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(ta: Kind<W, A>, f: (a: A) => Kind<F, Option<B>>) => Kind<F, Kind<W, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind<W, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Kind<W, B>>
}
```

Added in v2.0.0

# Wither2 (interface)

**Signature**

```ts
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <WE, A, R, FE, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <WE, A, FE, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <WE, A, B>(
    ta: Kind2<W, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <E, A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind2<W, E, B>>
  <F>(F: Applicative<F>): <E, A, B>(ta: Kind2<W, E, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Kind2<W, E, B>>
}
```

Added in v2.0.0

# Wither2C (interface)

**Signature**

```ts
export interface Wither2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => Kind3<F, R, FE, Kind2<W, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    ta: Kind2<W, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind2<W, E, B>>
  <F>(F: Applicative<F>): <A, B>(ta: Kind2<W, E, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Kind2<W, E, B>>
}
```

Added in v2.0.0

# Wither3 (interface)

**Signature**

```ts
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <WR, WE, A, FR, FE, B>(
    ta: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind3<F, FR, FE, Option<B>>
  ) => Kind3<F, FR, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <WR, WE, A, FE, B>(
    ta: Kind3<W, WR, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <R, WE, A, B>(
    ta: Kind3<W, R, WE, A>,
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => Kind2<F, FE, Kind3<W, R, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <R, E, A, B>(
    ta: Kind3<W, R, E, A>,
    f: (a: A) => Kind<F, Option<B>>
  ) => Kind<F, Kind3<W, R, E, B>>
  <F>(F: Applicative<F>): <R, E, A, B>(
    ta: Kind3<W, R, E, A>,
    f: (a: A) => HKT<F, Option<B>>
  ) => HKT<F, Kind3<W, R, E, B>>
}
```

Added in v2.0.0

# Witherable (interface)

**Signature**

```ts
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  wither: Wither<T>
}
```

Added in v2.0.0

# Witherable1 (interface)

**Signature**

```ts
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt: Wilt1<T>
  wither: Wither1<T>
}
```

Added in v2.0.0

# Witherable2 (interface)

**Signature**

```ts
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt: Wilt2<T>
  wither: Wither2<T>
}
```

Added in v2.0.0

# Witherable2C (interface)

**Signature**

```ts
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt: Wilt2C<T, TL>
  wither: Wither2C<T, TL>
}
```

Added in v2.0.0

# Witherable3 (interface)

**Signature**

```ts
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt: Wilt3<T>
  wither: Wither3<T>
}
```

Added in v2.0.0
