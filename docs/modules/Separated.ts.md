---
title: Separated.ts
nav_order: 85
parent: Modules
---

## Separated overview

```ts
interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

Represents a result of separating a whole into two parts.

Added in v2.10.0

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor](#bifunctor)
  - [bimap](#bimap)
  - [mapLeft](#mapleft)
- [Functor](#functor)
  - [map](#map)
- [constructors](#constructors)
  - [separated](#separated)
- [instances](#instances)
  - [Bifunctor](#bifunctor-1)
  - [Functor](#functor-1)
  - [URI](#uri)
  - [URI (type alias)](#uri-type-alias)
- [type classes](#type-classes)
  - [Separated (interface)](#separated-interface)

---

# Bifunctor

## bimap

Map a pair of functions over the two type arguments of the bifunctor.

**Signature**

```ts
export declare const bimap: <A, B, C, D>(g: (A: A) => B, f: (c: C) => D) => (fa: Separated<A, C>) => Separated<B, D>
```

Added in v2.10.0

## mapLeft

Map a function over the first type argument of a bifunctor.

**Signature**

```ts
export declare const mapLeft: <A, B>(f: (a: A) => B) => <C>(fa: Separated<A, C>) => Separated<B, C>
```

Added in v2.10.0

# Functor

## map

`map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
use the type constructor `F` to represent some computational context.

**Signature**

```ts
export declare const map: <B, C>(f: (b: B) => C) => <A>(fa: Separated<A, B>) => Separated<A, C>
```

Added in v2.10.0

# constructors

## separated

**Signature**

```ts
export declare const separated: <A, B>(left: A, right: B) => Separated<A, B>
```

Added in v2.10.0

# instances

## Bifunctor

**Signature**

```ts
export declare const Bifunctor: Bifunctor2<'Separated'>
```

Added in v2.10.0

## Functor

**Signature**

```ts
export declare const Functor: Functor2<'Separated'>
```

Added in v2.10.0

## URI

**Signature**

```ts
export declare const URI: 'Separated'
```

Added in v2.10.0

## URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.10.0

# type classes

## Separated (interface)

A `Separated` type which holds `left` and `right` parts.

**Signature**

```ts
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}
```

Added in v2.10.0
