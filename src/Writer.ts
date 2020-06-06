/**
 * @since 2.0.0
 */
import { Functor2 } from './Functor'
import { monadIdentity } from './Identity'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { getWriterM } from './WriterT'

const T = /*#__PURE__*/ getWriterM(monadIdentity)

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Writer: Writer<E, A>
  }
}

/**
 * @category Model
 * @since 2.0.0
 */
export const URI = 'Writer'

/**
 * @category Model
 * @since 2.0.0
 */
export type URI = typeof URI

// tslint:disable:readonly-array
/**
 * @category Model
 * @since 2.0.0
 */
export interface Writer<W, A> {
  (): [A, W]
}
// tslint:enable:readonly-array

/**
 * @since 2.0.0
 */
export const evalWriter: <W, A>(fa: Writer<W, A>) => A = T.evalWriter

/**
 * @since 2.0.0
 */
export const execWriter: <W, A>(fa: Writer<W, A>) => W = T.execWriter

/**
 * Appends a value to the accumulator
 *
 * @since 2.0.0
 */
export const tell: <W>(w: W) => Writer<W, void> = T.tell

// tslint:disable:readonly-array
/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 2.0.0
 */
export const listen: <W, A>(fa: Writer<W, A>) => Writer<W, [A, W]> = T.listen
// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Applies the returned function to the accumulator
 *
 * @since 2.0.0
 */
export const pass: <W, A>(fa: Writer<W, [A, (w: W) => W]>) => Writer<W, A> = T.pass
// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 2.0.0
 */
export function listens<W, B>(f: (w: W) => B): <A>(fa: Writer<W, A>) => Writer<W, [A, B]> {
  return (fa) => T.listens(fa, f)
}
// tslint:enable:readonly-array

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 2.0.0
 */
export function censor<W>(f: (w: W) => W): <A>(fa: Writer<W, A>) => Writer<W, A> {
  return (fa) => T.censor(fa, f)
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getMonad<W>(M: Monoid<W>): Monad2C<URI, W> {
  return {
    URI,
    ...T.getMonad(M)
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Writer<E, A>) => Writer<E, B> = (f) => (fa) => T.map(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const writer: Functor2<URI> = {
  URI,
  map: T.map
}
