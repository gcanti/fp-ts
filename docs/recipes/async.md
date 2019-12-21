---
title: Async tasks
parent: Recipes
nav_order: 4
---

# Async tasks

## Tasks that always succeed

If you're working with asynchronous tasks that are guaranteed to succeed, use [Task](../modules/Task.ts).

```ts
import * as T from 'fp-ts/lib/Task'

const deepThought: T.Task<number> = () => Promise.resolve(42)

deepThought().then(n => {
  console.log(`The answer is ${n}.`)
})
```

## Tasks that may fail

If you're working with asynchronous tasks that may fail, use [TaskEither](../modules/TaskEither.ts). If the JSON in this example is malformed (try it!), an "I'm sorry" message is displayed.

```ts
import * as E from 'fp-ts/lib/Either'
import * as TE from 'fp-ts/lib/TaskEither'
import { pipe } from 'fp-ts/lib/pipeable'

const fetchGreeting = TE.tryCatch<Error, { name: string }>(
  () => new Promise(resolve => resolve(JSON.parse('{ "name": "Carol" }'))),
  reason => new Error(String(reason))
)

fetchGreeting()
  .then(e =>
    pipe(
      e,
      E.fold(err => `I'm sorry, I don't know who you are. (${err.message})`, x => `Hello, ${x.name}!`)
    )
  )
  .then(console.log)
```

## Work with a list of tasks in parallel

JavaScript provides `Promises.all` to wait for a list of Promises.

```ts
Promise.all([Promise.resolve(1), Promise.resolve(2)]).then(console.log) // [1, 2]
```

With `Task`s you can achieve the same using `sequence`. Both the `Promise.all` and the `sequence` approach run in parallel and wait until all results have arrived before they proceed.

```ts
import * as A from 'fp-ts/lib/Array'
import * as T from 'fp-ts/lib/Task'

const tasks = [T.of(1), T.of(2)]
A.array
  .sequence(task)(tasks)()
  .then(console.log) // [ 1, 2 ]
```

## Run a list of tasks in sequence

If you need to run a list of `Task`s in sequence, i.e. you have to wait for one `Task` to finish before you run the second `Task`, you can use the `taskSeq` instance.

```ts
import * as A from 'fp-ts/lib/Array'
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'

const log = <A>(x: A) => {
  console.log(x)
  return x
}

const tasks = [
  pipe(
    T.delay(200)(T.of('first')),
    T.map(log)
  ),
  pipe(
    T.delay(100)(T.of('second')),
    T.map(log)
  )
]

// Parallel: logs 'second' then 'first'
A.array.sequence(task)(tasks)()

// Sequential: logs 'first' then 'second'
A.array.sequence(taskSeq)(tasks)()
```

## Work with tasks with different type

What if the types are different? We can't use `sequence` anymore

```ts
import * as A from 'fp-ts/lib/Array'
import * as T from 'fp-ts/lib/Task'

// Task<number> ----v        v--- Task<string>
const tasks = [T.of(1), T.of('hello')]
A.array.sequence(T.task)(tasks)
/*
Argument of type '(Task<number> | Task<string>)[]' is not assignable to parameter of type 'Task<number>[]'.
  Type 'Task<number> | Task<string>' is not assignable to type 'Task<number>'.
    Type 'Task<string>' is not assignable to type 'Task<number>'.
      Type 'string' is not assignable to type 'number'.ts(2345)
*/
```

However we can use `sequenceT` (or `sequenceS`)

```ts
import { sequenceT, sequenceS } from 'fp-ts/lib/Apply'
import * as T from 'fp-ts/lib/Task'

// x: T.Task<[number, string]>
const x = sequenceT(T.task)(T.of(1), T.of('hello'))

// y: T.Task<{ a: number, b: string }>
const y = sequenceS(T.task)({ a: T.of(1), b: T.of('hello') })
```

## Work with a list of dependent tasks

If you need the result of on task before you can continue with the next, you can `chain` the tasks like so:

```ts
import * as T from 'fp-ts/lib/Task'
import { pipe } from 'fp-ts/lib/pipeable'

pipe(
  T.of(2),
  T.chain(result => T.of(result * 3)),
  T.chain(result => T.of(result + 4))
)().then(console.log) // 10
```

## Traverse: map and sequence

If you have a list of items that you need to `map` over before running them in `sequence`, you can use `traverse`, which is a shortcut for doing both operations in one step.

```ts
import * as A from 'fp-ts/lib/Array'
import * as T from 'fp-ts/lib/Task'
import { access, constants } from 'fs'

const checkPathExists = (path: string) => () =>
  new Promise(resolve => {
    access(path, constants.F_OK, err => resolve({ path, exists: !err }))
  })

const items = ['/bin', '/no/real/path']

A.array
  .traverse(T.task)(items, checkPathExists)()
  .then(console.log) // [ { path: '/bin', exists: true }, { path: '/no/real/path', exists: false } ]
```

## Comparison with `Promise` methods

Following is a table comparing `Task`/`TaskEither` with `Promise`. It assumes the following imports:

```ts
import * as T from 'fp-ts/lib/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import { array } from 'fp-ts/lib/Array'
import { fold } from 'fp-ts/lib/Monoid'
```

| | Promise | Task | TaskEither |
| --- | --- | --- | --- |
| resolve to success | `Promise.resolve(value)` | `T.task.of(value)` | `TE.taskEither.of(value)` or `TE.right(value)` |
| resolve to failure | `Promise.reject(value)` | N/A | `TE.left(value)` |
| transform the result of a task with the function `f` | `promise.then(f)` | `T.task.map(task, f)` | `T.taskEither.map(taskEither, f)` |
| perform a task depending on the result of a previous one | `promise.then(r => getPromise(r))` | `T.task.chain(task, r => getTask(r))` | `T.taskEither.chain(taskEither, r => getTaskEither(r))` |
| execute an array of tasks in parallel | `Promise.all(promises)` | `array.sequence(T.task)(tasks)` | `array.sequence(TE.taskEither)(taskEithers)` |
| execute an array of tasks in parallel, collecting all failures and successes | `Promise.allSettled(promises)` | N/A | `array.sequence(T.task)(taskEithers)` |
| execute an array of tasks and succeed/fail with a single value as soon as one of the tasks succeeds/fails | `Promise.race(promises)` | `fold(T.getRaceMonoid())(tasks)` | `fold(T.getRaceMonoid())(taskEithers)` |

