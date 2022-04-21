---
title: Predicate.ts
nav_order: 75
parent: Modules
---

## Predicate overview

Added in v2.11.0

---

<h2 class="text-delta">Table of contents</h2>

- [Contravariant](#contravariant)
  - [contramap](#contramap)
- [instances](#instances)
  - [Contravariant](#contravariant-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
  - [getMonoidAll](#getmonoidall)
  - [getMonoidAny](#getmonoidany)
  - [getSemigroupAll](#getsemigroupall)
  - [getSemigroupAny](#getsemigroupany)
- [utils](#utils)
  - [Predicate (interface)](#predicate-interface)
  - [and](#and)
  - [not](#not)
  - [or](#or)

---

# Contravariant

## contramap

**Signature**

```ts
export declare const contramap: <B, A>(f: (b: B) => A) => (predicate: Predicate<A>) => Predicate<B>
```

Added in v2.11.0

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: Contravariant1<'Predicate'>
```

Added in v2.11.0

## URI

**Signature**

```ts
export declare const URI: 'Predicate'
```

Added in v2.11.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.11.0

## getMonoidAll

**Signature**

```ts
export declare const getMonoidAll: <A = never>() => Monoid<Predicate<A>>
```

Added in v2.11.0

## getMonoidAny

**Signature**

```ts
export declare const getMonoidAny: <A = never>() => Monoid<Predicate<A>>
```

Added in v2.11.0

## getSemigroupAll

**Signature**

```ts
export declare const getSemigroupAll: <A = never>() => Semigroup<Predicate<A>>
```

Added in v2.11.0

## getSemigroupAny

**Signature**

```ts
export declare const getSemigroupAny: <A = never>() => Semigroup<Predicate<A>>
```

Added in v2.11.0

# utils

## Predicate (interface)

**Signature**

```ts
export interface Predicate<A> {
  (a: A): boolean
}
```

Added in v2.11.0

## and

**Signature**

```ts
export declare const and: <A>(second: Predicate<A>) => (first: Predicate<A>) => Predicate<A>
```

Added in v2.11.0

## not

**Signature**

```ts
export declare const not: <A>(predicate: Predicate<A>) => Predicate<A>
```

Added in v2.11.0

## or

**Signature**

```ts
export declare const or: <A>(second: Predicate<A>) => (first: Predicate<A>) => Predicate<A>
```

Added in v2.11.0
