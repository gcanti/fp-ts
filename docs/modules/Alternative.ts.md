---
title: Alternative.ts
nav_order: 2
parent: Modules
---

# Overview

The `Alternative` type class has no members of its own; it just specifies that the type constructor has both
`Applicative` and `Plus` instances.

Types which have `Alternative` instances should also satisfy the following laws:

1. Distributivity: `A.ap(A.alt(fab, gab), fa) = A.alt(A.ap(fab, fa), A.ap(gab, fa))`
2. Annihilation: `A.ap(zero, fa) = zero`

---

<h2 class="text-delta">Table of contents</h2>

- [Alternative (interface)](#alternative-interface)
- [Alternative1 (interface)](#alternative1-interface)
- [Alternative2 (interface)](#alternative2-interface)
- [Alternative2C (interface)](#alternative2c-interface)
- [Alternative3 (interface)](#alternative3-interface)

---

# Alternative (interface)

**Signature**

```ts
export interface Alternative<F> extends Applicative<F>, Plus<F> {}
```

Added in v2.0.0

# Alternative1 (interface)

**Signature**

```ts
export interface Alternative1<F extends URIS> extends Applicative1<F>, Plus1<F> {}
```

Added in v2.0.0

# Alternative2 (interface)

**Signature**

```ts
export interface Alternative2<F extends URIS2> extends Applicative2<F>, Plus2<F> {}
```

Added in v2.0.0

# Alternative2C (interface)

**Signature**

```ts
export interface Alternative2C<F extends URIS2, L> extends Applicative2C<F, L>, Plus2C<F, L> {}
```

Added in v2.0.0

# Alternative3 (interface)

**Signature**

```ts
export interface Alternative3<F extends URIS3> extends Applicative3<F>, Plus3<F> {}
```

Added in v2.0.0
