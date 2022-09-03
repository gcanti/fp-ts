---
title: Profunctor.ts
nav_order: 76
parent: Modules
---

## Profunctor overview

Added in v2.0.0

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
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <E, A, B>(fa: HKT2<F, E, A>, f: (a: A) => B) => HKT<F, B>
  readonly promap: <E, A, D, B>(fea: HKT2<F, E, A>, f: (d: D) => E, g: (a: A) => B) => HKT2<F, D, B>
}
```

Added in v2.0.0

## Profunctor2 (interface)

**Signature**

```ts
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
  readonly promap: <E, A, D, B>(fea: Kind2<F, E, A>, f: (d: D) => E, g: (a: A) => B) => Kind2<F, D, B>
}
```

Added in v2.0.0

## Profunctor2C (interface)

**Signature**

```ts
export interface Profunctor2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly promap: <A, D, B>(fea: Kind2<F, E, A>, f: (d: D) => E, g: (a: A) => B) => Kind2<F, D, B>
}
```

Added in v2.0.0

## Profunctor3 (interface)

**Signature**

```ts
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
  readonly promap: <R, E, A, D, B>(fea: Kind3<F, R, E, A>, f: (d: D) => E, g: (a: A) => B) => Kind3<F, R, D, B>
}
```

Added in v2.0.0

## Profunctor3C (interface)

**Signature**

```ts
export interface Profunctor3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly promap: <R, A, D, B>(fea: Kind3<F, R, E, A>, f: (d: D) => E, g: (a: A) => B) => Kind3<F, R, D, B>
}
```

Added in v2.2.0

## Profunctor4 (interface)

**Signature**

```ts
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
  readonly promap: <S, R, E, A, D, B>(fea: Kind4<F, S, R, E, A>, f: (d: D) => E, g: (a: A) => B) => Kind4<F, S, R, D, B>
}
```

Added in v2.0.0
