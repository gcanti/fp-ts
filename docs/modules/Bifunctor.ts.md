---
title: Bifunctor.ts
nav_order: 6
parent: Modules
---

## Bifunctor overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Bifunctor (interface)](#bifunctor-interface)
  - [Bifunctor2 (interface)](#bifunctor2-interface)
  - [Bifunctor2C (interface)](#bifunctor2c-interface)
  - [Bifunctor3 (interface)](#bifunctor3-interface)
  - [Bifunctor3C (interface)](#bifunctor3c-interface)
  - [Bifunctor4 (interface)](#bifunctor4-interface)

---

# type classes

## Bifunctor (interface)

**Signature**

```ts
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <E, A, G, B>(fea: HKT2<F, E, A>, f: (e: E) => G, g: (a: A) => B) => HKT2<F, G, B>
  readonly mapLeft: <E, A, G>(fea: HKT2<F, E, A>, f: (e: E) => G) => HKT2<F, G, A>
}
```

Added in v2.0.0

## Bifunctor2 (interface)

**Signature**

```ts
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <E, A, G, B>(fea: Kind2<F, E, A>, f: (e: E) => G, g: (a: A) => B) => Kind2<F, G, B>
  readonly mapLeft: <E, A, G>(fea: Kind2<F, E, A>, f: (e: E) => G) => Kind2<F, G, A>
}
```

Added in v2.0.0

## Bifunctor2C (interface)

**Signature**

```ts
export interface Bifunctor2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly bimap: <A, G, B>(fea: Kind2<F, E, A>, f: (e: E) => G, g: (a: A) => B) => Kind2<F, G, B>
  readonly mapLeft: <A, M>(fea: Kind2<F, E, A>, f: (e: E) => M) => Kind2<F, M, A>
}
```

Added in v2.0.0

## Bifunctor3 (interface)

**Signature**

```ts
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <R, E, A, G, B>(fea: Kind3<F, R, E, A>, f: (e: E) => G, g: (a: A) => B) => Kind3<F, R, G, B>
  readonly mapLeft: <R, E, A, G>(fea: Kind3<F, R, E, A>, f: (e: E) => G) => Kind3<F, R, G, A>
}
```

Added in v2.0.0

## Bifunctor3C (interface)

**Signature**

```ts
export interface Bifunctor3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly bimap: <R, A, G, B>(fea: Kind3<F, R, E, A>, f: (e: E) => G, g: (a: A) => B) => Kind3<F, R, G, B>
  readonly mapLeft: <R, A, G>(fea: Kind3<F, R, E, A>, f: (e: E) => G) => Kind3<F, R, G, A>
}
```

Added in v2.2.0

## Bifunctor4 (interface)

**Signature**

```ts
export interface Bifunctor4<F extends URIS4> {
  readonly URI: F
  readonly bimap: <S, R, E, A, G, B>(fea: Kind4<F, S, R, E, A>, f: (e: E) => G, g: (a: A) => B) => Kind4<F, S, R, G, B>
  readonly mapLeft: <S, R, E, A, G>(fea: Kind4<F, S, R, E, A>, f: (e: E) => G) => Kind4<F, S, R, G, A>
}
```

Added in v2.0.0
