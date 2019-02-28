---
id: BooleanAlgebra
title: BooleanAlgebra
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BooleanAlgebra.ts)

# BooleanAlgebra

**Signature** (type class)

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a = 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

Added in v1.4.0

## booleanAlgebraBoolean

**Signature** (constant)

```ts
export const booleanAlgebraBoolean: BooleanAlgebra<boolean> = ...
```

Added in v1.4.0

## booleanAlgebraVoid

**Signature** (constant)

```ts
export const booleanAlgebraVoid: BooleanAlgebra<void> = ...
```

Added in v1.4.0

## getDualBooleanAlgebra

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature** (function)

```ts
export const getDualBooleanAlgebra = <A>(B: BooleanAlgebra<A>): BooleanAlgebra<A> => { ... }
```

Added in v1.4.0

## getFunctionBooleanAlgebra

**Signature** (function)

```ts
export const getFunctionBooleanAlgebra = <B>(B: BooleanAlgebra<B>) => <A = never>(): BooleanAlgebra<(a: A) => B> => { ... }
```

Added in v1.4.0
