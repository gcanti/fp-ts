---
title: Debugging using the Trace module
parent: Recipes
nav_order: 9
---

# Debugging using the `Trace` module

The module `'fp-ts/lib/Trace'` contains a bunch of helpers which make `console` based debugging a lot easier.

## How to log a value

Say you want to log the value of `s` in the following snippet

```ts
import { head } from 'fp-ts/lib/Array'
import { option } from 'fp-ts/lib/Option'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'

const O = pipeable(option)

export const x = pipe(
  head(['a', 'bb', 'ccc']),
  O.map(s => s.length)
)
```

You can use the `spy` helper

```ts
import { head } from 'fp-ts/lib/Array'
import { option } from 'fp-ts/lib/Option'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'
import { spy } from 'fp-ts/lib/Trace'

const O = pipeable(option)

const x = pipe(
  head(['a', 'bb', 'ccc']),
  spy,
  O.map(spy),
  O.map(s => s.length)
)
// => { _tag: 'Some', value: 'a' }
// => a
```

## How to log a message

You can use the `trace` helper

```ts
import { head } from 'fp-ts/lib/Array'
import { option, isSome } from 'fp-ts/lib/Option'
import { pipe, pipeable } from 'fp-ts/lib/pipeable'
import { trace } from 'fp-ts/lib/Trace'

const O = pipeable(option)

const x = pipe(
  head(['a', 'bb', 'ccc']),
  trace(h => `The head is a some? ${isSome(h)}`),
  O.map(trace(s => `The value before calling .length is: ${s}`)),
  O.map(s => s.length)
)
// => The head is a some? true
// => The value before calling .length is: a
```
