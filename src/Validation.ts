import { Alt2C } from './Alt'
import { Applicative, Applicative2C } from './Applicative'
import { Compactable2C, Separated } from './Compactable'
import { Either, either, isLeft, left, right, URI } from './Either'
import { Filterable2C } from './Filterable'
import { phantom, Predicate } from './function'
import { HKT } from './HKT'
import { Monad2C } from './Monad'
import { MonadThrow2C } from './MonadThrow'
import { Monoid } from './Monoid'
import { isNone, isSome, Option } from './Option'
import { Semigroup } from './Semigroup'
import { Witherable2C } from './Witherable'

const of = either.of
const map = either.map
const traverse = either.traverse
const sequence = either.sequence
const reduce = either.reduce
const foldMap = either.foldMap
const foldr = either.foldr
const throwError = either.throwError
const fromEither = either.fromEither
const fromOption = either.fromOption

export const getApplicative = <L>(S: Semigroup<L>): Applicative2C<URI, L> => {
  const ap = <A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> => {
    return isLeft(fab)
      ? isLeft(fa)
        ? left(S.concat(fab.left, fa.left))
        : left(fab.left)
      : isLeft(fa)
        ? left(fa.left)
        : right(fab.right(fa.right))
  }

  return {
    URI,
    _L: phantom,
    map: either.map,
    of,
    ap
  }
}

/**
 * **Note**: This function is here just to avoid switching to / from `Either`
 *
 * @since 1.0.0
 */
export const getMonad = <L>(S: Semigroup<L>): Monad2C<URI, L> => {
  const chain = <A, B>(fa: Either<L, A>, f: (a: A) => Either<L, B>): Either<L, B> => {
    return isLeft(fa) ? left(fa.left) : f(fa.right)
  }

  return {
    ...getApplicative(S),
    chain
  }
}

/**
 * @since 1.0.0
 */
export const getSemigroup = <L, A>(SL: Semigroup<L>, SA: Semigroup<A>): Semigroup<Either<L, A>> => {
  const concat = (fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
    return isLeft(fx)
      ? isLeft(fy)
        ? left(SL.concat(fx.left, fy.left))
        : left(fx.left)
      : isLeft(fy)
        ? left(fy.left)
        : right(SA.concat(fx.right, fy.right))
  }
  return {
    concat
  }
}

/**
 * @since 1.0.0
 */
export const getMonoid = <L, A>(SL: Semigroup<L>, SA: Monoid<A>): Monoid<Either<L, A>> => {
  return {
    ...getSemigroup(SL, SA),
    empty: right(SA.empty)
  }
}

/**
 * @since 1.0.0
 */
export const getAlt = <L>(S: Semigroup<L>): Alt2C<URI, L> => {
  const alt = <A>(fx: Either<L, A>, fy: Either<L, A>): Either<L, A> => {
    return isLeft(fx) ? (isLeft(fy) ? left(S.concat(fx.left, fy.left)) : fy) : fx
  }
  return {
    URI,
    _L: phantom,
    map,
    alt
  }
}

/**
 * Builds `Compactable` instance for `Validation` given `Monoid` for the failure side
 *
 * @since 1.7.0
 */
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> {
  const compact = <A>(fa: Either<L, Option<A>>): Either<L, A> => {
    if (isLeft(fa)) {
      return fa
    }
    if (isNone(fa.right)) {
      return left(ML.empty)
    }
    return right(fa.right.value)
  }

  const separate = <RL, RR, A>(fa: Either<L, Either<RL, RR>>): Separated<Either<L, RL>, Either<L, RR>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    switch (fa.right._tag) {
      case 'Left':
        return {
          left: right(fa.right.left),
          right: left(ML.empty)
        }
      case 'Right':
        return {
          left: left(ML.empty),
          right: right(fa.right.right)
        }
    }
  }
  return {
    URI,
    _L: phantom,
    compact,
    separate
  }
}

/**
 * Builds `Filterable` instance for `Validation` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(ML)
  const partitionMap = <RL, RR, A>(
    fa: Either<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<L, RL>, Either<L, RR>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    const e = f(fa.right)
    switch (e._tag) {
      case 'Left':
        return {
          left: right(e.left),
          right: left(ML.empty)
        }
      case 'Right':
        return {
          left: left(ML.empty),
          right: right(e.right)
        }
    }
  }
  const partition = <A>(fa: Either<L, A>, p: Predicate<A>): Separated<Either<L, A>, Either<L, A>> => {
    if (isLeft(fa)) {
      return {
        left: fa,
        right: fa
      }
    }
    if (p(fa.right)) {
      return {
        left: left(ML.empty),
        right: right(fa.right)
      }
    }
    return {
      left: right(fa.right),
      right: left(ML.empty)
    }
  }
  const filterMap = <A, B>(fa: Either<L, A>, f: (a: A) => Option<B>): Either<L, B> => {
    if (isLeft(fa)) {
      return fa
    }
    const optionB = f(fa.right)
    if (isSome(optionB)) {
      return right(optionB.value)
    }
    return left(ML.empty)
  }
  const filter = <A>(fa: Either<L, A>, p: Predicate<A>): Either<L, A> => {
    if (isLeft(fa)) {
      return fa
    }
    const a = fa.right
    if (p(a)) {
      return right(a)
    }
    return left(ML.empty)
  }
  return {
    ...C,
    map,
    partitionMap,
    filterMap,
    partition,
    filter
  }
}

/**
 * Builds `Witherable` instance for `Validation` given `Monoid` for the left side
 *
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  const filterableValidation = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableValidation.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableValidation.separate)
  }

  return {
    ...filterableValidation,
    traverse,
    sequence,
    reduce,
    foldMap,
    foldr,
    wither,
    wilt
  }
}

/**
 * @since 1.16.0
 */
export const getMonadThrow = <L>(S: Semigroup<L>): MonadThrow2C<URI, L> => {
  return {
    ...getMonad(S),
    throwError,
    fromEither,
    fromOption
  }
}
