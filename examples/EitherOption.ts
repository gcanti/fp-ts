import { Either, either } from '../src/Either'
import { Monad2 } from '../src/Monad'
import { Option, none as optionNone, some as optionSome } from '../src/Option'
import * as optionT from '../src/OptionT'
import { identity } from '../src/function'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    EitherOption: EitherOption<L, A>
  }
}

export const URI = 'EitherOption'

export type URI = typeof URI

const T = optionT.getOptionT2v(either)
const foldT = optionT.fold(either)

export class EitherOption<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: Either<L, Option<A>>) {}
  map<B>(f: (a: A) => B): EitherOption<L, B> {
    return new EitherOption(T.map(this.value, f))
  }
  ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> {
    return new EitherOption(T.ap(fab.value, this.value))
  }
  ap_<B, C>(this: EitherOption<L, (b: B) => C>, fb: EitherOption<L, B>): EitherOption<L, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> {
    return new EitherOption(T.chain(this.value, a => f(a).value))
  }
  fold<R>(onNone: R, onSome: (a: A) => R): Either<L, R> {
    return foldT(onNone, onSome, this.value)
  }
  getOrElse(a: A): Either<L, A> {
    return this.fold(a, identity)
  }
}

const map = <L, A, B>(fa: EitherOption<L, A>, f: (a: A) => B): EitherOption<L, B> => fa.map(f)

const of = <L, A>(a: A): EitherOption<L, A> => new EitherOption(T.of(a))

const ap = <L, A, B>(fab: EitherOption<L, (a: A) => B>, fa: EitherOption<L, A>): EitherOption<L, B> => fa.ap(fab)

const chain = <L, A, B>(fa: EitherOption<L, A>, f: (a: A) => EitherOption<L, B>): EitherOption<L, B> => fa.chain(f)

export const some = of

export const none = new EitherOption(either.of(optionNone))

export const fromOption = <L, A>(ma: Option<A>): EitherOption<L, A> => new EitherOption(either.of(ma))

export const fromEither = <L, A>(ma: Either<L, A>): EitherOption<L, A> => new EitherOption(ma.map(optionSome))

export const eitherOption: Monad2<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
