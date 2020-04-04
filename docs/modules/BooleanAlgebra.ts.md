---
title: BooleanAlgebra.ts
nav_order: 8
parent: Modules
---

# BooleanAlgebra overview

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a = 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [BooleanAlgebra (interface)](#booleanalgebra-interface)
- [booleanAlgebraBoolean](#booleanalgebraboolean)
- [booleanAlgebraVoid](#booleanalgebravoid)
- [getDualBooleanAlgebra](#getdualbooleanalgebra)
- [getFunctionBooleanAlgebra](#getfunctionbooleanalgebra)

---

# BooleanAlgebra (interface)

**Signature**

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v2.0.0

# booleanAlgebraBoolean

**Signature**

```ts
export declare const booleanAlgebraBoolean: BooleanAlgebra<boolean>
```

Added in v2.0.0

# booleanAlgebraVoid

**Signature**

```ts
export declare const booleanAlgebraVoid: BooleanAlgebra<void>
```

Added in v2.0.0

# getDualBooleanAlgebra

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature**

```ts
export declare function getDualBooleanAlgebra<A>(B: BooleanAlgebra<A>): BooleanAlgebra<A>
```

Added in v2.0.0

# getFunctionBooleanAlgebra

**Signature**

```ts
export declare function getFunctionBooleanAlgebra<B>(B: BooleanAlgebra<B>): <A = never>() => BooleanAlgebra<(a: A) => B>
```

Added in v2.0.0
