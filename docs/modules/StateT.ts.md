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
export interface StateT<F extends TypeLambda, FS, R, O, E, S, A> {
  (s: S): Kind<F, FS, R, O, E, readonly [S, A]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <FS, R2, O2, E2, S, A>(
  fa: StateT<F, FS, R2, O2, E2, S, A>
) => <R1, O1, E1, B>(fab: StateT<F, FS, R1, O1, E1, S, (a: A) => B>) => StateT<F, FS, R1 & R2, O2 | O1, E2 | E1, S, B>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare function evaluate<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, R, O, E, A>(ma: StateT<F, FS, R, O, E, S, A>) => Kind<F, FS, R, O, E, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare function execute<F extends TypeLambda>(
  F: Functor<F>
): <S>(s: S) => <FS, R, O, E, A>(ma: StateT<F, FS, R, O, E, S, A>) => Kind<F, FS, R, O, E, S>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <A, FS, R2, O2, E2, S, B>(
  f: (a: A) => StateT<F, FS, R2, O2, E2, S, B>
) => <R1, O1, E1>(ma: StateT<F, FS, R1, O1, E1, S, A>) => StateT<F, FS, R1 & R2, O2 | O1, E2 | E1, S, B>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends TypeLambda>(
  F: Functor<F>
): <FS, R, O, E, A, S>(self: Kind<F, FS, R, O, E, A>) => StateT<F, FS, R, O, E, S, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare function fromState<F extends TypeLambda>(
  F: Pointed<F>
): <S, A, FS>(sa: State<S, A>) => StateT<F, FS, unknown, never, never, S, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends TypeLambda>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <FS, R, O, E, S>(fa: StateT<F, FS, R, O, E, S, A>) => StateT<F, FS, R, O, E, S, B>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends TypeLambda>(
  F: Pointed<F>
): <A, FS, S>(a: A) => StateT<F, FS, unknown, never, never, S, A>
```

Added in v3.0.0
