---
title: Alternative.ts
nav_order: 2
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Alternative](#alternative)
- [Alternative1](#alternative1)
- [Alternative2](#alternative2)
- [Alternative2C](#alternative2c)
- [Alternative3](#alternative3)
- [Alternative3C](#alternative3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Alternative

The `Alternative` type class has no members of its own; it just specifies that the type constructor has both
`Applicative` and `Plus` instances.

Types which have `Alternative` instances should also satisfy the following laws:

1. Distributivity: `A.ap(A.alt(fab, gab), fa) = A.alt(A.ap(fab, fa), A.ap(gab, fa))`
2. Annihilation: `A.ap(zero, fa) = zero`

**Signature** (interface)

```ts
export interface Alternative<F> extends Applicative<F>, Plus<F> {}
```

Added in v1.0.0

# Alternative1

**Signature** (interface)

```ts
export interface Alternative1<F extends URIS> extends Applicative1<F>, Plus1<F> {}
```

# Alternative2

**Signature** (interface)

```ts
export interface Alternative2<F extends URIS2> extends Applicative2<F>, Plus2<F> {}
```

# Alternative2C

**Signature** (interface)

```ts
export interface Alternative2C<F extends URIS2, L> extends Applicative2C<F, L>, Plus2C<F, L> {}
```

# Alternative3

**Signature** (interface)

```ts
export interface Alternative3<F extends URIS3> extends Applicative3<F>, Plus3<F> {}
```

# Alternative3C

**Signature** (interface)

```ts
export interface Alternative3C<F extends URIS3, U, L> extends Applicative3C<F, U, L>, Plus3C<F, U, L> {}
```
