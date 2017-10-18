import * as readerT from 'fp-ts/lib/ReaderT'
import * as io from 'fp-ts/lib/IO'
import { Monad, FantasyMonad } from 'fp-ts/lib/Monad'

const readerTIO = readerT.getReaderT(io)

declare module 'fp-ts/lib/HKT' {
  interface URI2HKT2<L, A> {
    ReaderIO: ReaderIO<L, A>
  }
}

export const URI = 'ReaderIO'

export type URI = typeof URI

export class ReaderIO<E, A> implements FantasyMonad<URI, A> {
  readonly _A: A
  readonly _L: E
  readonly _URI: URI
  constructor(readonly run: (e: E) => io.IO<A>) {}
  map<B>(f: (a: A) => B): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.map(f, this.run))
  }
  of<E, B>(b: B): ReaderIO<E, B> {
    return of(b)
  }
  ap<B>(fab: ReaderIO<E, (a: A) => B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.ap(fab.run, this.run))
  }
  ap_<B, C>(this: ReaderIO<E, (a: B) => C>, fb: ReaderIO<E, B>): ReaderIO<E, C> {
    return fb.ap(this)
  }
  chain<B>(f: (a: A) => ReaderIO<E, B>): ReaderIO<E, B> {
    return new ReaderIO(readerTIO.chain(a => f(a).run, this.run))
  }
}

export const map = <E, A, B>(f: (a: A) => B, fa: ReaderIO<E, A>): ReaderIO<E, B> => fa.map(f)

export const of = <E, A>(a: A): ReaderIO<E, A> => new ReaderIO(readerTIO.of(a))

export const ap = <E, A, B>(fab: ReaderIO<E, (a: A) => B>, fa: ReaderIO<E, A>): ReaderIO<E, B> => fa.ap(fab)

export const chain = <E, A, B>(f: (a: A) => ReaderIO<E, B>, fa: ReaderIO<E, A>): ReaderIO<E, B> => fa.chain(f)

export const ask = <E>(e: E): ReaderIO<E, E> => new ReaderIO(readerT.ask(io)())

export const asks = <E, A>(f: (e: E) => A): ReaderIO<E, A> => new ReaderIO(readerT.asks(io)(f))

export const local = <E>(f: (e: E) => E) => <A>(fa: ReaderIO<E, A>): ReaderIO<E, A> => new ReaderIO(e => fa.run(f(e)))

export const readerIO: Monad<URI> = {
  URI,
  map,
  of,
  ap,
  chain
}
