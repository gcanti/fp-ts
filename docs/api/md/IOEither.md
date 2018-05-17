MODULE [IOEither](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts)

# IOEither

_data_

_since 1.6.0_

```ts
constructor(readonly value: IO<Either<L, A>>) {}
```

## Methods

### alt

_method_

_since 1.6.0_

```ts
(fy: IOEither<L, A>): IOEither<L, A>
```

### ap

_method_

_since 1.6.0_

```ts
<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>
```

### ap\_

_method_

_since 1.6.0_

```ts
<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>
```

### applySecond

_method_

_since 1.6.0_

```ts
<B>(fb: IOEither<L, B>): IOEither<L, B>
```

### bimap

_method_

_since 1.6.0_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>
```

### chain

_method_

_since 1.6.0_

```ts
<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>
```

### fold

_method_

_since 1.6.0_

```ts
<R>(left: (l: L) => R, right: (a: A) => R): IO<R>
```

### map

_method_

_since 1.6.0_

```ts
<B>(f: (a: A) => B): IOEither<L, B>
```

### mapLeft

_method_

_since 1.6.0_

```ts
<M>(f: (l: L) => M): IOEither<M, A>
```

### orElse

_method_

_since 1.6.0_

```ts
<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>
```

### run

_method_

_since 1.6.0_

```ts
(): Either<L, A>
```

Runs the inner io

# fromEither

_function_

_since 1.6.0_

```ts
<L, A>(fa: Either<L, A>): IOEither<L, A>
```

# fromLeft

_function_

_since 1.6.0_

```ts
<L, A>(l: L): IOEither<L, A>
```

# ioEither

_function_

_since 1.6.0_

```ts
{
  URI, bimap, map, of, ap, chain, alt
}
```

# left

_function_

_since 1.6.0_

```ts
<L, A>(fa: IO<L>): IOEither<L, A>
```

# right

_function_

_since 1.6.0_

```ts
<L, A>(fa: IO<A>): IOEither<L, A>
```

# tryCatch

_function_

_since 1.6.0_

```ts
<A>(f: Lazy<A>, onerror: (reason: {}) => Error = toError): IOEither<Error, A>
```
