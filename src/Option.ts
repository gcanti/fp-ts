import { Alternative1 } from './Alternative'
import { Compactable1, Separated } from './Compactable_'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable_'
import { Foldable2v1 } from './Foldable2v'
import { Monad1 } from './Monad'
import { Plus1 } from './Plus'
import { Traversable2v1 } from './Traversable2v'
import { Witherable1 } from './Witherable'
import {
  alt,
  ap,
  chain,
  compact,
  extend,
  filter,
  filterMap,
  foldMap,
  foldr,
  map,
  none,
  of,
  Option,
  reduce,
  sequence,
  some,
  traverse,
  URI,
  wither,
  zero
} from './Option_'
import { Predicate, not } from './function'
import { Applicative } from './Applicative'
import { HKT } from './HKT'
import { Either } from './Either_'

const separate = <RL, RR>(fa: Option<Either<RL, RR>>): Separated<Option<RL>, Option<RR>> => {
  if (fa.isNone()) {
    return {
      left: none,
      right: none
    }
  }
  const e = fa.value
  if (e.isLeft()) {
    return {
      left: some(e.value),
      right: none
    }
  }
  return {
    left: none,
    right: some(e.value)
  }
}

const partitionMap = <RL, RR, A>(fa: Option<A>, f: (a: A) => Either<RL, RR>): Separated<Option<RL>, Option<RR>> =>
  separate(fa.map(f))

const partition = <A>(fa: Option<A>, p: Predicate<A>): Separated<Option<A>, Option<A>> => ({
  left: fa.filter(not(p)),
  right: fa.filter(p)
})

const wilt = <F>(F: Applicative<F>) => <RL, RR, A>(
  fa: Option<A>,
  f: (a: A) => HKT<F, Either<RL, RR>>
): HKT<F, Separated<Option<RL>, Option<RR>>> => {
  if (fa.isNone()) {
    return F.of({
      left: none,
      right: none
    })
  }
  return F.map(f(fa.value), e => {
    if (e.isLeft()) {
      return {
        left: some(e.value),
        right: none
      }
    }
    return {
      left: none,
      right: some(e.value)
    }
  })
}

/**
 * Constructs a new `Option` from a `Either`. If the value is a `Left`, returns `None`, otherwise returns the inner
 * value wrapped in a `Some`
 *
 * @example
 * import { none, some, fromEither } from 'fp-ts/lib/Option'
 * import { left, right } from 'fp-ts/lib/Either'
 *
 * assert.deepStrictEqual(fromEither(left(1)), none)
 * assert.deepStrictEqual(fromEither(right(1)), some(1))
 *
 * @since 1.0.0
 */
export const fromEither = <L, A>(fa: Either<L, A>): Option<A> => {
  return fa.isLeft() ? none : some(fa.value)
}

/**
 * @since 1.0.0
 */
export const option: Monad1<URI> &
  Foldable2v1<URI> &
  Plus1<URI> &
  Traversable2v1<URI> &
  Alternative1<URI> &
  Extend1<URI> &
  Compactable1<URI> &
  Filterable1<URI> &
  Witherable1<URI> = {
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
  zero,
  alt,
  extend,
  compact,
  separate,
  filter,
  filterMap,
  partition,
  partitionMap,
  wither,
  wilt
}

export {
  fromNullable,
  fromPredicate,
  fromRefinement,
  getApplyMonoid,
  getApplySemigroup,
  getFirstMonoid,
  getLastMonoid,
  getMonoid,
  getOrd,
  getRefinement,
  getSetoid,
  isNone,
  isSome,
  none,
  None,
  Option,
  some,
  Some,
  tryCatch,
  URI
} from './Option_'
