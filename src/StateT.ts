import { Functor } from './Functor'
import { Applicative } from './Applicative'
import { Chain } from './Chain'
import { Monad } from './Monad'
import { Kleisli, Endomorphism, tuple } from './function'

export interface StateT<M> {
  map<S, A, B>(f: (a: A) => B, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]>
  of<S, A>(a: A): Kleisli<M, S, [A, S]>
  ap<S, A, B>(fab: Kleisli<M, S, [(a: A) => B, S]>, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]>
  chain<S, A, B>(f: (a: A) => Kleisli<M, S, [B, S]>, fa: Kleisli<M, S, [A, S]>): Kleisli<M, S, [B, S]>
}

export class Ops {
  map<F>(F: Functor<F>): StateT<F>['map']
  map<F>(F: Functor<F>): StateT<F>['map'] {
    return (f, fa) => s => F.map(([a, s1]) => tuple(f(a), s1), fa(s))
  }

  of<F>(F: Applicative<F>): StateT<F>['of']
  of<F>(F: Applicative<F>): StateT<F>['of'] {
    return a => s => F.of(tuple(a, s))
  }

  ap<F>(F: Chain<F>): StateT<F>['ap']
  ap<F>(F: Chain<F>): StateT<F>['ap'] {
    return (fab, fa) => this.chain(F)(f => this.map(F)(f, fa), fab) // <- derived
  }

  chain<F>(F: Chain<F>): StateT<F>['chain']
  chain<F>(F: Chain<F>): StateT<F>['chain'] {
    return (f, fa) => s => F.chain(([a, s1]) => f(a)(s1), fa(s))
  }

  get<F>(F: Applicative<F>): <S>() => Kleisli<F, S, [S, S]>
  get<F>(F: Applicative<F>): <S>() => Kleisli<F, S, [S, S]> {
    return () => s => F.of(tuple(s, s))
  }

  put<F>(F: Applicative<F>): <S>(s: S) => Kleisli<F, S, [void, S]>
  put<F>(F: Applicative<F>): <S>(s: S) => Kleisli<F, S, [void, S]> {
    return s => () => F.of(tuple(undefined, s))
  }

  modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => Kleisli<F, S, [void, S]>
  modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => Kleisli<F, S, [void, S]> {
    return f => s => F.of(tuple(undefined, f(s)))
  }

  gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => Kleisli<F, S, [A, S]>
  gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => Kleisli<F, S, [A, S]> {
    return f => s => F.of(tuple(f(s), s))
  }

  getStateT<M>(M: Monad<M>): StateT<M>
  getStateT<M>(M: Monad<M>): StateT<M> {
    return {
      map: this.map(M),
      of: this.of(M),
      ap: this.ap(M),
      chain: this.chain(M)
    }
  }
}

const ops = new Ops()
export const map: Ops['map'] = ops.map
export const of: Ops['of'] = ops.of
export const ap: Ops['ap'] = ops.ap
export const chain: Ops['chain'] = ops.chain
export const get: Ops['get'] = ops.get
export const put: Ops['put'] = ops.put
export const modify: Ops['modify'] = ops.modify
export const gets: Ops['gets'] = ops.gets
export const getStateT: Ops['getStateT'] = ops.getStateT

//
// overloadings
//

import { OptionURI, OptionKleisli } from './overloadings'

export interface StateTOption {
  map<S, A, B>(f: (a: A) => B, fa: OptionKleisli<S, [A, S]>): OptionKleisli<S, [B, S]>
  of<S, A>(a: A): OptionKleisli<S, [A, S]>
  ap<S, A, B>(fab: OptionKleisli<S, [(a: A) => B, S]>, fa: OptionKleisli<S, [A, S]>): OptionKleisli<S, [B, S]>
  chain<S, A, B>(f: (a: A) => OptionKleisli<S, [B, S]>, fa: OptionKleisli<S, [A, S]>): OptionKleisli<S, [B, S]>
}

export interface Ops {
  get(F: Applicative<OptionURI>): <S>() => OptionKleisli<S, [S, S]>

  put(F: Applicative<OptionURI>): <S>(s: S) => OptionKleisli<S, [void, S]>

  modify(F: Applicative<OptionURI>): <S>(f: Endomorphism<S>) => OptionKleisli<S, [void, S]>

  gets(F: Applicative<OptionURI>): <S, A>(f: (s: S) => A) => OptionKleisli<S, [A, S]>

  getStateT(M: Monad<OptionURI>): StateTOption
}
