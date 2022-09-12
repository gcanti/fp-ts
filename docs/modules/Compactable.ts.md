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
  F: Functor<F>,
  G: Compactable<G>
): <FS, FR, FE, GS, GR, GE, A>(
  fgoa: Kind<F, FS, FR, FE, Kind<G, GS, GR, GE, Option<A>>>
) => Kind<F, FS, FR, FE, Kind<G, GS, GR, GE, A>>
```

Added in v3.0.0

## separate

`separate` composition.

**Signature**

```ts
export declare function separate<F extends HKT, G extends HKT>(
  F: Functor<F>,
  C: Compactable<G>,
  G: Functor<G>
): <FS, FR, FE, GS, GR, GE, A, B>(
  fge: Kind<F, FS, FR, FE, Kind<G, GS, GR, GE, Either<A, B>>>
) => Separated<Kind<F, FS, FR, FE, Kind<G, GS, GR, GE, A>>, Kind<F, FS, FR, FE, Kind<G, GS, GR, GE, B>>>
```

Added in v3.0.0

# defaults

## compactDefault

Return a default `compact` implementation from `Functor` and `separate`.

**Signature**

```ts
export declare const compactDefault: <F extends HKT>(
  F: Functor<F>
) => (
  separate: <S, R, E, A, B>(fe: Kind<F, S, R, E, Either<A, B>>) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, B>>
) => <S, R, E, A>(foa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, A>
```

Added in v3.0.0

## separateDefault

Return a default `separate` implementation from `Functor` and `compact`.

**Signature**

```ts
export declare function separateDefault<F extends HKT>(
  F: Functor<F>
): (compact: Compactable<F>['compact']) => Compactable<F>['separate']
```

Added in v3.0.0

# type classes

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends HKT> extends Typeclass<F> {
  readonly compact: <S, R, E, A>(foa: Kind<F, S, R, E, Option<A>>) => Kind<F, S, R, E, A>
  readonly separate: <S, R, E, A, B>(
    fe: Kind<F, S, R, E, Either<A, B>>
  ) => Separated<Kind<F, S, R, E, A>, Kind<F, S, R, E, B>>
}
```

Added in v3.0.0
