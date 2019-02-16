import { Monad2C } from '../src/Monad'
import { Option, some as optionSome } from '../src/Option'
import * as optionT from '../src/OptionT'
import { These, URI as TheseURI } from '../src/These'
import { phantom } from '../src/function'

declare module '../src/HKT' {
  interface URI2HKT2<L, A> {
    TheseOption: TheseOption<L, A>
  }
}

export const URI = 'TheseOption'

export type URI = typeof URI

export class TheseOption<L, A> {
  readonly _A!: A
  readonly _L!: L
  readonly _URI!: URI
  constructor(readonly value: These<L, Option<A>>) {}
}

export const getMonad = <L>(M: Monad2C<TheseURI, L>): Monad2C<URI, L> => {
  const T = optionT.getOptionT2v(M)

  const map = <A, B>(fa: TheseOption<L, A>, f: (a: A) => B): TheseOption<L, B> => new TheseOption(T.map(fa.value, f))

  const of = <A>(a: A): TheseOption<L, A> => new TheseOption(T.of(a))

  const ap = <A, B>(fab: TheseOption<L, (a: A) => B>, fa: TheseOption<L, A>): TheseOption<L, B> =>
    new TheseOption(T.ap(fab.value, fa.value))

  const chain = <A, B>(fa: TheseOption<L, A>, f: (a: A) => TheseOption<L, B>): TheseOption<L, B> =>
    new TheseOption(T.chain(fa.value, a => f(a).value))

  return {
    URI,
    _L: phantom,
    map,
    of,
    ap,
    chain
  }
}

export const getFold = <L>(
  M: Monad2C<TheseURI, L>
): (<A, R>(r: R, some: (a: A) => R, fa: TheseOption<L, A>) => These<L, R>) => {
  const optionTfold = optionT.fold(M)
  return (r, some, fa) => optionTfold(r, some, fa.value)
}

export const getSome = <L>(M: Monad2C<URI, L>): (<A>(a: A) => TheseOption<L, A>) => {
  return M.of
}

export const getFromThese = <L, A>(fa: These<L, A>): TheseOption<L, A> => {
  return new TheseOption(fa.map(optionSome))
}
