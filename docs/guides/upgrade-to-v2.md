---
title: Upgrade to fp-ts 2.x
parent: Guides
nav_order: 5
---

# Upgrade to version 2.x

`fp-ts@2.x` brings with it some major improvements, but also breaking changes and the removal of deprecated APIs. This document will help you understand what changed and how you can upgrade your existing codebase.
{: .fs-6 .fw-300 }

---

The major changes in `fp-ts@2.x` are:

- Requires TypeScript 3.5+
- `fp-ts@1.19.x` has been released with backported 2.x features for a gradual upgrade path
- Data types are no longer implemented as classes, resulting in a new API using `pipe`
- The `run()` method on `IO`, `Task`, etc. has been replaced with a thunk
- Functions accepting fallback values are now always lazy (e.g. `getOrElseL` is now just `getOrElse`)
- Deprecations
  - `HKT`: Replaced `Type<n>` with `Kind<n>`
  - Replaced `Setoid` with `Eq`
  - Several modules were removed, e.g. `Exception`, `Free`, `StrMap`, `Trace`, `Validation`, …
  - Read the [full changelog](https://github.com/gcanti/fp-ts/pull/881) for all the changes

## Upgrading from version 1.x

You can gradually upgrade your existing codebase using the `fp-ts@1.19.x` release; the new `fp-ts@2.x` APIs have been backported to this release.

1. Upgrade TypeScript to version 3.5+
1. Install `fp-ts@1.19.x`, which contains the new `fp-ts@2.x` APIs
1. Optional: activate the `@obsolete` rule for `tslint` to get guidance on what to change
1. Familiarise yourself with [the new API](https://github.com/gcanti/fp-ts/pull/881)
1. Gradually replace the existing code with the new API
1. Upgrade to `fp-ts@2.x` and make sure to also upgrade all dependencies that rely on `fp-ts`

### tslint rule

In order to make easier to spot all the occurrences of chainable APIs without depending on `@deprecated`, which would force you to migrate in one shot, a custom tslint rule is provided (`@obsolete`).

Add the following lines to your `tslint.json` to turn the `@obsolete` rule on:

```diff
{
+  "rulesDirectory": ["./node_modules/fp-ts/rules"],
   "rules": {
+    "obsolete": true
   }
}
```

This rule is available in the [1.19.x branch](https://github.com/gcanti/fp-ts/blob/1.19.5/rules/obsoleteRule.js).

### Dependencies

Don't forget to update your dependencies: libraries that use `fp-ts` like [io-ts](https://github.com/gcanti/io-ts) or [monocle-ts](https://github.com/gcanti/monocle-ts) have to be upgraded to their `fp-ts@2.x` compatible versions.

## The new API

In `fp-ts@2.x` data types are no longer implemented with classes; the biggest change resulting from this is that the chainable API has been removed. As an alternative, a `pipe` function is provided, along with suitable data-last top level functions (one for each deprecated method). This is best shown with an example:

v1 (deprecated)
{: .label .label-red .mt-5 }

```ts
import * as O from 'fp-ts/Option'

O.some(1)
  .map((n) => n * 2)
  .chain((n) => (n === 0 ? O.none : O.some(1 / n)))
  .filter((n) => n > 1)
  .foldL(
    () => 'ko',
    () => 'ok'
  )
```

v2 (new)
{: .label .label-green .mt-5 }

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/pipeable'

pipe(
  O.some(1),
  O.map((n) => n * 2),
  O.chain((n) => (n === 0 ? O.none : O.some(1 / n))),
  O.filter((n) => n > 1),
  O.fold(
    () => 'ko',
    () => 'ok'
  )
)
```

We recommend to use `pipe` even if you work with just one function, as it allows TypeScript to infer the types automatically. It's also easier to migrate existing code, because the argument order remains the same.

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

pipe(
  O.some(1),
  O.fold(
    () => 'ko',
    (n) => `ok: ${n}`
  )
)
```

If you are interested, read about the [benefits of the new API](https://github.com/gcanti/fp-ts/issues/823#issuecomment-486066792) in the technical discussion leading to `fp-ts@2.x`.

### Replacement of the `run()` method

The `run()` method on `IO`, `Task`, etc. has been replaced with a thunk:

v1 (deprecated)
{: .label .label-red .mt-5 }

```ts
import { Task } from 'fp-ts/Task'

const deepThought = new Task<number>(() => Promise.resolve(42))

deepThought.run().then((n) => {
  console.log(`The answer is ${n}.`)
})
```

v2 (new)
{: .label .label-green .mt-5 }

```ts
import { Task } from 'fp-ts/Task'

const deepThought: Task<number> = () => Promise.resolve(42)

deepThought().then((n) => {
  console.log(`The answer is ${n}.`)
})
```

### Functions accepting fallback values are now always lazy

In many places `fp-ts@1.x` provided two versions of methods:

v1 (deprecated)
{: .label .label-red .mt-5 }

```ts
import * as O from 'fp-ts/Option'

O.some(1).getOrElse(0) // Direct
O.some(1).getOrElseL(() => 0) // Lazy, i.e. only run if needed
```

v2 (new)
{: .label .label-green .mt-5 }

In `fp-ts@2.x` the API has been simplified, only the lazy variants have been kept with the `L` suffix removed.

```ts
import * as O from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'

pipe(
  O.some(1),
  O.getOrElse(() => 0)
)
```

### Removed modules

- `Exception`
- `Free`
- `FreeGroup`
- `IxIO`
- `IxMonad`
- `Monoidal`
- `Pair`
- `StrMap` (use [Record](../modules/Record.ts) instead)
- `Trace`
- `Validation` (use [Either](../modules/Either.ts)'s `getValidation`)
- `Zipper`

## References

If you're interested in reading up on how this release came to be, have a look at the following discussions:

- The technical [discussion leading to v2](https://github.com/gcanti/fp-ts/issues/823)
- [Version 1.19 (backport)](https://github.com/gcanti/fp-ts/pull/881)
- [The 2.0.0 release](https://github.com/gcanti/fp-ts/commit/7bda18e34eed996a08afdd6a0a61025087f99593)
