import { These, URI as TheseURI } from 'fp-ts/lib/These'
import { Option } from 'fp-ts/lib/Option'
import { Monad2C } from 'fp-ts/lib/Monad'
import { phantom } from 'fp-ts/lib/function'
import * as optionT from 'fp-ts/lib/OptionT'

declare module 'fp-ts/lib/HKT' {
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

export const getMonad = <L>(these: Monad2C<TheseURI, L>): Monad2C<URI, L> => {
  const optionTThese = optionT.getOptionT(these)

  const map = <A, B>(fa: TheseOption<L, A>, f: (a: A) => B): TheseOption<L, B> => {
    return new TheseOption(optionTThese.map(fa.value, f))
  }

  const optionTsome = optionT.some(these)
  const of = <A>(a: A): TheseOption<L, A> => {
    return new TheseOption(optionTsome(a))
  }

  const ap = <A, B>(fab: TheseOption<L, (a: A) => B>, fa: TheseOption<L, A>): TheseOption<L, B> => {
    return new TheseOption(optionTThese.ap(fab.value, fa.value))
  }

  const chain = <A, B>(fa: TheseOption<L, A>, f: (a: A) => TheseOption<L, B>): TheseOption<L, B> => {
    return new TheseOption(optionTThese.chain(a => f(a).value, fa.value))
  }
  return {
    URI,
    _L: phantom,
    map,
    of,
    ap,
    chain
  }
}

export const fold = <L>(
  these: Monad2C<TheseURI, L>
): (<A, R>(r: R, some: (a: A) => R, fa: TheseOption<L, A>) => These<L, R>) => {
  const optionTfold = optionT.fold(these)
  return (r, some, fa) => optionTfold(r, some, fa.value)
}

export const some = <L>(M: Monad2C<URI, L>): (<A>(a: A) => TheseOption<L, A>) => {
  return M.of
}

export const fromOption = <L>(these: Monad2C<TheseURI, L>): (<A>(fa: Option<A>) => TheseOption<L, A>) => {
  const optionTfromOption = optionT.fromOption(these)
  return oa => new TheseOption(optionTfromOption(oa))
}

export const liftF = <L>(these: Monad2C<TheseURI, L>): (<A>(fa: These<L, A>) => TheseOption<L, A>) => {
  const optionTliftF = optionT.liftF(these)
  return ma => new TheseOption(optionTliftF(ma))
}
