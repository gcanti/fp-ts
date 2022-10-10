---
title: Predicate.ts
nav_order: 55
parent: Modules
---

## Predicate overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Contravariant](#contravariant)
  - [getMonoidAll](#getmonoidall)
  - [getMonoidAny](#getmonoidany)
  - [getSemigroupAll](#getsemigroupall)
  - [getSemigroupAny](#getsemigroupany)
- [model](#model)
  - [Predicate (interface)](#predicate-interface)
- [type lambdas](#type-lambdas)
  - [PredicateTypeLambda (interface)](#predicatetypelambda-interface)
- [utils](#utils)
  - [and](#and)
  - [contramap](#contramap)
  - [not](#not)
  - [or](#or)

---

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<PredicateTypeLambda>
```

Added in v3.0.0

## getMonoidAll

**Signature**

```ts
export declare const getMonoidAll: <A>() => Monoid<Predicate<A>>
```

Added in v3.0.0

## getMonoidAny

**Signature**

```ts
export declare const getMonoidAny: <A>() => Monoid<Predicate<A>>
```

Added in v3.0.0

## getSemigroupAll

**Signature**

```ts
export declare const getSemigroupAll: <A>() => Semigroup<Predicate<A>>
```

Added in v3.0.0

## getSemigroupAny

**Signature**

```ts
export declare const getSemigroupAny: <A>() => Semigroup<Predicate<A>>
```

Added in v3.0.0

# model

## Predicate (interface)

**Signature**

```ts
export interface Predicate<A> {
  (a: A): boolean
}
```

Added in v3.0.0

# type lambdas

## PredicateTypeLambda (interface)

**Signature**

```ts
export interface PredicateTypeLambda extends TypeLambda {
  readonly type: Predicate<this['In1']>
}
```

Added in v3.0.0

# utils

## and

**Signature**

```ts
export declare const and: <A>(that: Predicate<A>) => (self: Predicate<A>) => Predicate<A>
```

Added in v3.0.0

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (fa: Predicate<A>) => Predicate<B>
```

Added in v3.0.0

## not

**Signature**

```ts
export declare const not: <A>(predicate: Predicate<A>) => Predicate<A>
```

Added in v3.0.0

## or

**Signature**

```ts
export declare const or: <A>(that: Predicate<A>) => (self: Predicate<A>) => Predicate<A>
```

Added in v3.0.0
