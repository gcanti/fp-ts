---
title: Contravariant.ts
nav_order: 22
parent: Modules
---

## Contravariant overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Contravariant (interface)](#contravariant-interface)
  - [Contravariant1 (interface)](#contravariant1-interface)
  - [Contravariant2 (interface)](#contravariant2-interface)
  - [Contravariant2C (interface)](#contravariant2c-interface)
  - [Contravariant3 (interface)](#contravariant3-interface)
  - [Contravariant3C (interface)](#contravariant3c-interface)
  - [Contravariant4 (interface)](#contravariant4-interface)

---

# type classes

## Contravariant (interface)

**Signature**

```ts
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}
```

Added in v2.0.0

## Contravariant1 (interface)

**Signature**

```ts
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: Kind<F, A>, f: (b: B) => A) => Kind<F, B>
}
```

Added in v2.0.0

## Contravariant2 (interface)

**Signature**

```ts
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <E, A, B>(fa: Kind2<F, E, A>, f: (b: B) => A) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Contravariant2C (interface)

**Signature**

```ts
export interface Contravariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly contramap: <A, B>(fa: Kind2<F, E, A>, f: (b: B) => A) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Contravariant3 (interface)

**Signature**

```ts
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (b: B) => A) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Contravariant3C (interface)

**Signature**

```ts
export interface Contravariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly contramap: <R, A, B>(fa: Kind3<F, R, E, A>, f: (b: B) => A) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Contravariant4 (interface)

**Signature**

```ts
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (b: B) => A) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
