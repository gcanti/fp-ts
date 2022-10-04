---
title: Applicative.ts
nav_order: 1
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

- [model](#model)
  - [Applicative (interface)](#applicative-interface)
- [utils](#utils)
  - [getApplicativeMonoid](#getapplicativemonoid)

---

# model

## Applicative (interface)

**Signature**

```ts
export interface Applicative<F extends TypeLambda> extends Apply<F>, FromIdentity<F> {}
```

Added in v3.0.0

# utils

## getApplicativeMonoid

Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.

**Signature**

```ts
export declare const getApplicativeMonoid: <F extends TypeLambda>(
  Applicative: Applicative<F>
) => <A, S, R, O, E>(Monoid: Monoid<A>) => Monoid<Kind<F, S, R, O, E, A>>
```

Added in v3.0.0
