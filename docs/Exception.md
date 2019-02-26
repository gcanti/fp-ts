---
id: Exception
title: Exception
---

[Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts)

## catchError

Catch an exception by providing an exception handler

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L50-L62)

```ts
export const catchError = <A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A> => { ... }
```

Added in v1.0.0

## error

Create a JavaScript error, specifying a message

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L12-L14)

```ts
export const error = (message: string): Error => { ... }
```

Added in v1.0.0

## message

Get the error message from a JavaScript error

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L21-L23)

```ts
export const message = (e: Error): string => { ... }
```

Added in v1.0.0

## stack

Get the stack trace from a JavaScript error

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L30-L32)

```ts
export const stack = (e: Error): Option<string> => { ... }
```

Added in v1.0.0

## throwError

Throw an exception

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L39-L43)

```ts
export const throwError = <A>(e: Error): IO<A> => { ... }
```

Added in v1.0.0

## tryCatch

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.

**Signature** (function) [Source](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts#L70-L72)

```ts
export const tryCatch = <A>(ma: IO<A>): IO<Either<Error, A>> => { ... }
```

Added in v1.0.0
