MODULE [ReaderTaskEither](https://github.com/gcanti/fp-ts/blob/master/src/ReaderTaskEither.ts)

# ReaderTaskEither

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly run: (e: E) => TaskEither<L, A>) {}
```

## Methods

### ap

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fab: ReaderTaskEither<E, L, (a: A) => B>): ReaderTaskEither<E, L, B>
```

### ap\_

_method_

_since 1.6.0_

_Signature_

```ts
<B, C>(this: ReaderTaskEither<E, L, (b: B) => C>, fb: ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, C>
```

### chain

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => ReaderTaskEither<E, L, B>): ReaderTaskEither<E, L, B>
```

### map

_method_

_since 1.6.0_

_Signature_

```ts
<B>(f: (a: A) => B): ReaderTaskEither<E, L, B>
```

# readerTaskEither

_instance_

_since 1.6.0_

_Signature_

```ts
Monad3<URI>
```

# ask

_function_

_since 1.6.0_

_Signature_

```ts
<E, L>(): ReaderTaskEither<E, L, E>
```

# asks

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(f: (e: E) => A): ReaderTaskEither<E, L, A>
```

# fromEither

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Either<L, A>): ReaderTaskEither<E, L, A>
```

# fromReader

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Reader<E, A>): ReaderTaskEither<E, L, A>
```

# fromTask

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A>
```

# fromTaskEither

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: TaskEither<L, A>): ReaderTaskEither<E, L, A>
```

# left

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Task<L>): ReaderTaskEither<E, L, A>
```

# local

_function_

_since 1.6.0_

_Signature_

```ts
<E>(f: (e: E) => E) => <L, A>(fa: ReaderTaskEither<E, L, A>): ReaderTaskEither<E, L, A>
```

# right

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(fa: Task<A>): ReaderTaskEither<E, L, A>
```

# tryCatch

_function_

_since 1.6.0_

_Signature_

```ts
<E, L, A>(
  f: (e: E) => Promise<A>,
  onrejected: (reason: {}) => L
): ReaderTaskEither<E, L, A>
```
