---
title: Extend.ts
nav_order: 29
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Extend (interface)](#extend-interface)
- [Extend1 (interface)](#extend1-interface)
- [Extend2 (interface)](#extend2-interface)
- [Extend2C (interface)](#extend2c-interface)
- [Extend3 (interface)](#extend3-interface)
- [Extend3C (interface)](#extend3c-interface)

---

# Extend (interface)

**Signature**

```ts
export interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v2.0.0

# Extend1 (interface)

**Signature**

```ts
export interface Extend1<F extends URIS> extends Functor1<F> {
  readonly extend: <A, B>(ea: Type<F, A>, f: (fa: Type<F, A>) => B) => Type<F, B>
}
```

# Extend2 (interface)

**Signature**

```ts
export interface Extend2<F extends URIS2> extends Functor2<F> {
  readonly extend: <L, A, B>(ea: Type2<F, L, A>, f: (fa: Type2<F, L, A>) => B) => Type2<F, L, B>
}
```

# Extend2C (interface)

**Signature**

```ts
export interface Extend2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly extend: <A, B>(ea: Type2<F, L, A>, f: (fa: Type2<F, L, A>) => B) => Type2<F, L, B>
}
```

# Extend3 (interface)

**Signature**

```ts
export interface Extend3<F extends URIS3> extends Functor3<F> {
  readonly extend: <U, L, A, B>(ea: Type3<F, U, L, A>, f: (fa: Type3<F, U, L, A>) => B) => Type3<F, U, L, B>
}
```

# Extend3C (interface)

**Signature**

```ts
export interface Extend3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly extend: <A, B>(ea: Type3<F, U, L, A>, f: (fa: Type3<F, U, L, A>) => B) => Type3<F, U, L, B>
}
```
