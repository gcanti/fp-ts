---
title: NaturalTransformation.ts
nav_order: 59
parent: Modules
---

## NaturalTransformation overview

A type for natural transformations.

A natural transformation is a mapping between type constructors of kind `* -> *` where the mapping
operation has no ability to manipulate the inner values.

The definition of a natural transformation in category theory states that `F` and `G` should be functors,
but the `Functor` constraint is not enforced here; that the types are of kind `* -> *` is enough for our purposes.

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [NaturalTransformation (interface)](#naturaltransformation-interface)
  - [NaturalTransformation11 (interface)](#naturaltransformation11-interface)
  - [NaturalTransformation12 (interface)](#naturaltransformation12-interface)
  - [NaturalTransformation22 (interface)](#naturaltransformation22-interface)

---

# utils

## NaturalTransformation (interface)

**Signature**

```ts
export interface NaturalTransformation<F, G> {
  <A>(fa: HKT<F, A>): HKT<G, A>
}
```

Added in v3.0.0

## NaturalTransformation11 (interface)

**Signature**

```ts
export interface NaturalTransformation11<F extends URIS, G extends URIS> {
  <A>(fa: Kind<F, A>): Kind<G, A>
}
```

Added in v3.0.0

## NaturalTransformation12 (interface)

**Signature**

```ts
export interface NaturalTransformation12<F extends URIS, G extends URIS2> {
  <A, E>(fa: Kind<F, A>): Kind2<G, E, A>
}
```

Added in v3.0.0

## NaturalTransformation22 (interface)

**Signature**

```ts
export interface NaturalTransformation22<F extends URIS2, G extends URIS2> {
  <A, E>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}
```

Added in v3.0.0
