MODULE [StateT](https://github.com/gcanti/fp-ts/blob/master/src/StateT.ts)
# ap
*function*
```ts
ap<F>(
  F: Chain<F>
): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> 
```

# chain
*function*
```ts
chain<F>(
  F: Chain<F>
): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> 
```

# get
*function*
```ts
get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]> 
```

# getStateT
*function*
```ts
getStateT<M>(M: Monad<M>): StateT<M> 
```

# gets
*function*
```ts
gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]> 
```

# map
*function*
```ts
map<F>(
  F: Functor<F>
): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]> 
```

# modify
*function*
```ts
modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]> 
```

# of
*function*
```ts
of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]> 
```

# put
*function*
```ts
put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]> 
```