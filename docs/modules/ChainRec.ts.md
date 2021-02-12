---
title: ChainRec.ts
nav_order: 15
parent: Modules
---

## ChainRec overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [ChainRec (interface)](#chainrec-interface)
  - [ChainRec1 (interface)](#chainrec1-interface)
  - [ChainRec2 (interface)](#chainrec2-interface)
  - [ChainRec2C (interface)](#chainrec2c-interface)
  - [ChainRec3 (interface)](#chainrec3-interface)
  - [ChainRec3C (interface)](#chainrec3c-interface)
  - [ChainRec4 (interface)](#chainrec4-interface)
- [utils](#utils)
  - [tailRec](#tailrec)

---

# type classes

## ChainRec (interface)

**Signature**

```ts
export interface ChainRec<F> {
  readonly URI?: F
  readonly chainRec: <A, B>(f: (a: A) => HKT<F, Either<A, B>>) => (a: A) => HKT<F, B>
}
```

Added in v3.0.0

## ChainRec1 (interface)

**Signature**

```ts
export interface ChainRec1<F extends URIS> {
  readonly URI?: F
  readonly chainRec: <A, B>(f: (a: A) => Kind<F, Either<A, B>>) => (a: A) => Kind<F, B>
}
```

Added in v3.0.0

## ChainRec2 (interface)

**Signature**

```ts
export interface ChainRec2<F extends URIS2> {
  readonly URI?: F
  readonly chainRec: <A, E, B>(f: (a: A) => Kind2<F, E, Either<A, B>>) => (a: A) => Kind2<F, E, B>
}
```

Added in v3.0.0

## ChainRec2C (interface)

**Signature**

```ts
export interface ChainRec2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly chainRec: <A, B>(f: (a: A) => Kind2<F, E, Either<A, B>>) => (a: A) => Kind2<F, E, B>
}
```

Added in v3.0.0

## ChainRec3 (interface)

**Signature**

```ts
export interface ChainRec3<F extends URIS3> {
  readonly URI?: F
  readonly chainRec: <A, R, E, B>(f: (a: A) => Kind3<F, R, E, Either<A, B>>) => (a: A) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## ChainRec3C (interface)

**Signature**

```ts
export interface ChainRec3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly chainRec: <A, R, B>(f: (a: A) => Kind3<F, R, E, Either<A, B>>) => (a: A) => Kind3<F, R, E, B>
}
```

Added in v3.0.0

## ChainRec4 (interface)

**Signature**

```ts
export interface ChainRec4<F extends URIS4> {
  readonly URI?: F
  readonly chainRec: <A, S, R, E, B>(f: (a: A) => Kind4<F, S, R, E, Either<A, B>>) => (a: A) => Kind4<F, S, R, E, B>
}
```

Added in v3.0.0

# utils

## tailRec

**Signature**

```ts
export declare const tailRec: <A, B>(f: (a: A) => Either<A, B>) => (startWith: A) => B
```

Added in v3.0.0
