---
id: EitherT
title: Module EitherT
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts)

## bimap

```ts
bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>
```

Added in v1.2.0 (function)

## chain

```ts
chain<F>(F: Monad<F>): EitherT<F>['chain']
```

Added in v1.0.0 (function)

## fold

```ts
fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
```

Added in v1.0.0 (function)

## fromEither

```ts
fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
```

Added in v1.0.0 (function)

## getEitherT

```ts
getEitherT<M>(M: Monad<M>): EitherT<M>
```

Added in v1.0.0 (function)

## left

```ts
left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
```

Added in v1.0.0 (function)

## mapLeft

```ts
mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
```

Added in v1.0.0 (function)

## right

```ts
right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
```

Added in v1.0.0 (function)
