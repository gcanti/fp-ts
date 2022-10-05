---
title: StateT.ts
nav_order: 94
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
  - [succeed](#succeed)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<F extends TypeLambda, S> extends TypeLambda {
  readonly type: (s: S) => Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], readonly [S, this['Out1']]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare const ap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <S, FS, R2, O2, E2, A>(
  fa: (s: S) => Kind<F, FS, R2, O2, E2, readonly [S, A]>
) => <R1, O1, E1, B>(
  self: (s: S) => Kind<F, FS, R1, O1, E1, readonly [S, (a: A) => B]>
) => (s: S) => Kind<F, FS, R1 & R2, O2 | O1, E2 | E1, readonly [S, B]>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare const evaluate: <F extends TypeLambda>(
  F: Functor<F>
) => <S>(s: S) => <FS, R, O, E, A>(self: (s: S) => Kind<F, FS, R, O, E, readonly [S, A]>) => Kind<F, FS, R, O, E, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare const execute: <F extends TypeLambda>(
  F: Functor<F>
) => <S>(s: S) => <FS, R, O, E, A>(self: (s: S) => Kind<F, FS, R, O, E, readonly [S, A]>) => Kind<F, FS, R, O, E, S>
```

Added in v3.0.0

## flatMap

**Signature**

```ts
export declare const flatMap: <F extends TypeLambda>(
  F: Flattenable<F>
) => <A, S, FS, R2, O2, E2, B>(
  f: (a: A) => (s: S) => Kind<F, FS, R2, O2, E2, readonly [S, B]>
) => <R1, O1, E1>(
  self: (s: S) => Kind<F, FS, R1, O1, E1, readonly [S, A]>
) => (s: S) => Kind<F, FS, R1 & R2, O2 | O1, E2 | E1, readonly [S, B]>
```

Added in v3.0.0

## fromKind

**Signature**

```ts
export declare const fromKind: <F extends TypeLambda>(
  F: Functor<F>
) => <FS, R, O, E, A, S>(self: Kind<F, FS, R, O, E, A>) => (s: S) => Kind<F, FS, R, O, E, readonly [S, A]>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare const fromState: <F extends TypeLambda>(
  F: FromIdentity<F>
) => <S, A, FS>(sa: State<S, A>) => (s: S) => Kind<F, FS, unknown, never, never, readonly [S, A]>
```

Added in v3.0.0

## map

Returns an effect whose success is mapped by the specified `f` function.

**Signature**

```ts
export declare const map: <F extends TypeLambda>(
  F: Functor<F>
) => <A, B>(
  f: (a: A) => B
) => <S, FS, R, O, E>(
  self: (s: S) => Kind<F, FS, R, O, E, readonly [S, A]>
) => (s: S) => Kind<F, FS, R, O, E, readonly [S, B]>
```

Added in v3.0.0

## succeed

**Signature**

```ts
export declare const succeed: <F extends TypeLambda>(
  F: FromIdentity<F>
) => <A, S, FS>(a: A) => (s: S) => Kind<F, FS, unknown, never, never, readonly [S, A]>
```

Added in v3.0.0
