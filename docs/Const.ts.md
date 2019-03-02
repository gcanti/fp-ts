---
title: Const.ts
nav_order: 20
---

**Table of contents**

- [URI (type alias)](#uri-type-alias)
- [Const (class)](#const-class)
  - [map (method)](#map-method)
  - [contramap (method)](#contramap-method)
  - [fold (method)](#fold-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [const\_ (constant)](#const_-constant)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getSetoid (function)](#getsetoid-function)# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

# Const (class)

**Signature**

```ts
export class Const<L, A> {
  constructor(readonly value: L) { ... }
  ...
}
```

Added in v1.0.0

## map (method)

**Signature**

```ts
map<B>(f: (a: A) => B): Const<L, B> { ... }
```

## contramap (method)

**Signature**

```ts
contramap<B>(f: (b: B) => A): Const<L, B> { ... }
```

## fold (method)

**Signature**

```ts
fold<B>(f: (l: L) => B): B { ... }
```

## inspect (method)

**Signature**

```ts
inspect(): string { ... }
```

## toString (method)

**Signature**

```ts
toString(): string { ... }
```

# URI (constant)

**Signature**

```ts
export const URI = ...
```

# const\_ (constant)

**Signature**

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = ...
```

Added in v1.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v1.0.0

# getApply (function)

**Signature**

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v1.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ...
```

Added in v1.0.0
