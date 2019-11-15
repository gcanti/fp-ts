---
title: Async tasks
parent: Recipes
nav_order: 4
---

# Async tasks

## Tasks that always succeed

If you're working with asynchronous tasks that are guaranteed to succeed, use [Task](../modules/Task.ts).

```ts
import { Task } from 'fp-ts/lib/Task'

const deepThought: Task<number> = () => Promise.resolve(42)

deepThought().then(n => {
  console.log(`The answer is ${n}.`)
})
```

## Tasks that may fail

If you're working with asynchronous tasks that may fail, use [TaskEither](../modules/TaskEither.ts). If the JSON in this example is malformed (try it!), an "I'm sorry" message is displayed.

```ts
import { fold } from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { tryCatch } from 'fp-ts/lib/TaskEither'

const fetchGreeting = tryCatch<Error, { name: string }>(
  () => new Promise(resolve => resolve(JSON.parse('{ "name": "Carol" }'))),
  reason => new Error(String(reason))
)

fetchGreeting()
  .then(e =>
    pipe(
      e,
      fold(err => `I'm sorry, I don't know who you are. (${err.message})`, x => `Hello, ${x.name}!`)
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
import { task } from 'fp-ts/lib/Task'
import { array } from 'fp-ts/lib/Array'

const tasks = [task.of(1), task.of(2)]
array
  .sequence(task)(tasks)()
  .then(console.log) // [ 1, 2 ]
```

## Run a list of tasks in sequence

If you need to run a list of `Task`s in sequence, i.e. you have to wait for one `Task` to finish before you run the second `Task`, you can use the `taskSeq` instance.

```ts
import { array } from 'fp-ts/lib/Array'
import { pipe } from 'fp-ts/lib/pipeable'
import { delay, map, task, taskSeq } from 'fp-ts/lib/Task'

const log = <A>(x: A) => {
  console.log(x)
  return x
}

const tasks = [
  pipe(
    delay(200)(task.of('first')),
    map(log)
  ),
  pipe(
    delay(100)(task.of('second')),
    map(log)
  )
]

// Parallel: logs 'second' then 'first'
array.sequence(task)(tasks)()

// Sequential: logs 'first' then 'second'
array.sequence(taskSeq)(tasks)()
```

## Work with a list of dependent tasks

If you need the result of on task before you can continue with the next, you can `chain` the tasks like so:

```ts
import { pipe } from 'fp-ts/lib/pipeable'
import { chain, task } from 'fp-ts/lib/Task'

pipe(
  task.of(2),
  chain(result => task.of(result * 3)),
  chain(result => task.of(result + 4))
)().then(console.log) // 10
```

## Traverse: map and sequence

If you have a list of items that you need to `map` over before running them in `sequence`, you can use `traverse`, which is a shortcut for doing both operations in one step.

```ts
import { access, constants } from 'fs'
import { array } from 'fp-ts/lib/Array'
import { task } from 'fp-ts/lib/Task'

const checkPathExists = (path: string) => () =>
  new Promise(resolve => {
    access(path, constants.F_OK, err => resolve({ path, exists: !err }))
  })

const items = ['/bin', '/no/real/path']

array
  .traverse(task)(items, checkPathExists)()
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

