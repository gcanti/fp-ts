---
title: Bifunctor.ts
nav_order: 6
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Bifunctor](#bifunctor)
- [Bifunctor2](#bifunctor2)
- [Bifunctor3](#bifunctor3)
- [Bifunctor3C](#bifunctor3c)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Bifunctor

**Signature** (interface)

```ts
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: HKT2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => HKT2<F, M, B>
}
```

Added in v1.0.0

# Bifunctor2

**Signature** (interface)

```ts
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <L, A, M, B>(fla: Type2<F, L, A>, f: (l: L) => M, g: (a: A) => B) => Type2<F, M, B>
}
```

# Bifunctor3

**Signature** (interface)

```ts
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <U, L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => Type3<F, U, M, B>
}
```

# Bifunctor3C

**Signature** (interface)

```ts
export interface Bifunctor3C<F extends URIS3, U> {
  readonly URI: F
  readonly _U: U
  readonly bimap: <L, A, M, B>(fla: Type3<F, U, L, A>, f: (l: L) => M, g: (a: A) => B) => Type3<F, U, M, B>
}
```
