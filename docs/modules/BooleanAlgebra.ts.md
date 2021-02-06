---
title: BooleanAlgebra.ts
nav_order: 7
parent: Modules
---

## BooleanAlgebra overview

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a <-> 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [reverse](#reverse)
- [type classes](#type-classes)
  - [BooleanAlgebra (interface)](#booleanalgebra-interface)

---

# combinators

## reverse

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature**

```ts
export declare const reverse: <A>(BA: BooleanAlgebra<A>) => BooleanAlgebra<A>
```

Added in v3.0.0

# type classes

## BooleanAlgebra (interface)

**Signature**

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v3.0.0
