import * as optionT from 'fp-ts/lib/OptionT'
import * as either from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { Lazy } from 'fp-ts/lib/function'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    EitherOption: EitherOption<L, A>
  }
}

const optionTEither = optionT.getOptionT(either)

export const URI = 'EitherOption'

export type URI = typeof URI

export class EitherOption<L, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: L
  readonly _URI = URI
  constructor(readonly value: either.Either<L, Option<A>>) {}
  map<B>(f: (a: A) => B): EitherOption<L, B> {
    return new EitherOption(optionTEither.map(f, this.value))
  }
  ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.ap(fab.value, this.value))
  }
  ap_<B, C>(this: EitherOption<L, (a: B) => C>, fb: EitherOption<L, B>): EitherOption<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.chain(a => f(a).value, this.value))
  }
  getOrElseValue(a: A): either.Either<L, A> {
    return optionT.getOrElseValue(either)(a)(this.value)
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): either.Either<L, R> {
    return optionT.fold(either)(none, some, this.value)
  }
}

export const map = <L, A, B>(f: (a: A) => B, fa: EitherOption<L, A>): EitherOption<L, B> => fa.map(f)

export const of = <L, A>(a: A): EitherOption<L, A> => new EitherOption(optionT.some(either)(a))

export const ap = <L, A, B>(fab: EitherOption<L, (a: A) => B>, fa: EitherOption<L, A>): EitherOption<L, B> => fa.ap(fab)

export const chain = <L, A, B>(f: (a: A) => EitherOption<L, B>, fa: EitherOption<L, A>): EitherOption<L, B> =>
  fa.chain(f)

export const some = of

export const none = new EitherOption(optionT.none(either)())

export const fromOption = <L, A>(oa: Option<A>): EitherOption<L, A> => new EitherOption(optionT.fromOption(either)(oa))

export const liftF = <L, A>(ma: either.Either<L, A>): EitherOption<L, A> => new EitherOption(optionT.liftF(either)(ma))

export const eitherOption: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
