---
title: TheseT.ts
nav_order: 87
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
  - [right](#right)
  - [rightF](#rightf)
  - [swap](#swap)
  - [toTuple2](#totuple2)

---

# utils

## ap

**Signature**

```ts
export declare function ap<F extends URIS2, E>(
  F: Apply2<F>,
  S: Semigroup<E>
): <FE, A>(fa: Kind2<F, FE, These<E, A>>) => <B>(fab: Kind2<F, FE, These<E, (a: A) => B>>) => Kind2<F, FE, These<E, B>>
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
export declare function bimap<F extends URIS2>(
  F: Functor2<F>
): <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <FE>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, B>>
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
export declare function both<F extends URIS2>(F: Pointed2<F>): <E, FE, A>(e: E, a: A) => Kind2<F, FE, These<E, A>>
export declare function both<F extends URIS>(F: Pointed1<F>): <E, A>(e: E, a: A) => Kind<F, These<E, A>>
export declare function both<F>(F: Pointed<F>): <E, A = never>(e: E, a: A) => HKT<F, These<E, A>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS2, E>(
  M: Monad2<M>,
  S: Semigroup<E>
): <A, ME, B>(f: (a: A) => Kind2<M, ME, These<E, B>>) => (ma: Kind2<M, ME, These<E, A>>) => Kind2<M, ME, These<E, B>>
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
export declare function left<F extends URIS2>(F: Pointed2<F>): <E, FE, A = never>(e: E) => Kind2<F, FE, These<E, A>>
export declare function left<F extends URIS>(F: Pointed1<F>): <E, A = never>(e: E) => Kind<F, These<E, A>>
export declare function left<F>(F: Pointed<F>): <E, A = never>(e: E) => HKT<F, These<E, A>>
```

Added in v3.0.0

## leftF

**Signature**

```ts
export declare function leftF<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A = never>(fe: Kind2<F, FE, E>) => Kind2<F, FE, These<E, A>>
export declare function leftF<F extends URIS>(F: Functor1<F>): <E, A = never>(fe: Kind<F, E>) => Kind<F, These<E, A>>
export declare function leftF<F>(F: Functor<F>): <E, A = never>(fe: HKT<F, E>) => HKT<F, These<E, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <FE, E>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<E, B>>
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
export declare function mapLeft<F extends URIS2>(
  F: Functor2<F>
): <E, G>(f: (e: E) => G) => <FE, A>(fea: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<G, A>>
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
export declare function match<M extends URIS2>(
  M: Chain2<M>
): <E, R, B, A>(
  onLeft: (e: E) => Kind2<M, R, B>,
  onRight: (a: A) => Kind2<M, R, B>,
  onBoth: (e: E, a: A) => Kind2<M, R, B>
) => (ma: Kind2<M, R, These<E, A>>) => Kind2<M, R, B>
export declare function match<M extends URIS>(
  M: Chain1<M>
): <E, B, A>(
  onLeft: (e: E) => Kind<M, B>,
  onRight: (a: A) => Kind<M, B>,
  onBoth: (e: E, a: A) => Kind<M, B>
) => (ma: Kind<M, These<E, A>>) => Kind<M, B>
export declare function match<M>(
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
export declare function right<F extends URIS2>(F: Pointed2<F>): <A, FE, E = never>(a: A) => Kind2<F, FE, These<E, A>>
export declare function right<F extends URIS>(F: Pointed1<F>): <A, E = never>(a: A) => Kind<F, These<E, A>>
export declare function right<F>(F: Pointed<F>): <A, E = never>(a: A) => HKT<F, These<E, A>>
```

Added in v3.0.0

## rightF

**Signature**

```ts
export declare function rightF<F extends URIS2>(
  F: Functor2<F>
): <FE, A, E = never>(fa: Kind2<F, FE, A>) => Kind2<F, FE, These<E, A>>
export declare function rightF<F extends URIS>(F: Functor1<F>): <A, E = never>(fa: Kind<F, A>) => Kind<F, These<E, A>>
export declare function rightF<F>(F: Functor<F>): <A, E = never>(fa: HKT<F, A>) => HKT<F, These<E, A>>
```

Added in v3.0.0

## swap

**Signature**

```ts
export declare function swap<F extends URIS2>(
  F: Functor2<F>
): <FE, E, A>(ma: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, These<A, E>>
export declare function swap<F extends URIS>(F: Functor1<F>): <E, A>(ma: Kind<F, These<E, A>>) => Kind<F, These<A, E>>
export declare function swap<F>(F: Functor<F>): <E, A>(ma: HKT<F, These<E, A>>) => HKT<F, These<A, E>>
```

Added in v3.0.0

## toTuple2

**Signature**

```ts
export declare function toTuple2<F extends URIS2>(
  F: Functor2<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => <FE>(fa: Kind2<F, FE, These<E, A>>) => Kind2<F, FE, readonly [E, A]>
export declare function toTuple2<F extends URIS>(
  F: Functor1<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: Kind<F, These<E, A>>) => Kind<F, readonly [E, A]>
export declare function toTuple2<F>(
  F: Functor<F>
): <E, A>(e: Lazy<E>, a: Lazy<A>) => (fa: HKT<F, These<E, A>>) => HKT<F, readonly [E, A]>
```

Added in v3.0.0
