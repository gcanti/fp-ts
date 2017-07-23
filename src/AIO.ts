import { FantasyMonad } from './Monad'
import { IO } from './IO'
import { constant } from './function'
import { Either, left, right, tryCatch } from './Either'

// Adapted from https://github.com/slamdata/purescript-aff

export type ErrorHandler = (e: Error) => IO<void>

export type SuccessHandler<A> = (a: A) => IO<void>

/**
 * A canceler is an asynchronous function that can be used to attempt the
 * cancelation of a computation. Returns a boolean flag indicating whether
 * or not the cancellation was successful. Many computations may be composite,
 * in such cases the flag indicates whether any part of the computation was
 * successfully canceled. The flag should not be used for communication
 */
export type Canceler = (e: Error) => AIO<boolean>

export type Computation<A> = (e: ErrorHandler, s: SuccessHandler<A>) => Canceler

declare module './HKT' {
  interface URI2HKT<A> {
    AIO: AIO<A>
  }
}

export const URI = 'AIO'

export type URI = typeof URI

export class AIO<A> implements FantasyMonad<URI, A> {
  static of = of
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: Computation<A>) {}
  run(e: ErrorHandler, s: SuccessHandler<A>): Canceler {
    return this.value(e, s)
  }
  map<B>(f: (a: A) => B): AIO<B> {
    return new AIO<B>((e, s) => this.run(e, a => s(f(a))))
  }
  of<B>(b: B): AIO<B> {
    return of(b)
  }
  ap<B>(fab: AIO<(a: A) => B>): AIO<B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => AIO<B>): AIO<B> {
    return new AIO<B>((e, s) => {
      let canceler1: Canceler
      let canceler2: Canceler
      let isCanceled = false
      let requestCancel = false
      let onCanceler: (canceler: Canceler) => void = () => {} // tslint:disable-line no-empty

      canceler1 = this.run(e, a => {
        if (requestCancel) {
          isCanceled = true
        } else {
          canceler2 = f(a).run(e, s)
          onCanceler(canceler2)
        }
        return IO.of(undefined)
      })

      return e =>
        new AIO<boolean>((e2, s) => {
          requestCancel = true
          if (canceler2 !== undefined) {
            return canceler2(e).run(e2, s)
          } else {
            return canceler1(e).run(e2, b => {
              if (b || isCanceled) {
                s(true)
              } else {
                onCanceler = canceler => {
                  canceler(e).run(e2, s)
                }
              }
              return IO.of(undefined)
            })
          }
        })
    })
  }
}

// A constant canceler that always returns false.
export const nonCanceler: Canceler = constant(of(false))

// A constant canceller that always returns true.
export const alwaysCanceler: Canceler = constant(of(true))

export function of<A>(a: A): AIO<A> {
  return new AIO<A>((_, s) => {
    s(a).run()
    return nonCanceler
  })
}

export function map<A, B>(f: (a: A) => B, fa: AIO<A>): AIO<B> {
  return fa.map(f)
}

export function ap<A, B>(fab: AIO<(a: A) => B>, fa: AIO<A>): AIO<B> {
  return fa.ap(fab)
}

export function chain<A, B>(f: (a: A) => AIO<B>, fa: AIO<A>): AIO<B> {
  return fa.chain(f)
}

/** Promotes any error to the value level of the asynchronous monad */
export function attempt<A>(fa: AIO<A>): AIO<Either<Error, A>> {
  return new AIO<Either<Error, A>>((_, s) => fa.run(err => s(left<Error, A>(err)), a => s(right<Error, A>(a))))
}

/** Lifts a synchronous computation */
export function liftIO<A>(fa: IO<A>): AIO<A> {
  return new AIO<A>((e, s) => {
    tryCatch(fa.value).fold(err => e(err), a => s(a)).run()
    return nonCanceler
  })
}

export function toPromise<A>(aio: AIO<A>): Promise<A> {
  return new Promise((resolve, reject) => {
    aio.run(e => IO.of(reject(e)), a => IO.of(resolve(a)))
  })
}
