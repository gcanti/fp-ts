import { HKT } from './HKT'
import { Traversable } from './Traversable'
import { Filterable } from './Filterable'
import { Applicative } from './Applicative'
import { Either, left, right } from './Either'
import { Option } from './Option'
import './overloadings'

export type Wilt<T, L, R> = {
  left: HKT<T, L>
  right: HKT<T, R>
}

export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  wilt<M>(M: Applicative<M>): <A, L, R>(f: (a: A) => HKT<M, Either<L, R>>, ta: HKT<T, A>) => HKT<M, Wilt<T, L, R>>
}

export class Ops {
  /**  A default implementation of `wither` using `wilt` */
  wither<T, M>(
    T: Witherable<T>,
    M: Applicative<M>
  ): <A, B>(f: (a: A) => HKT<M, Option<B>>, ta: HKT<T, A>) => HKT<M, HKT<T, B>>
  wither<T, M>(
    T: Witherable<T>,
    M: Applicative<M>
  ): <A, B>(f: (a: A) => HKT<M, Option<B>>, ta: HKT<T, A>) => HKT<M, HKT<T, B>> {
    return <A, B>(f: (a: A) => HKT<M, Option<B>>, ta: HKT<T, A>): HKT<M, HKT<T, B>> => {
      const mb: HKT<M, Wilt<T, null, B>> = T.wilt(M)(
        a => M.map(ob => ob.fold(() => left(null), b => right(b)), f(a)),
        ta
      )
      return M.map(w => w.right, mb)
    }
  }

  /** Partition between `Left` and `Right` values - with effects in `m` */
  wilted<T, M>(T: Witherable<T>, M: Applicative<M>): <L, R>(tm: HKT<T, HKT<M, Either<L, R>>>) => HKT<M, Wilt<T, L, R>>
  wilted<T, M>(T: Witherable<T>, M: Applicative<M>): <L, R>(tm: HKT<T, HKT<M, Either<L, R>>>) => HKT<M, Wilt<T, L, R>> {
    return tm => T.wilt(M)(me => me, tm)
  }

  /** Filter out all the `Nothing` values - with effects in `m` */
  withered<T, M>(T: Witherable<T>, M: Applicative<M>): <A>(tm: HKT<T, HKT<M, Option<A>>>) => HKT<M, HKT<T, A>>
  withered<T, M>(T: Witherable<T>, M: Applicative<M>): <A>(tm: HKT<T, HKT<M, Option<A>>>) => HKT<M, HKT<T, A>> {
    return tm => this.wither(T, M)(moa => moa, tm)
  }
}

const ops = new Ops()
export const wither: Ops['wither'] = ops.wither
export const wilted: Ops['wilted'] = ops.wilted
export const withered: Ops['withered'] = ops.withered

//
// overloadings
//

import { Identity, IdentityURI, ArrayURI, OptionURI } from './overloadings'

export interface Ops {
  wither(
    T: Witherable<ArrayURI>,
    M: Applicative<IdentityURI>
  ): <A, B>(f: (a: A) => Identity<Option<B>>, ta: Array<A>) => Identity<Array<B>>
  wither(
    T: Witherable<OptionURI>,
    M: Applicative<IdentityURI>
  ): <A, B>(f: (a: A) => Identity<Option<B>>, ta: Option<A>) => Identity<Option<B>>

  withered(
    T: Witherable<ArrayURI>,
    M: Applicative<IdentityURI>
  ): <A>(tm: Array<Identity<Option<A>>>) => Identity<Array<A>>
}
