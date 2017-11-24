MODULE [ReaderT](https://github.com/gcanti/fp-ts/blob/master/src/ReaderT.ts)

# ap

_function_

```ts
ap<F>(
  F: Applicative<F>
): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

# ask

_function_

```ts
ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>
```

# asks

_function_

```ts
asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>
```

# chain

_function_

```ts
chain<F>(
  F: Chain<F>
): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

# getReaderT

_function_

```ts
getReaderT<M>(M: Monad<M>): ReaderT<M>
```

# map

_function_

```ts
map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>
```

# of

_function_

```ts
of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>
```
