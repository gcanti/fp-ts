import { Reader } from 'fp-ts/lib/Reader'
import { Option } from 'fp-ts/lib/Option'
import * as option from 'fp-ts/lib/Option'
import { getReaderT } from 'fp-ts/lib/ReaderT'
import { FantasyMonad } from 'fp-ts/lib/Monad'
import { Endomorphism } from 'fp-ts/lib/function'

import { lift } from 'fp-ts/lib/Functor'

declare module 'fp-ts/lib/HKT' {
  interface HKT<A, U> {
    'Kleisli<Option, E, A>': (u: U) => option.Option<A>
    'ReaderOption': ReaderOption<U, A>
  }
}

const readerTOption = getReaderT('Kleisli<Option, E, A>', option)

export const URI = 'ReaderOption'

export type URI = typeof URI

export class ReaderOption<E, A> implements FantasyMonad<URI, A> {
  readonly _E: E
  readonly _A: A
  readonly _URI: URI
  constructor(public readonly value: (e: E) => Option<A>) {}
  map<B>(f: (a: A) => B): ReaderOption<E, B> {
    return new ReaderOption(readerTOption.map(f, this.value))
  }
  of<E2, B>(b: B): ReaderOption<E2, B> {
    return of<E2, B>(b)
  }
  ap<B>(fab: ReaderOption<E, (a: A) => B>): ReaderOption<E, B> {
    return new ReaderOption(readerTOption.ap(fab.value, this.value))
  }
  chain<B>(f: (a: A) => ReaderOption<E, B>): ReaderOption<E, B> {
    return new ReaderOption(readerTOption.chain(a => f(a).value, this.value))
  }
}

export function map<E, A, B>(f: (a: A) => B, fa: ReaderOption<E, A>): ReaderOption<E, B> {
  return fa.map(f)
}

export function of<E, A>(a: A): ReaderOption<E, A> {
  return new ReaderOption<E, A>(readerTOption.of(a))
}

export function ap<E, A, B>(fab: ReaderOption<E, (a: A) => B>, fa: ReaderOption<E, A>): ReaderOption<E, B> {
  return fa.ap(fab)
}

export function chain<E, A, B>(f: (a: A) => ReaderOption<E, B>, fa: ReaderOption<E, A>): ReaderOption<E, B> {
  return fa.chain(f)
}

export function ask<E>(): ReaderOption<E, E> {
  return new ReaderOption(readerTOption.ask<E>())
}

export function asks<E, A>(f: (e: E) => A): ReaderOption<E, A> {
  return new ReaderOption(readerTOption.asks<E, A>(f))
}

export function local<E, A>(f: Endomorphism<E>, fa: ReaderOption<E, A>): ReaderOption<E, A> {
  return new ReaderOption(readerTOption.local<E, A>(f, fa.value))
}
