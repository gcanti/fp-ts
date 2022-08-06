---
title: Refinement.ts
nav_order: 91
parent: Modules
---

## Refinement overview

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [and](#and)
  - [compose](#compose)
  - [not](#not)
  - [or](#or)
  - [zero](#zero)
- [constructors](#constructors)
  - [fromEitherK](#fromeitherk)
  - [fromOptionK](#fromoptionk)
  - [id](#id)
- [utils](#utils)
  - [Refinement (interface)](#refinement-interface)

---

# combinators

## and

**Signature**

```ts
export declare const and: <A, C extends A>(
  second: Refinement<A, C>
) => <B extends A>(first: Refinement<A, B>) => Refinement<A, B & C>
```

Added in v2.11.0

## compose

**Signature**

```ts
export declare const compose: <A, B extends A, C extends B>(
  bc: Refinement<B, C>
) => (ab: Refinement<A, B>) => Refinement<A, C>
```

Added in v2.11.0

## not

**Signature**

```ts
export declare const not: <A, B extends A>(refinement: Refinement<A, B>) => Refinement<A, Exclude<A, B>>
```

Added in v2.11.0

## or

**Signature**

```ts
export declare const or: <A, C extends A>(
  second: Refinement<A, C>
) => <B extends A>(first: Refinement<A, B>) => Refinement<A, C | B>
```

Added in v2.11.0

## zero

**Signature**

```ts
export declare const zero: <A, B extends A>() => Refinement<A, B>
```

Added in v2.11.0

# constructors

## fromEitherK

**Signature**

```ts
export declare const fromEitherK: <A, B extends A>(getEither: (a: A) => Either<unknown, B>) => Refinement<A, B>
```

Added in v2.11.0

## fromOptionK

Returns a `Refinement` from a `Option` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const fromOptionK: <A, B extends A>(getOption: (a: A) => Option<B>) => Refinement<A, B>
```

Added in v2.11.0

## id

**Signature**

```ts
export declare const id: <A>() => Refinement<A, A>
```

Added in v2.11.0

# utils

## Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v2.11.0
