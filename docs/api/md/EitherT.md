MODULE [EitherT](https://github.com/gcanti/fp-ts/blob/master/src/EitherT.ts)

# bimap

_function_

```ts
bimap<F>(
  F: Functor<F>
): <L, V, A, B>(fa: HKT<F, Either<L, A>>, f: (l: L) => V, g: (a: A) => B) => HKT<F, Either<V, B>>
```

# chain

_function_

```ts
chain<F>(F: Monad<F>): EitherT<F>['chain']
```

# fold

_function_

```ts
fold<F>(
  F: Functor<F>
): <R, L, A>(left: (l: L) => R, right: (a: A) => R, fa: HKT<F, Either<L, A>>) => HKT<F, R>
```

# fromEither

_function_

```ts
fromEither<F>(F: Applicative<F>): <L, A>(fa: Either<L, A>) => HKT<F, Either<L, A>>
```

# getEitherT

_function_

```ts
getEitherT<M>(M: Monad<M>): EitherT<M>
```

# left

_function_

```ts
left<F>(F: Functor<F>): <L, A>(fl: HKT<F, L>) => HKT<F, Either<L, A>>
```

# mapLeft

_function_

```ts
mapLeft<F>(
  F: Functor<F>
): <N, L>(f: (l: L) => N) => <A>(fa: HKT<F, Either<L, A>>) => HKT<F, Either<N, A>>
```

# right

_function_

```ts
right<F>(F: Functor<F>): <L, A>(fa: HKT<F, A>) => HKT<F, Either<L, A>>
```
