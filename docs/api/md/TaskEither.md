MODULE [TaskEither](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts)

# TaskEither

_data_
_since 1.0.0_

```ts
constructor(readonly value: Task<Either<L, A>>) {}
```

## Methods

### ap

_method_
_since 1.0.0_

```ts
<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B>
```

### ap\_

_method_
_since 1.0.0_

```ts
<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C>
```

### bimap

_method_
_since 1.2.0_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B>
```

### chain

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B>
```

### fold

_method_
_since 1.0.0_

```ts
<R>(left: (l: L) => R, right: (a: A) => R): Task<R>
```

### map

_method_
_since 1.0.0_

```ts
<B>(f: (a: A) => B): TaskEither<L, B>
```

### mapLeft

_method_
_since 1.0.0_

```ts
<M>(f: (l: L) => M): TaskEither<M, A>
```

### orElse

_method_
_since 1.0.0_

```ts
<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A>
```

Transforms the failure value of the `TaskEither` into a new `TaskEither`

### run

_method_
_since 1.0.0_

```ts
(): Promise<Either<L, A>>
```

Runs the inner task

# taskEither

_instance_
_since 1.0.0_

```ts
Monad2<URI> & Bifunctor2<URI>
```

# fromEither

_function_

```ts
<L, A>(fa: Either<L, A>): TaskEither<L, A>
```

# left

_function_

```ts
<L, A>(fa: Task<L>): TaskEither<L, A>
```

# right

_function_

```ts
<L, A>(fa: Task<A>): TaskEither<L, A>
```

# tryCatch

_function_

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A>
```
