---
title: BooleanAlgebra.ts
nav_order: 7
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [BooleanAlgebra](#booleanalgebra)
- [booleanAlgebraBoolean](#booleanalgebraboolean)
- [booleanAlgebraVoid](#booleanalgebravoid)
- [getDualBooleanAlgebra](#getdualbooleanalgebra)
- [getFunctionBooleanAlgebra](#getfunctionbooleanalgebra)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# BooleanAlgebra

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a = 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

**Signature** (interface)

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v1.4.0

# booleanAlgebraBoolean

**Signature** (constant)

```ts
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = ...
```

Added in v1.4.0

# booleanAlgebraVoid

**Signature** (constant)

```ts
export const booleanAlgebraVoid: BooleanAlgebra<void> = ...
```

Added in v1.4.0

# getDualBooleanAlgebra

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature** (function)

```ts
export const getDualBooleanAlgebra = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => ...
```

Added in v1.4.0

# getFunctionBooleanAlgebra

**Signature** (function)

```ts
export const getFunctionBooleanAlgebra = <B>(B: BooleanAlgebra<B>) => <A = never>(): BooleanAlgebra<(a: A) => B> => ...
```

Added in v1.4.0
