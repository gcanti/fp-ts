---
title: Refinement.ts
nav_order: 88
parent: Modules
---

## Refinement overview

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [Refinement (interface)](#refinement-interface)
  - [and](#and)
  - [not](#not)
  - [or](#or)

---

# utils

## Refinement (interface)

**Signature**

```ts
export interface Refinement<A, B extends A> {
  (a: A): a is B
}
```

Added in v2.11.0

## and

**Signature**

```ts
export declare const and: <A, C extends A>(
  second: Refinement<A, C>
) => <B extends A>(first: Refinement<A, B>) => Refinement<A, B & C>
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
