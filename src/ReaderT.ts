import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Chain } from './Chain'
import { Monad } from './Monad'
import { Kleisli } from './function'
import './overloadings'

export interface ReaderT<M> {
  map<E, A, B>(f: (a: A) => B, fa: Kleisli<M, E, A>): Kleisli<M, E, B>
  of<E, A>(a: A): Kleisli<M, E, A>
  ap<E, A, B>(fab: Kleisli<M, E, (a: A) => B>, fa: Kleisli<M, E, A>): Kleisli<M, E, B>
  chain<E, A, B>(f: (a: A) => Kleisli<M, E, B>, fa: Kleisli<M, E, A>): Kleisli<M, E, B>
  ask<E>(): Kleisli<M, E, E>
  asks<E, A>(f: (e: E) => A): Kleisli<M, E, A>
}

export class Ops {
  map<F>(F: Functor<F>): ReaderT<F>['map']
  map<F>(F: Functor<F>): ReaderT<F>['map'] {
    return (f, fa) => e => F.map(f, fa(e))
  }

  of<F>(F: Applicative<F>): ReaderT<F>['of']
  of<F>(F: Applicative<F>): ReaderT<F>['of'] {
    return <A>(a: A) => <E>(e: E) => F.of(a)
  }

  ap<F>(F: Applicative<F>): ReaderT<F>['ap']
  ap<F>(F: Applicative<F>): ReaderT<F>['ap'] {
    return (fab, fa) => e => F.ap(fab(e), fa(e))
  }

  chain<F>(F: Chain<F>): ReaderT<F>['chain']
  chain<F>(F: Chain<F>): ReaderT<F>['chain'] {
    return (f, fa) => e => F.chain(a => f(a)(e), fa(e))
  }

  ask<F>(F: Applicative<F>): ReaderT<F>['ask']
  ask<F>(F: Applicative<F>): ReaderT<F>['ask'] {
    return () => e => F.of(e)
  }

  asks<F>(F: Applicative<F>): ReaderT<F>['asks']
  asks<F>(F: Applicative<F>): ReaderT<F>['asks'] {
    return f => e => F.of(f(e))
  }

  getReaderT<M>(M: Monad<M>): ReaderT<M>
  getReaderT<M>(M: Monad<M>): ReaderT<M> {
    return {
      map: this.map(M),
      of: this.of(M),
      ap: this.ap(M),
      chain: this.chain(M),
      ask: this.ask(M),
      asks: this.asks(M)
    }
  }
}

const ops = new Ops()
export const map: Ops['map'] = ops.map
export const of: Ops['of'] = ops.of
export const ap: Ops['ap'] = ops.ap
export const chain: Ops['chain'] = ops.chain
export const ask: Ops['ask'] = ops.ask
export const asks: Ops['asks'] = ops.asks
export const getReaderT: Ops['getReaderT'] = ops.getReaderT

//
// overloadings
//

import { OptionURI, OptionKleisli } from './overloadings'

export type OptionKleisli<E, A> = OptionKleisli<E, A>

export interface ReaderTOption {
  map<E, A, B>(f: (a: A) => B, fa: OptionKleisli<E, A>): OptionKleisli<E, B>
  of<E, A>(a: A): OptionKleisli<E, A>
  ap<E, A, B>(fab: OptionKleisli<E, (a: A) => B>, fa: OptionKleisli<E, A>): OptionKleisli<E, B>
  chain<E, A, B>(f: (a: A) => OptionKleisli<E, B>, fa: OptionKleisli<E, A>): OptionKleisli<E, B>
  ask<E>(): OptionKleisli<E, E>
  asks<E, A>(f: (e: E) => A): OptionKleisli<E, A>
}

export interface Ops {
  getReaderT(M: Monad<OptionURI>): ReaderTOption
}
