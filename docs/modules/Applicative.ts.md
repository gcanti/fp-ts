---
title: Applicative.ts
nav_order: 3
parent: Modules
---

## Applicative overview

The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
of type `f a` from values of type `a`.

Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
any number of function arguments.

Instances must satisfy the following laws in addition to the `Apply` laws:

1. Identity: `of(identity) |> ap(fa) <-> fa`
2. Homomorphism: `of(ab) |> ap(a) <-> of(ab(a))`
3. Interchange: `fab |> ap(of(a)) <-> of(ab => ab(a)) |> ap(fab)`

Note. `Functor`'s `map` can be derived: `map = f => fa => of(f) |> ap(fa)`

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [type classes](#type-classes)
  - [Applicative (interface)](#applicative-interface)
  - [Applicative1 (interface)](#applicative1-interface)
  - [Applicative2 (interface)](#applicative2-interface)
  - [Applicative2C (interface)](#applicative2c-interface)
  - [Applicative3 (interface)](#applicative3-interface)
  - [Applicative3C (interface)](#applicative3c-interface)
  - [Applicative4 (interface)](#applicative4-interface)
- [utils](#utils)
  - [getApplicativeMonoid](#getapplicativemonoid)

---

# type classes

## Applicative (interface)

**Signature**

```ts
export interface Applicative<F> extends Apply<F>, Pointed<F> {}
```

Added in v3.0.0

## Applicative1 (interface)

**Signature**

```ts
export interface Applicative1<F extends URIS> extends Apply1<F>, Pointed1<F> {}
```

Added in v3.0.0

## Applicative2 (interface)

**Signature**

```ts
export interface Applicative2<F extends URIS2> extends Apply2<F>, Pointed2<F> {}
```

Added in v3.0.0

## Applicative2C (interface)

**Signature**

```ts
export interface Applicative2C<F extends URIS2, E> extends Apply2C<F, E>, Pointed2C<F, E> {}
```

Added in v3.0.0

## Applicative3 (interface)

**Signature**

```ts
export interface Applicative3<F extends URIS3> extends Apply3<F>, Pointed3<F> {}
```

Added in v3.0.0

## Applicative3C (interface)

**Signature**

```ts
export interface Applicative3C<F extends URIS3, E> extends Apply3C<F, E>, Pointed3C<F, E> {}
```

Added in v3.0.0

## Applicative4 (interface)

**Signature**

```ts
export interface Applicative4<F extends URIS4> extends Apply4<F>, Pointed4<F> {}
```

Added in v3.0.0

# utils

## getApplicativeMonoid

Lift a monoid into 'F', the inner values are concatenated using the provided `Monoid`.

**Signature**

```ts
export declare function getApplicativeMonoid<F extends URIS4>(
  F: Applicative4<F>
): <A, S, R, E>(M: Monoid<A>) => Monoid<Kind4<F, S, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS3>(
  F: Applicative3<F>
): <A, R, E>(M: Monoid<A>) => Monoid<Kind3<F, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS3, E>(
  F: Applicative3C<F, E>
): <A, R>(S: Monoid<A>) => Monoid<Kind3<F, R, E, A>>
export declare function getApplicativeMonoid<F extends URIS2>(
  F: Applicative2<F>
): <A, E>(M: Monoid<A>) => Monoid<Kind2<F, E, A>>
export declare function getApplicativeMonoid<F extends URIS2, E>(
  F: Applicative2C<F, E>
): <A>(M: Monoid<A>) => Monoid<Kind2<F, E, A>>
export declare function getApplicativeMonoid<F extends URIS>(
  F: Applicative1<F>
): <A>(M: Monoid<A>) => Monoid<Kind<F, A>>
export declare function getApplicativeMonoid<F>(F: Applicative<F>): <A>(M: Monoid<A>) => Monoid<HKT<F, A>>
```

Added in v3.0.0
