import { HKT, HKTS } from './HKT'
import { FantasyMonad, StaticMonad } from './Monad'
import { Option } from './Option'
import * as option from './Option'
import { Lazy } from './function'
import { StaticTrans } from './Trans'

declare module './HKT' {
  interface HKT<A> {
    OptionT: OptionT<any, A>
  }
}

export const URI = 'OptionT'

export type URI = typeof URI

export class OptionT<M extends HKTS, A> implements FantasyMonad<URI, A> {
  readonly _M: M
  readonly _A: A
  readonly _URI: URI
  of: (a: A) => OptionT<M, A>
  constructor(monad: StaticMonad<M>, value: FantasyMonad<M, Option<A>>)
  constructor(monad: StaticMonad<M>, value: HKT<Option<A>>[M])
  constructor(
    public readonly monad: StaticMonad<M>,
    public readonly value: HKT<Option<A>>[M]
  ) {
    this.of = of<M>(monad)
  }
  map<B>(f: (a: A) => B): OptionT<M, B> {
    return new OptionT<M, B>(this.monad, this.monad.map((o: Option<A>) => o.map(f), this.value))
  }
  ap<B>(fab: OptionT<M, (a: A) => B>): OptionT<M, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => OptionT<M, B>): OptionT<M, B> {
    return flatten(this.map(f)) // <- derived
  }
  getOrElse(f: Lazy<A>): HKT<A>[M] {
    return this.monad.map<Option<A>, A>(o => o.getOrElse(f), this.value)
  }
  fold<B>(n: Lazy<B>, s: (a: A) => B): HKT<B>[M] {
    return this.monad.map<Option<A>, B>(o => o.fold(n, s), this.value)
  }
}

export function flatten<M extends HKTS, A>(mma: OptionT<M, OptionT<M, A>>): OptionT<M, A> {
  const value = mma.monad.chain<Option<OptionT<M, A>>, Option<A>>(o => o.fold(
    () => mma.monad.of<Option<A>>(option.none),
    x => x.value
  ), mma.value)
  return new OptionT<M, A>(mma.monad, value)
}

export function of<M extends HKTS>(monad: StaticMonad<M>): <A>(a: A) => OptionT<M, A> {
  return <A>(a: A) => new OptionT<M, A>(monad, monad.of(option.of(a)))
}

export function liftT<M extends HKTS>(monad: StaticMonad<M>): <A>(fa: HKT<A>[M]) => OptionT<M, A> {
  return <A>(fa: HKT<A>[M]) => new OptionT<M, A>(monad, monad.map<A, Option<A>>(a => option.some(a), fa))
}

export function map<M extends HKTS, A, B>(f: (a: A) => B, fa: OptionT<M, A>): OptionT<M, B> {
  return fa.map(f)
}

export function ap<M extends HKTS, A, B>(fab: OptionT<M, (a: A) => B>, fa: OptionT<M, A>): OptionT<M, B> {
  return fa.ap(fab)
}

export function chain<M extends HKTS, A, B>(f: (a: A) => OptionT<M, B>, fa: OptionT<M, A>): OptionT<M, B> {
  return fa.chain(f)
}

export function fromOption<M extends HKTS>(monad: StaticMonad<M>): <A>(value: Option<A>) => OptionT<M, A> {
  return <A>(value: Option<A>) => new OptionT<M, A>(monad, monad.of(value))
}

export const some = of

export function none<M extends HKTS>(monad: StaticMonad<M>): OptionT<M, any> {
  return new OptionT<M, any>(monad, monad.of(option.none))
}

// tslint:disable-next-line no-unused-expression
;(
  { liftT } as (
    StaticTrans<URI>
  )
)
