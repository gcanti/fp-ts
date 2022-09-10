---
title: Invariant.ts
nav_order: 50
parent: Modules
---

## Invariant overview

Added in v3.0.0

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
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}
```

Added in v3.0.0

## Invariant1 (interface)

**Signature**

```ts
export interface Invariant1<F extends URIS> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}
```

Added in v3.0.0

## Invariant2 (interface)

**Signature**

```ts
export interface Invariant2<F extends URIS2> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Invariant2C (interface)

**Signature**

```ts
export interface Invariant2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}
```

Added in v3.0.0

## Invariant3 (interface)

**Signature**

```ts
export interface Invariant3<F extends URIS3> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Invariant3C (interface)

**Signature**

```ts
export interface Invariant3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## Invariant4 (interface)

**Signature**

```ts
export interface Invariant4<F extends URIS4> {
  readonly URI?: F
  readonly imap: <A, B>(f: (a: A) => B, g: (b: B) => A) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0
