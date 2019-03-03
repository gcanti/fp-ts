---
title: Alternative.ts
nav_order: 2
---

# Overview

The `Alternative` type class has no members of its own; it just specifies that the type constructor has both
`Applicative` and `Plus` instances.

Types which have `Alternative` instances should also satisfy the following laws:

1. Distributivity: `A.ap(A.alt(fab, gab), fa) = A.alt(A.ap(fab, fa), A.ap(gab, fa))`
2. Annihilation: `A.ap(zero, fa) = zero`

**Table of contents**

- [Alternative (interface)](#alternative-interface)
- [Alternative1 (interface)](#alternative1-interface)
- [Alternative2 (interface)](#alternative2-interface)
- [Alternative2C (interface)](#alternative2c-interface)
- [Alternative3 (interface)](#alternative3-interface)
- [Alternative3C (interface)](#alternative3c-interface)

# Alternative (interface)

**Signature**

```ts
export interface Alternative<F> extends Applicative<F>, Plus<F> {}
```

Added in v1.0.0

# Alternative1 (interface)

**Signature**

```ts
export interface Alternative1<F extends URIS> extends Applicative1<F>, Plus1<F> {}
```

# Alternative2 (interface)

**Signature**

```ts
export interface Alternative2<F extends URIS2> extends Applicative2<F>, Plus2<F> {}
```

# Alternative2C (interface)

**Signature**

```ts
export interface Alternative2C<F extends URIS2, L> extends Applicative2C<F, L>, Plus2C<F, L> {}
```

# Alternative3 (interface)

**Signature**

```ts
export interface Alternative3<F extends URIS3> extends Applicative3<F>, Plus3<F> {}
```

# Alternative3C (interface)

**Signature**

```ts
export interface Alternative3C<F extends URIS3, U, L> extends Applicative3C<F, U, L>, Plus3C<F, U, L> {}
```
