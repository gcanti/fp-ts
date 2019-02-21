import { Alt2 } from './Alt'
import { Bifunctor2 } from './Bifunctor'
import { ChainRec2, tailRec } from './ChainRec'
import { Extend2 } from './Extend'
import { Foldable2v2 } from './Foldable2v'
import { Monad2 } from './Monad'
import { Traversable2v2 } from './Traversable2v'
import {
  alt,
  ap,
  bimap,
  chain,
  extend,
  foldMap,
  foldr,
  map,
  of,
  reduce,
  sequence,
  traverse,
  URI,
  right,
  left,
  Either
} from './Either_'
import { Monoid } from './Monoid'
import { Filterable2C } from './Filterable_'
import { Separated, Compactable2C } from './Compactable_'
import { Predicate, phantom } from './function'
import { Option } from './Option_'
import { Witherable2C } from './Witherable'
import { Applicative } from './Applicative'
import { HKT } from './HKT'
import { Validation } from './Validation'

export const chainRec = <L, A, B>(a: A, f: (a: A) => Either<L, Either<A, B>>): Either<L, B> => {
  return tailRec(e => {
    if (e.isLeft()) {
      return right(left(e.value))
    } else {
      const r = e.value
      return r.isLeft() ? left(f(r.value)) : right(right(r.value))
    }
  }, f(a))
}

/**
 * @since 1.0.0
 */
export const fromValidation = <L, A>(fa: Validation<L, A>): Either<L, A> => {
  return fa.isFailure() ? left(fa.value) : right(fa.value)
}

/**
 * Builds {@link Compactable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export function getCompactable<L>(ML: Monoid<L>): Compactable2C<URI, L> {
  const compact = <A>(fa: Either<L, Option<A>>): Either<L, A> => {
    if (fa.isLeft()) {
      return fa as any
    }
    if (fa.value.isNone()) {
      return left(ML.empty)
    }
    return right(fa.value.value)
  }
  const separate = <A, B>(fa: Either<L, Either<A, B>>): Separated<Either<L, A>, Either<L, B>> => {
    if (fa.isLeft()) {
      return {
        left: fa as any,
        right: fa as any
      }
    }
    if (fa.value.isLeft()) {
      return {
        left: right(fa.value.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(fa.value.value)
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
 * Builds {@link Filterable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export function getFilterable<L>(ML: Monoid<L>): Filterable2C<URI, L> {
  const C = getCompactable(ML)
  const partitionMap = <RL, RR, A>(
    fa: Either<L, A>,
    f: (a: A) => Either<RL, RR>
  ): Separated<Either<L, RL>, Either<L, RR>> => {
    if (fa.isLeft()) {
      return {
        left: fa as any,
        right: fa as any
      }
    }
    const e = f(fa.value)
    if (e.isLeft()) {
      return {
        left: right(e.value),
        right: left(ML.empty)
      }
    }
    return {
      left: left(ML.empty),
      right: right(e.value)
    }
  }
  const partition = <A>(fa: Either<L, A>, p: Predicate<A>): Separated<Either<L, A>, Either<L, A>> => {
    if (fa.isLeft()) {
      return {
        left: fa,
        right: fa
      }
    }
    if (p(fa.value)) {
      return {
        left: left(ML.empty),
        right: right(fa.value)
      }
    }
    return {
      left: right(fa.value),
      right: left(ML.empty)
    }
  }
  const filterMap = <A, B>(fa: Either<L, A>, f: (a: A) => Option<B>): Either<L, B> => {
    if (fa.isLeft()) {
      return fa as any
    }
    const optionB = f(fa.value)
    if (optionB.isSome()) {
      return right(optionB.value)
    }
    return left(ML.empty)
  }
  const filter = <A>(fa: Either<L, A>, p: Predicate<A>): Either<L, A> => fa.filterOrElse(p, ML.empty)
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
 * Builds {@link Witherable} instance for {@link Either} given {@link Monoid} for the left side
 *
 * @since 1.7.0
 */
export function getWitherable<L>(ML: Monoid<L>): Witherable2C<URI, L> {
  const filterableEither = getFilterable(ML)

  const wither = <F>(
    F: Applicative<F>
  ): (<A, B>(wa: Either<L, A>, f: (a: A) => HKT<F, Option<B>>) => HKT<F, Either<L, B>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.compact)
  }

  const wilt = <F>(
    F: Applicative<F>
  ): (<RL, RR, A>(
    wa: Either<L, A>,
    f: (a: A) => HKT<F, Either<RL, RR>>
  ) => HKT<F, Separated<Either<L, RL>, Either<L, RR>>>) => {
    const traverseF = traverse(F)
    return (wa, f) => F.map(traverseF(wa, f), filterableEither.separate)
  }

  return {
    ...filterableEither,
    traverse,
    reduce,
    wither,
    wilt
  }
}

/**
 * @since 1.0.0
 */
export const either: Monad2<URI> &
  Foldable2v2<URI> &
  Traversable2v2<URI> &
  Bifunctor2<URI> &
  Alt2<URI> &
  Extend2<URI> &
  ChainRec2<URI> = {
  URI,
  map,
  of,
  ap,
  chain,
  reduce,
  foldMap,
  foldr,
  traverse,
  sequence,
  bimap,
  alt,
  extend,
  chainRec
}

export {
  Either,
  fromNullable,
  fromOption,
  fromOptionL,
  fromPredicate,
  fromRefinement,
  getApplyMonoid,
  getApplySemigroup,
  getSemigroup,
  getSetoid,
  isLeft,
  isRight,
  Left,
  left,
  Right,
  right,
  toError,
  tryCatch,
  tryCatch2v,
  URI
} from './Either_'
