---
title: Invariant.ts
nav_order: 45
parent: Modules
---

## Invariant overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Invariant (interface)](#invariant-interface)
  - [Invariant1 (interface)](#invariant1-interface)
  - [Invariant2 (interface)](#invariant2-interface)
  - [Invariant2C (interface)](#invariant2c-interface)
  - [Invariant3 (interface)](#invariant3-interface)
  - [Invariant3C (interface)](#invariant3c-interface)
  - [Invariant4 (interface)](#invariant4-interface)

---

# type classes

## Invariant (interface)

**Signature**

```ts
export interface Invariant<F> {
  readonly URI: F
  readonly imap: <A, B>(fa: HKT<F, A>, f: (a: A) => B, g: (b: B) => A) => HKT<F, B>
}
```

Added in v2.0.0

## Invariant1 (interface)

**Signature**

```ts
export interface Invariant1<F extends URIS> {
  readonly URI: F
  readonly imap: <A, B>(fa: Kind<F, A>, f: (a: A) => B, g: (b: B) => A) => Kind<F, B>
}
```

Added in v2.0.0

## Invariant2 (interface)

**Signature**

```ts
export interface Invariant2<F extends URIS2> {
  readonly URI: F
  readonly imap: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => B, g: (b: B) => A) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Invariant2C (interface)

**Signature**

```ts
export interface Invariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly imap: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => B, g: (b: B) => A) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Invariant3 (interface)

**Signature**

```ts
export interface Invariant3<F extends URIS3> {
  readonly URI: F
  readonly imap: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B, g: (b: B) => A) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Invariant3C (interface)

**Signature**

```ts
export interface Invariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly imap: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => B, g: (b: B) => A) => Kind3<F, R, E, B>
}
```

Added in v2.4.2

## Invariant4 (interface)

**Signature**

```ts
export interface Invariant4<F extends URIS4> {
  readonly URI: F
  readonly imap: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => B, g: (b: B) => A) => Kind4<F, S, R, E, B>
}
```

Added in v2.4.2
