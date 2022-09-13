/**
 * `IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 *
 * @since 3.0.0
 */
import { Alt as Alt_ } from './Alt'
import { Applicative as Applicative_ } from './Applicative'
import { Alternative as Alternative_ } from './Alternative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable as Compactable_, separate as separate_ } from './Compactable'
import { Either } from './Either'
import {
  filter as filter_,
  Filterable as Filterable_,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from './Filterable'
import {
  FromEither as FromEither_,
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_,
  fromEitherK as fromEitherK_
} from './FromEither'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import { flow, identity, Lazy, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_ } from './Functor'
import * as _ from './internal'
import { Monad as Monad_ } from './Monad'
import * as O from './Option'
import * as OT from './OptionT'
import { Pointed as Pointed_ } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Separated } from './Separated'
import * as I from './IO'
import { IOEither } from './IOEither'
import { Zero as Zero_, guard as guard_ } from './Zero'

import IO = I.IO
import Option = O.Option
import { HKT } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface IOOption<A> extends IO<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => IOOption<A> = /*#__PURE__*/ OT.some(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOOption<B>
  <A>(predicate: Predicate<A>): (a: A) => IOOption<A>
} = /*#__PURE__*/ OT.fromPredicate(I.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => IOOption<A> = I.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(e: Either<unknown, A>) => I.IO<O.Option<A>> = /*#__PURE__*/ OT.fromEither(I.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(ma: I.IO<A>) => IOOption<A> = /*#__PURE__*/ OT.fromF(I.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <A>(ma: IOEither<unknown, A>) => IOOption<A> = /*#__PURE__*/ I.map(O.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: IOOption<A>) => IO<B> = /*#__PURE__*/ OT.match(
  I.Functor
)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <B, A>(
  onNone: () => IO<B>,
  onSome: (a: A) => IO<B>
) => (ma: IOOption<A>) => IO<B> = /*#__PURE__*/ OT.matchE(I.Chain)

/**
 * Less strict version of [`matchE`](#matche).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchEW: <B, A, C>(
  onNone: () => IO<B>,
  onSome: (a: A) => IO<C>
) => (ma: IOOption<A>) => IO<B | C> = matchE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <A>(onNone: Lazy<A>) => (fa: IOOption<A>) => IO<A> = /*#__PURE__*/ OT.getOrElse(I.Functor)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <A>(onNone: Lazy<IO<A>>) => (fa: IOOption<A>) => IO<A> = /*#__PURE__*/ OT.getOrElseE(I.Monad)

/**
 * Less strict version of [`getOrElseE`](#getOrElseE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseEW: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> = getOrElseE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = I.map(O.toUndefined)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = I.map(O.toNullable)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = /*#__PURE__*/ OT.fromNullable(I.Pointed)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> = /*#__PURE__*/ OT.fromNullableK(I.Pointed)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> = /*#__PURE__*/ OT.chainNullableK(I.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ OT.fromOptionK(I.Pointed)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <A, B>(
  f: (a: A) => Option<B>
) => (ma: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OT.chainOptionK(I.Monad)

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OT.map(I.Functor)

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ OT.ap(I.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IOOption<A> = some

/**
 * @category Monad
 * @since 3.0.0
 */
export const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OT.chain(
  I.Monad
)

/**
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A> = /*#__PURE__*/ chain(identity)

/**
 * @category Alt
 * @since 3.0.0
 */
export const alt: <A>(second: Lazy<IOOption<A>>) => (first: IOOption<A>) => IOOption<A> = /*#__PURE__*/ OT.alt(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<A | B> = alt as any

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: <A>() => IOOption<A> = /*#__PURE__*/ OT.zero(I.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: IOOption<never> = /*#__PURE__*/ zero()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: IOOption<O.Option<A>>) => IOOption<A> = /*#__PURE__*/ compact_(I.Functor, O.Compactable)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(
  fe: IOOption<Either<A, B>>
) => Separated<IOOption<A>, IOOption<B>> = /*#__PURE__*/ separate_(I.Functor, O.Compactable, O.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
} = /*#__PURE__*/ filter_(I.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> = /*#__PURE__*/ filterMap_(
  I.Functor,
  O.Filterable
)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
} = /*#__PURE__*/ partition_(I.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> = /*#__PURE__*/ partitionMap_(I.Functor, O.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface IOOptionF extends HKT {
  readonly type: IOOption<this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<IOOptionF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<IOOptionF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply_<IOOptionF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apFirst: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<A> = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecond: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<B> = /*#__PURE__*/ apSecond_(
  Apply
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<IOOptionF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<IOOptionF> = {
  map,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => IOOption<B>
) => (first: IOOption<A>) => IOOption<A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<IOOptionF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: Zero_<IOOptionF> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => IOOption<void> = /*#__PURE__*/ guard_(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative_<IOOptionF> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<IOOptionF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable_<IOOptionF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable_<IOOptionF> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<IOOptionF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => I.IO<B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<B> = /*#__PURE__*/ chainIOK_(
  FromIO,
  Chain
)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(
  f: (a: A) => I.IO<B>
) => (first: IOOption<A>) => IOOption<A> = /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither_<IOOptionF> = {
  fromEither
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ fromEitherK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(
  f: (a: A) => Either<E, B>
) => (ma: IOOption<A>) => IOOption<B> = /*#__PURE__*/ chainEitherK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(
  f: (a: A) => Either<E, B>
) => (ma: IOOption<A>) => IOOption<A> = /*#__PURE__*/ chainFirstEitherK_(FromEither, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: IOOption<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(fa: IOOption<A>) => IOOption<{ readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(
  Chain
)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(
  Apply
)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: IOOption<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) =>
  flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(O.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
