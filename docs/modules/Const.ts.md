---
title: Const.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [URI (type alias)](#uri-type-alias)
- [Const (class)](#const-class)
  - [map (method)](#map-method)
  - [contramap (method)](#contramap-method)
  - [fold (method)](#fold-method)
  - [inspect (method)](#inspect-method)
  - [toString (method)](#tostring-method)
- [URI (constant)](#uri-constant)
- [const\_ (constant)](#const_-constant)
- [~~getSetoid~~ (constant)](#getsetoid-constant)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getEq (function)](#geteq-function)
- [getShow (function)](#getshow-function)
- [make (function)](#make-function)

---

# URI (type alias)

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

# ~~getSetoid~~ (constant)

Use `getEq`

**Signature**

```ts
export const getSetoid: <L, A>(S: Eq<L>) => Eq<Const<L, A>> = ...
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

# getEq (function)

**Signature**

```ts
export function getEq<L, A>(S: Eq<L>): Eq<Const<L, A>> { ... }
```

Added in v1.19.0

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(S: Show<L>): Show<Const<L, A>> => ...
```

Added in v1.17.0

# make (function)

**Signature**

```ts
export function make<L>(l: L): Const<L, never> { ... }
```

Added in v1.19.0
