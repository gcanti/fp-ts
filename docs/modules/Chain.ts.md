---
title: Chain.ts
nav_order: 14
parent: Modules
---

## Chain overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [ap](#ap)
  - [chainFirst](#chainfirst)
- [type classes](#type-classes)
  - [Chain (interface)](#chain-interface)
- [utils](#utils)
  - [bind](#bind)

---

# combinators

## ap

**Signature**

```ts
export declare const ap: <F extends HKT>(
  M: Chain<F>
) => <S, R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => <B>(fab: Kind<F, S, R, W, E, (a: A) => B>) => Kind<F, S, R, W, E, B>
```

Added in v3.0.0

## chainFirst

**Signature**

```ts
export declare const chainFirst: <M extends HKT>(
  M: Chain<M>
) => <A, S, R, W, E, B>(
  f: (a: A) => Kind<M, S, R, W, E, B>
) => (first: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>
```

Added in v3.0.0

# type classes

## Chain (interface)

**Signature**

```ts
export interface Chain<M extends HKT> extends Functor<M> {
  readonly chain: <A, S, R, W, E, B>(
    f: (a: A) => Kind<M, S, R, W, E, B>
  ) => (ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, B>
}
```

Added in v3.0.0

# utils

## bind

**Signature**

```ts
export declare const bind: <M extends HKT>(
  M: Chain<M>
) => <N extends string, A, S, R, W, E, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => Kind<M, S, R, W, E, B>
) => (ma: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, { readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }>
```

Added in v3.0.0
