---
title: Witherable.ts
nav_order: 94
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Witherable (interface)](#witherable-interface)
- [Witherable1 (interface)](#witherable1-interface)
- [Witherable2 (interface)](#witherable2-interface)
- [Witherable2C (interface)](#witherable2c-interface)
- [Witherable3 (interface)](#witherable3-interface)
- [Witherable3C (interface)](#witherable3c-interface)

---

# Witherable (interface)

**Signature**

```ts
export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  /**
   * Partition a structure with effects
   */
  wilt: Wilt<T>

  /**
   * Filter a structure  with effects
   */
  wither: Wither<T>
}
```

Added in v2.0.0

# Witherable1 (interface)

**Signature**

```ts
export interface Witherable1<T extends URIS> extends Traversable1<T>, Filterable1<T> {
  wilt: Wilt1<T>
  wither: Wither1<T>
}
```

Added in v2.0.0

# Witherable2 (interface)

**Signature**

```ts
export interface Witherable2<T extends URIS2> extends Traversable2<T>, Filterable2<T> {
  wilt: Wilt2<T>
  wither: Wither2<T>
}
```

Added in v2.0.0

# Witherable2C (interface)

**Signature**

```ts
export interface Witherable2C<T extends URIS2, TL> extends Traversable2C<T, TL>, Filterable2C<T, TL> {
  wilt: Wilt2C<T, TL>
  wither: Wither2C<T, TL>
}
```

Added in v2.0.0

# Witherable3 (interface)

**Signature**

```ts
export interface Witherable3<T extends URIS3> extends Traversable3<T>, Filterable3<T> {
  wilt: Wilt3<T>
  wither: Wither3<T>
}
```

Added in v2.0.0

# Witherable3C (interface)

**Signature**

```ts
export interface Witherable3C<T extends URIS3, TU, TL> extends Traversable3C<T, TU, TL>, Filterable3C<T, TU, TL> {
  wilt: Wilt3C<T, TU, TL>
  wither: Wither3C<T, TU, TL>
}
```

Added in v2.0.0
