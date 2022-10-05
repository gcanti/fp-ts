---
title: Compactable.ts
nav_order: 17
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
  - [compactComposition](#compactcomposition)
  - [separate](#separate)

---

# model

## Compactable (interface)

**Signature**

```ts
export interface Compactable<F extends TypeLambda> extends TypeClass<F> {
  readonly compact: <S, R, O, E, A>(self: Kind<F, S, R, O, E, Option<A>>) => Kind<F, S, R, O, E, A>
}
```

Added in v3.0.0

# utils

## compactComposition

Returns a default `compact` composition.

**Signature**

```ts
export declare const compactComposition: <F extends TypeLambda, G extends TypeLambda>(
  Functor: Functor<F>,
  Compactable: Compactable<G>
) => <FS, FR, FO, FE, GS, GR, GO, GE, A>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, Option<A>>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
```

Added in v3.0.0

## separate

Returns a default `separate` implementation.

**Signature**

```ts
export declare const separate: <F extends TypeLambda>(
  Functor: Functor<F>,
  Compactable: Compactable<F>
) => <S, R, O, E, A, B>(
  self: Kind<F, S, R, O, E, Result<A, B>>
) => readonly [Kind<F, S, R, O, E, A>, Kind<F, S, R, O, E, B>]
```

Added in v3.0.0
