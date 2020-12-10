---
title: Bifunctor.ts
nav_order: 5
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
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT2<F, E, A>) => HKT2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: HKT2<F, E, A>) => HKT2<F, G, A>
}
```

Added in v2.0.0

## Bifunctor2 (interface)

**Signature**

```ts
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, E, A>) => Kind2<F, G, A>
}
```

Added in v2.0.0

## Bifunctor2C (interface)

**Signature**

```ts
export interface Bifunctor2C<F extends URIS2, E> {
  readonly URI: F
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <A>(fea: Kind2<F, E, A>) => Kind2<F, G, A>
}
```

Added in v2.0.0

## Bifunctor3 (interface)

**Signature**

```ts
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}
```

Added in v2.0.0

## Bifunctor3C (interface)

**Signature**

```ts
export interface Bifunctor3C<F extends URIS3, E> {
  readonly URI: F
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}
```

Added in v2.2.0

## Bifunctor4 (interface)

**Signature**

```ts
export interface Bifunctor4<F extends URIS4> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, A>
}
```

Added in v2.0.0
