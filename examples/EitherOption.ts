import * as either from '../src/Either'
import { Monad2 } from '../src/Monad'
import { Option } from '../src/Option'
import * as optionT from '../src/OptionT'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    EitherOption: EitherOption<L, A>
  }
}

const optionTEither = optionT.getOptionT(either.either)

export const URI = 'EitherOption'

export type URI = typeof URI

const optionTfold = optionT.fold(either.either)

export class EitherOption<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: either.Either<L, Option<A>>) {}
  map<B>(f: (a: A) => B): EitherOption<L, B> {
    return new EitherOption(optionTEither.map(this.value, f))
  }
  ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.ap(fab.value, this.value))
  }
  ap_<B, C>(this: EitherOption<L, (b: B) => C>, fb: EitherOption<L, B>): EitherOption<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.chain(a => f(a).value, this.value))
  }
  fold<R>(r: R, some: (a: A) => R): either.Either<L, R> {
    return optionTfold(r, some, this.value)
  }
}

const map = <L, A, B>(fa: EitherOption<L, A>, f: (a: A) => B): EitherOption<L, B> => {
  return fa.map(f)
}

const optionTsome = optionT.some(either.either)
const of = <L, A>(a: A): EitherOption<L, A> => {
  return new EitherOption(optionTsome(a))
}

const ap = <L, A, B>(fab: EitherOption<L, (a: A) => B>, fa: EitherOption<L, A>): EitherOption<L, B> => {
  return fa.ap(fab)
}

const chain = <L, A, B>(fa: EitherOption<L, A>, f: (a: A) => EitherOption<L, B>): EitherOption<L, B> => {
  return fa.chain(f)
}

export const some = of

export const none = new EitherOption(optionT.none(either.either)())

const optionTfromOption = optionT.fromOption(either.either)
export const fromOption = <L, A>(oa: Option<A>): EitherOption<L, A> => {
  return new EitherOption(optionTfromOption(oa))
}

const optionTliftF = optionT.liftF(either.either)
export const fromEither = <L, A>(ma: either.Either<L, A>): EitherOption<L, A> => {
  return new EitherOption(optionTliftF(ma))
}

export const eitherOption: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
