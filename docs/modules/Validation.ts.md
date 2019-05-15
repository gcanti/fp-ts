---
title: Validation.ts
nav_order: 92
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [getAlt (function)](#getalt-function)
- [getApplicative (function)](#getapplicative-function)
- [getMonad (function)](#getmonad-function)
- [getMonoid (function)](#getmonoid-function)
- [getSemigroup (function)](#getsemigroup-function)

---

# getAlt (function)

**Signature**

```ts
export function getAlt<L>(S: Semigroup<L>): Alt2C<URI, L> { ... }
```

Added in v2.0.0

# getApplicative (function)

**Signature**

```ts
export function getApplicative<L>(
  S: Semigroup<L>
): Applicative2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L> { ... }
```

# getMonad (function)

**Note**: This function is here just to avoid switching to / from `Either`

**Signature**

```ts
export function getMonad<L>(
  S: Semigroup<L>
): Monad2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L> { ... }
```

Added in v2.0.0

# getMonoid (function)

**Signature**

```ts
export function getMonoid<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>> { ... }
```

Added in v2.0.0

# getSemigroup (function)

**Signature**

```ts
export function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>> { ... }
```

Added in v2.0.0
