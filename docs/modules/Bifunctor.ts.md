---
title: Bifunctor.ts
nav_order: 6
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [Bifunctor (interface)](#bifunctor-interface)
- [Bifunctor2 (interface)](#bifunctor2-interface)
- [Bifunctor2C (interface)](#bifunctor2c-interface)
- [Bifunctor3 (interface)](#bifunctor3-interface)
- [Bifunctor3C (interface)](#bifunctor3c-interface)

---

# Bifunctor (interface)

**Signature**

```ts
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
  readonly mapLeft: <L, A, M>(fla: HKT2<F, L, A>, f: (l: L) => M) => HKT2<F, M, A>
}
```

Added in v2.0.0

# Bifunctor2 (interface)

**Signature**

```ts
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
  readonly mapLeft: <L, A, M>(fla: Type2<F, L, A>, f: (l: L) => M) => Type2<F, M, A>
}
```

# Bifunctor2C (interface)

**Signature**

```ts
export interface Bifunctor2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly bimap: <A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
  readonly mapLeft: <A, M>(fla: Type2<F, L, A>, f: (l: L) => M) => Type2<F, M, A>
}
```

# Bifunctor3 (interface)

**Signature**

```ts
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <U, L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => Type3<F, U, M, B>
  readonly mapLeft: <U, L, A, M>(fla: Type3<F, U, L, A>, f: (l: L) => M) => Type3<F, U, M, A>
}
```

# Bifunctor3C (interface)

**Signature**

```ts
export interface Bifunctor3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  readonly bimap: <L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => Type3<F, U, M, B>
  readonly mapLeft: <L, A, M>(fla: Type3<F, U, L, A>, f: (l: L) => M) => Type3<F, U, M, A>
}
```
