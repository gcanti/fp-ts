import { HKT, HKTS, HKTAs } from './HKT'
import { Traversable } from './Traversable'
import { Filterable } from './Filterable'
import { Applicative } from './Applicative'
import { Either, left, right } from './Either'
import { Option } from './Option'

export type Wilt<T, L, R> = {
  left: HKT<T, L>
  right: HKT<T, R>
}

export type Wilt1<T extends HKTS, L, R> = {
  left: HKTAs<T, L>
  right: HKTAs<T, R>
}

export interface Witherable<T> extends Traversable<T>, Filterable<T> {
  wilt<F>(F: Applicative<F>): <A, L, R>(f: (a: A) => HKT<F, Either<L, R>>, ta: HKT<T, A>) => HKT<F, Wilt<T, L, R>>
}

export class Ops {
  /**  A default implementation of `wither` using `wilt` */
  wither<F extends HKTS, T extends HKTS>(
    F: Applicative<F>,
    T: Witherable<T>
  ): <A, B>(f: (a: A) => HKT<F, Option<B>>, ta: HKT<T, A>) => HKTAs<F, HKTAs<T, B>>
  wither<F, T>(
    F: Applicative<F>,
    T: Witherable<T>
  ): <A, B>(f: (a: A) => HKT<F, Option<B>>, ta: HKT<T, A>) => HKT<F, HKT<T, B>>
  wither<F, T>(
    F: Applicative<F>,
    T: Witherable<T>
  ): <A, B>(f: (a: A) => HKT<F, Option<B>>, ta: HKT<T, A>) => HKT<F, HKT<T, B>> {
    return <A, B>(f: (a: A) => HKT<F, Option<B>>, ta: HKT<T, A>): HKT<F, HKT<T, B>> => {
      const mb: HKT<F, Wilt<T, null, B>> = T.wilt(F)(
        a => F.map(ob => ob.fold(() => left(null), b => right(b)), f(a)),
        ta
      )
      return F.map(w => w.right, mb)
    }
  }

  /** Partition between `Left` and `Right` values - with effects in `m` */
  wilted<F extends HKTS, T extends HKTS>(
    F: Applicative<F>,
    T: Witherable<T>
  ): <L, R>(tm: HKT<T, HKT<F, Either<L, R>>>) => HKTAs<F, Wilt1<T, L, R>>
  wilted<F, T>(F: Applicative<F>, T: Witherable<T>): <L, R>(tm: HKT<T, HKT<F, Either<L, R>>>) => HKT<F, Wilt<T, L, R>>
  wilted<F, T>(F: Applicative<F>, T: Witherable<T>): <L, R>(tm: HKT<T, HKT<F, Either<L, R>>>) => HKT<F, Wilt<T, L, R>> {
    return tm => T.wilt(F)(me => me, tm)
  }

  /** Filter out all the `Nothing` values - with effects in `m` */
  withered<F extends HKTS, T extends HKTS>(
    F: Applicative<F>,
    T: Witherable<T>
  ): <A>(tm: HKT<T, HKT<F, Option<A>>>) => HKTAs<F, HKTAs<T, A>>
  withered<F, T>(F: Applicative<F>, T: Witherable<T>): <A>(tm: HKT<T, HKT<F, Option<A>>>) => HKT<F, HKT<T, A>>
  withered<F, T>(F: Applicative<F>, T: Witherable<T>): <A>(tm: HKT<T, HKT<F, Option<A>>>) => HKT<F, HKT<T, A>> {
    return tm => this.wither(F, T)(moa => moa, tm)
  }
}

const ops = new Ops()
export const wither: Ops['wither'] = ops.wither
export const wilted: Ops['wilted'] = ops.wilted
export const withered: Ops['withered'] = ops.withered
