---
title: Debugging using the Trace module
parent: Recipes
nav_order: 9
---

# Debugging using the `Trace` module

The module `'fp-ts/lib/Trace'` contains a bunch of helpers which make `console` based debugging a lot easier.

## How to log a value to the console

Say you want to log the value of `s` in the following snippet

```ts
import { head } from 'fp-ts/lib/Array'

export const len = (s: string): number => s.length

export const x = head(['a', 'bb', 'ccc']).map(s => len(s))
```

You can use the `spy` helper

```ts
import { head } from 'fp-ts/lib/Array'
import { spy } from 'fp-ts/lib/Trace'

const len = (s: string): number => s.length

const x = head(['a', 'bb', 'ccc']).map(s => len(spy(s)))
// => 'a'
```

## How to log a value before returning another value

You can use the `trace` helper

```ts
import { head } from 'fp-ts/lib/Array'
import { spy, trace } from 'fp-ts/lib/Trace'

const len = (s: string): number => spy(s.length)

const x = head(['a', 'bb', 'ccc']).map(s =>
  trace('The value before calling `len` is: ' + s, () => len(s))
)
// => The value before calling `len` is: a
// => 1
```

The first message is from `trace`, the second message is from `spy`.

## How to log a value in an `Applicative` context

You can use the `traceA` helper

```ts
import { option, some } from 'fp-ts/lib/Option'
import { traceA } from 'fp-ts/lib/Trace'

// debug returns an `Option<void>`
const debug = traceA(option)

debug('start computation')
  .chain(() => some(1))
  .chain(() => debug('end computation'))
// => start computation
// => end computation
```

## How to log a value in a `Monad` context

This is especially useful when one has monadic chains.

You can use the `traceM` helper

```ts
import { head } from 'fp-ts/lib/Array'
import { option, some } from 'fp-ts/lib/Option'
import { traceM } from 'fp-ts/lib/Trace'

const debug = traceM(option)

some([1, 2, 3])
  .chain(debug)
  .chain(head)
  .chain(debug)
// => [1, 2, 3]
// => 1
```
