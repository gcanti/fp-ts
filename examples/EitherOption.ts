import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import { Either } from 'fp-ts/lib/Either'
import * as either from 'fp-ts/lib/Either'
import { getStaticOptionT } from 'fp-ts/lib/OptionT'
import { FantasyMonad } from 'fp-ts/lib/Monad'
import { Lazy } from 'fp-ts/lib/function'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A, U> {
    'Either<Option>': Either<U, Option<A>>
    EitherOption: EitherOption<U, A>
  }
}

const optionTEither = getStaticOptionT('Either<Option>', either)

export const URI = 'EitherOption'

export type URI = typeof URI

export class EitherOption<L, A> implements FantasyMonad<URI, A> {
  readonly _L: L
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: Either<L, Option<A>>) {}
  map<B>(f: (a: A) => B): EitherOption<L, B> {
    return new EitherOption(optionTEither.map(f, this.value))
  }
  of<L2, B>(b: B): EitherOption<L2, B> {
    return of<L2, B>(b)
  }
  ap<B>(fab: EitherOption<L, (a: A) => B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => EitherOption<L, B>): EitherOption<L, B> {
    return new EitherOption(optionTEither.chain(a => f(a).value, this.value))
  }
  fold<R>(none: Lazy<R>, some: (a: A) => R): Either<L, R> {
    return optionTEither.fold(none, some, this.value)
  }
  getOrElse(f: Lazy<A>): Either<L, A> {
    return optionTEither.getOrElse(f, this.value)
  }
}

export function map<L, A, B>(f: (a: A) => B, fa: EitherOption<L, A>): EitherOption<L, B> {
  return fa.map(f)
}

export function of<L, A>(a: A): EitherOption<L, A> {
  return new EitherOption(optionTEither.of(a))
}

export function ap<L, A, B>(fab: EitherOption<L, (a: A) => B>, fa: EitherOption<L, A>): EitherOption<L, B> {
  return fa.ap(fab)
}

export function chain<L, A, B>(f: (a: A) => EitherOption<L, B>, fa: EitherOption<L, A>): EitherOption<L, B> {
  return fa.chain(f)
}

export function some<L, A>(a: A): EitherOption<L, A> {
  return new EitherOption(optionTEither.some(a))
}

export function none<L>(): EitherOption<L, any> {
  return new EitherOption(optionTEither.none())
}
