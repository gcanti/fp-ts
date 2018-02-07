import * as optionT from 'fp-ts/lib/OptionT'
import { array } from 'fp-ts/lib/Array'
import { Option } from 'fp-ts/lib/Option'
import { Monad1 } from 'fp-ts/lib/Monad'

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT<A> {
    ArrayOption: ArrayOption<A>
  }
}

const optionTArray = optionT.getOptionT(array)

export const URI = 'ArrayOption'

export type URI = typeof URI

export class ArrayOption<A> {
  // prettier-ignore
  readonly '_A': A
  // prettier-ignore
  readonly '_URI': URI
  constructor(readonly value: Array<Option<A>>) {}
  map<B>(f: (a: A) => B): ArrayOption<B> {
    return new ArrayOption(optionTArray.map(this.value, f))
  }
  ap<B>(fab: ArrayOption<(a: A) => B>): ArrayOption<B> {
    return new ArrayOption(optionTArray.ap<A, B>(fab.value, this.value))
  }
  ap_<B, C>(this: ArrayOption<(b: B) => C>, fb: ArrayOption<B>): ArrayOption<C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ArrayOption<B>): ArrayOption<B> {
    return new ArrayOption(optionTArray.chain(a => f(a).value, this.value))
  }
  fold<R>(r: R, some: (a: A) => R): Array<R> {
    return optionT.fold(array)(r, some, this.value)
  }
}

export const map = <A, B>(fa: ArrayOption<A>, f: (a: A) => B): ArrayOption<B> => fa.map(f)

export const of = <A>(a: A): ArrayOption<A> => new ArrayOption(optionT.some(array)(a))

export const ap = <A, B>(fab: ArrayOption<(a: A) => B>, fa: ArrayOption<A>): ArrayOption<B> => fa.ap(fab)

export const chain = <A, B>(fa: ArrayOption<A>, f: (a: A) => ArrayOption<B>): ArrayOption<B> => fa.chain(f)

export const some = of

export const none = new ArrayOption(optionT.none(array)())

export const fromOption = <A>(oa: Option<A>): ArrayOption<A> => new ArrayOption(optionT.fromOption(array)(oa))

export const liftF = <A>(ma: Array<A>): ArrayOption<A> => new ArrayOption(optionT.liftF(array)(ma))

export const arrayOption: Monad1<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
