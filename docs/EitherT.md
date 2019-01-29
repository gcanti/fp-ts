---
id: EitherT
title: Module EitherT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts)

## bimap

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L127-L131)

```ts
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>  { ... }
```

Added in v1.2.0

## chain

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L37-L39)

```ts
export function chain<F>(F: Monad<F>): EitherT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L89-L93)

```ts
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L72-L74)

```ts
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## getEitherT

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L140-L147)

```ts
export function getEitherT<M>(M: Monad<M>): EitherT<M>  { ... }
```

Added in v1.0.0

## left

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L59-L61)

```ts
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## mapLeft

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L108-L112)

```ts
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>  { ... }
```

Added in v1.0.0

## right

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts#L48-L50)

```ts
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0
