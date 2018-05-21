MODULE [Exception](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts)

# catchError

_function_

_since 1.0.0_

_Signature_

```ts
<A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A>
```

_Description_

Catch an exception by providing an exception handler

# error

_function_

_since 1.0.0_

_Signature_

```ts
(message: string): Error
```

_Description_

Create a JavaScript error, specifying a message

# message

_function_

_since 1.0.0_

_Signature_

```ts
(e: Error): string
```

_Description_

Get the error message from a JavaScript error

# stack

_function_

_since 1.0.0_

_Signature_

```ts
(e: Error): Option<string>
```

_Description_

Get the stack trace from a JavaScript error

# throwError

_function_

_since 1.0.0_

_Signature_

```ts
<A>(e: Error): IO<A>
```

_Description_

Throw an exception

# tryCatch

_function_

_since 1.0.0_

_Signature_

```ts
<A>(ma: IO<A>): IO<Either<Error, A>>
```

_Description_

Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
a `Right`.
