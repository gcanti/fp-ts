---
title: BooleanAlgebra.ts
nav_order: 7
parent: Modules
---

# Overview

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a = 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

---

<h2 class="text-delta">Table of contents</h2>

- [BooleanAlgebra (interface)](#booleanalgebra-interface)
- [booleanAlgebraBoolean (constant)](#booleanalgebraboolean-constant)
- [booleanAlgebraVoid (constant)](#booleanalgebravoid-constant)
- [getDualBooleanAlgebra (function)](#getdualbooleanalgebra-function)
- [getFunctionBooleanAlgebra (function)](#getfunctionbooleanalgebra-function)

---

# BooleanAlgebra (interface)

**Signature**

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v2.0.0

# booleanAlgebraBoolean (constant)

**Signature**

```ts
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = ...
```

Added in v2.0.0

# booleanAlgebraVoid (constant)

**Signature**

```ts
export const booleanAlgebraVoid: BooleanAlgebra<void> = ...
```

Added in v2.0.0

# getDualBooleanAlgebra (function)

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature**

```ts
export function getDualBooleanAlgebra<A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> { ... }
```

Added in v2.0.0

# getFunctionBooleanAlgebra (function)

**Signature**

```ts
export function getFunctionBooleanAlgebra<B>(B: BooleanAlgebra<B>): <A = never>() => BooleanAlgebra<(a: A) => B> { ... }
```

Added in v2.0.0
