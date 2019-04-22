---
title: Const.ts
nav_order: 20
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Const (type alias)](#const-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [const\_ (constant)](#const_-constant)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getSetoid (function)](#getsetoid-function)
- [getShow (function)](#getshow-function)
- [make (function)](#make-function)

---

# Const (type alias)

**Signature**

```ts
export type Const<L, A> = L & { A: A }
```

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
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

Added in v2.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(M: Monoid<L>): Applicative2C<URI, L> => ...
```

Added in v2.0.0

# getApply (function)

**Signature**

```ts
export const getApply = <L>(S: Semigroup<L>): Apply2C<URI, L> => ...
```

Added in v2.0.0

# getSetoid (function)

**Signature**

```ts
export const getSetoid = <L, A>(S: Setoid<L>): Setoid<Const<L, A>> => ...
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export const getShow = <L, A>(S: Show<L>): Show<Const<L, A>> => ...
```

Added in v2.0.0

# make (function)

**Signature**

```ts
export const make = <L>(l: L): Const<L, never> => ...
```

Added in v2.0.0
