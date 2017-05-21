import { HKT, HKTS } from './HKT'
import { FantasyMonad, StaticMonad } from './Monad'
import { Either } from './Either'
import * as either from './Either'
import { Option } from './Option'
import { StaticTrans } from './Trans'

declare module './HKT' {
  interface HKT<A> {
    EitherT: EitherT<any, any, A>
  }
}

export const URI = 'EitherT'

export type URI = typeof URI

export class EitherT<M extends HKTS, L, A> implements FantasyMonad<URI, A> {
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  of: <E>(a: A) => EitherT<M, E, A>
  constructor(monad: StaticMonad<M>, value: FantasyMonad<M, Either<L, A>>)
  constructor(monad: StaticMonad<M>, value: HKT<Either<L, A>>[M])
  constructor(
    public readonly monad: StaticMonad<M>,
    public readonly value: HKT<Either<L, A>>[M]
  ) {
    this.of = of<M>(monad)
  }
  map<B>(f: (a: A) => B): EitherT<M, L, B> {
    return new EitherT<M, L, B>(this.monad, this.monad.map((e: Either<L, A>) => e.map(f), this.value))
  }
  ap<B>(fab: EitherT<M, L, (a: A) => B>): EitherT<M, L, B> {
    return fab.chain(f => this.map(f)) // <- derived
  }
  chain<B>(f: (a: A) => EitherT<M, L, B>): EitherT<M, L, B> {
    return flatten(this.map(f)) // <- derived
  }
  fold<B>(left: (l: L) => B, right: (a: A) => B): HKT<B>[M] {
    return this.monad.map<Either<L, A>, B>(e => e.fold(left, right), this.value)
  }
  mapLeft<L2>(f: (l: L) => L2): EitherT<M, L2, A> {
    return new EitherT<M, L2, A>(this.monad, this.monad.map<Either<L, A>, Either<L2, A>>(e => e.mapLeft(f), this.value))
  }
  toOption(): HKT<Option<A>>[M] {
    return this.monad.map<Either<L, A>, Option<A>>(e => e.toOption(), this.value)
  }
}

export function flatten<M extends HKTS, L, A>(mma: EitherT<M, L, EitherT<M, L, A>>): EitherT<M, L, A> {
  const value = mma.monad.chain<Either<L, EitherT<M, L, A>>, Either<L, A>>(e => e.fold(
    l => mma.monad.of<Either<L, A>>(either.left<L, A>(l)),
    x => x.value
  ), mma.value)
  return new EitherT<M, L, A>(mma.monad, value)
}

export function of<M extends HKTS>(monad: StaticMonad<M>): <L, A>(a: A) => EitherT<M, L, A> {
  return <L, A>(a: A) => new EitherT<M, L, A>(monad, monad.of(either.of<L, A>(a)))
}

export function liftT<M extends HKTS>(monad: StaticMonad<M>): <L, A>(fa: HKT<A>[M]) => EitherT<M, L, A> {
  return <L, A>(fa: HKT<A>[M]) => new EitherT<M, L, A>(monad, monad.map<A, Either<L, A>>(a => either.right<L, A>(a), fa))
}

export function map<M extends HKTS, L, A, B>(f: (a: A) => B, fa: EitherT<M, L, A>): EitherT<M, L, B> {
  return fa.map(f)
}

export function ap<M extends HKTS, L, A, B>(fab: EitherT<M, L, (a: A) => B>, fa: EitherT<M, L, A>): EitherT<M, L, B> {
  return fa.ap(fab)
}

export function chain<M extends HKTS, L, A, B>(f: (a: A) => EitherT<M, L, B>, fa: EitherT<M, L, A>): EitherT<M, L, B> {
  return fa.chain(f)
}

export function getStaticMonad<M extends HKTS>(monad: StaticMonad<M>): StaticMonad<URI> {
  return {
    URI,
    of: of(monad),
    map,
    ap,
    chain
  }
}

export function bimap<M extends HKTS>(monad: StaticMonad<M>): <L, L2, A, B>(f: (l: L) => L2, g: (a: A) => B, fa: EitherT<M, L, A>) => EitherT<M, L2, B> {
  return <L, L2, A, B>(f: (l: L) => L2, g: (a: A) => B, fa: EitherT<M, L, A>) =>
    new EitherT(monad, monad.map<Either<L, A>, Either<L2, B>>(e => e.bimap(f, g), fa.value))
}

/** lifts `M<A>` to `EitherT<M, L, A>` */
export function right<M extends HKTS>(monad: StaticMonad<M>): <L, A>(ma: HKT<A>[M]) => EitherT<M, L, A> {
  return <L, A>(ma: HKT<A>[M]) => new EitherT<M, L, A>(monad, monad.map((a: A) => either.right<L, A>(a), ma))
}

/** lifts `M<L>` to `EitherT<M, L, A>` */
export function left<M extends HKTS>(monad: StaticMonad<M>): <L, A>(ml: HKT<L>[M]) => EitherT<M, L, A> {
  return <L, A>(ml: HKT<L>[M]) => new EitherT<M, L, A>(monad, monad.map((l: L) => either.left<L, A>(l), ml))
}

// tslint:disable-next-line no-unused-expression
;(
  { liftT } as (
    StaticTrans<URI>
  )
)
