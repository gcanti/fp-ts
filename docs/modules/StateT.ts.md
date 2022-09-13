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
  - [chain](#chain)
  - [evaluate](#evaluate)
  - [execute](#execute)
  - [fromF](#fromf)
  - [fromState](#fromstate)
  - [map](#map)
  - [of](#of)

---

# utils

## StateT (interface)

**Signature**

```ts
export interface StateT<F extends HKT, FS, FR, FW, FE, S, A> {
  (s: S): Kind<F, FS, FR, FW, FE, readonly [A, S]>
}
```

Added in v3.0.0

## ap

**Signature**

```ts
export declare function ap<F extends HKT>(
  F: Chain<F>
): <FS, FR, FW, FE, S, A>(
  fa: StateT<F, FS, FR, FW, FE, S, A>
) => <B>(fab: StateT<F, FS, FR, FW, FE, S, (a: A) => B>) => StateT<F, FS, FR, FW, FE, S, B>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<F extends HKT>(
  F: Chain<F>
): <A, FS, FR, FW, FE, S, B>(
  f: (a: A) => StateT<F, FS, FR, FW, FE, S, B>
) => (ma: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B>
```

Added in v3.0.0

## evaluate

**Signature**

```ts
export declare function evaluate<F extends HKT>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, A>
```

Added in v3.0.0

## execute

**Signature**

```ts
export declare function execute<F extends HKT>(
  F: Functor<F>
): <S>(s: S) => <FS, FR, FW, FE, A>(ma: StateT<F, FS, FR, FW, FE, S, A>) => Kind<F, FS, FR, FW, FE, S>
```

Added in v3.0.0

## fromF

**Signature**

```ts
export declare function fromF<F extends HKT>(
  F: Functor<F>
): <FS, FR, FW, FE, A, S>(ma: Kind<F, FS, FR, FW, FE, A>) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0

## fromState

**Signature**

```ts
export declare function fromState<F extends HKT>(
  F: Pointed<F>
): <S, A, FS, FR, FW, FE>(sa: State<S, A>) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends HKT>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <FS, FR, FW, FE, S>(fa: StateT<F, FS, FR, FW, FE, S, A>) => StateT<F, FS, FR, FW, FE, S, B>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends HKT>(
  F: Pointed<F>
): <A, FS, FR, FW, FE, S>(a: A) => StateT<F, FS, FR, FW, FE, S, A>
```

Added in v3.0.0
