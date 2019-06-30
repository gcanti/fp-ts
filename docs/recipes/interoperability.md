---
title: Work with non-functional code
parent: Recipes
nav_order: 5
---

# How to work with non-functional code using fp-ts

Sometimes you are forced to interoperate with code not written in a functional style, let's see how to deal with it.

## Sentinels

<dl>
  <dt>Use case</dt><dd>an API that may fail and returns a special value of the codomain.</dd>
  <dt>Example</dt><dd><code>Array.prototype.findIndex</code></dd>
  <dt>Solution</dt><dd><a href="../modules/Option.ts">Option</a></dd>
</dl>

```ts
import { Option, none, some } from 'fp-ts/lib/Option'

function findIndex<A>(as: Array<A>, predicate: (a: A) => boolean): Option<number> {
  const index = as.findIndex(predicate)
  return index === -1 ? none : some(index)
}
```

## undefined and null

<dl>
  <dt>Use case</dt><dd>an API that may fail and returns undefined (or null).</dd>
  <dt>Example</dt><dd><code>Array.prototype.find</code></dd>
  <dt>Solution</dt><dd><a href="../modules/Option.ts">Option</a>, <a href="../modules/Option.ts#fromnullable-function">fromNullable</a></dd>
</dl>

```ts
import { Option, fromNullable } from 'fp-ts/lib/Option'

function find<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate))
}
```

## Exceptions

<dl>
  <dt>Use case</dt><dd>an API that may throw.</dd>
  <dt>Example</dt><dd><code>JSON.parse</code></dd>
  <dt>Solution</dt><dd><a href="../modules/Either.ts">Either</a>, <a href="../modules/Either.ts#trycatch2v-function">tryCatch2v</a></dd>
</dl>

```ts
import { Either, tryCatch } from 'fp-ts/lib/Either'

function parse(s: string): Either<Error, unknown> {
  return tryCatch(() => JSON.parse(s), reason => new Error(String(reason)))
}
```

## Random values

<dl>
  <dt>Use case</dt><dd>an API that returns a non deterministic value.</dd>
  <dt>Example</dt><dd><code>Math.random</code></dd>
  <dt>Solution</dt><dd><a href="../modules/IO.ts">IO</a></dd>
</dl>

```ts
import { IO } from 'fp-ts/lib/IO'

const random: IO<number> = new IO(() => Math.random())
```

## Synchronous side effects

<dl>
  <dt>Use case</dt><dd>an API that reads and/or writes to a global state.</dd>
  <dt>Example</dt><dd><code>localStorage.getItem</code></dd>
  <dt>Solution</dt><dd><a href="../modules/IO.ts">IO</a></dd>
</dl>

```ts
import { Option, fromNullable } from 'fp-ts/lib/Option'
import { IO } from 'fp-ts/lib/IO'

function getItem(key: string): IO<Option<string>> {
  return new IO(() => fromNullable(localStorage.getItem(key)))
}
```

<dl>
  <dt>Use case</dt><dd>an API that reads and/or writes to a global state and may throw.</dd>
  <dt>Example</dt><dd><code>readFileSync</code></dd>
  <dt>Solution</dt><dd><a href="../modules/IOEither.ts">IOEither</a>, <a href="../modules/IOEither.ts#trycatch2v-function">tryCatch2v</a></dd>
</dl>

```ts
import * as fs from 'fs'
import { IOEither, tryCatch } from 'fp-ts/lib/IOEither'

function readFileSync(path: string): IOEither<Error, string> {
  return tryCatch(() => fs.readFileSync(path, 'utf8'), reason => new Error(String(reason)))
}
```

## Asynchronous side effects

<dl>
  <dt>Use case</dt><dd>an API that performs an asynchronous computation.</dd>
  <dt>Example</dt><dd>reading from standard input</dd>
  <dt>Solution</dt><dd><a href="../modules/Task.ts">Task</a></dd>
</dl>

```ts
import { createInterface } from 'readline'
import { Task } from 'fp-ts/lib/Task'

const read: Task<string> = new Task(
  () =>
    new Promise<string>(resolve => {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout
      })
      rl.question('', answer => {
        rl.close()
        resolve(answer)
      })
    })
)
```

<dl>
  <dt>Use case</dt><dd>an API that performs an asynchronous computation and may reject.</dd>
  <dt>Example</dt><dd>fetch</dd>
  <dt>Solution</dt><dd><a href="../modules/TaskEither.ts">TaskEither</a>, <a href="../modules/TaskEither.ts#trycatch-function">tryCatch</a></dd>
</dl>

```ts
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'

function get(url: string): TaskEither<Error, string> {
  return tryCatch(() => fetch(url).then(res => res.text()), reason => new Error(String(reason)))
}
```

## Playground

Check out <a href="https://github.com/tychota/fp-ts-playground">this repo</a> by <a href="https://twitter.com/TychoTa">Tycho Tatitscheff</a> containing the source code and tests.

---

_This content was originally published as a [blog post](https://dev.to/gcanti/interoperability-with-non-functional-code-using-fp-ts-432e) on February 12, 2019._

