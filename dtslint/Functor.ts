import * as E from '../src/Either'
import * as _ from '../src/Functor'
import * as RTE from '../src/ReaderTaskEither'
import * as RA from '../src/ReadonlyArray'

// $ExpectType <A, B>(f: (a: A) => B) => (fa: readonly (readonly A[])[]) => readonly (readonly B[])[]
export const F11 = _.map(RA.Functor, RA.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <E>(fa: readonly Either<E, A>[]) => readonly Either<E, B>[]
export const F12 = _.map(RA.Functor, E.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <R, E>(fa: readonly ReaderTaskEither<R, E, A>[]) => readonly ReaderTaskEither<R, E, B>[]
export const F13 = _.map(RA.Functor, RTE.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <E>(fa: Either<E, readonly A[]>) => Either<E, readonly B[]>
export const F21 = _.map(E.Functor, RA.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <EF, EG>(fa: Either<EF, Either<EG, A>>) => Either<EF, Either<EG, B>>
export const F22 = _.map(E.Functor, E.Functor)

// $ExpectType <A, B>(f: (a: A) => B) => <R, E>(fa: ReaderTaskEither<R, E, readonly A[]>) => ReaderTaskEither<R, E, readonly B[]>
export const F31 = _.map(RTE.Functor, RA.Functor)
