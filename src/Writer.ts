import { Functor2 } from './Functor'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { pipeable } from './pipeable'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Writer: Writer<L, A>
  }
}

export const URI = 'Writer'

export type URI = typeof URI

/**
 * @since 1.0.0
 */
export class Writer<W, A> {
  readonly _A!: A
  readonly _L!: W
  readonly _URI!: URI
  constructor(readonly run: () => [A, W]) {}
  /** @obsolete */
  eval(): A {
    return this.run()[0]
  }
  /** @obsolete */
  exec(): W {
    return this.run()[1]
  }
  /** @obsolete */
  map<B>(f: (a: A) => B): Writer<W, B> {
    return new Writer(() => {
      const [a, w] = this.run()
      return [f(a), w]
    })
  }
}

/**
 * Appends a value to the accumulator
 *
 * @since 1.0.0
 */
export const tell = <W>(w: W): Writer<W, void> => {
  return new Writer(() => [undefined, w])
}

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 1.3.0
 */
export const listen = <W, A>(fa: Writer<W, A>): Writer<W, [A, W]> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [[a, w], w]
  })
}

/**
 * Applies the returned function to the accumulator
 *
 * @since 1.3.0
 */
export const pass = <W, A>(fa: Writer<W, [A, (w: W) => W]>): Writer<W, A> => {
  return new Writer(() => {
    const [[a, f], w] = fa.run()
    return [a, f(w)]
  })
}

/**
 * Use `listens2v`
 *
 * @since 1.3.0
 * @deprecated
 */
export const listens = <W, A, B>(fa: Writer<W, A>, f: (w: W) => B): Writer<W, [A, B]> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [[a, f(w)], w]
  })
}

/**
 * Use `censor2v`
 *
 * @since 1.3.0
 * @deprecated
 */
export const censor = <W, A>(fa: Writer<W, A>, f: (w: W) => W): Writer<W, A> => {
  return new Writer(() => {
    const [a, w] = fa.run()
    return [a, f(w)]
  })
}

/**
 *
 * @since 1.0.0
 */
export const getMonad = <W>(M: Monoid<W>): Monad2C<URI, W> => {
  return {
    URI,
    _L: undefined as any,
    map: writer.map,
    of: a => new Writer(() => [a, M.empty]),
    ap: (fab, fa) =>
      new Writer(() => {
        const [f, w1] = fab.run()
        const [a, w2] = fa.run()
        return [f(a), M.concat(w1, w2)]
      }),
    chain: (fa, f) =>
      new Writer(() => {
        const [a, w1] = fa.run()
        const [b, w2] = f(a).run()
        return [b, M.concat(w1, w2)]
      })
  }
}

/**
 * @since 1.0.0
 */
export const writer: Functor2<URI> = {
  URI,
  map: (fa, f) => fa.map(f)
}

//
// backporting
//

/**
 * @since 1.19.0
 */
export function evalWriter<W, A>(fa: Writer<W, A>): A {
  return fa.eval()
}

/**
 * @since 1.19.0
 */
export function execWriter<W, A>(fa: Writer<W, A>): W {
  return fa.exec()
}

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 1.19.0
 */
export function listens2v<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> {
  // tslint:disable-next-line: deprecation
  return fa => listens(fa, f)
}

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 1.19.0
 */
export function censor2v<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> {
  // tslint:disable-next-line: deprecation
  return fa => censor(fa, f)
}

const { map } = pipeable(writer)

export { map }
