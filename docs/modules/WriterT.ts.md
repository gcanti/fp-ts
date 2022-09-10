---
title: WriterT.ts
nav_order: 112
parent: Modules
---

## WriterT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [censor](#censor)
  - [listen](#listen)
  - [listens](#listens)
  - [pass](#pass)
  - [swap](#swap)
- [constructors](#constructors)
  - [fromF](#fromf)
  - [fromIO](#fromio)
  - [fromTask](#fromtask)
  - [tell](#tell)
- [type class operations](#type-class-operations)
  - [ap](#ap)
  - [bimap](#bimap)
  - [chain](#chain)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [of](#of)
- [utils](#utils)
  - [fst](#fst)
  - [snd](#snd)

---

# combinators

## censor

Modify the final accumulator value by applying a function

**Signature**

```ts
export declare function censor<F extends URIS4>(
  F: Functor4<F>
): <W>(f: (w: W) => W) => <S, R, E, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<W, A>>
export declare function censor<F extends URIS3>(
  F: Functor3<F>
): <W>(f: (w: W) => W) => <R, E, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, A>>
export declare function censor<F extends URIS3, E>(
  F: Functor3C<F, E>
): <W>(f: (w: W) => W) => <R, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, A>>
export declare function censor<F extends URIS2>(
  F: Functor2<F>
): <W>(f: (w: W) => W) => <E, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, A>>
export declare function censor<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W>(f: (w: W) => W) => <A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, A>>
export declare function censor<F extends URIS>(
  F: Functor1<F>
): <W>(f: (w: W) => W) => <A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<W, A>>
export declare function censor<F>(
  F: Functor<F>
): <W>(f: (w: W) => W) => <A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

## listen

Modifies the result to include the changes to the accumulator

**Signature**

```ts
export declare function listen<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, W, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<W, readonly [A, W]>>
export declare function listen<F extends URIS3>(
  F: Functor3<F>
): <R, E, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, readonly [A, W]>>
export declare function listen<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, readonly [A, W]>>
export declare function listen<F extends URIS2>(
  F: Functor2<F>
): <E, W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, readonly [A, W]>>
export declare function listen<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, readonly [A, W]>>
export declare function listen<F extends URIS>(
  F: Functor1<F>
): <W, A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<W, readonly [A, W]>>
export declare function listen<F>(
  F: Functor<F>
): <W, A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<W, readonly [A, W]>>
```

Added in v3.0.0

## listens

Projects a value from modifications made to the accumulator during an action

**Signature**

```ts
export declare function listens<F extends URIS4>(
  F: Functor4<F>
): <W, B>(
  f: (w: W) => B
) => <S, R, E, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<W, readonly [A, B]>>
export declare function listens<F extends URIS3>(
  F: Functor3<F>
): <W, B>(f: (w: W) => B) => <R, E, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, readonly [A, B]>>
export declare function listens<F extends URIS3, E>(
  F: Functor3C<F, E>
): <W, B>(f: (w: W) => B) => <R, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, readonly [A, B]>>
export declare function listens<F extends URIS2>(
  F: Functor2<F>
): <W, B>(f: (w: W) => B) => <E, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, readonly [A, B]>>
export declare function listens<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, B>(f: (w: W) => B) => <A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, readonly [A, B]>>
export declare function listens<F extends URIS>(
  F: Functor1<F>
): <W, B>(f: (w: W) => B) => <A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<W, readonly [A, B]>>
export declare function listens<F>(
  F: Functor<F>
): <W, B>(f: (w: W) => B) => <A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<W, readonly [A, B]>>
```

Added in v3.0.0

## pass

Applies the returned function to the accumulator

**Signature**

```ts
export declare function pass<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, W, A>(fwa: Kind4<F, S, R, E, Writer<W, readonly [A, (w: W) => W]>>) => Kind4<F, S, R, E, Writer<W, A>>
export declare function pass<F extends URIS3>(
  F: Functor3<F>
): <R, E, W, A>(fwa: Kind3<F, R, E, Writer<W, readonly [A, (w: W) => W]>>) => Kind3<F, R, E, Writer<W, A>>
export declare function pass<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, W, A>(fwa: Kind3<F, R, E, Writer<W, readonly [A, (w: W) => W]>>) => Kind3<F, R, E, Writer<W, A>>
export declare function pass<F extends URIS2>(
  F: Functor2<F>
): <E, W, A>(fwa: Kind2<F, E, Writer<W, readonly [A, (w: W) => W]>>) => Kind2<F, E, Writer<W, A>>
export declare function pass<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, A>(fwa: Kind2<F, E, Writer<W, readonly [A, (w: W) => W]>>) => Kind2<F, E, Writer<W, A>>
export declare function pass<F extends URIS>(
  F: Functor1<F>
): <W, A>(fwa: Kind<F, Writer<W, readonly [A, (w: W) => W]>>) => Kind<F, Writer<W, A>>
export declare function pass<F>(
  F: Functor<F>
): <W, A>(fwa: HKT<F, Writer<W, readonly [A, (w: W) => W]>>) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, W, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<A, W>>
export declare function swap<F extends URIS3>(
  F: Functor3<F>
): <R, E, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<A, W>>
export declare function swap<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<A, W>>
export declare function swap<F extends URIS2>(
  F: Functor2<F>
): <E, W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<A, W>>
export declare function swap<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<A, W>>
export declare function swap<F extends URIS>(
  F: Functor1<F>
): <W, A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<A, W>>
export declare function swap<F>(F: Functor<F>): <W, A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<A, W>>
```

Added in v3.0.0

# constructors

## fromF

**Signature**

```ts
export declare function fromF<F extends URIS4>(
  F: Functor4<F>
): <W>(w: W) => <S, R, E, A>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, Writer<W, A>>
export declare function fromF<F extends URIS3>(
  F: Functor3<F>
): <W>(w: W) => <R, E, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromF<F extends URIS3, E>(
  F: Functor3C<F, E>
): <W>(w: W) => <R, A>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromF<F extends URIS2>(
  F: Functor2<F>
): <W>(w: W) => <E, A>(fa: Kind2<F, E, A>) => Kind2<F, E, Writer<W, A>>
export declare function fromF<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W>(w: W) => <A>(fa: Kind2<F, E, A>) => Kind2<F, E, Writer<W, A>>
export declare function fromF<F extends URIS>(F: Functor1<F>): <W>(w: W) => <A>(fa: Kind<F, A>) => Kind<F, Writer<W, A>>
export declare function fromF<F>(F: Functor<F>): <W>(w: W) => <A>(fa: HKT<F, A>) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

## fromIO

**Signature**

```ts
export declare function fromIO<F extends URIS4>(
  F: Functor4<F>,
  FT: FromIO4<F>
): <W>(w: W) => <A, S, R, E>(fa: IO<A>) => Kind4<F, S, R, E, Writer<W, A>>
export declare function fromIO<F extends URIS3>(
  F: Functor3<F>,
  FT: FromIO3<F>
): <W>(w: W) => <A, R, E>(fa: IO<A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromIO<F extends URIS3, E>(
  F: Functor3<F>,
  FT: FromIO3C<F, E>
): <W>(w: W) => <A, R>(fa: IO<A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromIO<F extends URIS2>(
  F: Functor2<F>,
  FT: FromIO2<F>
): <W>(w: W) => <A, E>(fa: IO<A>) => Kind2<F, E, Writer<W, A>>
export declare function fromIO<F extends URIS2, E>(
  F: Functor2<F>,
  FT: FromIO2C<F, E>
): <W>(w: W) => <A>(fa: IO<A>) => Kind2<F, E, Writer<W, A>>
export declare function fromIO<F extends URIS>(
  F: Functor1<F>,
  FT: FromIO1<F>
): <W>(w: W) => <A>(fa: IO<A>) => Kind<F, Writer<W, A>>
export declare function fromIO<F>(F: Functor<F>, FT: FromIO<F>): <W>(w: W) => <A>(fa: IO<A>) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

## fromTask

**Signature**

```ts
export declare function fromTask<F extends URIS4>(
  F: Functor4<F>,
  FT: FromTask4<F>
): <W>(w: W) => <A, S, R, E>(fa: Task<A>) => Kind4<F, S, R, E, Writer<W, A>>
export declare function fromTask<F extends URIS3>(
  F: Functor3<F>,
  FT: FromTask3<F>
): <W>(w: W) => <A, R, E>(fa: Task<A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromTask<F extends URIS3, E>(
  F: Functor3<F>,
  FT: FromTask3C<F, E>
): <W>(w: W) => <A, R>(fa: Task<A>) => Kind3<F, R, E, Writer<W, A>>
export declare function fromTask<F extends URIS2>(
  F: Functor2<F>,
  FT: FromTask2<F>
): <W>(w: W) => <A, E>(fa: Task<A>) => Kind2<F, E, Writer<W, A>>
export declare function fromTask<F extends URIS2, E>(
  F: Functor2<F>,
  FT: FromTask2C<F, E>
): <W>(w: W) => <A>(fa: Task<A>) => Kind2<F, E, Writer<W, A>>
export declare function fromTask<F extends URIS>(
  F: Functor1<F>,
  FT: FromTask1<F>
): <W>(w: W) => <A>(fa: Task<A>) => Kind<F, Writer<W, A>>
export declare function fromTask<F>(
  F: Functor<F>,
  FT: FromTask<F>
): <W>(w: W) => <A>(fa: Task<A>) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

## tell

**Signature**

```ts
export declare function tell<F extends URIS4>(F: Pointed4<F>): <W, S, R, E>(w: W) => Kind4<F, S, R, E, Writer<W, void>>
export declare function tell<F extends URIS3>(F: Pointed3<F>): <W, R, E>(w: W) => Kind3<F, R, E, Writer<W, void>>
export declare function tell<F extends URIS3, E>(F: Pointed3C<F, E>): <W, R>(w: W) => Kind3<F, R, E, Writer<W, void>>
export declare function tell<F extends URIS2>(F: Pointed2<F>): <W, E>(w: W) => Kind2<F, E, Writer<W, void>>
export declare function tell<F extends URIS2, E>(F: Pointed2C<F, E>): <W>(w: W) => Kind2<F, E, Writer<W, void>>
export declare function tell<F extends URIS>(F: Pointed1<F>): <W>(w: W) => Kind<F, Writer<W, void>>
export declare function tell<F>(F: Pointed<F>): <W>(w: W) => HKT<F, Writer<W, void>>
```

Added in v3.0.0

# type class operations

## ap

**Signature**

```ts
export declare function ap<F extends URIS4, W>(
  F: Apply4<F>,
  S: Semigroup<W>
): <S, R, E, A>(
  fa: Kind4<F, S, R, E, Writer<W, A>>
) => <B>(fab: Kind4<F, S, R, E, Writer<W, (a: A) => B>>) => Kind4<F, S, R, E, Writer<W, B>>
export declare function ap<F extends URIS3, W>(
  F: Apply3<F>,
  S: Semigroup<W>
): <R, E, A>(
  fa: Kind3<F, R, E, Writer<W, A>>
) => <B>(fab: Kind3<F, R, E, Writer<W, (a: A) => B>>) => Kind3<F, R, E, Writer<W, B>>
export declare function ap<F extends URIS3, E, W>(
  F: Apply3C<F, E>,
  S: Semigroup<W>
): <R, A>(
  fa: Kind3<F, R, E, Writer<W, A>>
) => <B>(fab: Kind3<F, R, E, Writer<W, (a: A) => B>>) => Kind3<F, R, E, Writer<W, B>>
export declare function ap<F extends URIS2, W>(
  F: Apply2<F>,
  S: Semigroup<W>
): <E, A>(fa: Kind2<F, E, Writer<W, A>>) => <B>(fab: Kind2<F, E, Writer<W, (a: A) => B>>) => Kind2<F, E, Writer<W, B>>
export declare function ap<F extends URIS2, E, W>(
  F: Apply2C<F, E>,
  S: Semigroup<W>
): <A>(fa: Kind2<F, E, Writer<W, A>>) => <B>(fab: Kind2<F, E, Writer<W, (a: A) => B>>) => Kind2<F, E, Writer<W, B>>
export declare function ap<F extends URIS, W>(
  F: Apply1<F>,
  S: Semigroup<W>
): <A>(fa: Kind<F, Writer<W, A>>) => <B>(fab: Kind<F, Writer<W, (a: A) => B>>) => Kind<F, Writer<W, B>>
export declare function ap<F, W>(
  F: Apply<F>,
  S: Semigroup<W>
): <A>(fa: HKT<F, Writer<W, A>>) => <B>(fab: HKT<F, Writer<W, (a: A) => B>>) => HKT<F, Writer<W, B>>
```

Added in v3.0.0

## bimap

**Signature**

```ts
export declare function bimap<F extends URIS4>(
  F: Functor4<F>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <S, R, E>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<G, B>>
export declare function bimap<F extends URIS3>(
  F: Functor3<F>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <R, E>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<G, B>>
export declare function bimap<F extends URIS3, E>(
  F: Functor3C<F, E>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <R>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<G, B>>
export declare function bimap<F extends URIS2>(
  F: Functor2<F>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => <E>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<G, B>>
export declare function bimap<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, G, A, B>(
  mapSnd: (w: W) => G,
  mapFst: (a: A) => B
) => (fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<G, B>>
export declare function bimap<F extends URIS>(
  F: Functor1<F>
): <W, G, A, B>(mapSnd: (w: W) => G, mapFst: (a: A) => B) => (fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<G, B>>
export declare function bimap<F>(
  F: Functor<F>
): <W, G, A, B>(mapSnd: (w: W) => G, mapFst: (a: A) => B) => (fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<G, B>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS4, W>(
  M: Chain4<M>,
  S: Semigroup<W>
): <A, S, R, E, B>(
  f: (a: A) => Kind4<M, S, R, E, Writer<W, B>>
) => (ma: Kind4<M, S, R, E, Writer<W, A>>) => Kind4<M, S, R, E, Writer<W, B>>
export declare function chain<M extends URIS3, W>(
  M: Chain3<M>,
  S: Semigroup<W>
): <A, R, E, B>(
  f: (a: A) => Kind3<M, R, E, Writer<W, B>>
) => (ma: Kind3<M, R, E, Writer<W, A>>) => Kind3<M, R, E, Writer<W, B>>
export declare function chain<M extends URIS3, E, W>(
  M: Chain3C<M, E>,
  S: Semigroup<W>
): <A, R, B>(
  f: (a: A) => Kind3<M, R, E, Writer<W, B>>
) => (ma: Kind3<M, R, E, Writer<W, A>>) => Kind3<M, R, E, Writer<W, B>>
export declare function chain<M extends URIS2, W>(
  M: Chain2<M>,
  S: Semigroup<W>
): <A, E, B>(f: (a: A) => Kind2<M, E, Writer<W, B>>) => (ma: Kind2<M, E, Writer<W, A>>) => Kind2<M, E, Writer<W, B>>
export declare function chain<M extends URIS2, E, W>(
  M: Chain2C<M, E>,
  S: Semigroup<W>
): <A, B>(f: (a: A) => Kind2<M, E, Writer<W, B>>) => (ma: Kind2<M, E, Writer<W, A>>) => Kind2<M, E, Writer<W, B>>
export declare function chain<M extends URIS, W>(
  M: Chain1<M>,
  S: Semigroup<W>
): <A, B>(f: (a: A) => Kind<M, Writer<W, B>>) => (ma: Kind<M, Writer<W, A>>) => Kind<M, Writer<W, B>>
export declare function chain<M, W>(
  M: Chain<M>,
  S: Semigroup<W>
): <A, B>(f: (a: A) => HKT<M, Writer<W, B>>) => (ma: HKT<M, Writer<W, A>>) => HKT<M, Writer<W, B>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <S, R, E, W>(fa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<W, B>>
export declare function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, E, W>(fa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, B>>
export declare function map<F extends URIS3, E>(
  F: Functor3C<F, E>
): <A, B>(f: (a: A) => B) => <R, W>(fa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<W, B>>
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <E, W>(fa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, B>>
export declare function map<F extends URIS2, E>(
  F: Functor2C<F, E>
): <A, B>(f: (a: A) => B) => <W>(fa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<W, B>>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <W>(fa: Kind<F, Writer<W, A>>) => Kind<F, Writer<W, B>>
export declare function map<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <W>(fa: HKT<F, Writer<W, A>>) => HKT<F, Writer<W, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends URIS4>(
  F: Functor4<F>
): <W, G>(mapSnd: (w: W) => G) => <S, R, E, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, Writer<G, A>>
export declare function mapLeft<F extends URIS3>(
  F: Functor3<F>
): <W, G>(mapSnd: (w: W) => G) => <R, E, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<G, A>>
export declare function mapLeft<F extends URIS3, E>(
  F: Functor3C<F, E>
): <W, G>(mapSnd: (w: W) => G) => <R, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, Writer<G, A>>
export declare function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <W, G>(mapSnd: (w: W) => G) => <E, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<G, A>>
export declare function mapLeft<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, G>(mapSnd: (w: W) => G) => <A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, Writer<G, A>>
export declare function mapLeft<F extends URIS>(
  F: Functor1<F>
): <W, G>(mapSnd: (w: W) => G) => <A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, Writer<G, A>>
export declare function mapLeft<F>(
  F: Functor<F>
): <W, G>(mapSnd: (w: W) => G) => <A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, Writer<G, A>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends URIS4, W>(
  F: Pointed4<F>,
  M: Monoid<W>
): <A, S, R, E>(a: A) => Kind4<F, S, R, E, Writer<W, A>>
export declare function of<F extends URIS3, W>(
  F: Pointed3<F>,
  M: Monoid<W>
): <A, R, E>(a: A) => Kind3<F, R, E, Writer<W, A>>
export declare function of<F extends URIS3, E, W>(
  F: Pointed3C<F, E>,
  M: Monoid<W>
): <A, R>(a: A) => Kind3<F, R, E, Writer<W, A>>
export declare function of<F extends URIS2, W>(F: Pointed2<F>, M: Monoid<W>): <A, E>(a: A) => Kind2<F, E, Writer<W, A>>
export declare function of<F extends URIS2, E, W>(
  F: Pointed2C<F, E>,
  M: Monoid<W>
): <A>(a: A) => Kind2<F, E, Writer<W, A>>
export declare function of<F extends URIS, W>(F: Pointed1<F>, M: Monoid<W>): <A>(a: A) => Kind<F, Writer<W, A>>
export declare function of<F, W>(F: Pointed<F>, M: Monoid<W>): <A>(a: A) => HKT<F, Writer<W, A>>
```

Added in v3.0.0

# utils

## fst

**Signature**

```ts
export declare function fst<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, W, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, A>
export declare function fst<F extends URIS3>(
  F: Functor3<F>
): <R, E, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, A>
export declare function fst<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, A>
export declare function fst<F extends URIS2>(
  F: Functor2<F>
): <E, W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, A>
export declare function fst<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, A>
export declare function fst<F extends URIS>(F: Functor1<F>): <W, A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, A>
export declare function fst<F>(F: Functor<F>): <W, A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, A>
```

Added in v3.0.0

## snd

**Signature**

```ts
export declare function snd<F extends URIS4>(
  F: Functor4<F>
): <S, R, E, W, A>(fwa: Kind4<F, S, R, E, Writer<W, A>>) => Kind4<F, S, R, E, W>
export declare function snd<F extends URIS3>(
  F: Functor3<F>
): <R, E, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, W>
export declare function snd<F extends URIS3, E>(
  F: Functor3C<F, E>
): <R, W, A>(fwa: Kind3<F, R, E, Writer<W, A>>) => Kind3<F, R, E, W>
export declare function snd<F extends URIS2>(
  F: Functor2<F>
): <E, W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, W>
export declare function snd<F extends URIS2, E>(
  F: Functor2C<F, E>
): <W, A>(fwa: Kind2<F, E, Writer<W, A>>) => Kind2<F, E, W>
export declare function snd<F extends URIS>(F: Functor1<F>): <W, A>(fwa: Kind<F, Writer<W, A>>) => Kind<F, W>
export declare function snd<F>(F: Functor<F>): <W, A>(fwa: HKT<F, Writer<W, A>>) => HKT<F, W>
```

Added in v3.0.0
