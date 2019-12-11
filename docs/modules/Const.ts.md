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
- [URI (constant)](#uri-constant)
- [const\_ (constant)](#const_-constant)
- [getEq (constant)](#geteq-constant)
- [make (constant)](#make-constant)
- [getApplicative (function)](#getapplicative-function)
- [getApply (function)](#getapply-function)
- [getShow (function)](#getshow-function)
- [contramap (export)](#contramap-export)
- [map (export)](#map-export)

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

# URI (constant)

**Signature**

```ts
export const URI: "Const" = ...
```

Added in v2.0.0

# const\_ (constant)

**Signature**

```ts
export const const_: Functor2<URI> & Contravariant2<URI> = ...
```

Added in v2.0.0

# getEq (constant)

**Signature**

```ts
export const getEq: <E, A>(E: Eq<E>) => Eq<Const<E, A>> = ...
```

Added in v2.0.0

# make (constant)

**Signature**

```ts
export const make: <E, A = ...
```

Added in v2.0.0

# getApplicative (function)

**Signature**

```ts
export function getApplicative<E>(M: Monoid<E>): Applicative2C<URI, E> { ... }
```

Added in v2.0.0

# getApply (function)

**Signature**

```ts
export function getApply<E>(S: Semigroup<E>): Apply2C<URI, E> { ... }
```

Added in v2.0.0

# getShow (function)

**Signature**

```ts
export function getShow<E, A>(S: Show<E>): Show<Const<E, A>> { ... }
```

Added in v2.0.0

# contramap (export)

**Signature**

```ts
<A, B>(f: (b: B) => A) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Const<E, A>) => Const<E, B>
```

Added in v2.0.0
