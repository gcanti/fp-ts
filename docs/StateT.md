---
id: StateT
title: Module StateT
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts)

## ap

```ts
ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

Added in v1.0.0 (function)

## chain

```ts
chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

Added in v1.0.0 (function)

## fromState

```ts
fromState<F>(F: Applicative<F>): <S, A>(fa: State<S, A>) => (s: S) => HKT<F, [A, S]>
```

Added in v1.2.0 (function)

## get

```ts
get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>
```

Added in v1.0.0 (function)

## getStateT

```ts
getStateT<M>(M: Monad<M>): StateT<M>
```

Added in v1.0.0 (function)

## gets

```ts
gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>
```

Added in v1.0.0 (function)

## liftF

```ts
liftF<F>(F: Functor<F>): <S, A>(fa: HKT<F, A>) => (s: S) => HKT<F, [A, S]>
```

Added in v1.2.0 (function)

## map

```ts
map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>
```

Added in v1.0.0 (function)

## modify

```ts
modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>
```

Added in v1.0.0 (function)

## of

```ts
of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>
```

Added in v1.0.0 (function)

## put

```ts
put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>
```

Added in v1.0.0 (function)
