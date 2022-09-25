---
title: StateT.ts
nav_order: 92
parent: Modules
---

## StateT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [StateT (interface)](#statet-interface)
  - [ap](#ap)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [flatMap](#flatmap)
  - [fromF](#fromf)
  - [fromState](#fromstate)
  - [map](#map)
  - [of](#of)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<F extends TypeLambda, FS, FR, FW, FE, S, A> {
  (s: S): Kind<F, FS, FR, FW, FE, readonly [S, A]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <FS, FR2, FW2, FE2, S, A>(
  fa: StateT<F, FS, FR2, FW2, FE2, S, A>
) => <FR1, FW1, FE1, B>(
  fab: StateT<F, FS, FR1, FW1, FE1, S, (a: A) => B>
) => StateT<F, FS, FR1 & FR2, FW2 | FW1, FE2 | FE1, S, B>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare function evaluate<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare function execute<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, S>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <A, FS, FR2, FW2, FE2, S, B>(
  f: (a: A) => StateT<F, FS, FR2, FW2, FE2, S, B>
) => <FR1, FW1, FE1>(ma: StateT<F, FS, FR1, FW1, FE1, S, A>) => StateT<F, FS, FR1 & FR2, FW2 | FW1, FE2 | FE1, S, B>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends TypeLambda>(
  F: Functor<F>
): <FS, FR, FW, FE, A, S>(self: Kind<F, FS, FR, FW, FE, A>) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare function fromState<F extends TypeLambda>(
  F: Pointed<F>
): <S, A, FS, FR, FW, FE>(sa: State<S, A>) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <FS, FR, FW, FE, S>(fa: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, FS, FR, FW, FE, S>(a: A) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0
