MODULE [StateT](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts)

# ap

_function_
_since 1.0.0_

```ts
ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

# chain

_function_
_since 1.0.0_

```ts
chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

# fromState

_function_
_since 1.2.0_

```ts
fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>
```

# get

_function_
_since 1.0.0_

```ts
get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
```

# getStateT

_function_
_since 1.0.0_

```ts
getStateT<M>(M: Monad<M>): StateT<M>
```

# gets

_function_
_since 1.0.0_

```ts
gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
```

# liftF

_function_
_since 1.2.0_

```ts
liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>
```

# map

_function_
_since 1.0.0_

```ts
map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

# modify

_function_
_since 1.0.0_

```ts
modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
```

# of

_function_
_since 1.0.0_

```ts
of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
```

# put

_function_
_since 1.0.0_

```ts
put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
```
