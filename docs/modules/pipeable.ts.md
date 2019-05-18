---
title: pipeable.ts
nav_order: 63
parent: Modules
---

---

<h2 class="text-delta">Table of contents</h2>

- [PipeableAlt (interface)](#pipeablealt-interface)
- [PipeableAlt1 (interface)](#pipeablealt1-interface)
- [PipeableAlt2 (interface)](#pipeablealt2-interface)
- [PipeableAlt2C (interface)](#pipeablealt2c-interface)
- [PipeableAlt3 (interface)](#pipeablealt3-interface)
- [PipeableApply (interface)](#pipeableapply-interface)
- [PipeableApply1 (interface)](#pipeableapply1-interface)
- [PipeableApply2 (interface)](#pipeableapply2-interface)
- [PipeableApply2C (interface)](#pipeableapply2c-interface)
- [PipeableApply3 (interface)](#pipeableapply3-interface)
- [PipeableBifunctor (interface)](#pipeablebifunctor-interface)
- [PipeableBifunctor2 (interface)](#pipeablebifunctor2-interface)
- [PipeableBifunctor3 (interface)](#pipeablebifunctor3-interface)
- [PipeableChain (interface)](#pipeablechain-interface)
- [PipeableChain1 (interface)](#pipeablechain1-interface)
- [PipeableChain2 (interface)](#pipeablechain2-interface)
- [PipeableChain2C (interface)](#pipeablechain2c-interface)
- [PipeableChain3 (interface)](#pipeablechain3-interface)
- [PipeableCompactable (interface)](#pipeablecompactable-interface)
- [PipeableCompactable1 (interface)](#pipeablecompactable1-interface)
- [PipeableCompactable2 (interface)](#pipeablecompactable2-interface)
- [PipeableCompactable2C (interface)](#pipeablecompactable2c-interface)
- [PipeableCompactable3 (interface)](#pipeablecompactable3-interface)
- [PipeableExtend (interface)](#pipeableextend-interface)
- [PipeableExtend1 (interface)](#pipeableextend1-interface)
- [PipeableExtend2 (interface)](#pipeableextend2-interface)
- [PipeableExtend2C (interface)](#pipeableextend2c-interface)
- [PipeableExtend3 (interface)](#pipeableextend3-interface)
- [PipeableFilterable (interface)](#pipeablefilterable-interface)
- [PipeableFilterable1 (interface)](#pipeablefilterable1-interface)
- [PipeableFilterable2 (interface)](#pipeablefilterable2-interface)
- [PipeableFilterable2C (interface)](#pipeablefilterable2c-interface)
- [PipeableFilterable3 (interface)](#pipeablefilterable3-interface)
- [PipeableFilterableWithIndex (interface)](#pipeablefilterablewithindex-interface)
- [PipeableFilterableWithIndex1 (interface)](#pipeablefilterablewithindex1-interface)
- [PipeableFilterableWithIndex2 (interface)](#pipeablefilterablewithindex2-interface)
- [PipeableFilterableWithIndex2C (interface)](#pipeablefilterablewithindex2c-interface)
- [PipeableFilterableWithIndex3 (interface)](#pipeablefilterablewithindex3-interface)
- [PipeableFoldable (interface)](#pipeablefoldable-interface)
- [PipeableFoldable1 (interface)](#pipeablefoldable1-interface)
- [PipeableFoldable2 (interface)](#pipeablefoldable2-interface)
- [PipeableFoldable2C (interface)](#pipeablefoldable2c-interface)
- [PipeableFoldable3 (interface)](#pipeablefoldable3-interface)
- [PipeableFoldableWithIndex (interface)](#pipeablefoldablewithindex-interface)
- [PipeableFoldableWithIndex1 (interface)](#pipeablefoldablewithindex1-interface)
- [PipeableFoldableWithIndex2 (interface)](#pipeablefoldablewithindex2-interface)
- [PipeableFoldableWithIndex2C (interface)](#pipeablefoldablewithindex2c-interface)
- [PipeableFoldableWithIndex3 (interface)](#pipeablefoldablewithindex3-interface)
- [PipeableFunctor (interface)](#pipeablefunctor-interface)
- [PipeableFunctor1 (interface)](#pipeablefunctor1-interface)
- [PipeableFunctor2 (interface)](#pipeablefunctor2-interface)
- [PipeableFunctor2C (interface)](#pipeablefunctor2c-interface)
- [PipeableFunctor3 (interface)](#pipeablefunctor3-interface)
- [PipeableFunctorWithIndex (interface)](#pipeablefunctorwithindex-interface)
- [PipeableFunctorWithIndex1 (interface)](#pipeablefunctorwithindex1-interface)
- [PipeableFunctorWithIndex2 (interface)](#pipeablefunctorwithindex2-interface)
- [PipeableFunctorWithIndex2C (interface)](#pipeablefunctorwithindex2c-interface)
- [PipeableFunctorWithIndex3 (interface)](#pipeablefunctorwithindex3-interface)
- [PipeableProfunctor (interface)](#pipeableprofunctor-interface)
- [PipeableProfunctor2 (interface)](#pipeableprofunctor2-interface)
- [PipeableProfunctor2C (interface)](#pipeableprofunctor2c-interface)
- [PipeableProfunctor3 (interface)](#pipeableprofunctor3-interface)
- [PipeableSemigroupoid (interface)](#pipeablesemigroupoid-interface)
- [PipeableSemigroupoid2 (interface)](#pipeablesemigroupoid2-interface)
- [PipeableSemigroupoid2C (interface)](#pipeablesemigroupoid2c-interface)
- [PipeableSemigroupoid3 (interface)](#pipeablesemigroupoid3-interface)
- [pipe (constant)](#pipe-constant)
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
  readonly alt: <A>(that: () => Type<F, A>) => (fa: Type<F, A>) => Type<F, A>
}
```

# PipeableAlt2 (interface)

**Signature**

```ts
export interface PipeableAlt2<F extends URIS2> {
  readonly alt: <L, A>(that: () => Type2<F, L, A>) => (fa: Type2<F, L, A>) => Type2<F, L, A>
}
```

# PipeableAlt2C (interface)

**Signature**

```ts
export interface PipeableAlt2C<F extends URIS2, L> {
  readonly alt: <A>(that: () => Type2<F, L, A>) => (fa: Type2<F, L, A>) => Type2<F, L, A>
}
```

# PipeableAlt3 (interface)

**Signature**

```ts
export interface PipeableAlt3<F extends URIS3> {
  readonly alt: <U, L, A>(that: () => Type3<F, U, L, A>) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
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
  readonly ap: <A>(fa: Type<F, A>) => <B>(fab: Type<F, (a: A) => B>) => Type<F, B>
  readonly apFirst: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, A>
  readonly apSecond: <B>(fb: Type<F, B>) => <A>(fa: Type<F, A>) => Type<F, B>
}
```

# PipeableApply2 (interface)

**Signature**

```ts
export interface PipeableApply2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly ap: <L, A>(fa: Type2<F, L, A>) => <B>(fab: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
  readonly apFirst: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, A>
  readonly apSecond: <L, B>(fb: Type2<F, L, B>) => <A>(fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# PipeableApply2C (interface)

**Signature**

```ts
export interface PipeableApply2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly ap: <A>(fa: Type2<F, L, A>) => <B>(fab: Type2<F, L, (a: A) => B>) => Type2<F, L, B>
  readonly apFirst: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, A>
  readonly apSecond: <A>(fb: Type2<F, L, A>) => <B>(fb: Type2<F, L, B>) => Type2<F, L, B>
}
```

# PipeableApply3 (interface)

**Signature**

```ts
export interface PipeableApply3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly ap: <U, L, A>(fa: Type3<F, U, L, A>) => <B>(fab: Type3<F, U, L, (a: A) => B>) => Type3<F, U, L, B>
  readonly apFirst: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly apSecond: <U, L, B>(fb: Type3<F, U, L, B>) => <A>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}
```

# PipeableBifunctor (interface)

**Signature**

```ts
export interface PipeableBifunctor<F> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: HKT2<F, L, A>) => HKT2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: HKT2<F, L, A>) => HKT2<F, M, A>
}
```

# PipeableBifunctor2 (interface)

**Signature**

```ts
export interface PipeableBifunctor2<F extends URIS2> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => (fa: Type2<F, L, A>) => Type2<F, M, A>
}
```

# PipeableBifunctor3 (interface)

**Signature**

```ts
export interface PipeableBifunctor3<F extends URIS3> {
  readonly bimap: <L, A, M, B>(f: (l: L) => M, g: (a: A) => B) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, B>
  readonly mapLeft: <L, A, M>(f: (l: L) => M) => <U>(fa: Type3<F, U, L, A>) => Type3<F, U, M, A>
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
  readonly chain: <A, B>(f: (a: A) => Type<F, B>) => (ma: Type<F, A>) => Type<F, B>
  readonly chainFirst: <A, B>(f: (a: A) => Type<F, B>) => (ma: Type<F, A>) => Type<F, A>
  readonly flatten: <A>(mma: Type<F, Type<F, A>>) => Type<F, A>
}
```

# PipeableChain2 (interface)

**Signature**

```ts
export interface PipeableChain2<F extends URIS2> extends PipeableApply2<F> {
  readonly chain: <L, A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly chainFirst: <L, A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, A>
  readonly flatten: <L, A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}
```

# PipeableChain2C (interface)

**Signature**

```ts
export interface PipeableChain2C<F extends URIS2, L> extends PipeableApply2C<F, L> {
  readonly chain: <A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly chainFirst: <A, B>(f: (a: A) => Type2<F, L, B>) => (ma: Type2<F, L, A>) => Type2<F, L, A>
  readonly flatten: <A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>
}
```

# PipeableChain3 (interface)

**Signature**

```ts
export interface PipeableChain3<F extends URIS3> extends PipeableApply3<F> {
  readonly chain: <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly chainFirst: <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly flatten: <U, L, A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>
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
  readonly compact: <A>(fa: Type<F, Option<A>>) => Type<F, A>
  readonly separate: <A, B>(fa: Type<F, Either<A, B>>) => Separated<Type<F, A>, Type<F, B>>
}
```

# PipeableCompactable2 (interface)

**Signature**

```ts
export interface PipeableCompactable2<F extends URIS2> {
  readonly compact: <L, A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <L, A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}
```

# PipeableCompactable2C (interface)

**Signature**

```ts
export interface PipeableCompactable2C<F extends URIS2, L> {
  readonly compact: <A>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>
  readonly separate: <A, B>(fa: Type2<F, L, Either<A, B>>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
}
```

# PipeableCompactable3 (interface)

**Signature**

```ts
export interface PipeableCompactable3<F extends URIS3> {
  readonly compact: <U, L, A>(fa: Type3<F, U, L, Option<A>>) => Type3<F, U, L, A>
  readonly separate: <U, L, A, B>(fa: Type3<F, U, L, Either<A, B>>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
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
  readonly extend: <A, B>(f: (fa: Type<F, A>) => B) => (ma: Type<F, A>) => Type<F, B>
  readonly duplicate: <A>(ma: Type<F, A>) => Type<F, Type<F, A>>
}
```

# PipeableExtend2 (interface)

**Signature**

```ts
export interface PipeableExtend2<F extends URIS2> extends PipeableFunctor2<F> {
  readonly extend: <L, A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <L, A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}
```

# PipeableExtend2C (interface)

**Signature**

```ts
export interface PipeableExtend2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly extend: <A, B>(f: (fa: Type2<F, L, A>) => B) => (ma: Type2<F, L, A>) => Type2<F, L, B>
  readonly duplicate: <A>(ma: Type2<F, L, A>) => Type2<F, L, Type2<F, L, A>>
}
```

# PipeableExtend3 (interface)

**Signature**

```ts
export interface PipeableExtend3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly extend: <U, L, A, B>(f: (fa: Type3<F, U, L, A>) => B) => (ma: Type3<F, U, L, A>) => Type3<F, U, L, B>
  readonly duplicate: <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, Type3<F, U, L, A>>
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
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type<F, A>) => Type<F, B>
    <A>(predicate: Predicate<A>): (fa: Type<F, A>) => Type<F, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Type<F, A>) => Type<F, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, B>>
    <A>(predicate: Predicate<A>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Type<F, A>) => Separated<Type<F, RL>, Type<F, RR>>
}
```

# PipeableFilterable2 (interface)

**Signature**

```ts
export interface PipeableFilterable2<F extends URIS2> extends PipeableCompactable2<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: Predicate<A>): <L>(fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: Predicate<A>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}
```

# PipeableFilterable2C (interface)

**Signature**

```ts
export interface PipeableFilterable2C<F extends URIS2, L> extends PipeableCompactable2C<F, L> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: Predicate<A>): (fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: Predicate<A>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => (fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}
```

# PipeableFilterable3 (interface)

**Signature**

```ts
export interface PipeableFilterable3<F extends URIS3> extends PipeableCompactable3<F> {
  readonly filter: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
    <A>(predicate: Predicate<A>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  }
  readonly filterMap: <A, B>(f: (a: A) => Option<B>) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly partition: {
    <A, B extends A>(refinement: Refinement<A, B>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
    <A>(predicate: Predicate<A>): <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  }
  readonly partitionMap: <A, RL, RR>(
    f: (a: A) => Either<RL, RR>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
}
```

# PipeableFilterableWithIndex (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex<F, I> extends PipeableFilterable<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => HKT<F, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => HKT<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: HKT<F, A>) => HKT<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: HKT<F, A>) => Separated<HKT<F, A>, HKT<F, A>>
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
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type<F, A>) => Type<F, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type<F, A>) => Type<F, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Type<F, A>) => Type<F, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type<F, A>) => Separated<Type<F, A>, Type<F, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Type<F, A>) => Separated<Type<F, RL>, Type<F, RR>>
}
```

# PipeableFilterableWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex2<F extends URIS2, I> extends PipeableFilterable2<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): <L>(fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <L>(
      fa: Type2<F, L, A>
    ) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <L>(fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}
```

# PipeableFilterableWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex2C<F extends URIS2, I, L> extends PipeableFilterable2C<F, L> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (fa: Type2<F, L, A>) => Type2<F, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type2<F, L, A>) => Type2<F, L, A>
  }
  readonly filterMapWithIndex: <A, B>(f: (i: I, a: A) => Option<B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): (
      fa: Type2<F, L, A>
    ) => Separated<Type2<F, L, A>, Type2<F, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): (fa: Type2<F, L, A>) => Separated<Type2<F, L, A>, Type2<F, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => (fa: Type2<F, L, A>) => Separated<Type2<F, L, RL>, Type2<F, L, RR>>
}
```

# PipeableFilterableWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFilterableWithIndex3<F extends URIS3, I> extends PipeableFilterable3<F> {
  readonly filterWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
    <A>(predicate: PredicateWithIndex<I, A>): <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  }
  readonly filterMapWithIndex: <A, B>(
    f: (i: I, a: A) => Option<B>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, A>
  readonly partitionWithIndex: {
    <A, B extends A>(refinement: RefinementWithIndex<I, A, B>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, B>>
    <A>(predicate: PredicateWithIndex<I, A>): <U, L>(
      fa: Type3<F, U, L, A>
    ) => Separated<Type3<F, U, L, A>, Type3<F, U, L, A>>
  }
  readonly partitionMapWithIndex: <A, RL, RR>(
    f: (i: I, a: A) => Either<RL, RR>
  ) => <U, L>(fa: Type3<F, U, L, A>) => Separated<Type3<F, U, L, RL>, Type3<F, U, L, RR>>
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
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Type<F, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Type<F, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Type<F, A>) => B
}
```

# PipeableFoldable2 (interface)

**Signature**

```ts
export interface PipeableFoldable2<F extends URIS2> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <L>(fa: Type2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <L>(fa: Type2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <L>(fa: Type2<F, L, A>) => B
}
```

# PipeableFoldable2C (interface)

**Signature**

```ts
export interface PipeableFoldable2C<F extends URIS2, L> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Type2<F, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Type2<F, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Type2<F, L, A>) => B
}
```

# PipeableFoldable3 (interface)

**Signature**

```ts
export interface PipeableFoldable3<F extends URIS3> {
  readonly reduce: <A, B>(b: B, f: (b: B, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
  readonly foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => <U, L>(fa: Type3<F, U, L, A>) => M
  readonly reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
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
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Type<F, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Type<F, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Type<F, A>) => B
}
```

# PipeableFoldableWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex2<F extends URIS2, I> extends PipeableFoldable2<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <L>(fa: Type2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <L>(fa: Type2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <L>(fa: Type2<F, L, A>) => B
}
```

# PipeableFoldableWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex2C<F extends URIS2, I, L> extends PipeableFoldable2C<F, L> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => (fa: Type2<F, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => (fa: Type2<F, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => (fa: Type2<F, L, A>) => B
}
```

# PipeableFoldableWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFoldableWithIndex3<F extends URIS3, I> extends PipeableFoldable3<F> {
  readonly reduceWithIndex: <A, B>(b: B, f: (i: I, b: B, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
  readonly foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: I, a: A) => M) => <U, L>(fa: Type3<F, U, L, A>) => M
  readonly reduceRightWithIndex: <A, B>(b: B, f: (i: I, a: A, b: B) => B) => <U, L>(fa: Type3<F, U, L, A>) => B
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
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}
```

# PipeableFunctor2 (interface)

**Signature**

```ts
export interface PipeableFunctor2<F extends URIS2> {
  readonly map: <A, B>(f: (a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# PipeableFunctor2C (interface)

**Signature**

```ts
export interface PipeableFunctor2C<F extends URIS2, L> {
  readonly map: <A, B>(f: (a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# PipeableFunctor3 (interface)

**Signature**

```ts
export interface PipeableFunctor3<F extends URIS3> {
  readonly map: <A, B>(f: (a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
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
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type<F, A>) => Type<F, B>
}
```

# PipeableFunctorWithIndex2 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex2<F extends URIS2, I> extends PipeableFunctor2<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <L>(fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# PipeableFunctorWithIndex2C (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex2C<F extends URIS2, I, L> extends PipeableFunctor2C<F, L> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => (fa: Type2<F, L, A>) => Type2<F, L, B>
}
```

# PipeableFunctorWithIndex3 (interface)

**Signature**

```ts
export interface PipeableFunctorWithIndex3<F extends URIS3, I> extends PipeableFunctor3<F> {
  readonly mapWithIndex: <A, B>(f: (i: I, a: A) => B) => <U, L>(fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
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
  readonly promap: <A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Type2<F, B, C>) => Type2<F, A, D>
}
```

# PipeableProfunctor2C (interface)

**Signature**

```ts
export interface PipeableProfunctor2C<F extends URIS2, L> extends PipeableFunctor2C<F, L> {
  readonly promap: <A, C, D>(f: (a: A) => L, g: (c: C) => D) => (flc: Type2<F, L, C>) => Type2<F, A, D>
}
```

# PipeableProfunctor3 (interface)

**Signature**

```ts
export interface PipeableProfunctor3<F extends URIS3> extends PipeableFunctor3<F> {
  readonly promap: <U, A, B, C, D>(f: (a: A) => B, g: (c: C) => D) => (fbc: Type3<F, U, B, C>) => Type3<F, U, A, D>
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
  readonly compose: <L, A>(la: Type2<F, L, A>) => <B>(ab: Type2<F, A, B>) => Type2<F, L, B>
}
```

# PipeableSemigroupoid2C (interface)

**Signature**

```ts
export interface PipeableSemigroupoid2C<F extends URIS2, L> {
  readonly compose: <A>(la: Type2<F, L, A>) => <B>(ab: Type2<F, A, B>) => Type2<F, L, B>
}
```

# PipeableSemigroupoid3 (interface)

**Signature**

```ts
export interface PipeableSemigroupoid3<F extends URIS3> {
  readonly compose: <U, L, A>(la: Type3<F, U, L, A>) => <B>(ab: Type3<F, U, A, B>) => Type3<F, U, L, B>
}
```

# pipe (constant)

**Signature**

```ts
export const pipe = ...
```

Added in v2.0.0

# pipeable (function)

**Signature**

```ts
export function pipeable<F extends URIS3, I>(
  I: { URI: F } & I
): (I extends Chain3<F>
  ? PipeableChain3<F>
  : I extends Apply3<F>
  ? PipeableApply3<F>
  : I extends Functor3<F>
  ? PipeableFunctor3<F>
  : {}) &
  (I extends FunctorWithIndex3<F, infer Ix> ? PipeableFunctorWithIndex3<F, Ix> : {}) &
  (I extends Bifunctor3<F> ? PipeableBifunctor3<F> : {}) &
  (I extends Extend3<F> ? PipeableExtend3<F> : {}) &
  (I extends FoldableWithIndex3<F, infer Ix>
    ? PipeableFoldableWithIndex3<F, Ix>
    : I extends Foldable3<F>
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
  (I extends Semigroupoid3<F> ? PipeableSemigroupoid3<F> : {})
export function pipeable<F extends URIS2, I, L>(
  I: { URI: F; _L: L } & I
): (I extends Chain2C<F, L>
  ? PipeableChain2C<F, L>
  : I extends Apply2C<F, L>
  ? PipeableApply2C<F, L>
  : I extends Functor2C<F, L>
  ? PipeableFunctor2C<F, L>
  : {}) &
  (I extends FunctorWithIndex2C<F, infer Ix, L> ? PipeableFunctorWithIndex2C<F, Ix, L> : {}) &
  (I extends Extend2C<F, L> ? PipeableExtend2C<F, L> : {}) &
  (I extends FoldableWithIndex2C<F, infer Ix, L>
    ? PipeableFoldableWithIndex2C<F, Ix, L>
    : I extends Foldable2C<F, L>
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
  (I extends Semigroupoid2C<F, L> ? PipeableSemigroupoid2C<F, L> : {})
export function pipeable<F extends URIS2, I>(
  I: { URI: F } & I
): (I extends Chain2<F>
  ? PipeableChain2<F>
  : I extends Apply2<F>
  ? PipeableApply2<F>
  : I extends Functor2<F>
  ? PipeableFunctor2<F>
  : {}) &
  (I extends FunctorWithIndex2<F, infer Ix> ? PipeableFunctorWithIndex2<F, Ix> : {}) &
  (I extends Bifunctor2<F> ? PipeableBifunctor2<F> : {}) &
  (I extends Extend2<F> ? PipeableExtend2<F> : {}) &
  (I extends FoldableWithIndex2<F, infer Ix>
    ? PipeableFoldableWithIndex2<F, Ix>
    : I extends Foldable2<F>
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
  (I extends Semigroupoid2<F> ? PipeableSemigroupoid2<F> : {})
export function pipeable<F extends URIS, I>(
  I: { URI: F } & I
): (I extends Chain1<F>
  ? PipeableChain1<F>
  : I extends Apply1<F>
  ? PipeableApply1<F>
  : I extends Functor1<F>
  ? PipeableFunctor1<F>
  : {}) &
  (I extends FunctorWithIndex1<F, infer Ix> ? PipeableFunctorWithIndex1<F, Ix> : {}) &
  (I extends Extend1<F> ? PipeableExtend1<F> : {}) &
  (I extends FoldableWithIndex1<F, infer Ix>
    ? PipeableFoldableWithIndex1<F, Ix>
    : I extends Foldable1<F>
    ? PipeableFoldable1<F>
    : {}) &
  (I extends Alt1<F> ? PipeableAlt1<F> : {}) &
  (I extends FilterableWithIndex1<F, infer Ix>
    ? PipeableFilterableWithIndex1<F, Ix>
    : I extends Filterable1<F>
    ? PipeableFilterable1<F>
    : I extends Compactable1<F>
    ? PipeableCompactable1<F>
    : {})
export function pipeable<F, I>(
  I: { URI: F } & I
): (I extends Chain<F>
  ? PipeableChain<F>
  : I extends Apply<F>
  ? PipeableApply<F>
  : I extends Functor<F>
  ? PipeableFunctor<F>
  : {}) &
  (I extends FunctorWithIndex<F, infer Ix> ? PipeableFunctorWithIndex<F, Ix> : {}) &
  (I extends Bifunctor<F> ? PipeableBifunctor<F> : {}) &
  (I extends Extend<F> ? PipeableExtend<F> : {}) &
  (I extends FoldableWithIndex<F, infer Ix>
    ? PipeableFoldableWithIndex<F, Ix>
    : I extends Foldable<F>
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
  (I extends Semigroupoid<F> ? PipeableSemigroupoid<F> : {}) { ... }
```

Added in v2.0.0
