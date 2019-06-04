---
title: Extend.ts
nav_order: 28
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
- [Extend4 (interface)](#extend4-interface)
- [~~duplicate~~ (function)](#duplicate-function)

---

# Extend (interface)

**Signature**

```ts
export interface Extend<F> extends Functor<F> {
  readonly extend: <A, B>(ea: HKT<F, A>, f: (fa: HKT<F, A>) => B) => HKT<F, B>
}
```

Added in v1.0.0

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

# Extend4 (interface)

**Signature**

```ts
export interface Extend4<W extends URIS4> extends Functor4<W> {
  readonly extend: <X, U, L, A, B>(wa: Type4<W, X, U, L, A>, f: (wa: Type4<W, X, U, L, A>) => B) => Type4<W, X, U, L, B>
}
```

# ~~duplicate~~ (function)

**Signature**

```ts
export function duplicate<F extends URIS3>(
  E: Extend3<F>
): <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
export function duplicate<F extends URIS3, U, L>(
  E: Extend3C<F, U, L>
): <A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
export function duplicate<F extends URIS2>(E: Extend2<F>): <L, A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
export function duplicate<F extends URIS2, L>(E: Extend2C<F, L>): <A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
export function duplicate<F extends URIS>(E: Extend1<F>): <A>(ma: Type<F, A>) => Type<F, Type<F, A>>
export function duplicate<F>(E: Extend<F>): <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>> { ... }
```

Added in v1.0.0
