import { HKT } from './HKT'
import { Functor } from './Functor'
import { Monad } from './Monad'
import { Chain } from './Chain'
import { Applicative, getApplicativeComposition, ApplicativeComposition } from './Applicative'
import { Option, URI as OptionURI } from './Option'
import * as option from './Option'
import { Lazy } from './function'

export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
  chain<A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>): HKT<M, Option<B>>
}

export class Ops {
  chain<F>(F: Chain<F>): OptionT<F>['chain']
  chain<F>(F: Chain<F>): OptionT<F>['chain'] {
    return (f, fa) => F.chain(o => o.fold(() => fa as any, a => f(a)), fa)
  }

  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>
  some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>> {
    return a => F.of(option.some(a))
  }

  none<F>(F: Applicative<F>): () => HKT<F, Option<any>>
  none<F>(F: Applicative<F>): () => HKT<F, Option<any>> {
    return () => F.of(option.none)
  }

  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>
  fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>> {
    return oa => F.of(oa)
  }

  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>
  liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>> {
    return fa => F.map(a => option.some(a), fa)
  }

  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>
  fold<F>(F: Functor<F>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R> {
    return (none, some, fa) => F.map(o => o.fold(none, some), fa)
  }

  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>, fa: HKT<F, Option<A>>) => HKT<F, A>
  getOrElse<F>(F: Functor<F>): <A>(f: Lazy<A>, fa: HKT<F, Option<A>>) => HKT<F, A> {
    return (f, fa) => F.map(o => o.getOrElse(f), fa)
  }

  getOptionT<M>(M: Monad<M>): OptionT<M>
  getOptionT<M>(M: Monad<M>): OptionT<M> {
    const applicativeComposition = getApplicativeComposition(M, option)

    return {
      ...applicativeComposition,
      chain: this.chain(M)
    }
  }
}

const ops = new Ops()
export const chain: Ops['chain'] = ops.chain
export const none: Ops['none'] = ops.none
export const some: Ops['some'] = ops.some
export const fromOption: Ops['fromOption'] = ops.fromOption
export const liftF: Ops['liftF'] = ops.liftF
export const fold: Ops['fold'] = ops.fold
export const getOrElse: Ops['getOrElse'] = ops.getOrElse
export const getOptionT: Ops['getOptionT'] = ops.getOptionT

//
// overloadings
//

import {
  ArrayURI,
  EitherURI,
  Either,
  IOURI,
  IO,
  NonEmptyArrayURI,
  NonEmptyArray,
  TaskURI,
  Task,
  ApplicativeCompositionArrayOption,
  ApplicativeCompositionEitherOption,
  ApplicativeCompositionIOOption,
  ApplicativeCompositionNonEmptyArrayOption,
  ApplicativeCompositionTaskOption
} from './overloadings'

export interface OptionTArray extends ApplicativeCompositionArrayOption {
  chain<A, B>(f: (a: A) => Array<Option<B>>, fa: Array<Option<A>>): Array<Option<B>>
}
export interface OptionTEither extends ApplicativeCompositionEitherOption {
  chain<L, A, B>(f: (a: A) => Either<L, Option<B>>, fa: Either<L, Option<A>>): Either<L, Option<B>>
}
export interface OptionTIO extends ApplicativeCompositionIOOption {
  chain<A, B>(f: (a: A) => IO<Option<B>>, fa: IO<Option<A>>): IO<Option<B>>
}
export interface OptionTNonEmptyArray extends ApplicativeCompositionNonEmptyArrayOption {
  chain<A, B>(f: (a: A) => NonEmptyArray<Option<B>>, fa: NonEmptyArray<Option<A>>): NonEmptyArray<Option<B>>
}
export interface OptionTTask extends ApplicativeCompositionTaskOption {
  chain<A, B>(f: (a: A) => Task<Option<B>>, fa: Task<Option<A>>): Task<Option<B>>
}

export interface Ops {
  some(F: Applicative<ArrayURI>): <A>(a: A) => Array<Option<A>>
  some(F: Applicative<EitherURI>): <L, A>(a: A) => Either<L, Option<A>>
  some(F: Applicative<IOURI>): <A>(a: A) => IO<Option<A>>
  some(F: Applicative<NonEmptyArrayURI>): <A>(a: A) => NonEmptyArray<Option<A>>
  some(F: Applicative<TaskURI>): <A>(a: A) => Task<Option<A>>

  none(F: Applicative<ArrayURI>): () => Array<Option<any>>
  none(F: Applicative<EitherURI>): <L>() => Either<L, Option<any>>
  none(F: Applicative<IOURI>): () => IO<Option<any>>
  none(F: Applicative<NonEmptyArrayURI>): () => NonEmptyArray<Option<any>>
  none(F: Applicative<TaskURI>): () => Task<Option<any>>

  fromOption(F: Applicative<ArrayURI>): <A>(oa: Option<A>) => Array<Option<A>>
  fromOption(F: Applicative<EitherURI>): <L, A>(oa: Option<A>) => Either<L, Option<A>>
  fromOption(F: Applicative<IOURI>): <A>(oa: Option<A>) => IO<Option<A>>
  fromOption(F: Applicative<NonEmptyArrayURI>): <A>(oa: Option<A>) => NonEmptyArray<Option<A>>
  fromOption(F: Applicative<TaskURI>): <A>(oa: Option<A>) => Task<Option<A>>

  liftF(F: Functor<ArrayURI>): <A>(ma: Array<A>) => Array<Option<A>>
  liftF(F: Functor<EitherURI>): <L, A>(ma: Either<L, A>) => Either<L, Option<A>>
  liftF(F: Functor<IOURI>): <A>(ma: IO<A>) => IO<Option<A>>
  liftF(F: Functor<NonEmptyArrayURI>): <A>(ma: NonEmptyArray<A>) => NonEmptyArray<Option<A>>
  liftF(F: Functor<TaskURI>): <A>(ma: Task<A>) => Task<Option<A>>

  fold(F: Functor<ArrayURI>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: Array<Option<A>>) => Array<R>
  fold(F: Functor<EitherURI>): <L, R, A>(none: Lazy<R>, some: (a: A) => R, fa: Either<L, Option<A>>) => Either<L, R>
  fold(F: Functor<IOURI>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: IO<Option<A>>) => IO<R>
  fold(
    F: Functor<NonEmptyArrayURI>
  ): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: NonEmptyArray<Option<A>>) => NonEmptyArray<R>
  fold(F: Functor<TaskURI>): <R, A>(none: Lazy<R>, some: (a: A) => R, fa: Task<Option<A>>) => Task<R>

  getOrElse(F: Functor<ArrayURI>): <A>(f: Lazy<A>, fa: Array<Option<A>>) => Array<A>
  getOrElse(F: Functor<EitherURI>): <L, A>(f: Lazy<A>, fa: Either<L, Option<A>>) => Either<L, A>
  getOrElse(F: Functor<IOURI>): <A>(f: Lazy<A>, fa: IO<Option<A>>) => IO<A>
  getOrElse(F: Functor<NonEmptyArrayURI>): <A>(f: Lazy<A>, fa: NonEmptyArray<Option<A>>) => NonEmptyArray<A>
  getOrElse(F: Functor<TaskURI>): <A>(f: Lazy<A>, fa: Task<Option<A>>) => Task<A>

  getOptionT(M: Monad<ArrayURI>): OptionTArray
  getOptionT(M: Monad<EitherURI>): OptionTEither
  getOptionT(M: Monad<IOURI>): OptionTIO
  getOptionT(M: Monad<TaskURI>): OptionTTask
}
