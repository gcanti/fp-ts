import { Either, left, right } from './Either_'
import { IO, io } from './IO'
import { Option, none, some } from './Option_'

// Adapted from https://github.com/purescript/purescript-exceptions

/**
 * Create a JavaScript error, specifying a message
 *
 * @since 1.0.0
 */
export const error = (message: string): Error => {
  return new Error(message)
}

/**
 * Get the error message from a JavaScript error
 *
 * @since 1.0.0
 */
export const message = (e: Error): string => {
  return e.message
}

/**
 * Get the stack trace from a JavaScript error
 *
 * @since 1.0.0
 */
export const stack = (e: Error): Option<string> => {
  return typeof e.stack === 'string' ? some(e.stack) : none
}

/**
 * Throw an exception
 *
 * @since 1.0.0
 */
export const throwError = <A>(e: Error): IO<A> => {
  return new IO(() => {
    throw e
  })
}

/**
 * Catch an exception by providing an exception handler
 *
 * @since 1.0.0
 */
export const catchError = <A>(ma: IO<A>, handler: (e: Error) => IO<A>): IO<A> => {
  return new IO(() => {
    try {
      return ma.run()
    } catch (e) {
      if (e instanceof Error) {
        return handler(e).run()
      } else {
        return handler(new Error(e.toString())).run()
      }
    }
  })
}

/**
 * Runs an IO and returns eventual Exceptions as a `Left` value. If the computation succeeds the result gets wrapped in
 * a `Right`.
 *
 * @since 1.0.0
 */
export const tryCatch = <A>(ma: IO<A>): IO<Either<Error, A>> => {
  return catchError(ma.map(a => right(a)), e => io.of(left<Error, A>(e)))
}
