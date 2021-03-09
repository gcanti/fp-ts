---
title: Profunctor.ts
nav_order: 62
parent: Modules
---

## Profunctor overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Profunctor (interface)](#profunctor-interface)
  - [Profunctor2 (interface)](#profunctor2-interface)
  - [Profunctor2C (interface)](#profunctor2c-interface)
  - [Profunctor3 (interface)](#profunctor3-interface)
  - [Profunctor3C (interface)](#profunctor3c-interface)
  - [Profunctor4 (interface)](#profunctor4-interface)

---

# type classes

## Profunctor (interface)

**Signature**

```ts
export interface Profunctor<P> {
  readonly URI?: P
  readonly map: <A, B>(f: (a: A) => B) => <E>(pea: HKT2<P, E, A>) => HKT<P, B>
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: HKT2<P, E, A>) => HKT2<P, D, B>
}
```

Added in v3.0.0

## Profunctor2 (interface)

**Signature**

```ts
export interface Profunctor2<P extends URIS2> extends Functor2<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}
```

Added in v3.0.0

## Profunctor2C (interface)

**Signature**

```ts
export interface Profunctor2C<P extends URIS2, E> extends Functor2C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}
```

Added in v3.0.0

## Profunctor3 (interface)

**Signature**

```ts
export interface Profunctor3<P extends URIS3> extends Functor3<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}
```

Added in v3.0.0

## Profunctor3C (interface)

**Signature**

```ts
export interface Profunctor3C<P extends URIS3, E> extends Functor3C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}
```

Added in v3.0.0

## Profunctor4 (interface)

**Signature**

```ts
export interface Profunctor4<P extends URIS4> extends Functor4<P> {
  readonly promap: <D, E, A, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => <S, R>(pea: Kind4<P, S, R, E, A>) => Kind4<P, S, R, D, B>
}
```

Added in v3.0.0
