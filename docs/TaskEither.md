---
id: TaskEither
title: Module TaskEither
---

[← Back](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts)

## taskEither

```ts
Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI>
```

Added in v1.0.0 (instance)

## taskEitherSeq

```ts
typeof taskEither
```

Added in v1.10.0 (instance)

Like [taskEither](#taskeither) but `ap` is sequential

# TaskEither

```ts
constructor(readonly value: Task<Either<L, A>>) {}
```

Added in v1.0.0 (data)

`TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent an asynchronous computation that never fails, please see [Task](./Task.md).

## alt

```ts
(fy: TaskEither<L, A>): TaskEither<L, A>
```

Added in v1.6.0 (method)

## ap

```ts
<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B>
```

Added in v1.0.0 (method)

## ap\_

```ts
<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C>
```

Added in v1.0.0 (method)

Flipped version of [ap](#ap)

## applyFirst

```ts
<B>(fb: TaskEither<L, B>): TaskEither<L, A>
```

Added in v1.6.0 (method)

Combine two effectful actions, keeping only the result of the first

## applySecond

```ts
<B>(fb: TaskEither<L, B>): TaskEither<L, B>
```

Added in v1.5.0 (method)

Combine two effectful actions, keeping only the result of the second

## attempt

```ts
<M = L>(): TaskEither<M, Either<L, A>>
```

Added in v1.10.0 (method)

Return `Right` if the given action succeeds, `Left` if it throws

## bimap

```ts
<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B>
```

Added in v1.2.0 (method)

## chain

```ts
<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B>
```

Added in v1.0.0 (method)

## fold

```ts
<R>(whenLeft: (l: L) => R, whenRight: (a: A) => R): Task<R>
```

Added in v1.0.0 (method)

## foldTask

```ts
<R>(whenLeft: (l: L) => Task<R>, whenRight: (a: A) => Task<R>): Task<R>
```

Added in v1.10.0 (method)

Similar to [fold](#fold), but the result is flattened.

## foldTaskEither

```ts
<M, B>(whenLeft: (l: L) => TaskEither<M, B>, whenRight: (a: A) => TaskEither<M, B>): TaskEither<M, B>
```

Added in v1.10.0 (method)

Similar to [fold](#fold), but the result is flattened.

## map

```ts
<B>(f: (a: A) => B): TaskEither<L, B>
```

Added in v1.0.0 (method)

## mapLeft

```ts
<M>(f: (l: L) => M): TaskEither<M, A>
```

Added in v1.0.0 (method)

## orElse

```ts
<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A>
```

Added in v1.0.0 (method)

Transforms the failure value of the `TaskEither` into a new `TaskEither`

## run

```ts
(): Promise<Either<L, A>>
```

Added in v1.0.0 (method)

Runs the inner `Task`

## bracket

```ts
<L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B>
```

Added in v1.10.0 (function)

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

## fromEither

```ts
<L, A>(fa: Either<L, A>): TaskEither<L, A>
```

Added in v1.0.0 (function)

## fromIO

```ts
<L, A>(fa: IO<A>): TaskEither<L, A>
```

Added in v1.5.0 (function)

## fromIOEither

```ts
<L, A>(fa: IOEither<L, A>): TaskEither<L, A>
```

Added in v1.6.0 (function)

## fromLeft

```ts
<L, A>(l: L): TaskEither<L, A>
```

Added in v1.3.0 (function)

## fromPredicate

```ts
<L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L): ((a: A) => TaskEither<L, A>)
```

Added in v1.6.0 (function)

## getApplyMonoid

```ts
<L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>>
```

Added in v1.9.0 (function)

## getApplySemigroup

```ts
<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>
```

Added in v1.9.0 (function)

## getSemigroup

```ts
<L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>>
```

Added in v1.9.0 (function)

## left

```ts
<L, A>(fa: Task<L>): TaskEither<L, A>
```

Added in v1.0.0 (function)

## right

```ts
<L, A>(fa: Task<A>): TaskEither<L, A>
```

Added in v1.0.0 (function)

## taskify

```ts
taskify<L, R>(f: Function): () => TaskEither<L, R>
```

Added in v1.5.0 (function)

Convert a node style callback function to one returning a `TaskEither`

**Note**. If the function `f` admits multiple overloadings, `taskify` will pick last one. If you want a different
behaviour, add an explicit type annotation

````ts
// readFile admits multiple overloadings

// const readFile: (a: string) => TaskEither<NodeJS.ErrnoException, Buffer>
const readFile = taskify(fs.readFile)

const readFile2: (filename: string, encoding: string) => TaskEither<NodeJS.ErrnoException, Buffer> = taskify(
  fs.readFile
)

*Example*
```ts
import { taskify } from 'fp-ts/lib/TaskEither'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
````

## tryCatch

```ts
<L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L): TaskEither<L, A>
```

Added in v1.0.0 (function)

Transforms a `Promise` into a `TaskEither`, catching the possible error.

_Example_

```ts
import { createHash } from 'crypto'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { createReadStream } from 'fs'
import { left } from 'fp-ts/lib/Either'

const md5 = (path: string): TaskEither<string, string> => {
  const mkHash = (p: string) =>
    new Promise<string>((resolve, reject) => {
      const hash = createHash('md5')
      const rs = createReadStream(p)
      rs.on('error', (error: Error) => reject(error.message))
      rs.on('data', (chunk: string) => hash.update(chunk))
      rs.on('end', () => {
        return resolve(hash.digest('hex'))
      })
    })
  return tryCatch(() => mkHash(path), message => `cannot create md5 hash: ${String(message)}`)
}

md5('foo')
  .run()
  .then(x => {
    assert.deepEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
  })
```
