---
id: TaskEither
title: Module TaskEither
---

[← Index](.)

[Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts)

# TaskEither

**Signature** (data type) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L42-L155)

```ts
export class TaskEither<L, A> {
  constructor(readonly value: Task<Either<L, A>>) {}
  ...
}
```

`TaskEither<L, A>` represents an asynchronous computation that either yields a value of type `A` or fails yielding an
error of type `L`. If you want to represent an asynchronous computation that never fails, please see [Task](./Task.md).

## alt

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L123-L125)

```ts
alt(fy: TaskEither<L, A>): TaskEither<L, A>  { ... }
```

Added in v1.6.0

## ap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L54-L56)

```ts
ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B>  { ... }
```

Added in v1.0.0

## ap\_

Flipped version of [ap](#ap)

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L60-L62)

```ts
ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C>  { ... }
```

Added in v1.0.0

## applyFirst

Combine two (parallel) effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L67-L69)

```ts
applyFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A>  { ... }
```

Added in v1.6.0

## applySecond

Combine two (parallel) effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L74-L76)

```ts
applySecond<B>(fb: TaskEither<L, B>): TaskEither<L, B>  { ... }
```

Added in v1.5.0

## attempt

Return `Right` if the given action succeeds, `Left` if it throws

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L136-L138)

```ts
attempt<M = L>(): TaskEither<M, Either<L, A>>  { ... }
```

Added in v1.10.0

## bimap

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L129-L131)

```ts
bimap<V, B>(f: (l: L) => V, g: (a: A) => B): TaskEither<V, B>  { ... }
```

Added in v1.2.0

## chain

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L91-L93)

```ts
chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B>  { ... }
```

Added in v1.0.0

## chainFirst

Combine two (sequential) effectful actions, keeping only the result of the first

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L81-L83)

```ts
chainFirst<B>(fb: TaskEither<L, B>): TaskEither<L, A>  { ... }
```

Added in v1.12.0

## chainSecond

Combine two (sequential) effectful actions, keeping only the result of the second

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L88-L90)

```ts
chainSecond<B>(fb: TaskEither<L, B>): TaskEither<L, B>  { ... }
```

Added in v1.12.0

## filterOrElse

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L144-L146)

```ts
filterOrElse(p: Predicate<A>, zero: L): TaskEither<L, A>  { ... }
```

Added in v1.11.0

## filterOrElseL

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L152-L154)

```ts
filterOrElseL(p: Predicate<A>, zero: (a: A) => L): TaskEither<L, A>  { ... }
```

Added in v1.11.0

## fold

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L94-L96)

```ts
fold<R>(onLeft: (l: L) => R, onRight: (a: A) => R): Task<R>  { ... }
```

Added in v1.0.0

## foldTask

Similar to [fold](#fold), but the result is flattened.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L101-L103)

```ts
foldTask<R>(onLeft: (l: L) => Task<R>, onRight: (a: A) => Task<R>): Task<R>  { ... }
```

Added in v1.10.0

## foldTaskEither

Similar to [fold](#fold), but the result is flattened.

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L108-L110)

```ts
foldTaskEither<M, B>(onLeft: (l: L) => TaskEither<M, B>, onRight: (a: A) => TaskEither<M, B>): TaskEither<M, B>  { ... }
```

Added in v1.10.0

## map

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L51-L53)

```ts
map<B>(f: (a: A) => B): TaskEither<L, B>  { ... }
```

Added in v1.0.0

## mapLeft

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L111-L113)

```ts
mapLeft<M>(f: (l: L) => M): TaskEither<M, A>  { ... }
```

Added in v1.0.0

## orElse

Transforms the failure value of the `TaskEither` into a new `TaskEither`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L117-L119)

```ts
orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A>  { ... }
```

Added in v1.0.0

## run

Runs the inner `Task`

**Signature** (method) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L48-L50)

```ts
run(): Promise<Either<L, A>>  { ... }
```

Added in v1.0.0

Added in v1.0.0

## taskEither

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L386-L396)

```ts
export const taskEither: Monad2<URI> & Bifunctor2<URI> & Alt2<URI> & MonadIO2<URI> & MonadTask2<URI> = ...
```

Added in v1.0.0

## taskEitherSeq

Like [taskEither](#taskeither) but `ap` is sequential

**Signature** (constant) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L403-L406)

```ts
export const taskEitherSeq: typeof taskEither = ...
```

Added in v1.10.0

## bracket

Make sure that a resource is cleaned up in the event of an exception. The
release action is called regardless of whether the body action throws or
returns.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L371-L381)

```ts
export const bracket = <L, A, B>(
  acquire: TaskEither<L, A>,
  use: (a: A) => TaskEither<L, B>,
  release: (a: A, e: Either<L, B>) => TaskEither<L, void>
): TaskEither<L, B> => { ... }
```

Added in v1.10.0

## fromEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L198-L200)

```ts
export const fromEither = <L, A>(fa: Either<L, A>): TaskEither<L, A> => { ... }
```

Added in v1.0.0

## fromIO

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L205-L207)

```ts
export const fromIO = <L, A>(fa: IO<A>): TaskEither<L, A> => { ... }
```

Added in v1.5.0

## fromIOEither

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L219-L221)

```ts
export const fromIOEither = <L, A>(fa: IOEither<L, A>): TaskEither<L, A> => { ... }
```

Added in v1.6.0

## fromLeft

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L212-L214)

```ts
export const fromLeft = <L, A>(l: L): TaskEither<L, A> => { ... }
```

Added in v1.3.0

## fromPredicate

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L231-L234)

```ts
export function fromPredicate<L, A>(predicate: Predicate<A>, onFalse: (a: A) => L): ((a: A) => TaskEither<L, A>)  { ... }
```

Added in v1.6.0

## getApplyMonoid

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L259-L264)

```ts
export const getApplyMonoid = <L, A>(M: Monoid<A>): Monoid<TaskEither<L, A>> => { ... }
```

Added in v1.9.0

## getApplySemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L249-L254)

```ts
export const getApplySemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => { ... }
```

Added in v1.9.0

## getSemigroup

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L239-L244)

```ts
export const getSemigroup = <L, A>(S: Semigroup<A>): Semigroup<TaskEither<L, A>> => { ... }
```

Added in v1.9.0

## left

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L191-L193)

```ts
export const left = <L, A>(fl: Task<L>): TaskEither<L, A> => { ... }
```

Added in v1.0.0

## right

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L184-L186)

```ts
export const right = <L, A>(fa: Task<A>): TaskEither<L, A> => { ... }
```

Added in v1.0.0

## taskify

Convert a node style callback function to one returning a `TaskEither`

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

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L346-L360)

```ts
export function taskify<L, R>(f: Function): () => TaskEither<L, R>  { ... }
```

**Example**

```ts
import { taskify } from 'fp-ts/lib/TaskEither'
import * as fs from 'fs'

// const stat: (a: string | Buffer) => TaskEither<NodeJS.ErrnoException, fs.Stats>
const stat = taskify(fs.stat)
assert.strictEqual(stat.length, 0)
```

Added in v1.5.0

## tryCatch

Transforms a `Promise` into a `TaskEither`, catching the possible error.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/TaskEither.ts#L298-L300)

```ts
export const tryCatch = <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: unknown) => L): TaskEither<L, A> => { ... }
```

**Example**

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
    assert.deepStrictEqual(x, left(`cannot create md5 hash: ENOENT: no such file or directory, open 'foo'`))
  })
```

Added in v1.0.0
