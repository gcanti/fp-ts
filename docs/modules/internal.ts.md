---
title: internal.ts
nav_order: 49
parent: Modules
---

## internal overview

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [FlatMap (interface)](#flatmap-interface)
  - [FromEither (interface)](#fromeither-interface)
  - [TypeClass (interface)](#typeclass-interface)
  - [TypeLambda (interface)](#typelambda-interface)

---

# utils

## FlatMap (interface)

**Signature**

```ts
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: {
    <A, R2, O2, E2, B>(f: (a: A) => Kind<F, R2, O2, E2, B>): <R1, O1, E1>(
      self: Kind<F, R1, O1, E1, A>
    ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
    <R1, O1, E1, A, R2, O2, E2, B>(self: Kind<F, R1, O1, E1, A>, f: (a: A) => Kind<F, R2, O2, E2, B>): Kind<
      F,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      B
    >
  }
}
```

Added in v2.15.0

## FromEither (interface)

**Signature**

```ts
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <R, O, E, A>(e: Either<E, A>) => Kind<F, R, O, E, A>
}
```

Added in v2.15.0

## TypeClass (interface)

**Signature**

```ts
export interface TypeClass<F extends TypeLambda> {
  readonly [URI]?: F
}
```

Added in v2.15.0

## TypeLambda (interface)

**Signature**

```ts
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}
```

Added in v2.15.0
