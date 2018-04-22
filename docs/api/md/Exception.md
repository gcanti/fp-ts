MODULE [Exception](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts)

# catchError

_function_

_since 1.0.0_

```ts
<A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A>
```

Catch an exception by providing an exception handler

# error

_function_

_since 1.0.0_

```ts
(message: string): Error
```

Create a JavaScript error, specifying a message

# message

_function_

_since 1.0.0_

```ts
(e: Error): string
```

Get the error message from a JavaScript error

# stack

_function_

_since 1.0.0_

```ts
(e: Error): Option<string>
```

Get the stack trace from a JavaScript error

# throwError

_function_

_since 1.0.0_

```ts
<A>(e: Error): IO<A>
```

Throw an exception

# tryCatch

_function_

_since 1.0.0_

```ts
<A>(ma: IO<A>): IO<Either<Error, A>>
```

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.
