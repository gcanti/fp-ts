---
id: Exception
title: Module Exception
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts)

## catchError

```ts
<A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A>
```

Added in v1.0.0 (function)

Catch an exception by providing an exception handler

## error

```ts
(message: string): Error
```

Added in v1.0.0 (function)

Create a JavaScript error, specifying a message

## message

```ts
(e: Error): string
```

Added in v1.0.0 (function)

Get the error message from a JavaScript error

## stack

```ts
(e: Error): Option<string>
```

Added in v1.0.0 (function)

Get the stack trace from a JavaScript error

## throwError

```ts
<A>(e: Error): IO<A>
```

Added in v1.0.0 (function)

Throw an exception

## tryCatch

```ts
<A>(ma: IO<A>): IO<Either<Error, A>>
```

Added in v1.0.0 (function)

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.
