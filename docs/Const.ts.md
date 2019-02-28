---
title: Const.ts
nav_order: 20
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [URI](#uri)
- [Const](#const)
  - [map](#map)
  - [contramap](#contramap)
  - [fold](#fold)
  - [inspect](#inspect)
  - [toString](#tostring)
- [URI](#uri-1)
- [const\_](#const%5C_)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getSetoid](#getsetoid)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# URI

**Signature** (type alias)

```ts
export type URI = typeof URI
```

# Const

**Signature** (class)

```ts
export class Const<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

Added in v1.0.0

## map

**Signature** (method)

```ts
map<B>(f: (a: A) => B): Const<L, B> { ... }
```

## contramap

**Signature** (method)

```ts
contramap<B>(f: (b: B) => A): Const<L, B> { ... }
```

## fold

**Signature** (method)

```ts
fold<B>(f: (l: L) => B): B { ... }
```

## inspect

**Signature** (method)

```ts
inspect(): string { ... }
```

## toString

**Signature** (method)

```ts
toString(): string { ... }
```

# URI

**Signature** (constant)

```ts
export const URI = ...
```

# const\_

**Signature** (constant)

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = ...
```

Added in v1.0.0

# getApplicative

**Signature** (function)

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v1.0.0

# getApply

**Signature** (function)

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v1.0.0

# getSetoid

**Signature** (function)

```ts
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ...
```

Added in v1.0.0
