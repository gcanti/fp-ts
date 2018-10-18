---
id: BooleanAlgebra
title: Module BooleanAlgebra
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/BooleanAlgebra.ts)

# BooleanAlgebra

```ts
interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v1.4.0 (type class)

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a = 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

## booleanAlgebraBoolean

```ts
BooleanAlgebra<boolean>
```

Added in v1.4.0 (instance)

## booleanAlgebraVoid

```ts
BooleanAlgebra<void>
```

Added in v1.4.0 (instance)

## getDualBooleanAlgebra

```ts
<A>(B: BooleanAlgebra<A>): BooleanAlgebra<A>
```

Added in v1.4.0 (function)

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

## getFunctionBooleanAlgebra

```ts
<B>(B: BooleanAlgebra<B>) => <A = never>(): BooleanAlgebra<(a: A) => B>
```

Added in v1.4.0 (function)
