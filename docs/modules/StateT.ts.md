---
title: StateT.ts
nav_order: 93
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
  - [fromKind](#fromkind)
  - [fromState](#fromstate)
  - [map](#map)
  - [of](#of)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<F extends TypeLambda, S, FS, R, O, E, A> {
  (s: S): Kind<F, FS, R, O, E, readonly [S, A]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <S, FS, R2, O2, E2, A>(
  fa: StateT<F, S, FS, R2, O2, E2, A>
) => <R1, O1, E1, B>(self: StateT<F, S, FS, R1, O1, E1, (a: A) => B>) => StateT<F, S, FS, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare function evaluate<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, R, O, E, A>(self: StateT<F, S, FS, R, O, E, A>) => Kind<F, FS, R, O, E, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare function execute<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, R, O, E, A>(self: StateT<F, S, FS, R, O, E, A>) => Kind<F, FS, R, O, E, S>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <A, S, FS, R2, O2, E2, B>(
  f: (a: A) => StateT<F, S, FS, R2, O2, E2, B>
) => <R1, O1, E1>(self: StateT<F, S, FS, R1, O1, E1, A>) => StateT<F, S, FS, R1 & R2, O2 | O1, E2 | E1, B>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare function fromKind<F extends TypeLambda>(
  F: Functor<F>
): <FS, R, O, E, A, S>(self: Kind<F, FS, R, O, E, A>) => StateT<F, S, FS, R, O, E, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare function fromState<F extends TypeLambda>(
  F: Pointed<F>
): <S, A, FS>(sa: State<S, A>) => StateT<F, S, FS, unknown, never, never, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <S, FS, R, O, E>(self: StateT<F, S, FS, R, O, E, A>) => StateT<F, S, FS, R, O, E, B>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, S, FS>(a: A) => StateT<F, S, FS, unknown, never, never, A>
```

Added in v3.0.0
