/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative } from './Applicative'
import { ChainRec1, tailRec } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { identity as id } from './function'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { Traversable1, PipeableTraverse1 } from './Traversable'

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'Identity'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Identity<A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export type Identity<A> = A

/**
 * @category instances
 * @since 2.0.0
 */
export const getShow: <A>(S: Show<A>) => Show<Identity<A>> = id

/**
 * @category instances
 * @since 2.0.0
 */
export const getEq: <A>(E: Eq<A>) => Eq<Identity<A>> = id

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const alt_: <A>(fx: A, fy: () => A) => A = id

const extend_: <A, B>(wa: A, f: (wa: A) => B) => B = (wa, f) => f(wa)

const map_: <A, B>(fa: Identity<A>, f: (a: A) => B) => Identity<B> = (ma, f) => f(ma)

const ap_: <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>) => Identity<B> = (mab, ma) => mab(ma)

const chain_: <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>) => Identity<B> = (ma, f) => f(ma)

const reduce_: <A, B>(fa: Identity<A>, b: B, f: (b: B, a: A) => B) => B = (fa, b, f) => f(b, fa)

const foldMap_: <M>(M: Monoid<M>) => <A>(fa: Identity<A>, f: (a: A) => M) => M = (_) => (fa, f) => f(fa)

const reduceRight_: <A, B>(fa: Identity<A>, b: B, f: (a: A, b: B) => B) => B = (fa, b, f) => f(fa, b)

const traverse_ = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> => {
  return F.map(f(ta), id)
}

/**
 * @since 2.6.3
 */
export const traverse: PipeableTraverse1<URI> = <F>(
  F: Applicative<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: Identity<A>) => HKT<F, Identity<B>>) => {
  const traverseF = traverse_(F)
  return (f) => (ta) => traverseF(ta, f)
}

/**
 * @since 2.6.3
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(F: Applicative<F>) => <A>(
  ta: Identity<HKT<F, A>>
): HKT<F, Identity<A>> => {
  return F.map(ta, id)
}

/**
 * @category Alt
 * @since 2.0.0
 */
export const alt: <A>(that: () => Identity<A>) => (fa: Identity<A>) => Identity<A> = (that) => (fa) => alt_(fa, that)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 2.0.0
 */
export const ap: <A>(fa: Identity<A>) => <B>(fab: Identity<(a: A) => B>) => Identity<B> = (fa) => (fab) => ap_(fab, fa)

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apFirst: <B>(fb: Identity<B>) => <A>(fa: Identity<A>) => Identity<A> = (fb) => (fa) =>
  ap_(
    map_(fa, (a) => () => a),
    fb
  )

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @category Apply
 * @since 2.0.0
 */
export const apSecond = <B>(fb: Identity<B>) => <A>(fa: Identity<A>): Identity<B> =>
  ap_(
    map_(fa, () => (b: B) => b),
    fb
  )

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<B> = (f) => (ma) => chain_(ma, f)

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category Monad
 * @since 2.0.0
 */
export const chainFirst: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>) => Identity<A> = (f) => (ma) =>
  chain_(ma, (a) => map_(f(a), () => a))

/**
 * @category Extend
 * @since 2.0.0
 */
export const duplicate: <A>(ma: Identity<A>) => Identity<Identity<A>> = (wa) => extend_(wa, id)

/**
 * @category Extract
 * @since 2.6.2
 */
export const extract: <A>(wa: Identity<A>) => A = id

/**
 * @category Extend
 * @since 2.0.0
 */
export const extend: <A, B>(f: (wa: Identity<A>) => B) => (wa: Identity<A>) => Identity<B> = (f) => (ma) =>
  extend_(ma, f)

/**
 * @category Monad
 * @since 2.0.0
 */
export const flatten: <A>(mma: Identity<Identity<A>>) => Identity<A> = (mma) => chain_(mma, id)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: Identity<A>) => M = (M) => {
  const foldMapM = foldMap_(M)
  return (f) => (fa) => foldMapM(fa, f)
}

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Identity<A>) => B = (b, f) => (fa) => reduce_(fa, b, f)

/**
 * @category Foldable
 * @since 2.0.0
 */
export const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Identity<A>) => B = (b, f) => (fa) =>
  reduceRight_(fa, b, f)

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B> = (f) => (fa) => map_(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = {
  URI,
  map: map_,
  of: id,
  ap: ap_,
  chain: chain_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  alt: alt_,
  extract,
  extend: extend_,
  chainRec: tailRec
}
