---
title: Compactable.ts
nav_order: 14
parent: Modules
---

## Compactable overview

`Compactable` represents data structures which can be _compacted_/_separated_.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [model](#model)
  - [Compactable (interface)](#compactable-interface)
- [utils](#utils)
  - [compact](#compact)
  - [compactComposition](#compactcomposition)
  - [separate](#separate)
  - [separateComposition](#separatecomposition)

---

# model

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

# utils

## compact

Returns a default `compact` implementation.

**Signature**

```ts
export declare const compact: <F extends TypeLambda>(
  Functor: functor.Functor<F>
) => (
  separate: <S, R, O, E, A, B>(
    fe: Kind<F, S, R, O, E, Either<A, B>>
  ) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
) => <S, R, O, E, A>(foa: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
```

Added in v3.0.0

## compactComposition

Returns a default `compact` composition.

**Signature**

```ts
export declare function compactComposition<F extends TypeLambda, G extends TypeLambda>(
  FunctorF: functor.Functor<F>,
  CompactableG: Compactable<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  fgoa: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
```

Added in v3.0.0

## separate

Returns a default `separate` implementation.

**Signature**

```ts
export declare function separate<F extends TypeLambda>(
  Functor: functor.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate']
```

Added in v3.0.0

## separateComposition

Returns a default `separate` composition.

**Signature**

```ts
export declare function separateComposition<F extends TypeLambda, G extends TypeLambda>(
  FunctorF: functor.Functor<F>,
  CompactableG: Compactable<G>,
  FunctorG: functor.Functor<G>
): <FS, FR, FO, FE, GS, GR, GO, GE, A, B>(
  fge: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Either<A, B>>>
) => readonly [Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>, Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>]
```

Added in v3.0.0
