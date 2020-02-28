---
title: Const.ts
nav_order: 21
parent: Modules
---

# Const overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Const (type alias)](#const-type-alias)
- [URI (type alias)](#uri-type-alias)
- [URI](#uri)
- [const\_](#const_)
- [contramap](#contramap)
- [getApplicative](#getapplicative)
- [getApply](#getapply)
- [getEq](#geteq)
- [getShow](#getshow)
- [make](#make)
- [map](#map)

---

# Const (type alias)

**Signature**

```ts
export type Const<E, A> = E & { readonly _A: A }
```

Added in v2.0.0

# URI (type alias)

**Signature**

```ts
export type URI = typeof URI
```

Added in v2.0.0

# URI

**Signature**

```ts
export const URI: "Const" = ...
```

Added in v2.0.0

# const\_

**Signature**

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = ...
```

Added in v2.0.0

# contramap

**Signature**

```ts
<A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0

# getApplicative

**Signature**

```ts
export function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E> { ... }
```

Added in v2.0.0

# getApply

**Signature**

```ts
export function getApply<E>(S: Semigroup<E>): Apply2C<URI, E> { ... }
```

Added in v2.0.0

# getEq

**Signature**

```ts
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = ...
```

Added in v2.0.0

# getShow

**Signature**

```ts
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> { ... }
```

Added in v2.0.0

# make

**Signature**

```ts
export const make: <E, A = never>(e: E) => Const<E, A> = ...
```

Added in v2.0.0

# map

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0
