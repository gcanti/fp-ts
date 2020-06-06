---
title: ChainRec.ts
nav_order: 16
parent: Modules
---

## ChainRec overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [ChainRec (interface)](#chainrec-interface)
  - [ChainRec1 (interface)](#chainrec1-interface)
  - [ChainRec2 (interface)](#chainrec2-interface)
  - [ChainRec2C (interface)](#chainrec2c-interface)
  - [ChainRec3 (interface)](#chainrec3-interface)
- [utils](#utils)
  - [tailRec](#tailrec)

---

# type classes

## ChainRec (interface)

**Signature**

```ts
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}
```

Added in v2.0.0

## ChainRec1 (interface)

**Signature**

```ts
export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind<F, Either<A, B>>) => Kind<F, B>
}
```

Added in v2.0.0

## ChainRec2 (interface)

**Signature**

```ts
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
  readonly chainRec: <E, A, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## ChainRec2C (interface)

**Signature**

```ts
export interface ChainRec2C<F extends URIS2, E> extends Chain2C<F, E> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## ChainRec3 (interface)

**Signature**

```ts
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
  readonly chainRec: <R, E, A, B>(a: A, f: (a: A) => Kind3<F, R, E, Either<A, B>>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

# utils

## tailRec

**Signature**

```ts
export declare function tailRec<A, B>(a: A, f: (a: A) => Either<A, B>): B
```

Added in v2.0.0
