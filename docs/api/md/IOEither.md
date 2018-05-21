MODULE [IOEither](https://github.com/gcanti/fp-ts/blob/master/src/IOEither.ts)

# IOEither

_data_

_since 1.6.0_

_Signature_

```ts
constructor(readonly value: IO<Either<L, A>>) {}
```

## Methods

### alt

_method_

_since 1.6.0_

_Signature_

```ts
(fy: IOEither<L, A>): IOEither<L, A>
```

### ap

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fab: IOEither<L, (a: A) => B>): IOEither<L, B>
```

### ap\_

_method_

_since 1.6.0_

_Signature_

```ts
<B, C>(this: IOEither<L, (b: B) => C>, fb: IOEither<L, B>): IOEither<L, C>
```

### applyFirst

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: IOEither<L, B>): IOEither<L, A>
```

_Description_

Combine two effectful actions, keeping only the result of the first

### applySecond

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: IOEither<L, B>): IOEither<L, B>
```

_Description_

Combine two effectful actions, keeping only the result of the second

### bimap

_method_

_since 1.6.0_

_Signature_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): IOEither<V, B>
```

### chain

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => IOEither<L, B>): IOEither<L, B>
```

### fold

_method_

_since 1.6.0_

_Signature_

```ts
<R>(left: (l: L) => R, right: (a: A) => R): IO<R>
```

### map

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => B): IOEither<L, B>
```

### mapLeft

_method_

_since 1.6.0_

_Signature_

```ts
<M>(f: (l: L) => M): IOEither<M, A>
```

### orElse

_method_

_since 1.6.0_

_Signature_

```ts
<M>(f: (l: L) => IOEither<M, A>): IOEither<M, A>
```

### run

_method_

_since 1.6.0_

_Signature_

```ts
(): Either<L, A>
```

_Description_

Runs the inner io

# ioEither

_instance_

_since 1.6.0_

_Signature_

```ts
Monad2<URI> & Bifunctor2<URI> & Alt2<URI>
```

# fromEither

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(fa: Either<L, A>): IOEither<L, A>
```

# fromLeft

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(l: L): IOEither<L, A>
```

# left

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(fa: IO<L>): IOEither<L, A>
```

# right

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(fa: IO<A>): IOEither<L, A>
```

# tryCatch

_function_

_since 1.6.0_

_Signature_

```ts
<A>(f: Lazy<A>, onerror: (reason: {}) => Error = toError): IOEither<Error, A>
```
