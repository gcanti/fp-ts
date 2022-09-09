---
title: Witherable.ts
nav_order: 109
parent: Modules
---

## Witherable overview

`Witherable` represents data structures which can be _partitioned_ with effects in some `Applicative` functor.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [FilterE1 (interface)](#filtere1-interface)
- [defaults](#defaults)
  - [wiltDefault](#wiltdefault)
  - [witherDefault](#witherdefault)
- [type classes](#type-classes)
  - [Witherable (interface)](#witherable-interface)
  - [Witherable1 (interface)](#witherable1-interface)
  - [Witherable2 (interface)](#witherable2-interface)
  - [Witherable2C (interface)](#witherable2c-interface)
  - [Witherable3 (interface)](#witherable3-interface)
- [utils](#utils)
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
  - [filterE](#filtere)

---

# combinators

## FilterE1 (interface)

**Signature**

```ts
export interface FilterE1<G extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E>(
    predicate: (a: A) => Kind3<F, R, E, boolean>
  ) => (ga: Kind<G, A>) => Kind3<F, R, E, Kind<G, A>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R>(
    predicate: (a: A) => Kind3<F, R, E, boolean>
  ) => (ga: Kind<G, A>) => Kind3<F, R, E, Kind<G, A>>
  <F extends URIS2>(F: Applicative2<F>): <A, E>(
    predicate: (a: A) => Kind2<F, E, boolean>
  ) => (ga: Kind<G, A>) => Kind2<F, E, Kind<G, A>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A>(
    predicate: (a: A) => Kind2<F, E, boolean>
  ) => (ga: Kind<G, A>) => Kind2<F, E, Kind<G, A>>
  <F extends URIS>(F: Applicative1<F>): <A>(
    predicate: (a: A) => Kind<F, boolean>
  ) => (ga: Kind<G, A>) => Kind<F, Kind<G, A>>
  <F>(F: Applicative<F>): <A>(predicate: (a: A) => HKT<F, boolean>) => (ga: Kind<G, A>) => HKT<F, Kind<G, A>>
}
```

Added in v3.0.0

# defaults

## wiltDefault

Return a `wilt` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function wiltDefault<W extends URIS2, E>(
  T: Traversable2C<W, E>,
  C: Compactable2C<W, E>
): Witherable2C<W, E>['wilt']
export declare function wiltDefault<W extends URIS>(T: Traversable1<W>, C: Compactable1<W>): Witherable1<W>['wilt']
export declare function wiltDefault<W>(T: Traversable<W>, C: Compactable<W>): Witherable<W>['wilt']
```

Added in v3.0.0

## witherDefault

Return a `wither` implementation from `Traversable` and `Compactable`.

**Signature**

```ts
export declare function witherDefault<W extends URIS2, E>(
  T: Traversable2C<W, E>,
  C: Compactable2C<W, E>
): Witherable2C<W, E>['wither']
export declare function witherDefault<W extends URIS>(T: Traversable1<W>, C: Compactable1<W>): Witherable1<W>['wither']
export declare function witherDefault<W>(T: Traversable<W>, C: Compactable<W>): Witherable<W>['wither']
```

Added in v3.0.0

# type classes

## Witherable (interface)

**Signature**

```ts
export interface Witherable<T> {
  readonly URI?: T
  readonly wilt: Wilt<T>
  readonly wither: Wither<T>
}
```

Added in v3.0.0

## Witherable1 (interface)

**Signature**

```ts
export interface Witherable1<T extends URIS> {
  readonly URI?: T
  readonly wilt: Wilt1<T>
  readonly wither: Wither1<T>
}
```

Added in v3.0.0

## Witherable2 (interface)

**Signature**

```ts
export interface Witherable2<T extends URIS2> {
  readonly URI?: T
  readonly wilt: Wilt2<T>
  readonly wither: Wither2<T>
}
```

Added in v3.0.0

## Witherable2C (interface)

**Signature**

```ts
export interface Witherable2C<T extends URIS2, E> {
  readonly URI?: T
  readonly _E?: E
  readonly wilt: Wilt2C<T, E>
  readonly wither: Wither2C<T, E>
}
```

Added in v3.0.0

## Witherable3 (interface)

**Signature**

```ts
export interface Witherable3<T extends URIS3> {
  readonly URI?: T
  readonly wilt: Wilt3<T>
  readonly wither: Wither3<T>
}
```

Added in v3.0.0

# utils

## Wilt (interface)

**Signature**

```ts
export interface Wilt<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind3<F, R, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind2<F, E, Separated<HKT<W, B>, HKT<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => Kind<F, Separated<HKT<W, B>, HKT<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: HKT<W, A>) => HKT<F, Separated<HKT<W, B>, HKT<W, C>>>
}
```

Added in v3.0.0

## Wilt1 (interface)

**Signature**

```ts
export interface Wilt1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B, C>(
    f: (a: A) => Kind3<F, R, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind3<F, R, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B, C>(
    f: (a: A) => Kind2<F, E, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind2<F, E, Separated<Kind<W, B>, Kind<W, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => Kind<F, Separated<Kind<W, B>, Kind<W, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: Kind<W, A>) => HKT<F, Separated<Kind<W, B>, Kind<W, C>>>
}
```

Added in v3.0.0

## Wilt2 (interface)

**Signature**

```ts
export interface Wilt2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind3<F, R, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind2<F, FE, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => Kind<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <WE>(wa: Kind2<W, WE, A>) => HKT<F, Separated<Kind2<W, WE, B>, Kind2<W, WE, C>>>
}
```

Added in v3.0.0

## Wilt2C (interface)

**Signature**

```ts
export interface Wilt2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B, C>(
    f: (a: A) => Kind3<F, R, FE, Either<B, C>>
  ) => (wa: Kind2<W, E, A>) => Kind3<F, R, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (wa: Kind2<W, E, A>) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => (wa: Kind2<W, E, A>) => Kind2<F, FE, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => (wa: Kind2<W, E, A>) => Kind<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => (wa: Kind2<W, E, A>) => HKT<F, Separated<Kind2<W, E, B>, Kind2<W, E, C>>>
}
```

Added in v3.0.0

## Wilt3 (interface)

**Signature**

```ts
export interface Wilt3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B, C>(
    f: (a: A) => Kind3<F, FR, FE, Either<B, C>>
  ) => <WR, WE>(wa: Kind3<W, WR, WE, A>) => Kind3<F, FR, FE, Separated<Kind3<W, WR, WE, B>, Kind3<W, WR, WE, C>>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <R, WE>(wa: Kind3<W, R, WE, A>) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B, C>(
    f: (a: A) => Kind2<F, FE, Either<B, C>>
  ) => <R, WE>(wa: Kind3<W, R, WE, A>) => Kind2<F, FE, Separated<Kind3<W, R, WE, B>, Kind3<W, R, WE, C>>>
  <F extends URIS>(F: Applicative1<F>): <A, B, C>(
    f: (a: A) => Kind<F, Either<B, C>>
  ) => <R, E>(wa: Kind3<W, R, E, A>) => Kind<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
  <F>(F: Applicative<F>): <A, B, C>(
    f: (a: A) => HKT<F, Either<B, C>>
  ) => <R, E>(wa: Kind3<W, R, E, A>) => HKT<F, Separated<Kind3<W, R, E, B>, Kind3<W, R, E, C>>>
}
```

Added in v3.0.0

## Wither (interface)

**Signature**

```ts
export interface Wither<W> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind3<F, R, E, HKT<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: HKT<W, A>) => Kind2<F, E, HKT<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, Option<B>>) => (ta: HKT<W, A>) => Kind<F, HKT<W, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: HKT<W, A>) => HKT<F, HKT<W, B>>
}
```

Added in v3.0.0

## Wither1 (interface)

**Signature**

```ts
export interface Wither1<W extends URIS> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind3<F, R, E, Kind<W, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, Option<B>>
  ) => (ta: Kind<W, A>) => Kind2<F, E, Kind<W, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind<W, A>) => Kind<F, Kind<W, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind<W, A>) => HKT<F, Kind<W, B>>
}
```

Added in v3.0.0

## Wither2 (interface)

**Signature**

```ts
export interface Wither2<W extends URIS2> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind3<F, R, FE, Kind2<W, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind2<F, FE, Kind2<W, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <WE>(ta: Kind2<W, WE, A>) => Kind<F, Kind2<W, WE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => <WE>(ta: Kind2<W, WE, A>) => HKT<F, Kind2<W, WE, B>>
}
```

Added in v3.0.0

## Wither2C (interface)

**Signature**

```ts
export interface Wither2C<W extends URIS2, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, Option<B>>
  ) => (ta: Kind2<W, E, A>) => Kind3<F, R, FE, Kind2<W, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, E, A>) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => (ta: Kind2<W, E, A>) => Kind2<F, FE, Kind2<W, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => (ta: Kind2<W, E, A>) => Kind<F, Kind2<W, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, Option<B>>) => (ta: Kind2<W, E, A>) => HKT<F, Kind2<W, E, B>>
}
```

Added in v3.0.0

## Wither3 (interface)

**Signature**

```ts
export interface Wither3<W extends URIS3> {
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind3<F, FR, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <WR, WE>(ta: Kind3<W, WR, WE, A>) => Kind2<F, FE, Kind3<W, WR, WE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, Option<B>>
  ) => <R, WE>(ta: Kind3<W, R, WE, A>) => Kind2<F, FE, Kind3<W, R, WE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, Option<B>>
  ) => <R, WE>(ta: Kind3<W, R, WE, A>) => Kind<F, Kind3<W, R, WE, B>>
  <F>(F: Applicative<F>): <A, B>(
    f: (a: A) => HKT<F, Option<B>>
  ) => <R, WE>(ta: Kind3<W, R, WE, A>) => HKT<F, Kind3<W, R, WE, B>>
}
```

Added in v3.0.0

## filterE

Filter values inside a `F` context.

See `ReadonlyArray`'s `filterE` for an example of usage.

**Signature**

```ts
export declare function filterE<G extends URIS>(W: Witherable1<G>): FilterE1<G>
export declare function filterE<G>(
  W: Witherable<G>
): <F>(F: Applicative<F>) => <A>(predicate: (a: A) => HKT<F, boolean>) => (ga: HKT<G, A>) => HKT<F, HKT<G, A>>
```

Added in v3.0.0
