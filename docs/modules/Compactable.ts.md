---
title: Compactable.ts
nav_order: 13
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_separated_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [getCompactComposition](#getcompactcomposition)
  - [getSeparateComposition](#getseparatecomposition)
- [defaults](#defaults)
  - [getDefaultCompact](#getdefaultcompact)
  - [getDefaultSeparate](#getdefaultseparate)
- [type classes](#type-classes)
  - [Compactable (interface)](#compactable-interface)

---

# combinators

## getCompactComposition

`compact` composition.

**Signature**

```ts
export declare function getCompactComposition<F extends TypeLambda, G extends TypeLambda>(
  F: functor.Functor<F>,
  G: Compactable<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  fgoa: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
```

Added in v3.0.0

## getSeparateComposition

`separate` composition.

**Signature**

```ts
export declare function getSeparateComposition<F extends TypeLambda, G extends TypeLambda>(
  F: functor.Functor<F>,
  C: Compactable<G>,
  G: functor.Functor<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A, B>(
  fge: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Either<A, B>>>
) => readonly [Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>]
```

Added in v3.0.0

# defaults

## getDefaultCompact

Return a default `compact` implementation from `Functor` and `separate`.

**Signature**

```ts
export declare const getDefaultCompact: <F extends TypeLambda>(
  F: functor.Functor<F>
) => (
  separate: <S, R, O, E, A, B>(
    fe: Kind<F, S, R, O, E, Either<A, B>>
  ) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
) => <S, R, O, E, A>(foa: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0

## getDefaultSeparate

Return a default `separate` implementation from `Functor` and `compact`.

**Signature**

```ts
export declare function getDefaultSeparate<F extends TypeLambda>(
  F: functor.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate']
```

Added in v3.0.0

# type classes

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(foa: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
  readonly separate: <S, R, O, E, A, B>(
    fe: Kind<F, S, R, O, E, Either<A, B>>
  ) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
}
```

Added in v3.0.0
