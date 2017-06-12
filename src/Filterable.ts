import { HKT, HKTS } from './HKT'
import { Functor } from './Functor'
import { Either, fromPredicate, left, right } from './Either'
import { Option, fromPredicate as optionFromPredicate } from './Option'
import { Predicate, identity } from './function'

export interface Filterable<F extends HKTS> extends Functor<F> {
  /** partition a data structure based on an either predicate */
  partitionMap<A, L, R, U = any, V = any>(
    f: (a: A) => Either<L, R>,
    fa: HKT<A, U, V>[F]
  ): { left: HKT<L, U, V>[F]; right: HKT<R, U, V>[F] }
}

/** partition a data structure based on boolean predicate */
export function partition<F extends HKTS>(
  filterable: Filterable<F>
): <A, U = any, V = any>(
  predicate: Predicate<A>,
  fa: HKT<A, U, V>[F]
) => { no: HKT<A, U, V>[F]; yes: HKT<A, U, V>[F] } {
  return <A, U = any, V = any>(predicate: Predicate<A>, fa: HKT<A, U, V>[F]) => {
    const { left, right } = filterable.partitionMap(fromPredicate(predicate, identity), fa)
    return { no: left, yes: right }
  }
}

/** map over a data structure and filter based on a maybe */
export function filterMap<F extends HKTS>(
  filterable: Filterable<F>
): <A, B, U = any, V = any>(f: (a: A) => Option<B>, fa: HKT<A, U, V>[F]) => HKT<B, U, V>[F] {
  return <A, B, U = any, V = any>(f: (a: A) => Option<B>, fa: HKT<A, U, V>[F]) => {
    return filterable.partitionMap((a: A) => f(a).fold(() => left<null, B>(null), b => right<null, B>(b)), fa).right
  }
}

/** filter a data structure based on a boolean */
export function filter<F extends HKTS>(
  filterable: Filterable<F>
): <A, U = any, V = any>(predicate: Predicate<A>, fa: HKT<A, U, V>[F]) => HKT<A, U, V>[F] {
  return <A, U = any, V = any>(predicate: Predicate<A>, fa: HKT<A, U, V>[F]) =>
    filterMap(filterable)(optionFromPredicate(predicate), fa)
}

export function partitioned<F extends HKTS>(
  filterable: Filterable<F>
): <L, A, U = any, V = any>(fa: HKT<Either<L, A>, U, V>[F]) => { left: HKT<L, U, V>[F]; right: HKT<A, U, V>[F] } {
  return <L, A, U = any, V = any>(fa: HKT<Either<L, A>, U, V>[F]) => filterable.partitionMap(identity, fa)
}

/** Filter out all the `None` values */
export function filtered<F extends HKTS>(
  filterable: Filterable<F>
): <A, U = any, V = any>(fa: HKT<Option<A>, U, V>[F]) => HKT<A, U, V>[F] {
  return <A, U = any, V = any>(fa: HKT<Option<A>, U, V>[F]) => filterMap(filterable)(identity, fa)
}
