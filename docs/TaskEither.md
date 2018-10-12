---
id: TaskEither
title: Module TaskEither
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts)

## Data

### TaskEither

_data_

_since 1.0.0_

_Signature_

```ts
constructor(readonly value: Task<Either<L, A>>) {}
```

## Methods

### alt

_method_

_since 1.6.0_

_Signature_

```ts
(fy: TaskEither<L, A>): TaskEither<L, A>
```

### ap

_method_

_since 1.0.0_

_Signature_

```ts
<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B>
```

### ap\_

_method_

_since 1.0.0_

_Signature_

```ts
<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C>
```

### applyFirst

_method_

_since 1.6.0_

_Signature_

```ts
<B>(fb: TaskEither<L, B>): TaskEither<L, A>
```

_Description_

Combine two effectful actions, keeping only the result of the first

### applySecond

_method_

_since 1.5.0_

_Signature_

```ts
<B>(fb: TaskEither<L, B>): TaskEither<L, B>
```

_Description_

Combine two effectful actions, keeping only the result of the second

### attempt

_method_

_since 1.10.0_

_Signature_

```ts
<M = L>(): TaskEither<M, Either<L, A>>
```

_Description_

Return `Right` if the given action succeeds, `Left` if it throws

### bimap

_method_

_since 1.2.0_

_Signature_

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B>
```

### chain

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B>
```

### fold

_method_

_since 1.0.0_

_Signature_

```ts
<R>(whenLeft: (l: L) => R, whenRight: (a: A) => R): Task<R>
```

### foldM

_method_

_since 1.10.0_

_Signature_

```ts
<M, B>(whenLeft: (l: L) => TaskEither<M, B>, whenRight: (a: A) => TaskEither<M, B>): TaskEither<M, B>
```

_Description_

Similar to [fold](#fold), but the result is flattened.

### map

_method_

_since 1.0.0_

_Signature_

```ts
<B>(f: (a: A) => B): TaskEither<L, B>
```

### mapLeft

_method_

_since 1.0.0_

_Signature_

```ts
<M>(f: (l: L) => M): TaskEither<M, A>
```

### orElse

_method_

_since 1.0.0_

_Signature_

```ts
<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A>
```

_Description_

Transforms the failure value of the `TaskEither` into a new `TaskEither`

### run

_method_

_since 1.0.0_

_Signature_

```ts
(): Promise<Either<L, A>>
```

_Description_

Runs the inner `Task`

## Instances

### taskEither

_instance_

_since 1.0.0_

_Signature_

```ts
Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI>
```

### taskEitherSeq

_instance_

_since 1.10.0_

_Signature_

```ts
typeof taskEither
```

_Description_

Like [taskEither](#taskeither) but `ap` is sequential

## Functions

### bracket

_function_

_since 1.10.0_

_Signature_

```ts
<L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B>
```

_Description_

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

### fromEither

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Either<L, A>): TaskEither<L, A>
```

### fromIO

_function_

_since 1.5.0_

_Signature_

```ts
<L, A>(fa: IO<A>): TaskEither<L, A>
```

### fromIOEither

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(fa: IOEither<L, A>): TaskEither<L, A>
```

### fromLeft

_function_

_since 1.3.0_

_Signature_

```ts
<L, A>(l: L): TaskEither<L, A>
```

### fromPredicate

_function_

_since 1.6.0_

_Signature_

```ts
<L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L): ((a: A) => TaskEither<L, A>)
```

### getApplyMonoid

_function_

_since 1.9.0_

_Signature_

```ts
<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>>
```

### getApplySemigroup

_function_

_since 1.9.0_

_Signature_

```ts
<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>
```

### getSemigroup

_function_

_since 1.9.0_

_Signature_

```ts
<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>
```

### left

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Task<L>): TaskEither<L, A>
```

### right

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(fa: Task<A>): TaskEither<L, A>
```

### taskify

_function_

_since 1.5.0_

_Signature_

```ts
taskify<L, R>(f: Function): () => TaskEither<L, R>
```

_Description_

Convert a node style callback function to one returning a `TaskEither`

_Example_

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

### tryCatch

_function_

_since 1.0.0_

_Signature_

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A>
```
