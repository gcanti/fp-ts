---
title: Exception.ts
nav_order: 29
parent: Modules
---

# Overview

Adapted from https://github.com/purescript/purescript-exceptions

---

<h2 class="text-delta">Table of contents</h2>

- [catchError (function)](#catcherror-function)
- [error (function)](#error-function)
- [message (function)](#message-function)
- [stack (function)](#stack-function)
- [throwError (function)](#throwerror-function)
- [tryCatch (function)](#trycatch-function)

---

# catchError (function)

Catch an exception by providing an exception handler

**Signature**

```ts
export const catchError = <A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A> => ...
```

Added in v2.0.0

# error (function)

Create a JavaScript error, specifying a message

**Signature**

```ts
export const error = (message: string): Error => ...
```

Added in v2.0.0

# message (function)

Get the error message from a JavaScript error

**Signature**

```ts
export const message = (e: Error): string => ...
```

Added in v2.0.0

# stack (function)

Get the stack trace from a JavaScript error

**Signature**

```ts
export const stack = (e: Error): Option<string> => ...
```

Added in v2.0.0

# throwError (function)

Throw an exception

**Signature**

```ts
export const throwError = <A>(e: Error): IO<A> => ...
```

Added in v2.0.0

# tryCatch (function)

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.

**Signature**

```ts
export const tryCatch = <A>(ma: IO<A>): IO<Either<Error, A>> => ...
```

Added in v2.0.0
