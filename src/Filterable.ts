import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Functor, FantasyFunctor } from './Functor'
import { Either, fromPredicate, left, right } from './Either'
import { Option, fromPredicate as optionFromPredicate } from './Option'
import { Predicate, identity } from './function'

export interface Filterable<F> extends Functor<F> {
  /** partition a data structure based on an either predicate */
  partitionMap<A, L, R>(f: (a: A) => Either<L, R>, fa: HKT<F, A>): { left: HKT<F, L>; right: HKT<F, R> }
}

export interface FantasyFilterable<F, A> extends FantasyFunctor<F, A> {
  /** partition a data structure based on an either predicate */
  partitionMap<L, R>(f: (a: A) => Either<L, R>): { left: HKT<F, L>; right: HKT<F, R> }
}

export class Ops {
  /** partition a data structure based on boolean predicate */
  partition<F extends HKT2S>(
    F: Filterable<F>
  ): <L, A>(predicate: Predicate<A>, fa: HKT2As<F, L, A>) => { no: HKT2As<F, L, A>; yes: HKT2As<F, L, A> }
  partition<F extends HKTS>(
    F: Filterable<F>
  ): <A>(predicate: Predicate<A>, fa: HKTAs<F, A>) => { no: HKTAs<F, A>; yes: HKTAs<F, A> }
  partition<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => { no: HKT<F, A>; yes: HKT<F, A> }
  partition<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => { no: HKT<F, A>; yes: HKT<F, A> } {
    return (predicate, fa) => {
      const { left, right } = F.partitionMap(fromPredicate(predicate, identity), fa)
      return { no: left, yes: right }
    }
  }

  /** map over a data structure and filter based on a maybe */
  filterMap<F extends HKT2S>(
    F: Filterable<F>
  ): <L, A, B>(f: (a: A) => Option<B>, fa: HKT2As<F, L, A>) => HKT2As<F, L, B>
  filterMap<F extends HKTS>(F: Filterable<F>): <A, B>(f: (a: A) => Option<B>, fa: HKTAs<F, A>) => HKTAs<F, B>
  filterMap<F>(F: Filterable<F>): <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => HKT<F, B>
  filterMap<F>(F: Filterable<F>): <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => HKT<F, B> {
    return <A, B>(f: (a: A) => Option<B>, fa: HKT<F, A>) => {
      return F.partitionMap((a: A) => f(a).fold(() => left<null, B>(null), b => right<null, B>(b)), fa).right
    }
  }

  /** filter a data structure based on a boolean */
  filter<F extends HKT2S>(F: Filterable<F>): <L, A>(predicate: Predicate<A>, fa: HKT2As<F, L, A>) => HKT2As<F, L, A>
  filter<F extends HKTS>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKTAs<F, A>) => HKTAs<F, A>
  filter<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => HKT<F, A>
  filter<F>(F: Filterable<F>): <A>(predicate: Predicate<A>, fa: HKT<F, A>) => HKT<F, A> {
    return <A>(predicate: Predicate<A>, fa: HKT<F, A>) => this.filterMap(F)(optionFromPredicate(predicate), fa)
  }

  partitioned<F extends HKT2S>(
    F: Filterable<F>
  ): <L, M, R>(fa: HKT2As<F, M, Either<L, R>>) => { left: HKT2As<F, M, L>; right: HKT2As<F, M, R> }
  partitioned<F extends HKTS>(
    F: Filterable<F>
  ): <L, R>(fa: HKTAs<F, Either<L, R>>) => { left: HKTAs<F, L>; right: HKTAs<F, R> }
  partitioned<F>(F: Filterable<F>): <L, R>(fa: HKT<F, Either<L, R>>) => { left: HKT<F, L>; right: HKT<F, R> }
  partitioned<F>(F: Filterable<F>): <L, R>(fa: HKT<F, Either<L, R>>) => { left: HKT<F, L>; right: HKT<F, R> } {
    return <L, A>(fa: HKT<F, Either<L, A>>) => F.partitionMap(a => a, fa)
  }

  /** Filter out all the `None` values */
  filtered<F extends HKT2S>(F: Filterable<F>): <L, A>(fa: HKT2As<F, L, Option<A>>) => HKT2As<F, L, A>
  filtered<F extends HKTS>(F: Filterable<F>): <A>(fa: HKTAs<F, Option<A>>) => HKTAs<F, A>
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
