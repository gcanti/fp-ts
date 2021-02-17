---
title: Compactable.ts
nav_order: 18
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_separated_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [compact](#compact)
  - [separate](#separate)
- [defaults](#defaults)
  - [compactDefault](#compactdefault)
  - [separateDefault](#separatedefault)
- [type classes](#type-classes)
  - [Compactable (interface)](#compactable-interface)
  - [Compactable1 (interface)](#compactable1-interface)
  - [Compactable2 (interface)](#compactable2-interface)
  - [Compactable2C (interface)](#compactable2c-interface)
  - [Compactable3 (interface)](#compactable3-interface)
  - [Compactable3C (interface)](#compactable3c-interface)
  - [Compactable4 (interface)](#compactable4-interface)

---

# combinators

## compact

`compact` composition.

**Signature**

```ts
export declare function compact<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  G: Compactable2C<G, E>
): <FE, A>(fgoa: Kind2<F, FE, Kind2<G, E, Option<A>>>) => Kind2<F, FE, Kind2<G, E, A>>
export declare function compact<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  G: Compactable2C<G, E>
): <A>(fgoa: Kind<F, Kind2<G, E, Option<A>>>) => Kind<F, Kind2<G, E, A>>
export declare function compact<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  G: Compactable1<G>
): <A>(fgoa: Kind<F, Kind<G, Option<A>>>) => Kind<F, Kind<G, A>>
export declare function compact<F, G>(
  F: Functor<F>,
  G: Compactable<G>
): <A>(fa: HKT<F, HKT<G, Option<A>>>) => HKT<F, HKT<G, A>>
```

Added in v3.0.0

## separate

`separate` composition.

**Signature**

```ts
export declare function separate<F extends URIS2, G extends URIS2, E>(
  F: Functor2<F>,
  C: Compactable2C<G, E>,
  G: Functor2<G>
): <FE, A, B>(
  fge: Kind2<F, FE, Kind2<G, E, Either<A, B>>>
) => Separated<Kind2<F, FE, Kind2<G, E, A>>, Kind2<F, FE, Kind2<G, E, B>>>
export declare function separate<F extends URIS, G extends URIS2, E>(
  F: Functor1<F>,
  C: Compactable2C<G, E>,
  G: Functor2<G>
): <A, B>(fge: Kind<F, Kind2<G, E, Either<A, B>>>) => Separated<Kind<F, Kind2<G, E, A>>, Kind<F, Kind2<G, E, B>>>
export declare function separate<F extends URIS, G extends URIS>(
  F: Functor1<F>,
  C: Compactable1<G>,
  G: Functor1<G>
): <A, B>(fge: Kind<F, Kind<G, Either<A, B>>>) => Separated<Kind<F, Kind<G, A>>, Kind<F, Kind<G, B>>>
export declare function separate<F, G>(
  F: Functor<F>,
  C: Compactable<G>,
  G: Functor<G>
): <A, B>(fge: HKT<F, HKT<G, Either<A, B>>>) => Separated<HKT<F, HKT<G, A>>, HKT<F, HKT<G, B>>>
```

Added in v3.0.0

# defaults

## compactDefault

Return a default `compact` implementation from `Functor` and `separate`.

**Signature**

```ts
export declare function compactDefault<F extends URIS4>(
  F: Functor4<F>
): (separate: Compactable4<F>['separate']) => Compactable4<F>['compact']
export declare function compactDefault<F extends URIS3>(
  F: Functor3<F>
): (separate: Compactable3<F>['separate']) => Compactable3<F>['compact']
export declare function compactDefault<F extends URIS3, E>(
  F: Functor3C<F, E>
): (separate: Compactable3C<F, E>['separate']) => Compactable3C<F, E>['compact']
export declare function compactDefault<F extends URIS2>(
  F: Functor2<F>
): (separate: Compactable2<F>['separate']) => Compactable2<F>['compact']
export declare function compactDefault<F extends URIS2, E>(
  F: Functor2C<F, E>
): (separate: Compactable2C<F, E>['separate']) => Compactable2C<F, E>['compact']
export declare function compactDefault<F extends URIS>(
  F: Functor1<F>
): (separate: Compactable1<F>['separate']) => Compactable1<F>['compact']
export declare function compactDefault<F>(
  F: Functor<F>
): (separate: Compactable<F>['separate']) => Compactable<F>['compact']
```

Added in v3.0.0

## separateDefault

Return a default `separate` implementation from `Functor` and `compact`.

**Signature**

```ts
export declare function separateDefault<F extends URIS4>(
  F: Functor4<F>
): (compact: Compactable4<F>['compact']) => Compactable4<F>['separate']
export declare function separateDefault<F extends URIS3>(
  F: Functor3<F>
): (compact: Compactable3<F>['compact']) => Compactable3<F>['separate']
export declare function separateDefault<F extends URIS3, E>(
  F: Functor3C<F, E>
): (compact: Compactable3C<F, E>['compact']) => Compactable3C<F, E>['separate']
export declare function separateDefault<F extends URIS2>(
  F: Functor2<F>
): (compact: Compactable2<F>['compact']) => Compactable2<F>['separate']
export declare function separateDefault<F extends URIS2, E>(
  F: Functor2C<F, E>
): (compact: Compactable2C<F, E>['compact']) => Compactable2C<F, E>['separate']
export declare function separateDefault<F extends URIS>(
  F: Functor1<F>
): (compact: Compactable1<F>['compact']) => Compactable1<F>['separate']
export declare function separateDefault<F>(
  F: Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate']
```

Added in v3.0.0

# type classes

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F> {
  readonly URI?: F
  readonly compact: <A>(foa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fe: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}
```

Added in v3.0.0

## Compactable1 (interface)

**Signature**

```ts
export interface Compactable1<F extends URIS> {
  readonly URI?: F
  readonly compact: <A>(foa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fe: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}
```

Added in v3.0.0

## Compactable2 (interface)

**Signature**

```ts
export interface Compactable2<F extends URIS2> {
  readonly URI?: F
  readonly compact: <E, A>(foa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <E, A, B>(fe: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

Added in v3.0.0

## Compactable2C (interface)

**Signature**

```ts
export interface Compactable2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly compact: <A>(foa: Kind2<F, E, Option<A>>) => Kind2<F, E, A>
  readonly separate: <A, B>(fe: Kind2<F, E, Either<A, B>>) => Separated<Kind2<F, E, A>, Kind2<F, E, B>>
}
```

Added in v3.0.0

## Compactable3 (interface)

**Signature**

```ts
export interface Compactable3<F extends URIS3> {
  readonly URI?: F
  readonly compact: <R, E, A>(foa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, E, A, B>(fe: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

Added in v3.0.0

## Compactable3C (interface)

**Signature**

```ts
export interface Compactable3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly compact: <R, A>(foa: Kind3<F, R, E, Option<A>>) => Kind3<F, R, E, A>
  readonly separate: <R, A, B>(fe: Kind3<F, R, E, Either<A, B>>) => Separated<Kind3<F, R, E, A>, Kind3<F, R, E, B>>
}
```

Added in v3.0.0

## Compactable4 (interface)

**Signature**

```ts
export interface Compactable4<F extends URIS4> {
  readonly URI?: F
  readonly compact: <S, R, E, A>(foa: Kind4<F, S, R, E, Option<A>>) => Kind4<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fe: Kind4<F, S, R, E, Either<A, B>>
  ) => Separated<Kind4<F, S, R, E, A>, Kind4<F, S, R, E, B>>
}
```

Added in v3.0.0
