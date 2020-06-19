/**
 * @since 2.0.0
 */
import { Alt1 } from './Alt'
import { Applicative, Applicative1 } from './Applicative'
import { ChainRec1, tailRec } from './ChainRec'
import { Comonad1 } from './Comonad'
import { Eq } from './Eq'
import { Foldable1 } from './Foldable'
import { identity as id, Lazy } from './function'
import { Functor1 } from './Functor'
import { HKT } from './HKT'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import { Show } from './Show'
import { PipeableTraverse1, Traversable1 } from './Traversable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
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
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: Identity<A>) => Identity<B> = (f) => (fa) => map_(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const alt_: <A>(fa: A, that: Lazy<A>) => A = id
const extend_: <A, B>(wa: A, f: (wa: A) => B) => B = (wa, f) => f(wa)
const map_: <A, B>(fa: Identity<A>, f: (a: A) => B) => Identity<B> = (ma, f) => f(ma)
const ap_: <A, B>(fab: Identity<(a: A) => B>, fa: Identity<A>) => Identity<B> = (mab, ma) => mab(ma)
const chain_: <A, B>(fa: Identity<A>, f: (a: A) => Identity<B>) => Identity<B> = (ma, f) => f(ma)
const reduce_: <A, B>(fa: Identity<A>, b: B, f: (b: B, a: A) => B) => B = (fa, b, f) => f(b, fa)
const foldMap_: <M>(M: Monoid<M>) => <A>(fa: Identity<A>, f: (a: A) => M) => M = (_) => (fa, f) => f(fa)
const reduceRight_: <A, B>(fa: Identity<A>, b: B, f: (a: A, b: B) => B) => B = (fa, b, f) => f(fa, b)
const traverse_ = <F>(F: Applicative<F>) => <A, B>(ta: Identity<A>, f: (a: A) => HKT<F, B>): HKT<F, Identity<B>> =>
  F.map(f(ta), id)
const of = id
const chainRec_ = tailRec

/**
 * @category instances
 * @since 2.0.0
 */
export const URI = 'Identity'

/**
 * @category instances
 * @since 2.0.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: Identity<A>
  }
}

/**
 * @category instances
 * @since 2.7.0
 */
export const functorIdentity: Functor1<URI> = {
  URI,
  map: map_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const applicativeIdentity: Applicative1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of
}

/**
 * @category instances
 * @since 2.7.0
 */
export const monadIdentity: Monad1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const foldableIdentity: Foldable1<URI> = {
  URI,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const traversableIdentity: Traversable1<URI> = {
  URI,
  map: map_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence
}

/**
 * @category instances
 * @since 2.7.0
 */
export const altIdentity: Alt1<URI> = {
  URI,
  map: map_,
  alt: alt_
}

/**
 * @category instances
 * @since 2.7.0
 */
export const comonadIdentity: Comonad1<URI> = {
  URI,
  map: map_,
  extend: extend_,
  extract
}

/**
 * @category instances
 * @since 2.7.0
 */
export const chainRecIdentity: ChainRec1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  chain: chain_,
  chainRec: chainRec_
}

/**
 * @category instances
 * @since 2.0.0
 * @deprecated
 */
export const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI> = {
  URI,
  map: map_,
  ap: ap_,
  of,
  chain: chain_,
  reduce: reduce_,
  foldMap: foldMap_,
  reduceRight: reduceRight_,
  traverse: traverse_,
  sequence,
  alt: alt_,
  extract,
  extend: extend_,
  chainRec: chainRec_
}
