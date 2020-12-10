---
title: Contravariant.ts
nav_order: 19
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
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v2.0.0

## Contravariant1 (interface)

**Signature**

```ts
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v2.0.0

## Contravariant2 (interface)

**Signature**

```ts
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Contravariant2C (interface)

**Signature**

```ts
export interface Contravariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Contravariant3 (interface)

**Signature**

```ts
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Contravariant3C (interface)

**Signature**

```ts
export interface Contravariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Contravariant4 (interface)

**Signature**

```ts
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
