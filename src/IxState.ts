/**
 * `IxState` (Indexed State) is a derivation of `State`, that may have **polymorphic** states;
 * The input may be of a different type than the output.
 *
 * State changes are kept track of by the generics `I`, `O`, `X` and `Z`.
 * - `I` indicates the current input state
 * - `O` indicates the current output state
 * - `Z` indicates the next input state
 * - `Z` indicates the next output state
 *
 * When composing `IxState` where the indexes are polymorhpic, functions `ichain` and `iap` can be
 * used to compose `<I, O>` with `<O, Z>` to return `<I, Z>`.
 *
 * Intuitively this is function composition on the indexes.
 *
 *
 * `IxState` derived by applying the `Identity` monad to the transformer `IxStateT`.
 * @since 2.10.0
 */
import { ixStateT } from '.'
import { Functor3 } from './Functor'
import * as I from './Identity'
import * as ixApply from './IxApply'
import * as ixChain from './IxChain'
import * as IxStateT from './IxStateT'
import { Pointed2 } from './Pointed'
import { State } from './State'

/**
 * @category Model
 * @since 2.10.0
 */
export interface IxState<I, O, A> {
  (i: I): [A, O]
}

/**
 * @category Model
 * @since 2.10.0
 */
export const URI = 'IxState'

/**
 * @category Model
 * @since 2.10.0
 */
export type URI = typeof URI

declare module './HKT' {
  export interface URItoKind3<R, E, A> {
    readonly [URI]: IxState<R, E, A>
  }

  // Allows usage with `ap, `chain` and `of`: Isomorphic state.
  export interface URItoKind2<E, A> {
    readonly [URI]: IxState<E, E, A>
  }
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map = IxStateT.map(I.Functor)

/**
 * @category Pointed
 * @since 2.10.0
 */
export const of: <S = unknown, A = never>(a: A) => IxState<S, S, A> = IxStateT.of(I.Pointed)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category IxApply
 * @since 2.10.0
 */
export const iap = IxStateT.iap(I.Chain)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category IxChain
 *
 * @since 2.10.0
 */
export const ichain = IxStateT.ichain(I.Chain)

/**
 * @category Instances
 * @since 2.10.0
 */
export const Pointed: Pointed2<URI> = { URI, of }

/**
 * @category Instances
 * @since 2.10.0
 */
export const Functor: Functor3<URI> = {
  URI,
  map: (fa, f) => map(f)(fa)
}

/**
 * @category Instances
 * @since 2.10.0
 */
export const IxApply: ixApply.IxApply3<URI> = {
  ...Functor,
  iap
}

/**
 * @category Instances
 * @since 2.10.0
 */
export const IxChain: ixChain.IxChain3<URI> = {
  ...IxApply,
  ichain
}

/**
 * @category Combinators
 *
 * @since 2.10.0
 */
export const iapFirst = ixApply.iapFirst(IxApply)

/**
 * @category Combinators
 * @since 2.10.0
 */
export const iapSecond = ixApply.iapSecond(IxApply)

/**
 * @category Combinators
 * @since 2.10.0
 */
export const ichainFirst = ixChain.ichainFirst(IxChain)

/**
 * @summary
 * Apply a function to the state, polymorphically changing the resulting state.
 *
 * @category Constructors
 * @since 2.10.0
 */
export const imodify: <I, O>(f: (i: I) => O) => IxState<I, O, void> = IxStateT.imodify(I.Pointed)

/**
 * @category Constructor
 * @since 2.10.0
 */
export const put: <I>(fi: I) => IxState<I, I, void> = IxStateT.put(I.Pointed)

/**
 * @category Destructors
 * @since 2.10.0
 */
export const toState: <I, A>(fa: IxState<I, I, A>) => State<I, A> = IxStateT.toStateF<I.URI>()

/**
 * @category Constructors
 * @since 2.10.0
 */

export const fromState: <I, A>(fa: State<I, A>) => IxState<I, I, A> = IxStateT.fromStateF<I.URI>()

/**
 * Changes the value of the local context during the execution of the action `ma` (similar to `Contravariant`'s
 * `contramap`).
 *
 * @category Combinators
 * @since 2.10.0
 */
export const local = ixStateT.local<I.URI>()

/**
 * @category Constructor
 * @since 2.10.0
 */
export const iDo = ixChain.iDo(Pointed)

/**
 * @category Combinator
 * @since 2.10.0
 */
export const bind = ixChain.ibind(IxChain)

/**
 * @category Destructors
 * @since 2.10.0
 */
export const execute = ixStateT.iexecute(I.Functor)

/**
 * @category Destructors
 * @since 2.10.0
 */
export const evaluate = ixStateT.evaluate(I.Functor)

/**
 * @category Constructors
 * @since 2.10.0
 */
export const get = IxStateT.get(I.Pointed)

/**
 * @category Constructors
 * @since 2.10.0
 */
export const gets = IxStateT.gets(I.Pointed)
