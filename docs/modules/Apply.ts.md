---
title: Apply.ts
nav_order: 4
parent: Modules
---

## Apply overview

The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.

`Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
`f`.

Formally, `Apply` represents a strong lax semi-monoidal endofunctor.

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Apply (interface)](#apply-interface)
  - [Apply1 (interface)](#apply1-interface)
  - [Apply2 (interface)](#apply2-interface)
  - [Apply2C (interface)](#apply2c-interface)
  - [Apply3 (interface)](#apply3-interface)
  - [Apply3C (interface)](#apply3c-interface)
  - [Apply4 (interface)](#apply4-interface)

---

# type classes

## Apply (interface)

**Signature**

```ts
export interface Apply<F> extends Functor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
}
```

Added in v2.0.0

## Apply1 (interface)

**Signature**

```ts
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
}
```

Added in v2.0.0

## Apply2 (interface)

**Signature**

```ts
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <E, A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Apply2C (interface)

**Signature**

```ts
export interface Apply2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly ap: <A>(fa: Kind2<F, E, A>) => <B>(fab: Kind2<F, E, (a: A) => B>) => Kind2<F, E, B>
}
```

Added in v2.0.0

## Apply3 (interface)

**Signature**

```ts
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <R, E, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}
```

Added in v2.0.0

## Apply3C (interface)

**Signature**

```ts
export interface Apply3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly ap: <R, A>(fa: Kind3<F, R, E, A>) => <B>(fab: Kind3<F, R, E, (a: A) => B>) => Kind3<F, R, E, B>
}
```

Added in v2.2.0

## Apply4 (interface)

**Signature**

```ts
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <S, R, E, A>(
    fa: Kind4<F, S, R, E, A>
  ) => <B>(fab: Kind4<F, S, R, E, (a: A) => B>) => Kind4<F, S, R, E, B>
}
```

Added in v2.0.0
