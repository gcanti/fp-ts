---
id: EitherT
title: Module EitherT
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts)

## bimap

**Signature** (function)

```ts
export function bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>  { ... }
```

Added in v1.2.0

## chain

**Signature** (function)

```ts
export function chain<F>(F: Monad<F>): EitherT<F>['chain']  { ... }
```

Added in v1.0.0

## fold

**Signature** (function)

```ts
export function fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>  { ... }
```

Added in v1.0.0

## fromEither

**Signature** (function)

```ts
export function fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## getEitherT

**Signature** (function)

```ts
export function getEitherT<M>(M: Monad<M>): EitherT<M>  { ... }
```

Added in v1.0.0

## left

**Signature** (function)

```ts
export function left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0

## mapLeft

**Signature** (function)

```ts
export function mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>  { ... }
```

Added in v1.0.0

## right

**Signature** (function)

```ts
export function right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>  { ... }
```

Added in v1.0.0
