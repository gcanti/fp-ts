---
title: Comonad.ts
nav_order: 17
---

**Table of contents**

- [Comonad (interface)](#comonad-interface)
- [Comonad1 (interface)](#comonad1-interface)
- [Comonad2 (interface)](#comonad2-interface)
- [Comonad2C (interface)](#comonad2c-interface)
- [Comonad3 (interface)](#comonad3-interface)
- [Comonad3C (interface)](#comonad3c-interface)

# Comonad (interface)

**Signature**

```ts
export interface Comonad<F> extends Extend<F> {
  readonly extract: <A>(ca: HKT<F, A>) => A
}
```

Added in v1.0.0

# Comonad1 (interface)

**Signature**

```ts
export interface Comonad1<F extends URIS> extends Extend1<F> {
  readonly extract: <A>(ca: Type<F, A>) => A
}
```

# Comonad2 (interface)

**Signature**

```ts
export interface Comonad2<F extends URIS2> extends Extend2<F> {
  readonly extract: <L, A>(ca: Type2<F, L, A>) => A
}
```

# Comonad2C (interface)

**Signature**

```ts
export interface Comonad2C<F extends URIS2, L> extends Extend2C<F, L> {
  readonly extract: <A>(ca: Type2<F, L, A>) => A
}
```

# Comonad3 (interface)

**Signature**

```ts
export interface Comonad3<F extends URIS3> extends Extend3<F> {
  readonly extract: <U, L, A>(ca: Type3<F, U, L, A>) => A
}
```

# Comonad3C (interface)

**Signature**

```ts
export interface Comonad3C<F extends URIS3, U, L> extends Extend3C<F, U, L> {
  readonly extract: <A>(ca: Type3<F, U, L, A>) => A
}
```
