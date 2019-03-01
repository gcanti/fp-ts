---
title: Comonad.ts
nav_order: 17
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of contents**

- [Comonad](#comonad)
- [Comonad1](#comonad1)
- [Comonad2](#comonad2)
- [Comonad2C](#comonad2c)
- [Comonad3](#comonad3)
- [Comonad3C](#comonad3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Comonad

**Signature** (interface)

```ts
export interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```

Added in v1.0.0

# Comonad1

**Signature** (interface)

```ts
export interface Comonad1<F extends URIS> extends Extend1<F> {
  readonly extract: <A>(ca: Type<F, A>) => A
}
```

# Comonad2

**Signature** (interface)

```ts
export interface Comonad2<F extends URIS2> extends Extend2<F> {
  readonly extract: <L, A>(ca: Type2<F, L, A>) => A
}
```

# Comonad2C

**Signature** (interface)

```ts
export interface Comonad2C<F extends URIS2, L> extends Extend2C<F, L> {
  readonly extract: <A>(ca: Type2<F, L, A>) => A
}
```

# Comonad3

**Signature** (interface)

```ts
export interface Comonad3<F extends URIS3> extends Extend3<F> {
  readonly extract: <U, L, A>(ca: Type3<F, U, L, A>) => A
}
```

# Comonad3C

**Signature** (interface)

```ts
export interface Comonad3C<F extends URIS3, U, L> extends Extend3C<F, U, L> {
  readonly extract: <A>(ca: Type3<F, U, L, A>) => A
}
```
