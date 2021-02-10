---
title: BooleanAlgebra.ts
nav_order: 8
parent: Modules
---

## BooleanAlgebra overview

Boolean algebras are Heyting algebras with the additional constraint that the law of the excluded middle is true
(equivalently, double-negation is true).

Instances should satisfy the following laws in addition to the `HeytingAlgebra` laws:

- Excluded middle: `a ∨ ¬a <-> 1`

Boolean algebras generalize classical logic: one is equivalent to "true" and zero is equivalent to "false".

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [reverse](#reverse)
  - [~~getDualBooleanAlgebra~~](#getdualbooleanalgebra)
- [instances](#instances)
  - [booleanAlgebraVoid](#booleanalgebravoid)
  - [~~booleanAlgebraBoolean~~](#booleanalgebraboolean)
  - [~~getFunctionBooleanAlgebra~~](#getfunctionbooleanalgebra)
- [type classes](#type-classes)
  - [BooleanAlgebra (interface)](#booleanalgebra-interface)

---

# combinators

## reverse

Every boolean algebras has a dual algebra, which involves reversing one/zero as well as join/meet.

**Signature**

```ts
export declare const reverse: <A>(B: BooleanAlgebra<A>) => BooleanAlgebra<A>
```

Added in v2.10.0

## ~~getDualBooleanAlgebra~~

Use `reverse` instead.

**Signature**

```ts
export declare const getDualBooleanAlgebra: <A>(B: BooleanAlgebra<A>) => BooleanAlgebra<A>
```

Added in v2.0.0

# instances

## booleanAlgebraVoid

**Signature**

```ts
export declare const booleanAlgebraVoid: BooleanAlgebra<void>
```

Added in v2.0.0

## ~~booleanAlgebraBoolean~~

Use `boolean.BooleanAlgebra` instead.

**Signature**

```ts
export declare const booleanAlgebraBoolean: BooleanAlgebra<boolean>
```

Added in v2.0.0

## ~~getFunctionBooleanAlgebra~~

Use `function.getBooleanAlgebra` instead

**Signature**

```ts
export declare const getFunctionBooleanAlgebra: <B>(
  B: BooleanAlgebra<B>
) => <A = never>() => BooleanAlgebra<(a: A) => B>
```

Added in v2.0.0

# type classes

## BooleanAlgebra (interface)

**Signature**

```ts
export interface BooleanAlgebra<A> extends HeytingAlgebra<A> {}
```

Added in v2.0.0
