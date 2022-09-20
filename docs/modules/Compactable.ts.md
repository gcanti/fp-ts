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

---

# combinators

## compact

`compact` composition.

**Signature**

```ts
export declare function compact<F extends HKT, G extends HKT>(
  F: FunctorModule.Functor<F>,
  G: Compactable<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A>(
  fgoa: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Option<A>>>
) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
```

Added in v3.0.0

## separate

`separate` composition.

**Signature**

```ts
export declare function separate<F extends HKT, G extends HKT>(
  F: FunctorModule.Functor<F>,
  C: Compactable<G>,
  G: FunctorModule.Functor<G>
): <FS, FR, FW, FE, GS, GR, GW, GE, A, B>(
  fge: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, Either<A, B>>>
) => Separated<Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>, Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>>
```

Added in v3.0.0

# defaults

## compactDefault

Return a default `compact` implementation from `Functor` and `separate`.

**Signature**

```ts
export declare const compactDefault: <F extends HKT>(
  F: FunctorModule.Functor<F>
) => (
  separate: <S, R, W, E, A, B>(
    fe: Kind<F, S, R, W, E, Either<A, B>>
  ) => separated.Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
) => <S, R, W, E, A>(foa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A>
```

Added in v3.0.0

## separateDefault

Return a default `separate` implementation from `Functor` and `compact`.

**Signature**

```ts
export declare function separateDefault<F extends HKT>(
  F: FunctorModule.Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate']
```

Added in v3.0.0

# type classes

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends HKT> extends Typeclass<F> {
  readonly compact: <S, R, W, E, A>(foa: Kind<F, S, R, W, E, Option<A>>) => Kind<F, S, R, W, E, A>
  readonly separate: <S, R, W, E, A, B>(
    fe: Kind<F, S, R, W, E, Either<A, B>>
  ) => Separated<Kind<F, S, R, W, E, A>, Kind<F, S, R, W, E, B>>
}
```

Added in v3.0.0
