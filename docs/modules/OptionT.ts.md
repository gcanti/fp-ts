---
title: OptionT.ts
nav_order: 61
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [OptionM (interface)](#optionm-interface)
- [OptionT (interface)](#optiont-interface)
- [getOptionM (function)](#getoptionm-function)

---

# OptionM (interface)

**Signature**

```ts
export interface OptionM<M> extends ApplicativeComposition01<M, URI> {
  readonly chain: <A, B>(ma: OptionT<M, A>, f: (a: A) => OptionT<M, B>) => OptionT<M, B>
  readonly fold: <A, R>(ma: OptionT<M, A>, onNone: () => R, onSome: (a: A) => R) => HKT<M, R>
  readonly getOrElse: <A>(ma: OptionT<M, A>, f: () => A) => HKT<M, A>
  readonly fromM: <A>(ma: HKT<M, A>) => OptionT<M, A>
  readonly fromOption: <A>(ma: Option<A>) => OptionT<M, A>
  readonly none: () => OptionT<M, never>
}
```

# OptionT (interface)

**Signature**

```ts
export interface OptionT<M, A> extends HKT<M, Option<A>> {}
```

# getOptionM (function)

**Signature**

```ts
export function getOptionM<M extends URIS3, U, L>(M: Monad3C<M, U, L>): OptionM3C<M, U, L>
export function getOptionM<M extends URIS2>(M: Monad2<M>): OptionM2<M>
export function getOptionM<M extends URIS2, L>(M: Monad2C<M, L>): OptionM2C<M, L>
export function getOptionM<M extends URIS>(M: Monad1<M>): OptionM1<M>
export function getOptionM<M>(M: Monad<M>): OptionM<M> { ... }
```

Added in v2.0.0
