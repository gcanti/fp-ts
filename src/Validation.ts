import { HKT, Semigroup, Applicative } from './cats'
import { Either, isLeft, Left, map, of } from './Either'

export function getApplicative<L>(semigroup: Semigroup<L>): Applicative<HKT<'Either', any>> {
  function ap<A, B>(fab: Either<L, (a: A) => B>, fa: Either<L, A>): Either<L, B> {
    if (isLeft(fab) && isLeft(fa)) {
      return new Left<L, B>(semigroup.concat(fab.value, fa.value))
    }
    return fa.ap(fab)
  }
  return { map, of, ap }
}
