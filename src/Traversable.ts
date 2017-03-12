import { HKT } from './HKT'
import { StaticFunctor } from './Functor'
import { StaticFoldable, FantasyFoldable } from './Foldable'
import { StaticApplicative } from './Applicative'
import { identity, Function1 } from './function'

export interface StaticTraversable<T> extends StaticFunctor<T>, StaticFoldable<T> {
  traverse<F, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: HKT<T, A>): HKT<F, HKT<T, B>>
}

export interface FantasyTraversable<T, A> extends FantasyFoldable<T, A> {
  traverse<F, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>): HKT<F, FantasyTraversable<T, B>>
}

export class TraversableOps {
  traverse<F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<T, A>): HKT<F, FantasyTraversable<T, B>>
  traverse<F, T, A, B>(applicative: StaticApplicative<F>, f: Function1<A, HKT<F, B>>, ta: FantasyTraversable<T, A>): HKT<F, FantasyTraversable<T, B>> {
    return ta.traverse(applicative, f)
  }

  sequence<F, T, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<T, HKT<F, A>>): HKT<F, FantasyTraversable<T, A>>
  sequence<F, T, A>(
    applicative: StaticApplicative<F>,
    tfa: FantasyTraversable<T, HKT<F, A>>): HKT<F, FantasyTraversable<T, A>> {
    return tfa.traverse<F, A>(applicative, identity)
  }

  sequenceS<F, T, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<T>,
    tfa: HKT<T, HKT<F, A>>): HKT<F, HKT<T, A>>
  sequenceS<F, T, A>(
    applicative: StaticApplicative<F>,
    traversable: StaticTraversable<T>,
    tfa: HKT<T, HKT<F, A>>): HKT<F, HKT<T, A>> {
    return traversable.traverse<F, HKT<F, A>, A>(applicative, identity, tfa)
  }
}

export const ops = new TraversableOps()
