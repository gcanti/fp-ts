MODULE [Exception](https://github.com/gcanti/fp-ts/blob/master/src/Exception.ts)
# catchException
*function*
```ts
<A>(handler: (e: Error) => IO<A>) => (action: IO<A>): IO<A>
```
Catch an exception by providing an exception handler

# error
*function*
```ts
(message: string): Error
```
Create a JavaScript error, specifying a message

# message
*function*
```ts
(e: Error): string
```
Get the error message from a JavaScript error

# stack
*function*
```ts
(e: Error): Option<string>
```
Get the stack trace from a JavaScript error

# throwException
*function*
```ts
<A>(e: Error): IO<A>
```
Throw an exception

# tryCatch
*function*
```ts
<A>(action: IO<A>): IO<Either<Error, A>>
```
Runs an IO and returns eventual Exceptions as a `Left` value. If the
computation succeeds the result gets wrapped in a `Right`.