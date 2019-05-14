import { Alt2C } from './Alt'
import { Applicative2C } from './Applicative'
import { Either, either, isLeft, left, right, URI, isRight } from './Either'
import { phantom } from './function'
import { Monad2C } from './Monad'
import { Monoid } from './Monoid'
import { Semigroup } from './Semigroup'
import { Foldable2C } from './Foldable'
import { Bifunctor2C } from './Bifunctor'
import { Traversable2C } from './Traversable'
import { Extend2C } from './Extend'

const map = either.map

export function getApplicative<L>(
  S: Semigroup<L>
): Applicative2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L> {
  return {
    URI,
    _L: phantom,
    map,
    of: either.of,
    ap: (mab, ma) =>
      isLeft(mab)
        ? isLeft(ma)
          ? left(S.concat(mab.left, ma.left))
          : mab
        : isLeft(ma)
        ? ma
        : right(mab.right(ma.right)),
    reduce: either.reduce,
    foldMap: either.foldMap,
    reduceRight: either.reduceRight,
    traverse: either.traverse,
    sequence: either.sequence,
    extend: either.extend,
    bimap: either.bimap,
    mapLeft: either.mapLeft
  }
}

/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 2.0.0
 */
export function getMonad<L>(
  S: Semigroup<L>
): Monad2C<URI, L> & Foldable2C<URI, L> & Traversable2C<URI, L> & Bifunctor2C<URI, L> & Extend2C<URI, L> {
  return {
    ...getApplicative(S),
    chain: (ma, f) => (isLeft(ma) ? ma : f(ma.right))
  }
}

/**
 * @since 2.0.0
 */
export function getSemigroup<L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>> {
  return {
    concat: (fx, fy) =>
      isLeft(fx)
        ? isLeft(fy)
          ? left(SL.concat(fx.left, fy.left))
          : fx
        : isLeft(fy)
        ? fy
        : right(SA.concat(fx.right, fy.right))
  }
}

/**
 * @since 2.0.0
 */
export function getMonoid<L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>> {
  return {
    ...getSemigroup(SL, SA),
    empty: right(SA.empty)
  }
}

/**
 * @since 2.0.0
 */
export function getAlt<L>(S: Semigroup<L>): Alt2C<URI, L> {
  return {
    URI,
    _L: phantom,
    map,
    alt: (fx, f) => {
      if (isRight(fx)) {
        return fx
      }
      const fy = f()
      return isLeft(fy) ? left(S.concat(fx.left, fy.left)) : fy
    }
  }
}
