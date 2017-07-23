import { IO } from './IO'
import { Option, some, none } from './Option'
import { Either, left, right } from './Either'

// Adapted from https://github.com/purescript/purescript-exceptions

/** Create a JavaScript error, specifying a message */
export function error(message: string): Error {
  return new Error(message)
}

/** Get the error message from a JavaScript error */
export function message(e: Error): string {
  return e.message
}

/** Get the stack trace from a JavaScript error */
export function stack(e: Error): Option<string> {
  return e.stack ? some(e.stack) : none
}

/** Throw an exception */
export function throwException<A>(e: Error): IO<A> {
  return new IO(() => {
    throw e
  })
}

/** Catch an exception by providing an exception handler */
export function catchException<A>(handler: (e: Error) => IO<A>, action: IO<A>): IO<A> {
  return new IO(() => {
    try {
      return action.run()
    } catch (e) {
      if (e instanceof Error) {
        return handler(e).run()
      } else {
        return handler(new Error(e.toString())).run()
      }
    }
  })
}

/** Runs an IO and returns eventual Exceptions as a `Left` value. If the
 * computation succeeds the result gets wrapped in a `Right`.
 */
export function tryCatch<A>(action: IO<A>): IO<Either<Error, A>> {
  return catchException(e => IO.of(left(e)), action.map(a => right(a)))
}
