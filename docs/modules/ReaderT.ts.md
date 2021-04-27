---
title: ReaderT.ts
nav_order: 71
parent: Modules
---

## ReaderT overview

Added in v3.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [utils](#utils)
  - [ap](#ap)
  - [asksEitherK](#askseitherk)
  - [asksIOK](#asksiok)
  - [asksReaderK](#asksreaderk)
  - [asksStateK](#asksstatek)
  - [asksTaskK](#askstaskk)
  - [asksTheseK](#asksthesek)
  - [chain](#chain)
  - [fromReader](#fromreader)
  - [map](#map)
  - [of](#of)

---

# utils

## ap

**Signature**

```ts
export declare function ap<F extends URIS4>(
  F: Apply4<F>
): <R, S, FR, FE, A>(
  fa: Reader<R, Kind4<F, S, FR, FE, A>>
) => <B>(fab: Reader<R, Kind4<F, S, FR, FE, (a: A) => B>>) => Reader<R, Kind4<F, S, FR, FE, B>>
export declare function ap<F extends URIS3>(
  F: Apply3<F>
): <R, FR, FE, A>(
  fa: Reader<R, Kind3<F, FR, FE, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, FE, (a: A) => B>>) => Reader<R, Kind3<F, FR, FE, B>>
export declare function ap<F extends URIS3, FE>(
  F: Apply3C<F, FE>
): <R, FR, A>(
  fa: Reader<R, Kind3<F, FR, FE, A>>
) => <B>(fab: Reader<R, Kind3<F, FR, FE, (a: A) => B>>) => Reader<R, Kind3<F, FR, FE, B>>
export declare function ap<F extends URIS2>(
  F: Apply2<F>
): <R, FE, A>(
  fa: Reader<R, Kind2<F, FE, A>>
) => <B>(fab: Reader<R, Kind2<F, FE, (a: A) => B>>) => Reader<R, Kind2<F, FE, B>>
export declare function ap<F extends URIS2, FE>(
  F: Apply2C<F, FE>
): <R, A>(
  fa: Reader<R, Kind2<F, FE, A>>
) => <B>(fab: Reader<R, Kind2<F, FE, (a: A) => B>>) => Reader<R, Kind2<F, FE, B>>
export declare function ap<F extends URIS>(
  F: Apply1<F>
): <R, A>(fa: Reader<R, Kind<F, A>>) => <B>(fab: Reader<R, Kind<F, (a: A) => B>>) => Reader<R, Kind<F, B>>
export declare function ap<F>(
  F: Apply<F>
): <R, A>(fa: Reader<R, HKT<F, A>>) => <B>(fab: Reader<R, HKT<F, (a: A) => B>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## asksEitherK

**Signature**

```ts
export declare function asksEitherK<F extends URIS4>(
  F: FromEither4<F>
): <R, FE, A, S, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksEitherK<F extends URIS3>(
  F: FromEither3<F>
): <R, FE, A, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksEitherK<F extends URIS3, FE>(
  F: FromEither3C<F, FE>
): <R, A, FR>(f: (r: R) => Either<FE, A>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksEitherK<F extends URIS2>(
  F: FromEither2<F>
): <R, FE, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind2<F, FE, A>>
export declare function asksEitherK<F extends URIS2, FE>(
  F: FromEither2C<F, FE>
): <R, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind2<F, FE, A>>
export declare function asksEitherK<F extends URIS>(
  F: FromEither1<F>
): <R, FE, A>(f: (r: R) => Either<FE, A>) => Reader<R, Kind<F, A>>
export declare function asksEitherK<F>(
  F: FromEither<F>
): <R, E, A>(f: (r: R) => Either<E, A>) => Reader<R, HKT2<F, E, A>>
```

Added in v3.0.0

## asksIOK

**Signature**

```ts
export declare function asksIOK<F extends URIS4>(
  F: FromIO4<F>
): <R, A, S, FR, FE>(f: Reader<R, IO<A>>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksIOK<F extends URIS3>(
  F: FromIO3<F>
): <R, A, FR, FE>(f: Reader<R, IO<A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksIOK<F extends URIS3, FE>(
  F: FromIO3C<F, FE>
): <R, A, FR>(f: Reader<R, IO<A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksIOK<F extends URIS2>(
  F: FromIO2<F>
): <R, A, FE>(f: Reader<R, IO<A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksIOK<F extends URIS2, FE>(
  F: FromIO2C<F, FE>
): <R, A>(f: Reader<R, IO<A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksIOK<F extends URIS>(F: FromIO1<F>): <R, A>(f: Reader<R, IO<A>>) => Reader<R, Kind<F, A>>
export declare function asksIOK<F>(F: FromIO<F>): <R, A>(f: Reader<R, IO<A>>) => Reader<R, HKT<F, A>>
```

Added in v3.0.0

## asksReaderK

**Signature**

```ts
export declare function asksReaderK<F extends URIS4>(
  F: FromReader4<F>
): <R, FR, A, S, FE>(f: Reader<R, Reader<FR, A>>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksReaderK<F extends URIS3>(
  F: FromReader3<F>
): <R, FR, A, FE>(f: Reader<R, Reader<FR, A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksReaderK<F extends URIS3, FE>(
  F: FromReader3C<F, FE>
): <R, FR, A>(f: Reader<R, Reader<FR, A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksReaderK<F extends URIS2>(
  F: FromReader2<F>
): <R, FR, A>(f: Reader<R, Reader<FR, A>>) => Reader<R, Kind2<F, FR, A>>
export declare function asksReaderK<F>(
  F: FromReader<F>
): <R, FR, A>(f: Reader<R, Reader<FR, A>>) => Reader<R, HKT2<F, FR, A>>
```

Added in v3.0.0

## asksStateK

**Signature**

```ts
export declare function asksStateK<F extends URIS4>(
  F: FromState4<F>
): <R, S, A, FR, FE>(f: Reader<R, State<S, A>>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksStateK<F extends URIS3>(
  F: FromState3<F>
): <R, S, A, FE>(f: Reader<R, State<S, A>>) => Reader<R, Kind3<F, S, FE, A>>
export declare function asksStateK<F extends URIS3, FE>(
  F: FromState3C<F, FE>
): <R, S, A>(f: Reader<R, State<S, A>>) => Reader<R, Kind3<F, S, FE, A>>
export declare function asksStateK<F extends URIS2>(
  F: FromState2<F>
): <R, S, A>(f: Reader<R, State<S, A>>) => Reader<R, Kind2<F, S, A>>
export declare function asksStateK<F>(F: FromState<F>): <R, S, A>(f: Reader<R, State<S, A>>) => Reader<R, HKT2<F, S, A>>
```

Added in v3.0.0

## asksTaskK

**Signature**

```ts
export declare function asksTaskK<F extends URIS4>(
  F: FromTask4<F>
): <R, A, S, FR, FE>(f: Reader<R, Task<A>>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksTaskK<F extends URIS3>(
  F: FromTask3<F>
): <R, A, FR, FE>(f: Reader<R, Task<A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksTaskK<F extends URIS3, FE>(
  F: FromTask3C<F, FE>
): <R, A, FR>(f: Reader<R, Task<A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksTaskK<F extends URIS2>(
  F: FromTask2<F>
): <R, A, FE>(f: Reader<R, Task<A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksTaskK<F extends URIS2, FE>(
  F: FromTask2C<F, FE>
): <R, A>(f: Reader<R, Task<A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksTaskK<F extends URIS>(
  F: FromTask1<F>
): <R, A>(f: Reader<R, Task<A>>) => Reader<R, Kind<F, A>>
export declare function asksTaskK<F>(F: FromTask<F>): <R, A>(f: Reader<R, Task<A>>) => Reader<R, HKT<F, A>>
```

Added in v3.0.0

## asksTheseK

**Signature**

```ts
export declare function asksTheseK<F extends URIS4>(
  F: FromThese4<F>
): <R, FE, A, S, FR>(f: Reader<R, These<FE, A>>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function asksTheseK<F extends URIS3>(
  F: FromThese3<F>
): <R, FE, A, FR>(f: Reader<R, These<FE, A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksTheseK<F extends URIS3, FE>(
  F: FromThese3C<F, FE>
): <R, A, FR>(f: Reader<R, These<FE, A>>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function asksTheseK<F extends URIS2>(
  F: FromThese2<F>
): <R, FE, A>(f: Reader<R, These<FE, A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksTheseK<F extends URIS2, FE>(
  F: FromThese2C<F, FE>
): <R, A>(f: Reader<R, These<FE, A>>) => Reader<R, Kind2<F, FE, A>>
export declare function asksTheseK<F>(
  F: FromThese<F>
): <R, FE, A>(f: Reader<R, These<FE, A>>) => Reader<R, HKT2<F, FE, A>>
```

Added in v3.0.0

## chain

**Signature**

```ts
export declare function chain<M extends URIS4>(
  M: Chain4<M>
): <A, R, S, FR, FE, B>(
  f: (a: A) => Reader<R, Kind4<M, S, FR, FE, B>>
) => (ma: Reader<R, Kind4<M, S, FR, FE, A>>) => Reader<R, Kind4<M, S, FR, FE, B>>
export declare function chain<M extends URIS3>(
  M: Chain3<M>
): <A, R, FR, FE, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, FE, B>>
) => (ma: Reader<R, Kind3<M, FR, FE, A>>) => Reader<R, Kind3<M, FR, FE, B>>
export declare function chain<M extends URIS3, FE>(
  M: Chain3C<M, FE>
): <A, R, FR, B>(
  f: (a: A) => Reader<R, Kind3<M, FR, FE, B>>
) => (ma: Reader<R, Kind3<M, FR, FE, A>>) => Reader<R, Kind3<M, FR, FE, B>>
export declare function chain<M extends URIS2>(
  M: Chain2<M>
): <A, R, FE, B>(
  f: (a: A) => Reader<R, Kind2<M, FE, B>>
) => (ma: Reader<R, Kind2<M, FE, A>>) => Reader<R, Kind2<M, FE, B>>
export declare function chain<M extends URIS2, FE>(
  M: Chain2C<M, FE>
): <A, R, B>(f: (a: A) => Reader<R, Kind2<M, FE, B>>) => (ma: Reader<R, Kind2<M, FE, A>>) => Reader<R, Kind2<M, FE, B>>
export declare function chain<M extends URIS>(
  M: Chain1<M>
): <A, R, B>(f: (a: A) => Reader<R, Kind<M, B>>) => (ma: Reader<R, Kind<M, A>>) => Reader<R, Kind<M, B>>
export declare function chain<M>(
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, HKT<M, B>>) => (ma: Reader<R, HKT<M, A>>) => Reader<R, HKT<M, B>>
```

Added in v3.0.0

## fromReader

**Signature**

```ts
export declare function fromReader<F extends URIS4>(
  F: Pointed4<F>
): <R, A, S, FR, FE>(ma: Reader<R, A>) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function fromReader<F extends URIS3>(
  F: Pointed3<F>
): <R, A, FR, FE>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function fromReader<F extends URIS3, FE>(
  F: Pointed3C<F, FE>
): <R, A, FR>(ma: Reader<R, A>) => Reader<R, Kind3<F, FR, FE, A>>
export declare function fromReader<F extends URIS2>(
  F: Pointed2<F>
): <R, A, FE>(ma: Reader<R, A>) => Reader<R, Kind2<F, FE, A>>
export declare function fromReader<F extends URIS2, FE>(
  F: Pointed2C<F, FE>
): <R, A>(ma: Reader<R, A>) => Reader<R, Kind2<F, FE, A>>
export declare function fromReader<F extends URIS>(F: Pointed1<F>): <R, A>(ma: Reader<R, A>) => Reader<R, Kind<F, A>>
export declare function fromReader<F>(F: Pointed<F>): <R, A>(ma: Reader<R, A>) => Reader<R, HKT<F, A>>
```

Added in v3.0.0

## map

**Signature**

```ts
export declare function map<F extends URIS4>(
  F: Functor4<F>
): <A, B>(f: (a: A) => B) => <R, S, FR, FE>(fa: Reader<R, Kind4<F, S, FR, FE, A>>) => Reader<R, Kind4<F, S, FR, FE, B>>
export declare function map<F extends URIS3>(
  F: Functor3<F>
): <A, B>(f: (a: A) => B) => <R, FR, FE>(fa: Reader<R, Kind3<F, FR, FE, A>>) => Reader<R, Kind3<F, FR, FE, B>>
export declare function map<F extends URIS3, FE>(
  F: Functor3C<F, FE>
): <A, B>(f: (a: A) => B) => <R, FR>(fa: Reader<R, Kind3<F, FR, FE, A>>) => Reader<R, Kind3<F, FR, FE, B>>
export declare function map<F extends URIS2>(
  F: Functor2<F>
): <A, B>(f: (a: A) => B) => <R, FE>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export declare function map<F extends URIS2, FE>(
  F: Functor2C<F, FE>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind2<F, FE, A>>) => Reader<R, Kind2<F, FE, B>>
export declare function map<F extends URIS>(
  F: Functor1<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, Kind<F, A>>) => Reader<R, Kind<F, B>>
export declare function map<F>(
  F: Functor<F>
): <A, B>(f: (a: A) => B) => <R>(fa: Reader<R, HKT<F, A>>) => Reader<R, HKT<F, B>>
```

Added in v3.0.0

## of

**Signature**

```ts
export declare function of<F extends URIS4>(
  F: Pointed4<F>
): <A, R, S, FR, FE>(a: A) => Reader<R, Kind4<F, S, FR, FE, A>>
export declare function of<F extends URIS3>(F: Pointed3<F>): <A, R, FR, FE>(a: A) => Reader<R, Kind3<F, FR, FE, A>>
export declare function of<F extends URIS3, FE>(F: Pointed3C<F, FE>): <A, R, FR>(a: A) => Reader<R, Kind3<F, FR, FE, A>>
export declare function of<F extends URIS2>(F: Pointed2<F>): <A, R, FE>(a: A) => Reader<R, Kind2<F, FE, A>>
export declare function of<F extends URIS2, FE>(F: Pointed2C<F, FE>): <A, R>(a: A) => Reader<R, Kind2<F, FE, A>>
export declare function of<F extends URIS>(F: Pointed1<F>): <A, R>(a: A) => Reader<R, Kind<F, A>>
export declare function of<F>(F: Pointed<F>): <A, R>(a: A) => Reader<R, HKT<F, A>>
```

Added in v3.0.0
