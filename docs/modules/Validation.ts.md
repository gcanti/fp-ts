---
title: Validation.ts
nav_order: 92
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getAlt (function)](#getalt-function)
- [getApplicative (function)](#getapplicative-function)
- [getCompactable (function)](#getcompactable-function)
- [getFilterable (function)](#getfilterable-function)
- [getMonad (function)](#getmonad-function)
- [getMonadThrow (function)](#getmonadthrow-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)
- [getWitherable (function)](#getwitherable-function)

---

# getAlt (function)

**Signature**

```ts
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => ...
```

Added in v1.0.0

# getApplicative (function)

**Signature**

```ts
export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => ...
```

# getCompactable (function)

Builds `Compactable` instance for `Validation` given `Monoid` for the failure side

**Signature**

```ts
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> { ... }
```

Added in v1.7.0

# getFilterable (function)

Builds `Filterable` instance for `Validation` given `Monoid` for the left side

**Signature**

```ts
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> { ... }
```

Added in v1.7.0

# getMonad (function)

**Note**: This function is here just to avoid switching to / from `Either`

**Signature**

```ts
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => ...
```

Added in v1.0.0

# getMonadThrow (function)

**Signature**

```ts
export const getMonadThrow = <L>(S: Semigroup<L>): MonadThrow2C<URI, L> => ...
```

Added in v1.16.0

# getMonoid (function)

**Signature**

```ts
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>> => ...
```

Added in v1.0.0

# getSemigroup (function)

**Signature**

```ts
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>> => ...
```

Added in v1.0.0

# getWitherable (function)

Builds `Witherable` instance for `Validation` given `Monoid` for the left side

**Signature**

```ts
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> { ... }
```

Added in v1.7.0
