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

### applySecond

_method_

_since 1.5.0_

```ts
<B>(fb: TaskEither<L, B>): TaskEither<L, B>
```

Combine two effectful actions, keeping only the result of the second

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

_since 1.0.0_

```ts
<L, A>(fa: Either<L, A>): TaskEither<L, A>
```

# fromIO

_function_

_since 1.5.0_

```ts
<L, A>(fa: IO<A>): TaskEither<L, A>
```

# fromLeft

_function_

_since 1.3.0_

```ts
<L, A>(l: L): TaskEither<L, A>
```

# left

_function_

_since 1.0.0_

```ts
<L, A>(fa: Task<L>): TaskEither<L, A>
```

# right

_function_

_since 1.0.0_

```ts
<L, A>(fa: Task<A>): TaskEither<L, A>
```

# taskify

_function_

_since 1.5.0_

```ts
taskify<L, R>(f: Function): () => TaskEither<L, R>
```

Convert a node style callback function to one returning a `TaskEither`

Example

```ts
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
```

**Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
behaviour, add an explicit type annotation

```ts
// readFile admits multiple overloadings

// const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
const readFile = taskify(fs.readFile)

const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
  fs.readFile
)
```

# tryCatch

_function_

_since 1.0.0_

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A>
```
