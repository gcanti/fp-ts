---
title: Exception.ts
nav_order: 26
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [catchError](#catcherror)
- [error](#error)
- [message](#message)
- [stack](#stack)
- [throwError](#throwerror)
- [tryCatch](#trycatch)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# catchError

Catch an exception by providing an exception handler

**Signature** (function)

```ts
export const catchError = <A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A> => ...
```

Added in v1.0.0

# error

Create a JavaScript error, specifying a message

**Signature** (function)

```ts
export const error = (message: string): Error => ...
```

Added in v1.0.0

# message

Get the error message from a JavaScript error

**Signature** (function)

```ts
export const message = (e: Error): string => ...
```

Added in v1.0.0

# stack

Get the stack trace from a JavaScript error

**Signature** (function)

```ts
export const stack = (e: Error): Option<string> => ...
```

Added in v1.0.0

# throwError

Throw an exception

**Signature** (function)

```ts
export const throwError = <A>(e: Error): IO<A> => ...
```

Added in v1.0.0

# tryCatch

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.

**Signature** (function)

```ts
export const tryCatch = <A>(ma: IO<A>): IO<Either<Error, A>> => ...
```

Added in v1.0.0
