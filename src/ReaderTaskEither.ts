/**
 * @since 3.0.0
 */
import { Alt3, Alt3C } from './Alt'
import { Applicative3, Applicative3C } from './Applicative'
import {
  ap as ap_,
  apFirst as apFirst_,
  Apply1,
  Apply3,
  apS as apS_,
  apSecond as apSecond_,
  apT as apT_
} from './Apply'
import { Bifunctor3 } from './Bifunctor'
import { ap as apSeq_, bind as bind_, Chain3, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable3C, separate as separate_ } from './Compactable'
import * as E from './Either'
import * as ET from './EitherT'
import { filter, Filterable3C, filterMap, partition, partitionMap } from './Filterable'
import {
  chainEitherK as chainEitherK_,
  chainOptionK as chainOptionK_,
  filterOrElse as filterOrElse_,
  FromEither3,
  fromEitherK as fromEitherK_,
  fromOption as fromOption_,
  fromOptionK as fromOptionK_,
  fromPredicate as fromPredicate_
} from './FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO3, fromIOK as fromIOK_ } from './FromIO'
import {
  ask as ask_,
  asks as asks_,
  chainReaderK as chainReaderK_,
  FromReader3,
  fromReaderK as fromReaderK_
} from './FromReader'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask3,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity } from './function'
import { bindTo as bindTo_, flap as flap_, Functor3, tupled as tupled_ } from './Functor'
import { IO } from './IO'
import { IOEither } from './IOEither'
import { Monad3 } from './Monad'
import { Monoid } from './Monoid'
import { Pointed3 } from './Pointed'
import { Predicate } from './Predicate'
import * as R from './Reader'
import { ReaderEither } from './ReaderEither'
import * as RT from './ReaderTask'
import { Refinement } from './Refinement'
import { Semigroup } from './Semigroup'
import * as T from './Task'
import * as TE from './TaskEither'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

import Either = E.Either
import Task = T.Task
import TaskEither = TE.TaskEither
import Reader = R.Reader
import ReaderTask = RT.ReaderTask

/**
 * @category model
 * @since 3.0.0
 */
