---
title: Comonad.ts
nav_order: 17
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Comonad (interface)](#comonad-interface)
- [Comonad1 (interface)](#comonad1-interface)
- [Comonad2 (interface)](#comonad2-interface)
- [Comonad2C (interface)](#comonad2c-interface)
- [Comonad3 (interface)](#comonad3-interface)
- [Comonad3C (interface)](#comonad3c-interface)

---

# Comonad (interface)

**Signature**

```ts
export interface Comonad<W> extends Extend<W> {
  readonly extract: <A>(wa: HKT<W, A>) => A
}
```

Added in v2.0.0

# Comonad1 (interface)

**Signature**

```ts
export interface Comonad1<W extends URIS> extends Extend1<W> {
  readonly extract: <A>(wa: Type<W, A>) => A
}
```

# Comonad2 (interface)

**Signature**

```ts
export interface Comonad2<W extends URIS2> extends Extend2<W> {
  readonly extract: <L, A>(wa: Type2<W, L, A>) => A
}
```

# Comonad2C (interface)

**Signature**

```ts
export interface Comonad2C<W extends URIS2, L> extends Extend2C<W, L> {
  readonly extract: <A>(wa: Type2<W, L, A>) => A
}
```

# Comonad3 (interface)

**Signature**

```ts
export interface Comonad3<W extends URIS3> extends Extend3<W> {
  readonly extract: <U, L, A>(wa: Type3<W, U, L, A>) => A
}
```

# Comonad3C (interface)

**Signature**

```ts
export interface Comonad3C<W extends URIS3, U, L> extends Extend3C<W, U, L> {
  readonly extract: <A>(wa: Type3<W, U, L, A>) => A
}
```
