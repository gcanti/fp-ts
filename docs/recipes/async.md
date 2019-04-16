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

const deepThought = new Task<number>(() => Promise.resolve(42))

deepThought.run().then(n => {
  console.log(`The answer is ${n}.`)
})
```

## Tasks that may fail

If you're working with asynchronous tasks that may fail, use [TaskEither](../modules/TaskEither.ts). If the JSON in this example is malformed (try it!), an "I'm sorry" message is displayed.

```ts
import { tryCatch } from 'fp-ts/lib/TaskEither'

const fetchGreeting = tryCatch<Error, { name: string }>(
  () => new Promise(resolve => resolve(JSON.parse('{ "name": "Carol" }'))),
  reason => new Error(String(reason))
)

fetchGreeting
  .run()
  .then(te => te.fold(
    err => `I'm sorry, I don't know who you are. (${err.message})`,
    x => `Hello, ${x.name}!`
  ))
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
  .sequence(task)(tasks)
  .run()
  .then(console.log) // [ 1, 2 ]
```

## Run a list of tasks in sequence

If you need to run a list of `Task`s in sequence, i.e. you have to wait for one `Task` to finish before you run the second `Task`, you can use the `taskSeq` instance.

```ts
import { array } from 'fp-ts/lib/Array'
import { delay, task, taskSeq } from 'fp-ts/lib/Task'
const log = <A>(x: A) => { console.log(x); return x }

const tasks = [delay(200, 'first').map(log), delay(100, 'second').map(log)]

// Parallel: logs 'second' then 'first'
array
  .sequence(task)(tasks)
  .run()

// Sequential: logs 'first' then 'second'
array
  .sequence(taskSeq)(tasks)
  .run()
```

## Work with a list of dependent tasks

If you need the result of on task before you can continue with the next, you can `chain` the tasks like so:

```ts
import { task } from 'fp-ts/lib/Task'

task.of(2)
  .chain(result => task.of(result * 3))
  .chain(result => task.of(result + 4))
  .run()
  .then(console.log) // 10
```

## Traverse: map and sequence

If you have a list of items that you need to `map` over before running them in `sequence`, you can use `traverse`, which is a shortcut for doing both operations in one step.

```ts
import { array } from 'fp-ts/lib/Array'
import { task, Task } from 'fp-ts/lib/Task'
import { access, constants } from 'fs'

const checkPathExists = (path: string) =>
  new Task(() =>
    new Promise(resolve => {
      access(path, constants.F_OK, err => resolve({ path, exists: !err }))
    })
  )

const items = ['/bin', '/no/real/path']

array
  .traverse(task)(items, checkPathExists)
  .run()
  .then(console.log) // [ { path: '/bin', exists: true }, { path: '/no/real/path', exists: false } ]
```