export interface ReaderTaskEither<R, E, A> {
  (r: R): TaskEither<E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTaskEither: <R, E, A>(ma: TaskEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  R.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const left: <E, R, A = never>(e: E) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.left(RT.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const right: <A, R, E = never>(a: A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.right(RT.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightTask: <A, R, E = never>(ma: Task<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightTask, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftTask: <E, R, A = never>(me: Task<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftTask, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReader: <R, A, E = never>(ma: Reader<R, A>) => ReaderTaskEither<R, E, A> = (ma) => flow(ma, TE.right)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReader: <R, E, A = never>(me: Reader<R, E>) => ReaderTaskEither<R, E, A> = (me) => flow(me, TE.left)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightReaderTask: <R, A, E = never>(ma: ReaderTask<R, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.rightF(RT.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftReaderTask: <R, E, A = never>(me: ReaderTask<R, E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  ET.leftF(RT.Functor)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIOEither: <E, A, R>(ma: IOEither<E, A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.fromIOEither, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReaderEither = <R, E, A>(ma: ReaderEither<R, E, A>): ReaderTaskEither<R, E, A> =>
  flow(ma, TE.fromEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const rightIO: <A, R, E = never>(ma: IO<A>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.rightIO, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const leftIO: <E, R, A = never>(me: IO<E>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  flow(TE.leftIO, fromTaskEither)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromReader: FromReader3<URI>['fromReader'] = rightReader

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromEither: FromEither3<URI>['fromEither'] = RT.of

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromIO: FromIO3<URI>['fromIO'] = rightIO

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromTask: FromTask3<URI>['fromTask'] = rightTask

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match =
  /*#__PURE__*/
  ET.match(RT.Monad)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <E, R2, B, A, R3, C>(
  onLeft: (e: E) => ReaderTask<R2, B>,
  onRight: (a: A) => ReaderTask<R3, C>
) => <R1>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2 & R3, B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse =
  /*#__PURE__*/
  ET.getOrElse(RT.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <E, R2, B>(
  onLeft: (e: E) => ReaderTask<R2, B>
) => <R1, A>(ma: ReaderTaskEither<R1, E, A>) => ReaderTask<R1 & R2, A | B> = getOrElse as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const toUnion =
  /*#__PURE__*/
  ET.toUnion(RT.Functor)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const orElse =
  /*#__PURE__*/
  ET.orElse(RT.Monad)

/**
 * Less strict version of [`orElse`](#orElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const orElseW: <E1, R1, E2, B>(
  onLeft: (e: E1) => ReaderTaskEither<R1, E2, B>
) => <R2, A>(ma: ReaderTaskEither<R2, E1, A>) => ReaderTaskEither<R1 & R2, E2, A | B> = orElse as any

/**
 * @category combinators
 * @since 3.0.0
 */
export const swap =
  /*#__PURE__*/
  ET.swap(RT.Functor)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => IOEither<E, B>
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => fromIOEither(f(...a))

/**
 * Less strict version of [`chainIOEitherK`](#chainIOEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherKW: <A, E2, B>(
  f: (a: A) => IOEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromIOEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOEitherK: <E, A, B>(
  f: (a: A) => IOEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainIOEitherKW

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK = <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => TaskEither<E, B>
): (<R>(...a: A) => ReaderTaskEither<R, E, B>) => (...a) => fromTaskEither(f(...a))

/**
 * Less strict version of [`chainTaskEitherK`](#chainTaskEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherKW: <A, E2, B>(
  f: (a: A) => TaskEither<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = (f) => chainW(fromTaskEitherK(f))

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK: <E, A, B>(
  f: (a: A) => TaskEither<E, B>
) => <R>(ma: ReaderTaskEither<R, E, A>) => ReaderTaskEither<R, E, B> = chainTaskEitherKW

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor3<URI>['map'] =
  /*#__PURE__*/
  ET.map(RT.Functor)

/**
 * Map a pair of functions over the two last type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor3<URI>['bimap'] =
  /*#__PURE__*/
  ET.bimap(RT.Functor)

/**
 * Map a function over the second type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor3<URI>['mapLeft'] =
  /*#__PURE__*/
  ET.mapLeft(RT.Functor)

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply3<URI>['ap'] =
  /*#__PURE__*/
  ET.ap(RT.ApplyPar)

/**
 * Less strict version of [`ap`](#ap).
 *
 * @category Apply
 * @since 3.0.0
 */
export const apW: <R2, E2, A>(
  fa: ReaderTaskEither<R2, E2, A>
) => <R1, E1, B>(fab: ReaderTaskEither<R1, E1, (a: A) => B>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = ap as any

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A, R, E = never>(a: A) => ReaderTaskEither<R, E, A> = right

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain3<URI>['chain'] =
  /*#__PURE__*/
  ET.chain(RT.Monad)

/**
 * Less strict version of [`chain`](#chain).
 *
 * @category Chain
 * @since 3.0.0
 */
export const chainW: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(ma: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, B> = chain as any

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <R, E, A>(mma: ReaderTaskEither<R, E, ReaderTaskEither<R, E, A>>) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  chain(identity)

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt3<URI>['alt'] =
  /*#__PURE__*/
  ET.alt(RT.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <R2, E2, B>(
  second: () => ReaderTaskEither<R2, E2, B>
) => <R1, E1, A>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A | B> = alt as any

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'ReaderTaskEither'

declare module './HKT' {
  interface URItoKind3<R, E, A> {
    readonly ReaderTaskEither: ReaderTaskEither<R, E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicativeReaderTaskValidation = <E>(A: Apply1<T.URI>, S: Semigroup<E>): Applicative3C<URI, E> => ({
  map,
  ap: ap_(R.Apply, TE.getApplicativeTaskValidation(A, S)),
  of
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getAltReaderTaskValidation = <E>(S: Semigroup<E>): Alt3C<URI, E> => {
  return {
    map,
    alt: ET.altValidation(RT.Monad, S)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getCompactable = <E>(M: Monoid<E>): Compactable3C<URI, E> => {
  const C = E.getCompactable(M)
  return {
    compact: compact_(RT.Functor, C),
    separate: separate_(RT.Functor, C, E.Functor)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getFilterable = <E>(M: Monoid<E>): Filterable3C<URI, E> => {
  const F = E.getFilterable(M)
  return {
    filter: filter(RT.Functor, F),
    filterMap: filterMap(RT.Functor, F),
    partition: partition(RT.Functor, F),
    partitionMap: partitionMap(RT.Functor, F)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor3<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed3<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply3<URI> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst =
  /*#__PURE__*/
  apFirst_(ApplyPar)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativePar: Applicative3<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain3<URI> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad3<URI> = {
  map,
  of,
  chain
}

const apSeq =
  /*#__PURE__*/
  apSeq_(Monad)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply3<URI> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative3<URI> = {
  map,
  ap: apSeq,
  of
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * Less strict version of [`chainFirst`](#chainFirst).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstW: <A, R2, E2, B>(
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(first: ReaderTaskEither<R1, E1, A>) => ReaderTaskEither<R1 & R2, E1 | E2, A> = chainFirst as any

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO3<URI> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  /*#__PURE__*/
  fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK =
  /*#__PURE__*/
  chainIOK_(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK =
  /*#__PURE__*/
  chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask3<URI> = {
  fromIO,
  fromTask
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskK =
  /*#__PURE__*/
  fromTaskK_(FromTask)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskK =
  /*#__PURE__*/
  chainTaskK_(FromTask, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstTaskK =
  /*#__PURE__*/
  chainFirstTaskK_(FromTask, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromReader: FromReader3<URI> = {
  fromReader
}

/**
 * Reads the current context.
 *
 * @category constructors
 * @since 3.0.0
 */
export const ask: <R, E = never>() => ReaderTaskEither<R, E, R> =
  /*#__PURE__*/
  ask_(FromReader)

/**
 * Projects a value from the global context in a `ReaderEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const asks: <R, A, E = never>(f: (r: R) => A) => ReaderTaskEither<R, E, A> =
  /*#__PURE__*/
  asks_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK =
  /*#__PURE__*/
  fromReaderK_(FromReader)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainReaderK =
  /*#__PURE__*/
  chainReaderK_(FromReader, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither3<URI> = {
  fromEither
}

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromOption =
  /*#__PURE__*/
  fromOption_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK =
  /*#__PURE__*/
  fromOptionK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK =
  /*#__PURE__*/
  chainOptionK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * Less strict version of [`chainEitherK`](#chainEitherK).
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherKW: <E2, A, B>(
  f: (a: A) => Either<E2, B>
) => <R, E1>(ma: ReaderTaskEither<R, E1, A>) => ReaderTaskEither<R, E1 | E2, B> = chainEitherK as any

/**
 * Derivable from `FromEither`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElse =
  /*#__PURE__*/
  filterOrElse_(FromEither, Chain)

/**
 * Less strict version of [`filterOrElse`](#filterOrElse).
 *
 * @category combinators
 * @since 3.0.0
 */
export const filterOrElseW: {
  <A, B extends A, E2>(refinement: Refinement<A, B>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, B>
  <A, E2>(predicate: Predicate<A>, onFalse: (a: A) => E2): <R, E1>(
    ma: ReaderTaskEither<R, E1, A>
  ) => ReaderTaskEither<R, E1 | E2, A>
} = filterOrElse

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor3<URI> = {
  bimap,
  mapLeft
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt3<URI> = {
  map,
  alt
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Make sure that a resource is cleaned up in the event of an exception (\*). The release action is called regardless of
 * whether the body action throws (\*) or returns.
 *
 * (\*) i.e. returns a `Left`
 *
 * Derivable from `FromEither`.
 *
 * @since 3.0.0
 */
export const bracket = <R, E, A, B>(
  aquire: ReaderTaskEither<R, E, A>,
  use: (a: A) => ReaderTaskEither<R, E, B>,
  release: (a: A, e: Either<E, B>) => ReaderTaskEither<R, E, void>
): ReaderTaskEither<R, E, B> => (r) =>
  TE.bracket(
    aquire(r),
    (a) => use(a)(r),
    (a, e) => release(a, e)(r)
  )

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReaderTaskEither<unknown, never, {}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

/**
 * Less strict version of [`bind`](#bind).
 *
 * @since 3.0.0
 */
export const bindW: <N extends string, A, R2, E2, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = bind as any

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

/**
 * Less strict version of [`apS`](#apS).
 *
 * @since 3.0.0
 */
export const apSW: <A, N extends string, R2, E2, B>(
  name: Exclude<N, keyof A>,
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1>(
  fa: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, { [K in keyof A | N]: K extends keyof A ? A[K] : B }> = apS as any

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReaderTaskEither<unknown, never, readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(ApplyPar)

/**
 * Less strict version of [`apT`](#apT).
 *
 * @since 3.0.0
 */
export const apTW: <R2, E2, B>(
  fb: ReaderTaskEither<R2, E2, B>
) => <R1, E1, A extends ReadonlyArray<unknown>>(
  fas: ReaderTaskEither<R1, E1, A>
) => ReaderTaskEither<R1 & R2, E1 | E2, readonly [...A, B]> = apT as any

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  flow(R.traverseReadonlyArrayWithIndex(f), R.map(TE.sequenceReadonlyArray))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <R, E, A>(
  as: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, R, E, B>(
  f: (index: number, a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  flow(R.traverseReadonlyArrayWithIndex(f), R.map(TE.sequenceReadonlyArraySeq))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArraySeq = <A, R, E, B>(
  f: (a: A) => ReaderTaskEither<R, E, B>
): ((as: ReadonlyArray<A>) => ReaderTaskEither<R, E, ReadonlyArray<B>>) =>
  traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArraySeq: <R, E, A>(
  as: ReadonlyArray<ReaderTaskEither<R, E, A>>
) => ReaderTaskEither<R, E, ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArraySeq(identity)
