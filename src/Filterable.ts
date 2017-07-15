import { HKT } from './HKT'
import { Functor } from './Functor'
import { Either, fromPredicate, left, right } from './Either'
import { Option, fromPredicate as optionFromPredicate } from './Option'
import { Predicate, identity } from './function'
import './overloadings'

export interface Filterable<F> extends Functor<F> {
  /** partition a data structure based on an either predicate */
  partitionMap<A, L, R>(f: (a: A) => Either<L, R>, fa: HKT<F, A>): { left: HKT<F, L>; right: HKT<F, R> }
}

export class Ops {
  /** partition a data structure based on boolean predicate */
  partition<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => { no: HKT<F, A>; yes: HKT<F, A> }
  partition<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => { no: HKT<F, A>; yes: HKT<F, A> } {
    return (predicate, fa) => {
      const { left, right } = F.partitionMap(fromPredicate(predicate, identity), fa)
      return { no: left, yes: right }
    }
  }

  /** map over a data structure and filter based on a maybe */
  filterMap<F>(F: Filterable<F>): <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => HKT<F, B>
  filterMap<F>(F: Filterable<F>): <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => HKT<F, B> {
    return <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => {
      return F.partitionMap((a: A) => f(a).fold(() => left<null, B>(null), b => right<null, B>(b)), fa).right
    }
  }

  /** filter a data structure based on a boolean */
  filter<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => HKT<F, A>
  filter<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => HKT<F, A> {
    return <A>(predicate: Predicate<A>, fa: HKT<F, A>) => this.filterMap(F)(optionFromPredicate(predicate), fa)
  }

  partitioned<F>(F: Filterable<F>): <L, R>(fa: HKT<F, Either<L, R>>) => { left: HKT<F, L>; right: HKT<F, R> }
  partitioned<F>(F: Filterable<F>): <L, R>(fa: HKT<F, Either<L, R>>) => { left: HKT<F, L>; right: HKT<F, R> } {
    return <L, A>(fa: HKT<F, Either<L, A>>) => F.partitionMap(a => a, fa)
  }

  /** Filter out all the `None` values */
  filtered<F>(F: Filterable<F>): <A>(fa: HKT<F, Option<A>>) => HKT<F, A>
  filtered<F>(F: Filterable<F>): <A>(fa: HKT<F, Option<A>>) => HKT<F, A> {
    return <A>(fa: HKT<F, Option<A>>) => this.filterMap(F)(a => a, fa)
  }
}

const ops = new Ops()
export const partition: Ops['partition'] = ops.partition
export const filterMap: Ops['filterMap'] = ops.filterMap
export const filter: Ops['filter'] = ops.filter
export const partitioned: Ops['partitioned'] = ops.partitioned
export const filtered: Ops['filtered'] = ops.filtered

//
// overloadings
//

import { ArrayURI, OptionURI, EitherURI } from './overloadings'

export interface Ops {
  partition(F: Filterable<ArrayURI>): <A>(predicate: Predicate<A>, fa: Array<A>) => { no: Array<A>; yes: Array<A> }
  partition(
    F: Filterable<EitherURI>
  ): <L, A>(predicate: Predicate<A>, fa: Either<L, A>) => { no: Either<L, A>; yes: Either<L, A> }
  partition(F: Filterable<OptionURI>): <A>(predicate: Predicate<A>, fa: Option<A>) => { no: Option<A>; yes: Option<A> }

  filterMap(F: Filterable<ArrayURI>): <A, B>(f: (a: A) => Option<B>, fa: Array<A>) => Array<B>
  filterMap(F: Filterable<EitherURI>): <L, A, B>(f: (a: A) => Option<B>, fa: Either<L, A>) => Either<L, B>
  filterMap(F: Filterable<OptionURI>): <A, B>(f: (a: A) => Option<B>, fa: Option<A>) => Option<B>

  filter(F: Filterable<ArrayURI>): <A>(predicate: Predicate<A>, fa: Array<A>) => Array<A>
  filter(F: Filterable<EitherURI>): <L, A>(predicate: Predicate<A>, fa: Either<L, A>) => Either<L, A>
  filter(F: Filterable<OptionURI>): <A>(predicate: Predicate<A>, fa: Option<A>) => Option<A>

  partitioned(F: Filterable<ArrayURI>): <L, R>(fa: Array<Either<L, R>>) => { left: Array<L>; right: Array<R> }
  partitioned(
    F: Filterable<EitherURI>
  ): <M, L, R>(fa: Either<M, Either<L, R>>) => { left: Either<M, L>; right: Either<M, R> }
  partitioned(F: Filterable<OptionURI>): <L, R>(fa: Option<Either<L, R>>) => { left: Option<L>; right: Option<R> }

  filtered(F: Filterable<ArrayURI>): <A>(fa: Array<Option<A>>) => Array<A>
  filtered(F: Filterable<EitherURI>): <L, A>(fa: Either<L, Option<A>>) => Either<L, A>
  filtered(F: Filterable<OptionURI>): <A>(fa: Option<Option<A>>) => Option<A>
}
