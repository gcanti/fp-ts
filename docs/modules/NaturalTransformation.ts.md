---
title: NaturalTransformation.ts
nav_order: 66
parent: Modules
---

## NaturalTransformation overview

A type for natural transformations.

A natural transformation is a mapping between type constructors of kind `* -> *` where the mapping
operation has no ability to manipulate the inner values.

The definition of a natural transformation in category theory states that `F` and `G` should be functors,
but the `Functor` constraint is not enforced here; that the types are of kind `* -> *` is enough for our purposes.

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [NaturalTransformation (interface)](#naturaltransformation-interface)
  - [NaturalTransformation11 (interface)](#naturaltransformation11-interface)
  - [NaturalTransformation12 (interface)](#naturaltransformation12-interface)
  - [NaturalTransformation12C (interface)](#naturaltransformation12c-interface)
  - [NaturalTransformation13 (interface)](#naturaltransformation13-interface)
  - [NaturalTransformation13C (interface)](#naturaltransformation13c-interface)
  - [NaturalTransformation14 (interface)](#naturaltransformation14-interface)
  - [NaturalTransformation14C (interface)](#naturaltransformation14c-interface)
  - [NaturalTransformation21 (interface)](#naturaltransformation21-interface)
  - [NaturalTransformation22 (interface)](#naturaltransformation22-interface)
  - [NaturalTransformation22C (interface)](#naturaltransformation22c-interface)
  - [NaturalTransformation23 (interface)](#naturaltransformation23-interface)
  - [NaturalTransformation23C (interface)](#naturaltransformation23c-interface)
  - [NaturalTransformation23R (interface)](#naturaltransformation23r-interface)
  - [NaturalTransformation23RC (interface)](#naturaltransformation23rc-interface)
  - [NaturalTransformation24 (interface)](#naturaltransformation24-interface)
  - [NaturalTransformation24R (interface)](#naturaltransformation24r-interface)
  - [NaturalTransformation24S (interface)](#naturaltransformation24s-interface)
  - [NaturalTransformation33 (interface)](#naturaltransformation33-interface)
  - [NaturalTransformation34 (interface)](#naturaltransformation34-interface)

---

# utils

## NaturalTransformation (interface)

**Signature**

```ts
export interface NaturalTransformation<F, G> {
  <A>(fa: HKT<F, A>): HKT<G, A>
}
```

Added in v2.11.0

## NaturalTransformation11 (interface)

**Signature**

```ts
export interface NaturalTransformation11<F extends URIS, G extends URIS> {
  <A>(fa: Kind<F, A>): Kind<G, A>
}
```

Added in v2.11.0

## NaturalTransformation12 (interface)

**Signature**

```ts
export interface NaturalTransformation12<F extends URIS, G extends URIS2> {
  <A, E>(fa: Kind<F, A>): Kind2<G, E, A>
}
```

Added in v2.11.0

## NaturalTransformation12C (interface)

**Signature**

```ts
export interface NaturalTransformation12C<F extends URIS, G extends URIS2, E> {
  <A>(fa: Kind<F, A>): Kind2<G, E, A>
}
```

Added in v2.11.0

## NaturalTransformation13 (interface)

**Signature**

```ts
export interface NaturalTransformation13<F extends URIS, G extends URIS3> {
  <A, R, E>(fa: Kind<F, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation13C (interface)

**Signature**

```ts
export interface NaturalTransformation13C<F extends URIS, G extends URIS3, E> {
  <A, R>(fa: Kind<F, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation14 (interface)

**Signature**

```ts
export interface NaturalTransformation14<F extends URIS, G extends URIS4> {
  <A, S, R, E>(fa: Kind<F, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation14C (interface)

**Signature**

```ts
export interface NaturalTransformation14C<F extends URIS, G extends URIS4, E> {
  <A, S, R>(fa: Kind<F, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation21 (interface)

**Signature**

```ts
export interface NaturalTransformation21<F extends URIS2, G extends URIS> {
  <A>(fa: Kind2<F, unknown, A>): Kind<G, A>
}
```

Added in v2.11.0

## NaturalTransformation22 (interface)

**Signature**

```ts
export interface NaturalTransformation22<F extends URIS2, G extends URIS2> {
  <E, A>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}
```

Added in v2.11.0

## NaturalTransformation22C (interface)

**Signature**

```ts
export interface NaturalTransformation22C<F extends URIS2, G extends URIS2, E> {
  <A>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}
```

Added in v2.11.0

## NaturalTransformation23 (interface)

**Signature**

```ts
export interface NaturalTransformation23<F extends URIS2, G extends URIS3> {
  <E, A, R>(fa: Kind2<F, E, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation23C (interface)

**Signature**

```ts
export interface NaturalTransformation23C<F extends URIS2, G extends URIS3, E> {
  <A, R>(fa: Kind2<F, E, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation23R (interface)

**Signature**

```ts
export interface NaturalTransformation23R<F extends URIS2, G extends URIS3> {
  <R, A, E>(fa: Kind2<F, R, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation23RC (interface)

**Signature**

```ts
export interface NaturalTransformation23RC<F extends URIS2, G extends URIS3, E> {
  <R, A>(fa: Kind2<F, R, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation24 (interface)

**Signature**

```ts
export interface NaturalTransformation24<F extends URIS2, G extends URIS4> {
  <E, A, S, R>(fa: Kind2<F, E, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation24R (interface)

**Signature**

```ts
export interface NaturalTransformation24R<F extends URIS2, G extends URIS4> {
  <R, A, S, E>(fa: Kind2<F, R, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation24S (interface)

**Signature**

```ts
export interface NaturalTransformation24S<F extends URIS2, G extends URIS4> {
  <S, A, R, E>(fa: Kind2<F, S, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation33 (interface)

**Signature**

```ts
export interface NaturalTransformation33<F extends URIS3, G extends URIS3> {
  <R, E, A>(fa: Kind3<F, R, E, A>): Kind3<G, R, E, A>
}
```

Added in v2.11.0

## NaturalTransformation34 (interface)

**Signature**

```ts
export interface NaturalTransformation34<F extends URIS3, G extends URIS4> {
  <R, E, A, S>(fa: Kind3<F, R, E, A>): Kind4<G, S, R, E, A>
}
```

Added in v2.11.0
