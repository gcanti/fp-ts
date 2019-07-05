---
title: pipeable.ts
nav_order: 68
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [PipeableAlt (interface)](#pipeablealt-interface)
- [PipeableAlt1 (interface)](#pipeablealt1-interface)
- [PipeableAlt2 (interface)](#pipeablealt2-interface)
- [PipeableAlt2C (interface)](#pipeablealt2c-interface)
- [PipeableAlt3 (interface)](#pipeablealt3-interface)
- [PipeableAlt4 (interface)](#pipeablealt4-interface)
- [PipeableApply (interface)](#pipeableapply-interface)
- [PipeableApply1 (interface)](#pipeableapply1-interface)
- [PipeableApply2 (interface)](#pipeableapply2-interface)
- [PipeableApply2C (interface)](#pipeableapply2c-interface)
- [PipeableApply3 (interface)](#pipeableapply3-interface)
- [PipeableApply4 (interface)](#pipeableapply4-interface)
- [PipeableBifunctor (interface)](#pipeablebifunctor-interface)
- [PipeableBifunctor2 (interface)](#pipeablebifunctor2-interface)
- [PipeableBifunctor3 (interface)](#pipeablebifunctor3-interface)
- [PipeableBifunctor4 (interface)](#pipeablebifunctor4-interface)
- [PipeableChain (interface)](#pipeablechain-interface)
- [PipeableChain1 (interface)](#pipeablechain1-interface)
- [PipeableChain2 (interface)](#pipeablechain2-interface)
- [PipeableChain2C (interface)](#pipeablechain2c-interface)
- [PipeableChain3 (interface)](#pipeablechain3-interface)
- [PipeableChain4 (interface)](#pipeablechain4-interface)
- [PipeableCompactable (interface)](#pipeablecompactable-interface)
- [PipeableCompactable1 (interface)](#pipeablecompactable1-interface)
- [PipeableCompactable2 (interface)](#pipeablecompactable2-interface)
- [PipeableCompactable2C (interface)](#pipeablecompactable2c-interface)
- [PipeableCompactable3 (interface)](#pipeablecompactable3-interface)
- [PipeableCompactable4 (interface)](#pipeablecompactable4-interface)
- [PipeableContravariant (interface)](#pipeablecontravariant-interface)
- [PipeableContravariant1 (interface)](#pipeablecontravariant1-interface)
- [PipeableContravariant2 (interface)](#pipeablecontravariant2-interface)
- [PipeableContravariant2C (interface)](#pipeablecontravariant2c-interface)
- [PipeableContravariant3 (interface)](#pipeablecontravariant3-interface)
- [PipeableContravariant4 (interface)](#pipeablecontravariant4-interface)
- [PipeableExtend (interface)](#pipeableextend-interface)
- [PipeableExtend1 (interface)](#pipeableextend1-interface)
- [PipeableExtend2 (interface)](#pipeableextend2-interface)
- [PipeableExtend2C (interface)](#pipeableextend2c-interface)
- [PipeableExtend3 (interface)](#pipeableextend3-interface)
- [PipeableExtend4 (interface)](#pipeableextend4-interface)
- [PipeableFilterable (interface)](#pipeablefilterable-interface)
- [PipeableFilterable1 (interface)](#pipeablefilterable1-interface)
- [PipeableFilterable2 (interface)](#pipeablefilterable2-interface)
- [PipeableFilterable2C (interface)](#pipeablefilterable2c-interface)
- [PipeableFilterable3 (interface)](#pipeablefilterable3-interface)
- [PipeableFilterable4 (interface)](#pipeablefilterable4-interface)
- [PipeableFilterableWithIndex (interface)](#pipeablefilterablewithindex-interface)
- [PipeableFilterableWithIndex1 (interface)](#pipeablefilterablewithindex1-interface)
- [PipeableFilterableWithIndex2 (interface)](#pipeablefilterablewithindex2-interface)
- [PipeableFilterableWithIndex2C (interface)](#pipeablefilterablewithindex2c-interface)
- [PipeableFilterableWithIndex3 (interface)](#pipeablefilterablewithindex3-interface)
- [PipeableFilterableWithIndex4 (interface)](#pipeablefilterablewithindex4-interface)
- [PipeableFoldable (interface)](#pipeablefoldable-interface)
- [PipeableFoldable1 (interface)](#pipeablefoldable1-interface)
- [PipeableFoldable2 (interface)](#pipeablefoldable2-interface)
- [PipeableFoldable2C (interface)](#pipeablefoldable2c-interface)
- [PipeableFoldable3 (interface)](#pipeablefoldable3-interface)
- [PipeableFoldable4 (interface)](#pipeablefoldable4-interface)
- [PipeableFoldableWithIndex (interface)](#pipeablefoldablewithindex-interface)
- [PipeableFoldableWithIndex1 (interface)](#pipeablefoldablewithindex1-interface)
- [PipeableFoldableWithIndex2 (interface)](#pipeablefoldablewithindex2-interface)
- [PipeableFoldableWithIndex2C (interface)](#pipeablefoldablewithindex2c-interface)
- [PipeableFoldableWithIndex3 (interface)](#pipeablefoldablewithindex3-interface)
- [PipeableFoldableWithIndex4 (interface)](#pipeablefoldablewithindex4-interface)
- [PipeableFunctor (interface)](#pipeablefunctor-interface)
- [PipeableFunctor1 (interface)](#pipeablefunctor1-interface)
- [PipeableFunctor2 (interface)](#pipeablefunctor2-interface)
- [PipeableFunctor2C (interface)](#pipeablefunctor2c-interface)
- [PipeableFunctor3 (interface)](#pipeablefunctor3-interface)
- [PipeableFunctor4 (interface)](#pipeablefunctor4-interface)
- [PipeableFunctorWithIndex (interface)](#pipeablefunctorwithindex-interface)
- [PipeableFunctorWithIndex1 (interface)](#pipeablefunctorwithindex1-interface)
- [PipeableFunctorWithIndex2 (interface)](#pipeablefunctorwithindex2-interface)
- [PipeableFunctorWithIndex2C (interface)](#pipeablefunctorwithindex2c-interface)
- [PipeableFunctorWithIndex3 (interface)](#pipeablefunctorwithindex3-interface)
- [PipeableFunctorWithIndex4 (interface)](#pipeablefunctorwithindex4-interface)
- [PipeableMonadThrow (interface)](#pipeablemonadthrow-interface)
- [PipeableMonadThrow1 (interface)](#pipeablemonadthrow1-interface)
- [PipeableMonadThrow2 (interface)](#pipeablemonadthrow2-interface)
- [PipeableMonadThrow2C (interface)](#pipeablemonadthrow2c-interface)
- [PipeableMonadThrow3 (interface)](#pipeablemonadthrow3-interface)
- [PipeableMonadThrow4 (interface)](#pipeablemonadthrow4-interface)
- [PipeableProfunctor (interface)](#pipeableprofunctor-interface)
- [PipeableProfunctor2 (interface)](#pipeableprofunctor2-interface)
- [PipeableProfunctor2C (interface)](#pipeableprofunctor2c-interface)
- [PipeableProfunctor3 (interface)](#pipeableprofunctor3-interface)
- [PipeableProfunctor4 (interface)](#pipeableprofunctor4-interface)
- [PipeableSemigroupoid (interface)](#pipeablesemigroupoid-interface)
- [PipeableSemigroupoid2 (interface)](#pipeablesemigroupoid2-interface)
- [PipeableSemigroupoid2C (interface)](#pipeablesemigroupoid2c-interface)
- [PipeableSemigroupoid3 (interface)](#pipeablesemigroupoid3-interface)
- [PipeableSemigroupoid4 (interface)](#pipeablesemigroupoid4-interface)
- [pipe (function)](#pipe-function)
- [pipeable (function)](#pipeable-function)

---

# PipeableAlt (interface)

**Signature**

```ts
export interface PipeableAlt<F> {
  readonly alt: <A>(that: () => HKT<F, A>) => (fa: HKT<F, A>) => HKT<F, A>
}
```

# PipeableAlt1 (interface)

**Signature**

```ts
export interface PipeableAlt1<F extends URIS> {
  readonly alt: <A>(that: () => Kind<F, A>) => (fa: Kind<F, A>) => Kind<F, A>
}
```

# PipeableAlt2 (interface)

**Signature**

```ts
export interface PipeableAlt2<F extends URIS2> {
  readonly alt: <L, A>(that: () => Kind2<F, L, A>) => (fa: Kind2<F, L, A>) => Kind2<F, L, A>
}
```

# PipeableAlt2C (interface)

**Signature**

```ts
export interface PipeableAlt2C<F extends URIS2, L> {
  readonly alt: <A>(that: () => Kind2<F, L, A>) => (fa: Kind2<F, L, A>) => Kind2<F, L, A>
}
```

# PipeableAlt3 (interface)

**Signature**

```ts
export interface PipeableAlt3<F extends URIS3> {
  readonly alt: <U, L, A>(that: () => Kind3<F, U, L, A>) => (fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
}
```

# PipeableAlt4 (interface)

**Signature**

```ts
export interface PipeableAlt4<F extends URIS4> {
  readonly alt: <X, U, L, A>(that: () => Kind4<F, X, U, L, A>) => (fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
}
```

# PipeableApply (interface)

**Signature**

```ts
export interface PipeableApply<F> extends PipeableFunctor<F> {
  readonly ap: <A>(fa: HKT<F, A>) => <B>(fab: HKT<F, (a: A) => B>) => HKT<F, B>
  readonly apFirst: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, A>
  readonly apSecond: <B>(fb: HKT<F, B>) => <A>(fa: HKT<F, A>) => HKT<F, B>
}
```

# PipeableApply1 (interface)

**Signature**

```ts
export interface PipeableApply1<F extends URIS> extends PipeableFunctor1<F> {
  readonly ap: <A>(fa: Kind<F, A>) => <B>(fab: Kind<F, (a: A) => B>) => Kind<F, B>
  readonly apFirst: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, A>
  readonly apSecond: <B>(fb: Kind<F, B>) => <A>(fa: Kind<F, A>) => Kind<F, B>
}
```

# PipeableApply2 (interface)

**Signature**

```ts
export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <L, A>(fa: Kind2<F, L, A>) => <B>(fab: Kind2<F, L, (a: A) => B>) => Kind2<F, L, B>
  readonly apFirst: <L, B>(fb: Kind2<F, L, B>) => <A>(fa: Kind2<F, L, A>) => Kind2<F, L, A>
  readonly apSecond: <L, B>(fb: Kind2<F, L, B>) => <A>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableApply2C (interface)

**Signature**

```ts
export interface PipeableApply2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly ap: <A>(fa: Kind2<F, L, A>) => <B>(fab: Kind2<F, L, (a: A) => B>) => Kind2<F, L, B>
  readonly apFirst: <A>(fb: Kind2<F, L, A>) => <B>(fb: Kind2<F, L, B>) => Kind2<F, L, A>
  readonly apSecond: <A>(fb: Kind2<F, L, A>) => <B>(fb: Kind2<F, L, B>) => Kind2<F, L, B>
}
```

# PipeableApply3 (interface)

**Signature**

```ts
export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <U, L, A>(fa: Kind3<F, U, L, A>) => <B>(fab: Kind3<F, U, L, (a: A) => B>) => Kind3<F, U, L, B>
  readonly apFirst: <U, L, B>(fb: Kind3<F, U, L, B>) => <A>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  readonly apSecond: <U, L, B>(fb: Kind3<F, U, L, B>) => <A>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# PipeableApply4 (interface)

**Signature**

```ts
export interface PipeableApply4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly ap: <X, U, L, A>(
    fa: Kind4<F, X, U, L, A>
  ) => <B>(fab: Kind4<F, X, U, L, (a: A) => B>) => Kind4<F, X, U, L, B>
  readonly apFirst: <X, U, L, B>(fb: Kind4<F, X, U, L, B>) => <A>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  readonly apSecond: <X, U, L, B>(fb: Kind4<F, X, U, L, B>) => <A>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
}
```

# PipeableBifunctor (interface)

**Signature**

```ts
export interface PipeableBifunctor<F> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, M, B>
  readonly mapLeft: <L, M>(f: (l: L) => M) => <A>(fa: HKT2<F, L, A>) => HKT2<F, M, A>
}
```

# PipeableBifunctor2 (interface)

**Signature**

```ts
export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: Kind2<F, L, A>) => Kind2<F, M, B>
  readonly mapLeft: <L, M>(f: (l: L) => M) => <A>(fa: Kind2<F, L, A>) => Kind2<F, M, A>
}
```

# PipeableBifunctor3 (interface)

**Signature**

```ts
export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => <U>(fa: Kind3<F, U, L, A>) => Kind3<F, U, M, B>
  readonly mapLeft: <L, M>(f: (l: L) => M) => <U, A>(fa: Kind3<F, U, L, A>) => Kind3<F, U, M, A>
}
```

# PipeableBifunctor4 (interface)

**Signature**

```ts
export interface PipeableBifunctor4<F extends URIS4> {
  readonly bimap: <L, A, M, B>(
    f: (l: L) => M,
    g: (a: A) => B
  ) => <X, U>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, M, B>
  readonly mapLeft: <L, M>(f: (l: L) => M) => <X, U, A>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, M, A>
}
```

# PipeableChain (interface)

**Signature**

```ts
export interface PipeableChain<F> extends PipeableApply<F> {
  readonly chain: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => HKT<F, B>) => (ma: HKT<F, A>) => HKT<F, A>
  readonly flatten: <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
}
```

# PipeableChain1 (interface)

**Signature**

```ts
export interface PipeableChain1<F extends URIS> extends PipeableApply1<F> {
  readonly chain: <A, B>(f: (a: A) => Kind<F, B>) => (ma: Kind<F, A>) => Kind<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => Kind<F, B>) => (ma: Kind<F, A>) => Kind<F, A>
  readonly flatten: <A>(mma: Kind<F, Kind<F, A>>) => Kind<F, A>
}
```

# PipeableChain2 (interface)

**Signature**

```ts
export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <L, A, B>(f: (a: A) => Kind2<F, L, B>) => (ma: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly chainFirst: <L, A, B>(f: (a: A) => Kind2<F, L, B>) => (ma: Kind2<F, L, A>) => Kind2<F, L, A>
  readonly flatten: <L, A>(mma: Kind2<F, L, Kind2<F, L, A>>) => Kind2<F, L, A>
}
```

# PipeableChain2C (interface)

**Signature**

```ts
export interface PipeableChain2C<F extends URIS2, L> extends PipeableApply2C<F, L> {
  readonly chain: <A, B>(f: (a: A) => Kind2<F, L, B>) => (ma: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly chainFirst: <A, B>(f: (a: A) => Kind2<F, L, B>) => (ma: Kind2<F, L, A>) => Kind2<F, L, A>
  readonly flatten: <A>(mma: Kind2<F, L, Kind2<F, L, A>>) => Kind2<F, L, A>
}
```

# PipeableChain3 (interface)

**Signature**

```ts
export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <U, L, A, B>(f: (a: A) => Kind3<F, U, L, B>) => (ma: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
  readonly chainFirst: <U, L, A, B>(f: (a: A) => Kind3<F, U, L, B>) => (ma: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  readonly flatten: <U, L, A>(mma: Kind3<F, U, L, Kind3<F, U, L, A>>) => Kind3<F, U, L, A>
}
```

# PipeableChain4 (interface)

**Signature**

```ts
export interface PipeableChain4<F extends URIS4> extends PipeableApply4<F> {
  readonly chain: <X, U, L, A, B>(
    f: (a: A) => Kind4<F, X, U, L, B>
  ) => (ma: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
  readonly chainFirst: <X, U, L, A, B>(
    f: (a: A) => Kind4<F, X, U, L, B>
  ) => (ma: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  readonly flatten: <X, U, L, A>(mma: Kind4<F, X, U, L, Kind4<F, X, U, L, A>>) => Kind4<F, X, U, L, A>
}
```

# PipeableCompactable (interface)

**Signature**

```ts
export interface PipeableCompactable<F> {
  readonly compact: <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  readonly separate: <A, B>(fa: HKT<F, Either<A, B>>) => Separated<HKT<F, A>, HKT<F, B>>
}
```

# PipeableCompactable1 (interface)

**Signature**

```ts
export interface PipeableCompactable1<F extends URIS> {
  readonly compact: <A>(fa: Kind<F, Option<A>>) => Kind<F, A>
  readonly separate: <A, B>(fa: Kind<F, Either<A, B>>) => Separated<Kind<F, A>, Kind<F, B>>
}
```

# PipeableCompactable2 (interface)

**Signature**

```ts
export interface PipeableCompactable2<F extends URIS2> {
  readonly compact: <L, A>(fa: Kind2<F, L, Option<A>>) => Kind2<F, L, A>
  readonly separate: <L, A, B>(fa: Kind2<F, L, Either<A, B>>) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
}
```

# PipeableCompactable2C (interface)

**Signature**

```ts
export interface PipeableCompactable2C<F extends URIS2, L> {
  readonly compact: <A>(fa: Kind2<F, L, Option<A>>) => Kind2<F, L, A>
  readonly separate: <A, B>(fa: Kind2<F, L, Either<A, B>>) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
}
```

# PipeableCompactable3 (interface)

**Signature**

```ts
export interface PipeableCompactable3<F extends URIS3> {
  readonly compact: <U, L, A>(fa: Kind3<F, U, L, Option<A>>) => Kind3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Kind3<F, U, L, Either<A, B>>) => Separated<Kind3<F, U, L, A>, Kind3<F, U, L, B>>
}
```

# PipeableCompactable4 (interface)

**Signature**

```ts
export interface PipeableCompactable4<F extends URIS4> {
  readonly compact: <X, U, L, A>(fa: Kind4<F, X, U, L, Option<A>>) => Kind4<F, X, U, L, A>
  readonly separate: <X, U, L, A, B>(
    fa: Kind4<F, X, U, L, Either<A, B>>
  ) => Separated<Kind4<F, X, U, L, A>, Kind4<F, X, U, L, B>>
}
```

# PipeableContravariant (interface)

**Signature**

```ts
export interface PipeableContravariant<F> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}
```

# PipeableContravariant1 (interface)

**Signature**

```ts
export interface PipeableContravariant1<F extends URIS> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}
```

# PipeableContravariant2 (interface)

**Signature**

```ts
export interface PipeableContravariant2<F extends URIS2> {
  readonly contramap: <A, B>(f: (b: B) => A) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableContravariant2C (interface)

**Signature**

```ts
export interface PipeableContravariant2C<F extends URIS2, L> {
  readonly contramap: <A, B>(f: (b: B) => A) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableContravariant3 (interface)

**Signature**

```ts
export interface PipeableContravariant3<F extends URIS3> {
  readonly contramap: <A, B>(f: (b: B) => A) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# PipeableContravariant4 (interface)

**Signature**

```ts
export interface PipeableContravariant4<F extends URIS4> {
  readonly contramap: <A, B>(f: (b: B) => A) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
}
```

# PipeableExtend (interface)

**Signature**

```ts
export interface PipeableExtend<F> extends PipeableFunctor<F> {
  readonly extend: <A, B>(f: (fa: HKT<F, A>) => B) => (ma: HKT<F, A>) => HKT<F, B>
  readonly duplicate: <A>(ma: HKT<F, A>) => HKT<F, HKT<F, A>>
}
```

# PipeableExtend1 (interface)

**Signature**

```ts
export interface PipeableExtend1<F extends URIS> extends PipeableFunctor1<F> {
  readonly extend: <A, B>(f: (fa: Kind<F, A>) => B) => (ma: Kind<F, A>) => Kind<F, B>
  readonly duplicate: <A>(ma: Kind<F, A>) => Kind<F, Kind<F, A>>
}
```

# PipeableExtend2 (interface)

**Signature**

```ts
export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <L, A, B>(f: (fa: Kind2<F, L, A>) => B) => (ma: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly duplicate: <L, A>(ma: Kind2<F, L, A>) => Kind2<F, L, Kind2<F, L, A>>
}
```

# PipeableExtend2C (interface)

**Signature**

```ts
export interface PipeableExtend2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly extend: <A, B>(f: (fa: Kind2<F, L, A>) => B) => (ma: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly duplicate: <A>(ma: Kind2<F, L, A>) => Kind2<F, L, Kind2<F, L, A>>
}
```

# PipeableExtend3 (interface)

**Signature**

```ts
export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <U, L, A, B>(f: (fa: Kind3<F, U, L, A>) => B) => (ma: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
  readonly duplicate: <U, L, A>(ma: Kind3<F, U, L, A>) => Kind3<F, U, L, Kind3<F, U, L, A>>
}
```

# PipeableExtend4 (interface)

**Signature**

```ts
export interface PipeableExtend4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly extend: <X, U, L, A, B>(
    f: (fa: Kind4<F, X, U, L, A>) => B
  ) => (ma: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
  readonly duplicate: <X, U, L, A>(ma: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, Kind4<F, X, U, L, A>>
}
```

# PipeableFilterable (interface)

**Signature**

```ts
export interface PipeableFilterable<F> extends PipeableCompactable<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: Predicate<A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, RL>, HKT<F, RR>>
}
```

# PipeableFilterable1 (interface)

**Signature**

```ts
export interface PipeableFilterable1<F extends URIS> extends PipeableCompactable1<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Kind<F, B>
    <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Kind<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicate: Predicate<A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, RL>, Kind<F, RR>>
}
```

# PipeableFilterable2 (interface)

**Signature**

```ts
export interface PipeableFilterable2<F extends URIS2> extends PipeableCompactable2<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
    <A>(predicate: Predicate<A>): <L>(fa: Kind2<F, L, A>) => Kind2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Kind2<F, L, A>) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
    <A>(predicate: Predicate<A>): <L>(fa: Kind2<F, L, A>) => Separated<Kind2<F, L, A>, Kind2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <L>(fa: Kind2<F, L, A>) => Separated<Kind2<F, L, RL>, Kind2<F, L, RR>>
}
```

# PipeableFilterable2C (interface)

**Signature**

```ts
export interface PipeableFilterable2C<F extends URIS2, L> extends PipeableCompactable2C<F, L> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, L, A>) => Kind2<F, L, B>
    <A>(predicate: Predicate<A>): (fa: Kind2<F, L, A>) => Kind2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Kind2<F, L, A>) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
    <A>(predicate: Predicate<A>): (fa: Kind2<F, L, A>) => Separated<Kind2<F, L, A>, Kind2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Kind2<F, L, A>) => Separated<Kind2<F, L, RL>, Kind2<F, L, RR>>
}
```

# PipeableFilterable3 (interface)

**Signature**

```ts
export interface PipeableFilterable3<F extends URIS3> extends PipeableCompactable3<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
    <A>(predicate: Predicate<A>): <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(
      fa: Kind3<F, U, L, A>
    ) => Separated<Kind3<F, U, L, A>, Kind3<F, U, L, B>>
    <A>(predicate: Predicate<A>): <U, L>(fa: Kind3<F, U, L, A>) => Separated<Kind3<F, U, L, A>, Kind3<F, U, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <U, L>(fa: Kind3<F, U, L, A>) => Separated<Kind3<F, U, L, RL>, Kind3<F, U, L, RR>>
}
```

# PipeableFilterable4 (interface)

**Signature**

```ts
export interface PipeableFilterable4<F extends URIS4> extends PipeableCompactable4<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
    <A>(predicate: Predicate<A>): <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <X, U, L>(
      fa: Kind4<F, X, U, L, A>
    ) => Separated<Kind4<F, X, U, L, A>, Kind4<F, X, U, L, B>>
    <A>(predicate: Predicate<A>): <X, U, L>(
      fa: Kind4<F, X, U, L, A>
    ) => Separated<Kind4<F, X, U, L, A>, Kind4<F, X, U, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Separated<Kind4<F, X, U, L, RL>, Kind4<F, X, U, L, RR>>
}
```

# PipeableFilterableWithIndex (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex<F, I> extends PipeableFilterable<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: HKT<F, A>
    ) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: HKT<F, A>) => Separated<HKT<F, RL>, HKT<F, RR>>
}
```

# PipeableFilterableWithIndex1 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex1<F extends URIS, I> extends PipeableFilterable1<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind<F, A>) => Kind<F, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Kind<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind<F, A>) => Kind<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind<F, A>
    ) => Separated<Kind<F, A>, Kind<F, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind<F, A>) => Separated<Kind<F, A>, Kind<F, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Kind<F, A>) => Separated<Kind<F, RL>, Kind<F, RR>>
}
```

# PipeableFilterableWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex2<F extends URIS2, I> extends PipeableFilterable2<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <L>(fa: Kind2<F, L, A>) => Kind2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <L>(
      fa: Kind2<F, L, A>
    ) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <L>(
      fa: Kind2<F, L, A>
    ) => Separated<Kind2<F, L, A>, Kind2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <L>(fa: Kind2<F, L, A>) => Separated<Kind2<F, L, RL>, Kind2<F, L, RR>>
}
```

# PipeableFilterableWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex2C<F extends URIS2, I, L> extends PipeableFilterable2C<F, L> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (fa: Kind2<F, L, A>) => Kind2<F, L, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, L, A>) => Kind2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): (
      fa: Kind2<F, L, A>
    ) => Separated<Kind2<F, L, A>, Kind2<F, L, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): (fa: Kind2<F, L, A>) => Separated<Kind2<F, L, A>, Kind2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Kind2<F, L, A>) => Separated<Kind2<F, L, RL>, Kind2<F, L, RR>>
}
```

# PipeableFilterableWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex3<F extends URIS3, I> extends PipeableFilterable3<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <U, L>(
      fa: Kind3<F, U, L, A>
    ) => Kind3<F, U, L, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <U, L>(
      fa: Kind3<F, U, L, A>
    ) => Separated<Kind3<F, U, L, A>, Kind3<F, U, L, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <U, L>(
      fa: Kind3<F, U, L, A>
    ) => Separated<Kind3<F, U, L, A>, Kind3<F, U, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <U, L>(fa: Kind3<F, U, L, A>) => Separated<Kind3<F, U, L, RL>, Kind3<F, U, L, RR>>
}
```

# PipeableFilterableWithIndex4 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex4<F extends URIS4, I> extends PipeableFilterable4<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <X, U, L>(
      fa: Kind4<F, X, U, L, A>
    ) => Kind4<F, X, U, L, B>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinementWithIndex: RefinementWithIndex<I, A, B>): <X, U, L>(
      fa: Kind4<F, X, U, L, A>
    ) => Separated<Kind4<F, X, U, L, A>, Kind4<F, X, U, L, B>>
    <A>(predicateWithIndex: PredicateWithIndex<I, A>): <X, U, L>(
      fa: Kind4<F, X, U, L, A>
    ) => Separated<Kind4<F, X, U, L, A>, Kind4<F, X, U, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Separated<Kind4<F, X, U, L, RL>, Kind4<F, X, U, L, RR>>
}
```

# PipeableFoldable (interface)

**Signature**

```ts
export interface PipeableFoldable<F> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

# PipeableFoldable1 (interface)

**Signature**

```ts
export interface PipeableFoldable1<F extends URIS> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

# PipeableFoldable2 (interface)

**Signature**

```ts
export interface PipeableFoldable2<F extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <L>(fa: Kind2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <L>(fa: Kind2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <L>(fa: Kind2<F, L, A>) => B
}
```

# PipeableFoldable2C (interface)

**Signature**

```ts
export interface PipeableFoldable2C<F extends URIS2, L> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Kind2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Kind2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Kind2<F, L, A>) => B
}
```

# PipeableFoldable3 (interface)

**Signature**

```ts
export interface PipeableFoldable3<F extends URIS3> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <U, L>(fa: Kind3<F, U, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <U, L>(fa: Kind3<F, U, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <U, L>(fa: Kind3<F, U, L, A>) => B
}
```

# PipeableFoldable4 (interface)

**Signature**

```ts
export interface PipeableFoldable4<F extends URIS4> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => B
}
```

# PipeableFoldableWithIndex (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex<F, I> extends PipeableFoldable<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: HKT<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: HKT<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: HKT<F, A>) => B
}
```

# PipeableFoldableWithIndex1 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex1<F extends URIS, I> extends PipeableFoldable1<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind<F, A>) => B
}
```

# PipeableFoldableWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex2<F extends URIS2, I> extends PipeableFoldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <L>(fa: Kind2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <L>(fa: Kind2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <L>(fa: Kind2<F, L, A>) => B
}
```

# PipeableFoldableWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex2C<F extends URIS2, I, L> extends PipeableFoldable2C<F, L> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Kind2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Kind2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Kind2<F, L, A>) => B
}
```

# PipeableFoldableWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex3<F extends URIS3, I> extends PipeableFoldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <U, L>(fa: Kind3<F, U, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <U, L>(fa: Kind3<F, U, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <U, L>(fa: Kind3<F, U, L, A>) => B
}
```

# PipeableFoldableWithIndex4 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex4<F extends URIS4, I> extends PipeableFoldable4<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => B
}
```

# PipeableFunctor (interface)

**Signature**

```ts
export interface PipeableFunctor<F> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

# PipeableFunctor1 (interface)

**Signature**

```ts
export interface PipeableFunctor1<F extends URIS> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

# PipeableFunctor2 (interface)

**Signature**

```ts
export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableFunctor2C (interface)

**Signature**

```ts
export interface PipeableFunctor2C<F extends URIS2, L> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableFunctor3 (interface)

**Signature**

```ts
export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# PipeableFunctor4 (interface)

**Signature**

```ts
export interface PipeableFunctor4<F extends URIS4> {
  readonly map: <A, B>(f: (a: A) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
}
```

# PipeableFunctorWithIndex (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex<F, I> extends PipeableFunctor<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: HKT<F, A>) => HKT<F, B>
}
```

# PipeableFunctorWithIndex1 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex1<F extends URIS, I> extends PipeableFunctor1<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind<F, A>) => Kind<F, B>
}
```

# PipeableFunctorWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex2<F extends URIS2, I> extends PipeableFunctor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <L>(fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableFunctorWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex2C<F extends URIS2, I, L> extends PipeableFunctor2C<F, L> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Kind2<F, L, A>) => Kind2<F, L, B>
}
```

# PipeableFunctorWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex3<F extends URIS3, I> extends PipeableFunctor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <U, L>(fa: Kind3<F, U, L, A>) => Kind3<F, U, L, B>
}
```

# PipeableFunctorWithIndex4 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex4<F extends URIS4, I> extends PipeableFunctor4<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <X, U, L>(fa: Kind4<F, X, U, L, A>) => Kind4<F, X, U, L, B>
}
```

# PipeableMonadThrow (interface)

**Signature**

```ts
export interface PipeableMonadThrow<F> {
  readonly fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => HKT<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => HKT<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => HKT<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: HKT<F, A>) => HKT<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: HKT<F, A>) => HKT<F, A>
  }
}
```

# PipeableMonadThrow1 (interface)

**Signature**

```ts
export interface PipeableMonadThrow1<F extends URIS> {
  readonly fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => Kind<F, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind<F, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind<F, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind<F, A>) => Kind<F, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind<F, A>) => Kind<F, A>
  }
}
```

# PipeableMonadThrow2 (interface)

**Signature**

```ts
export interface PipeableMonadThrow2<F extends URIS2> {
  readonly fromOption: <E>(onNone: () => E) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <E, A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  }
}
```

# PipeableMonadThrow2C (interface)

**Signature**

```ts
export interface PipeableMonadThrow2C<F extends URIS2, E> {
  readonly fromOption: (onNone: () => E) => <A>(ma: Option<A>) => Kind2<F, E, A>
  readonly fromEither: <A>(ma: Either<E, A>) => Kind2<F, E, A>
  readonly fromPredicate: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (a: A) => Kind2<F, E, A>
  }
  readonly filterOrElse: {
    <A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, B>
    <A>(predicate: Predicate<A>, onFalse: (a: A) => E): (ma: Kind2<F, E, A>) => Kind2<F, E, A>
  }
}
```

# PipeableMonadThrow3 (interface)

**Signature**

```ts
export interface PipeableMonadThrow3<F extends URIS3> {
  readonly fromOption: <E>(onNone: () => E) => <U, A>(ma: Option<A>) => Kind3<F, U, E, A>
  readonly fromEither: <U, E, A>(ma: Either<E, A>) => Kind3<F, U, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(a: A) => Kind3<F, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <U>(a: A) => Kind3<F, U, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <U>(
      ma: Kind3<F, U, E, A>
    ) => Kind3<F, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <U>(ma: Kind3<F, U, E, A>) => Kind3<F, U, E, A>
  }
}
```

# PipeableMonadThrow4 (interface)

**Signature**

```ts
export interface PipeableMonadThrow4<F extends URIS4> {
  readonly fromOption: <E>(onNone: () => E) => <X, U, A>(ma: Option<A>) => Kind4<F, X, U, E, A>
  readonly fromEither: <X, U, E, A>(ma: Either<E, A>) => Kind4<F, X, U, E, A>
  readonly fromPredicate: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <X, U>(a: A) => Kind4<F, X, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <X, U>(a: A) => Kind4<F, X, U, E, A>
  }
  readonly filterOrElse: {
    <E, A, B extends A>(refinement: Refinement<A, B>, onFalse: (a: A) => E): <X, U>(
      ma: Kind4<F, X, U, E, A>
    ) => Kind4<F, X, U, E, B>
    <E, A>(predicate: Predicate<A>, onFalse: (a: A) => E): <X, U>(ma: Kind4<F, X, U, E, A>) => Kind4<F, X, U, E, A>
  }
}
```

# PipeableProfunctor (interface)

**Signature**

```ts
export interface PipeableProfunctor<F> {
  readonly map: <L, A, B>(f: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, L, B>
  readonly promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: HKT2<F, B, C>) => HKT2<F, A, D>
}
```

# PipeableProfunctor2 (interface)

**Signature**

```ts
export interface PipeableProfunctor2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Kind2<F, B, C>) => Kind2<F, A, D>
}
```

# PipeableProfunctor2C (interface)

**Signature**

```ts
export interface PipeableProfunctor2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly promap: <A, C, D>(f: (a: A) => L, g: (c: C) => D) => (flc: Kind2<F, L, C>) => Kind2<F, A, D>
}
```

# PipeableProfunctor3 (interface)

**Signature**

```ts
export interface PipeableProfunctor3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly promap: <U, A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Kind3<F, U, B, C>) => Kind3<F, U, A, D>
}
```

# PipeableProfunctor4 (interface)

**Signature**

```ts
export interface PipeableProfunctor4<F extends URIS4> extends PipeableFunctor4<F> {
  readonly promap: <X, U, A, B, C, D>(
    f: (a: A) => B,
    g: (c: C) => D
  ) => (fbc: Kind4<F, X, U, B, C>) => Kind4<F, X, U, A, D>
}
```

# PipeableSemigroupoid (interface)

**Signature**

```ts
export interface PipeableSemigroupoid<F> {
  readonly compose: <L, A>(la: HKT2<F, L, A>) => <B>(ab: HKT2<F, A, B>) => HKT2<F, L, B>
}
```

# PipeableSemigroupoid2 (interface)

**Signature**

```ts
export interface PipeableSemigroupoid2<F extends URIS2> {
  readonly compose: <L, A>(la: Kind2<F, L, A>) => <B>(ab: Kind2<F, A, B>) => Kind2<F, L, B>
}
```

# PipeableSemigroupoid2C (interface)

**Signature**

```ts
export interface PipeableSemigroupoid2C<F extends URIS2, L> {
  readonly compose: <A>(la: Kind2<F, L, A>) => <B>(ab: Kind2<F, A, B>) => Kind2<F, L, B>
}
```

# PipeableSemigroupoid3 (interface)

**Signature**

```ts
export interface PipeableSemigroupoid3<F extends URIS3> {
  readonly compose: <U, L, A>(la: Kind3<F, U, L, A>) => <B>(ab: Kind3<F, U, A, B>) => Kind3<F, U, L, B>
}
```

# PipeableSemigroupoid4 (interface)

**Signature**

```ts
export interface PipeableSemigroupoid4<F extends URIS4> {
  readonly compose: <X, U, L, A>(la: Kind4<F, X, U, L, A>) => <B>(ab: Kind4<F, X, U, A, B>) => Kind4<F, X, U, L, B>
}
```

# pipe (function)

**Signature**

```ts
export function pipe<A>(a: A): A
export function pipe<A, B>(a: A, ab: (a: A) => B): B
export function pipe<A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C
export function pipe<A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D
export function pipe<A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E
export function pipe<A, B, C, D, E, F>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F
): F
export function pipe<A, B, C, D, E, F, G>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G
): G
export function pipe<A, B, C, D, E, F, G, H>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H
): H
export function pipe<A, B, C, D, E, F, G, H, I>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I
): I
export function pipe<A, B, C, D, E, F, G, H, I, J>(
  a: A,
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => D,
  de: (d: D) => E,
  ef: (e: E) => F,
  fg: (f: F) => G,
  gh: (g: G) => H,
  hi: (h: H) => I,
  ij: (i: I) => J
): J { ... }
```

Added in v1.19.0

# pipeable (function)

**Signature**

```ts
export function pipeable<F extends URIS4, I>(
  I: { URI: F } & I
): (I extends Chain4<F>
  ? PipeableChain4<F>
  : I extends Apply4<F>
  ? PipeableApply4<F>
  : I extends Functor4<F>
  ? PipeableFunctor4<F>
  : {}) &
  (I extends Contravariant4<F> ? PipeableContravariant4<F> : {}) &
  (I extends FunctorWithIndex4<F, infer Ix> ? PipeableFunctorWithIndex4<F, Ix> : {}) &
  (I extends Bifunctor4<F> ? PipeableBifunctor4<F> : {}) &
  (I extends Extend4<F> ? PipeableExtend4<F> : {}) &
  (I extends FoldableWithIndex4<F, infer Ix>
    ? PipeableFoldableWithIndex4<F, Ix>
    : I extends Foldable2v4<F>
    ? PipeableFoldable4<F>
    : {}) &
  (I extends Alt4<F> ? PipeableAlt4<F> : {}) &
  (I extends FilterableWithIndex4<F, infer Ix>
    ? PipeableFilterableWithIndex4<F, Ix>
    : I extends Filterable4<F>
    ? PipeableFilterable4<F>
    : I extends Compactable4<F>
    ? PipeableCompactable4<F>
    : {}) &
  (I extends Profunctor4<F> ? PipeableProfunctor4<F> : {}) &
  (I extends Semigroupoid4<F> ? PipeableSemigroupoid4<F> : {}) &
  (I extends MonadThrow4<F> ? PipeableMonadThrow4<F> : {})
export function pipeable<F extends URIS3, I>(
  I: { URI: F } & I
): (I extends Chain3<F>
  ? PipeableChain3<F>
  : I extends Apply3<F>
  ? PipeableApply3<F>
  : I extends Functor3<F>
  ? PipeableFunctor3<F>
  : {}) &
  (I extends Contravariant3<F> ? PipeableContravariant3<F> : {}) &
  (I extends FunctorWithIndex3<F, infer Ix> ? PipeableFunctorWithIndex3<F, Ix> : {}) &
  (I extends Bifunctor3<F> ? PipeableBifunctor3<F> : {}) &
  (I extends Extend3<F> ? PipeableExtend3<F> : {}) &
  (I extends FoldableWithIndex3<F, infer Ix>
    ? PipeableFoldableWithIndex3<F, Ix>
    : I extends Foldable2v3<F>
    ? PipeableFoldable3<F>
    : {}) &
  (I extends Alt3<F> ? PipeableAlt3<F> : {}) &
  (I extends FilterableWithIndex3<F, infer Ix>
    ? PipeableFilterableWithIndex3<F, Ix>
    : I extends Filterable3<F>
    ? PipeableFilterable3<F>
    : I extends Compactable3<F>
    ? PipeableCompactable3<F>
    : {}) &
  (I extends Profunctor3<F> ? PipeableProfunctor3<F> : {}) &
  (I extends Semigroupoid3<F> ? PipeableSemigroupoid3<F> : {}) &
  (I extends MonadThrow3<F> ? PipeableMonadThrow3<F> : {})
export function pipeable<F extends URIS2, I, L>(
  I: { URI: F; _L: L } & I
): (I extends Chain2C<F, L>
  ? PipeableChain2C<F, L>
  : I extends Apply2C<F, L>
  ? PipeableApply2C<F, L>
  : I extends Functor2C<F, L>
  ? PipeableFunctor2C<F, L>
  : {}) &
  (I extends Contravariant2C<F, L> ? PipeableContravariant2C<F, L> : {}) &
  (I extends FunctorWithIndex2C<F, infer Ix, L> ? PipeableFunctorWithIndex2C<F, Ix, L> : {}) &
  (I extends Extend2C<F, L> ? PipeableExtend2C<F, L> : {}) &
  (I extends FoldableWithIndex2C<F, infer Ix, L>
    ? PipeableFoldableWithIndex2C<F, Ix, L>
    : I extends Foldable2v2C<F, L>
    ? PipeableFoldable2C<F, L>
    : {}) &
  (I extends Alt2C<F, L> ? PipeableAlt2C<F, L> : {}) &
  (I extends FilterableWithIndex2C<F, infer Ix, L>
    ? PipeableFilterableWithIndex2C<F, Ix, L>
    : I extends Filterable2C<F, L>
    ? PipeableFilterable2C<F, L>
    : I extends Compactable2C<F, L>
    ? PipeableCompactable2C<F, L>
    : {}) &
  (I extends Profunctor2C<F, L> ? PipeableProfunctor2C<F, L> : {}) &
  (I extends Semigroupoid2C<F, L> ? PipeableSemigroupoid2C<F, L> : {}) &
  (I extends MonadThrow2C<F, L> ? PipeableMonadThrow2C<F, L> : {})
export function pipeable<F extends URIS2, I>(
  I: { URI: F } & I
): (I extends Chain2<F>
  ? PipeableChain2<F>
  : I extends Apply2<F>
  ? PipeableApply2<F>
  : I extends Functor2<F>
  ? PipeableFunctor2<F>
  : {}) &
  (I extends Contravariant2<F> ? PipeableContravariant2<F> : {}) &
  (I extends FunctorWithIndex2<F, infer Ix> ? PipeableFunctorWithIndex2<F, Ix> : {}) &
  (I extends Bifunctor2<F> ? PipeableBifunctor2<F> : {}) &
  (I extends Extend2<F> ? PipeableExtend2<F> : {}) &
  (I extends FoldableWithIndex2<F, infer Ix>
    ? PipeableFoldableWithIndex2<F, Ix>
    : I extends Foldable2v2<F>
    ? PipeableFoldable2<F>
    : {}) &
  (I extends Alt2<F> ? PipeableAlt2<F> : {}) &
  (I extends FilterableWithIndex2<F, infer Ix>
    ? PipeableFilterableWithIndex2<F, Ix>
    : I extends Filterable2<F>
    ? PipeableFilterable2<F>
    : I extends Compactable2<F>
    ? PipeableCompactable2<F>
    : {}) &
  (I extends Profunctor2<F> ? PipeableProfunctor2<F> : {}) &
  (I extends Semigroupoid2<F> ? PipeableSemigroupoid2<F> : {}) &
  (I extends MonadThrow2<F> ? PipeableMonadThrow2<F> : {})
export function pipeable<F extends URIS, I>(
  I: { URI: F } & I
): (I extends Chain1<F>
  ? PipeableChain1<F>
  : I extends Apply1<F>
  ? PipeableApply1<F>
  : I extends Functor1<F>
  ? PipeableFunctor1<F>
  : {}) &
  (I extends Contravariant1<F> ? PipeableContravariant1<F> : {}) &
  (I extends FunctorWithIndex1<F, infer Ix> ? PipeableFunctorWithIndex1<F, Ix> : {}) &
  (I extends Extend1<F> ? PipeableExtend1<F> : {}) &
  (I extends FoldableWithIndex1<F, infer Ix>
    ? PipeableFoldableWithIndex1<F, Ix>
    : I extends Foldable2v1<F>
    ? PipeableFoldable1<F>
    : {}) &
  (I extends Alt1<F> ? PipeableAlt1<F> : {}) &
  (I extends FilterableWithIndex1<F, infer Ix>
    ? PipeableFilterableWithIndex1<F, Ix>
    : I extends Filterable1<F>
    ? PipeableFilterable1<F>
    : I extends Compactable1<F>
    ? PipeableCompactable1<F>
    : {}) &
  (I extends MonadThrow1<F> ? PipeableMonadThrow1<F> : {})
export function pipeable<F, I>(
  I: { URI: F } & I
): (I extends Chain<F>
  ? PipeableChain<F>
  : I extends Apply<F>
  ? PipeableApply<F>
  : I extends Functor<F>
  ? PipeableFunctor<F>
  : {}) &
  (I extends Contravariant<F> ? PipeableContravariant<F> : {}) &
  (I extends FunctorWithIndex<F, infer Ix> ? PipeableFunctorWithIndex<F, Ix> : {}) &
  (I extends Bifunctor<F> ? PipeableBifunctor<F> : {}) &
  (I extends Extend<F> ? PipeableExtend<F> : {}) &
  (I extends FoldableWithIndex<F, infer Ix>
    ? PipeableFoldableWithIndex<F, Ix>
    : I extends Foldable2v<F>
    ? PipeableFoldable<F>
    : {}) &
  (I extends Alt<F> ? PipeableAlt<F> : {}) &
  (I extends FilterableWithIndex<F, infer Ix>
    ? PipeableFilterableWithIndex<F, Ix>
    : I extends Filterable<F>
    ? PipeableFilterable<F>
    : I extends Compactable<F>
    ? PipeableCompactable<F>
    : {}) &
  (I extends Profunctor<F> ? PipeableProfunctor<F> : {}) &
  (I extends Semigroupoid<F> ? PipeableSemigroupoid<F> : {}) &
  (I extends MonadThrow<F> ? PipeableMonadThrow<F> : {}) { ... }
```

Added in v1.19.0
