---
title: Traced.ts
nav_order: 86
parent: Modules
---

# Traced overview

Added in v2.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [Traced (interface)](#traced-interface)
- [URI (type alias)](#uri-type-alias)
- [URI (constant)](#uri-constant)
- [traced (constant)](#traced-constant)
- [censor (function)](#censor-function)
- [getComonad (function)](#getcomonad-function)
- [listen (function)](#listen-function)
- [listens (function)](#listens-function)
- [tracks (function)](#tracks-function)
- [map (export)](#map-export)

---

# Traced (interface)

**Signature**

```ts
export interface Traced<P, A> {
  (p: P): A
}
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
export const URI: "Traced" = ...
```

Added in v2.0.0

# traced (constant)

**Signature**

```ts
export const traced: Functor2<URI> = ...
```

Added in v2.0.0

# censor (function)

Apply a function to the current position

**Signature**

```ts
export function censor<P>(f: (p: P) => P): <A>(wa: Traced<P, A>) => Traced<P, A> { ... }
```

Added in v2.0.0

# getComonad (function)

**Signature**

```ts
export function getComonad<P>(monoid: Monoid<P>): Comonad2C<URI, P> { ... }
```

Added in v2.0.0

# listen (function)

Get the current position

**Signature**

```ts
export function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]> { ... }
```

Added in v2.0.0

# listens (function)

Get a value which depends on the current position

**Signature**

```ts
export function listens<P, B>(f: (p: P) => B): <A>(wa: Traced<P, A>) => Traced<P, [A, B]> { ... }
```

Added in v2.0.0

# tracks (function)

Extracts a value at a relative position which depends on the current value.

**Signature**

```ts
export function tracks<P, A>(M: Monoid<P>, f: (a: A) => P): (wa: Traced<P, A>) => A { ... }
```

Added in v2.0.0

# map (export)

**Signature**

```ts
<A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B>
```

Added in v2.0.0
