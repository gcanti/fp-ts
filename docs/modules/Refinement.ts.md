---
title: Refinement.ts
nav_order: 83
parent: Modules
---

## Refinement overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [constructors](#constructors)
  - [id](#id)
- [lifting](#lifting)
  - [liftOption](#liftoption)
  - [liftResult](#liftresult)
- [utils](#utils)
  - [Refinement (interface)](#refinement-interface)
  - [and](#and)
  - [compose](#compose)
  - [emptyKind](#emptykind)
  - [not](#not)
  - [or](#or)

---

# constructors

## id

**Signature**

```ts
export declare const id: <A>() => Refinement<A, A>
```

Added in v3.0.0

# lifting

## liftOption

Returns a `Refinement` from a `Option` returning function.
This function ensures that a `Refinement` definition is type-safe.

**Signature**

```ts
export declare const liftOption: <A, B extends A>(f: (a: A) => Option<B>) => Refinement<A, B>
```

Added in v3.0.0

## liftResult

**Signature**

```ts
export declare const liftResult: <A, B extends A>(f: (a: A) => Result<unknown, B>) => Refinement<A, B>
```

Added in v3.0.0

# utils

## Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v3.0.0

## and

**Signature**

```ts
export declare const and: <A, C extends A>(
  that: Refinement<A, C>
) => <B extends A>(self: Refinement<A, B>) => Refinement<A, B & C>
```

Added in v3.0.0

## compose

**Signature**

```ts
export declare const compose: <A, B extends A, C extends B>(
  bc: Refinement<B, C>
) => (ab: Refinement<A, B>) => Refinement<A, C>
```

Added in v3.0.0

## emptyKind

**Signature**

```ts
export declare const emptyKind: <A, B extends A>() => Refinement<A, B>
```

Added in v3.0.0

## not

**Signature**

```ts
export declare const not: <A, B extends A>(refinement: Refinement<A, B>) => Refinement<A, Exclude<A, B>>
```

Added in v3.0.0

## or

**Signature**

```ts
export declare const or: <A, C extends A>(
  that: Refinement<A, C>
) => <B extends A>(self: Refinement<A, B>) => Refinement<A, C | B>
```

Added in v3.0.0
