---
title: TheseT.ts
nav_order: 98
parent: Modules
---

## TheseT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ap](#ap)
  - [bimap](#bimap)
  - [both](#both)
  - [chain](#chain)
  - [left](#left)
  - [leftF](#leftf)
  - [map](#map)
  - [mapLeft](#mapleft)
  - [match](#match)
  - [matchE](#matche)
  - [right](#right)
  - [rightF](#rightf)
  - [swap](#swap)
  - [toTuple2](#totuple2)

---

# utils

## ap

**Signature**

```ts
export declare function ap<F extends URIS3, E>(
  F: Apply3<F>,
  S: Semigroup<E>
): <S, R, A>(
  fa: Kind3<F, S, R, These<E, A>>
) => <B>(fab: Kind3<F, S, R, These<E, (a: A) => B>>) => Kind3<F, S, R, These<E, B>>
export declare function ap<F extends URIS3, R, E>(
  F: Apply3C<F, R>,
  S: Semigroup<E>
): <S, A>(
  fa: Kind3<F, S, R, These<E, A>>
) => <B>(fab: Kind3<F, S, R, These<E, (a: A) => B>>) => Kind3<F, S, R, These<E, B>>
export declare function ap<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <R, A>(fa: Kind2<F, R, These<E, A>>) => <B>(fab: Kind2<F, R, These<E, (a: A) => B>>) => Kind2<F, R, These<E, B>>
export declare function ap<F extends URIS2, R, E>(
  F: Apply2C<F, R>,
  S: Semigroup<E>
): <A>(fa: Kind2<F, R, These<E, A>>) => <B>(fab: Kind2<F, R, These<E, (a: A) => B>>) => Kind2<F, R, These<E, B>>
export declare function ap<F extends URIS, E>(
  F: Apply1<F>,
  S: Semigroup<E>
): <A>(fa: Kind<F, These<E, A>>) => <B>(fab: Kind<F, These<E, (a: A) => B>>) => Kind<F, These<E, B>>
export declare function ap<F, E>(
  F: Apply<F>,
  S: Semigroup<E>
): <A>(fa: HKT<F, These<E, A>>) => <B>(fab: HKT<F, These<E, (a: A) => B>>) => HKT<F, These<E, B>>
```

Added in v3.0.0

## bimap

**Signature**

```ts
export declare function bimap<F extends URIS3>(
  F: Functor3<F>
): <E, G, A, B>(
  f: (e: E) => G,
  g: (a: A) => B
) => <S, R>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, B>>
export declare function bimap<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <S>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, B>>
export declare function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, B>>
export declare function bimap<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, B>>
export declare function bimap<F extends URIS>(
  F: Functor1<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind<F, These<E, A>>) => Kind<F, These<G, B>>
export declare function bimap<F>(
  F: Functor<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT<F, These<E, A>>) => HKT<F, These<G, B>>
```

Added in v3.0.0

## both

**Signature**

```ts
export declare function both<F extends URIS3>(F: Pointed3<F>): <E, A, S, R>(e: E, a: A) => Kind3<F, S, R, These<E, A>>
export declare function both<F extends URIS3, R>(
  F: Pointed3C<F, R>
): <E, A, R>(e: E, a: A) => Kind3<F, R, R, These<E, A>>
export declare function both<F extends URIS2>(F: Pointed2<F>): <E, A, R>(e: E, a: A) => Kind2<F, R, These<E, A>>
export declare function both<F extends URIS2, R>(F: Pointed2C<F, R>): <E, A>(e: E, a: A) => Kind2<F, R, These<E, A>>
export declare function both<F extends URIS>(F: Pointed1<F>): <E, A>(e: E, a: A) => Kind<F, These<E, A>>
export declare function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS3, E>(
  M: Monad3<M>,
  S: Semigroup<E>
): <A, S, R, B>(
  f: (a: A) => Kind3<M, S, R, These<E, B>>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, These<E, B>>
export declare function chain<M extends URIS3, R, E>(
  M: Monad3C<M, R>,
  S: Semigroup<E>
): <A, S, B>(
  f: (a: A) => Kind3<M, S, R, These<E, B>>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, These<E, B>>
export declare function chain<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, R, B>(f: (a: A) => Kind2<M, R, These<E, B>>) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, These<E, B>>
export declare function chain<M extends URIS2, R, E>(
  M: Monad2C<M, R>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind2<M, R, These<E, B>>) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, These<E, B>>
export declare function chain<M extends URIS, E>(
  M: Monad1<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => Kind<M, These<E, B>>) => (ma: Kind<M, These<E, A>>) => Kind<M, These<E, B>>
export declare function chain<M, E>(
  M: Monad<M>,
  S: Semigroup<E>
): <A, B>(f: (a: A) => HKT<M, These<E, B>>) => (ma: HKT<M, These<E, A>>) => HKT<M, These<E, B>>
```

Added in v3.0.0

## left

**Signature**

```ts
export declare function left<F extends URIS3>(F: Pointed3<F>): <E, S, R, A = never>(e: E) => Kind3<F, S, R, These<E, A>>
export declare function left<F extends URIS3, R>(
  F: Pointed3C<F, R>
): <E, S, A = never>(e: E) => Kind3<F, S, R, These<E, A>>
export declare function left<F extends URIS2>(F: Pointed2<F>): <E, R, A = never>(e: E) => Kind2<F, R, These<E, A>>
export declare function left<F extends URIS2, R>(F: Pointed2C<F, R>): <E, A = never>(e: E) => Kind2<F, R, These<E, A>>
export declare function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, These<E, A>>
export declare function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>>
```

Added in v3.0.0

## leftF

**Signature**

```ts
export declare function leftF<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A = never>(fe: Kind3<F, S, R, E>) => Kind3<F, S, R, These<E, A>>
export declare function leftF<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, E, A = never>(fe: Kind3<F, S, R, E>) => Kind3<F, S, R, These<E, A>>
export declare function leftF<F extends URIS2>(
  F: Functor2<F>
): <R, E, A = never>(fe: Kind2<F, R, E>) => Kind2<F, R, These<E, A>>
export declare function leftF<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A = never>(fe: Kind2<F, R, E>) => Kind2<F, R, These<E, A>>
export declare function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export declare function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<E, B>>
export declare function map<F extends URIS3, R>(
  F: Functor3C<F, R>
): <A, B>(f: (a: A) => B) => <S, E>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<E, B>>
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, E>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<E, B>>
export declare function map<F extends URIS2, R>(
  F: Functor2C<F, R>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<E, B>>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <E>(fa: Kind<F, These<E, A>>) => Kind<F, These<E, B>>
export declare function map<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <E>(fa: HKT<F, These<E, A>>) => HKT<F, These<E, B>>
```

Added in v3.0.0

## mapLeft

**Signature**

```ts
export declare function mapLeft<F extends URIS3>(
  F: Functor3<F>
): <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, A>>
export declare function mapLeft<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, G>(f: (e: E) => G) => <S, A>(fea: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<G, A>>
export declare function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <R, A>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, A>>
export declare function mapLeft<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<G, A>>
export declare function mapLeft<F extends URIS>(
  F: Functor1<F>
): <E, G>(f: (e: E) => G) => <A>(fea: Kind<F, These<E, A>>) => Kind<F, These<G, A>>
export declare function mapLeft<F>(
  F: Functor<F>
): <E, G>(f: (e: E) => G) => <A>(fea: HKT<F, These<E, A>>) => HKT<F, These<G, A>>
```

Added in v3.0.0

## match

**Signature**

```ts
export declare function match<F extends URIS3>(
  F: Functor3<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S, R>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, B>
export declare function match<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <S>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, B>
export declare function match<F extends URIS2>(
  F: Functor2<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => <R>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, B>
export declare function match<M extends URIS2, R>(
  F: Functor2C<M, R>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export declare function match<F extends URIS>(
  F: Functor1<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: Kind<F, These<E, A>>) => Kind<F, B>
export declare function match<F>(
  F: Functor<F>
): <E, B, A>(
  onLeft: (e: E) => B,
  onRight: (a: A) => B,
  onBoth: (e: E, a: A) => B
) => (ma: HKT<F, These<E, A>>) => HKT<F, B>
```

Added in v3.0.0

## matchE

**Signature**

```ts
export declare function matchE<M extends URIS3>(
  M: Chain3<M>
): <E, S, R, B, A>(
  onLeft: (e: E) => Kind3<M, S, R, B>,
  onRight: (a: A) => Kind3<M, S, R, B>,
  onBoth: (e: E, a: A) => Kind3<M, S, R, B>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, B>
export declare function matchE<M extends URIS3, R>(
  M: Chain3C<M, R>
): <E, S, B, A>(
  onLeft: (e: E) => Kind3<M, S, R, B>,
  onRight: (a: A) => Kind3<M, S, R, B>,
  onBoth: (e: E, a: A) => Kind3<M, S, R, B>
) => (ma: Kind3<M, S, R, These<E, A>>) => Kind3<M, S, R, B>
export declare function matchE<M extends URIS2>(
  M: Chain2<M>
): <E, R, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>,
  onBoth: (e: E, a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export declare function matchE<M extends URIS2, R>(
  M: Chain2C<M, R>
): <E, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>,
  onBoth: (e: E, a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export declare function matchE<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(
  onLeft: (e: E) => Kind<M, B>,
  onRight: (a: A) => Kind<M, B>,
  onBoth: (e: E, a: A) => Kind<M, B>
) => (ma: Kind<M, These<E, A>>) => Kind<M, B>
export declare function matchE<M>(
  M: Chain<M>
): <E, B, A>(
  onLeft: (e: E) => HKT<M, B>,
  onRight: (a: A) => HKT<M, B>,
  onBoth: (e: E, a: A) => HKT<M, B>
) => (ma: HKT<M, These<E, A>>) => HKT<M, B>
```

Added in v3.0.0

## right

**Signature**

```ts
export declare function right<F extends URIS3>(
  F: Pointed3<F>
): <A, S, R, E = never>(a: A) => Kind3<F, S, R, These<E, A>>
export declare function right<F extends URIS3, R>(
  F: Pointed3C<F, R>
): <A, S, E = never>(a: A) => Kind3<F, S, R, These<E, A>>
export declare function right<F extends URIS2>(F: Pointed2<F>): <A, R, E = never>(a: A) => Kind2<F, R, These<E, A>>
export declare function right<F extends URIS2, R>(F: Pointed2C<F, R>): <A, E = never>(a: A) => Kind2<F, R, These<E, A>>
export declare function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, These<E, A>>
export declare function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>>
```

Added in v3.0.0

## rightF

**Signature**

```ts
export declare function rightF<F extends URIS3>(
  F: Functor3<F>
): <S, R, A, E = never>(fa: Kind3<F, S, R, A>) => Kind3<F, S, R, These<E, A>>
export declare function rightF<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, A, E = never>(fa: Kind3<F, S, R, A>) => Kind3<F, S, R, These<E, A>>
export declare function rightF<F extends URIS2>(
  F: Functor2<F>
): <R, A, E = never>(fa: Kind2<F, R, A>) => Kind2<F, R, These<E, A>>
export declare function rightF<F extends URIS2, R>(
  F: Functor2C<F, R>
): <A, E = never>(fa: Kind2<F, R, A>) => Kind2<F, R, These<E, A>>
export declare function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export declare function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends URIS3>(
  F: Functor3<F>
): <S, R, E, A>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<A, E>>
export declare function swap<F extends URIS3, R>(
  F: Functor3C<F, R>
): <S, E, A>(ma: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, These<A, E>>
export declare function swap<F extends URIS2>(
  F: Functor2<F>
): <R, E, A>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<A, E>>
export declare function swap<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A>(ma: Kind2<F, R, These<E, A>>) => Kind2<F, R, These<A, E>>
export declare function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export declare function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare function toTuple2<F extends URIS3>(
  F: Functor3<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <S, R>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, readonly [E, A]>
export declare function toTuple2<F extends URIS3, R>(
  F: Functor3C<F, R>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <S>(fa: Kind3<F, S, R, These<E, A>>) => Kind3<F, S, R, readonly [E, A]>
export declare function toTuple2<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <R>(fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, readonly [E, A]>
export declare function toTuple2<F extends URIS2, R>(
  F: Functor2C<F, R>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind2<F, R, These<E, A>>) => Kind2<F, R, readonly [E, A]>
export declare function toTuple2<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export declare function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
```

Added in v3.0.0
