/**
 * `IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 *
 * @since 2.12.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable1, separate as separate_ } from './Compactable'
import { Either } from './Either'
import {
  filter as filter_,
  Filterable1,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from './Filterable'
import {
  FromEither1,
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_,
  fromEitherK as fromEitherK_
} from './FromEither'
import { chainFirstIOK as chainFirstIOK_, chainIOK as chainIOK_, FromIO1, fromIOK as fromIOK_ } from './FromIO'
import { flow, identity, Lazy, pipe, SK } from './function'
import { let as let__, bindTo as bindTo_, flap as flap_, Functor1 } from './Functor'
import * as _ from './internal'
import { Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import * as O from './Option'
import * as OT from './OptionT'
import { Pointed1 } from './Pointed'
import { Predicate } from './Predicate'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Refinement } from './Refinement'
import { Separated } from './Separated'
import * as I from './IO'
import { IOEither } from './IOEither'
import { Zero1, guard as guard_ } from './Zero'

import IO = I.IO
import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.12.0
 */
export interface IOOption<A> extends IO<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.12.0
 */
export const some: <A>(a: A) => IOOption<A> = /*#__PURE__*/ OT.some(I.Pointed)

/**
 * @category lifting
 * @since 2.12.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => IOOption<B>
  <A>(predicate: Predicate<A>): (a: A) => IOOption<A>
} = /*#__PURE__*/ OT.fromPredicate(I.Pointed)

// -------------------------------------------------------------------------------------
// conversions
// -------------------------------------------------------------------------------------

/**
 * @category conversions
 * @since 2.12.0
 */
export const fromOption: <A>(fa: Option<A>) => IOOption<A> = I.of

/**
 * @category conversions
 * @since 2.12.0
 */
export const fromEither: <A>(fa: Either<unknown, A>) => IOOption<A> = /*#__PURE__*/ OT.fromEither(I.Pointed)

/**
 * @category conversions
 * @since 2.12.0
 */
export const fromIO: <A>(fa: IO<A>) => IOOption<A> = /*#__PURE__*/ OT.fromF(I.Functor)

/**
 * @category conversions
 * @since 2.12.0
 */
export const fromIOEither: <A>(fa: IOEither<unknown, A>) => IOOption<A> = /*#__PURE__*/ I.map(O.fromEither)

/**
 * @category pattern matching
 * @since 2.12.0
 */
export const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: IOOption<A>) => IO<B> = /*#__PURE__*/ OT.match(
  I.Functor
)

/**
 * Less strict version of [`match`](#match).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.12.0
 */
export const matchW: <B, A, C>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> = match as any

/**
 * The `E` suffix (short for **E**ffect) means that the handlers return an effect (`IO`).
 *
 * @category pattern matching
 * @since 2.12.0
 */
export const matchE: <B, A>(onNone: () => IO<B>, onSome: (a: A) => IO<B>) => (ma: IOOption<A>) => IO<B> =
  /*#__PURE__*/ OT.matchE(I.Chain)

/**
 * Alias of [`matchE`](#matche).
 *
 * @category pattern matching
 * @since 2.12.0
 */
export const fold = matchE

/**
 * Less strict version of [`matchE`](#matche).
 *
 * The `W` suffix (short for **W**idening) means that the handler return types will be merged.
 *
 * @category pattern matching
 * @since 2.12.0
 */
export const matchEW: <B, C, A>(onNone: () => IO<B>, onSome: (a: A) => IO<C>) => (ma: IOOption<A>) => IO<B | C> =
  matchE as any

/**
 * @category error handling
 * @since 2.12.0
 */
export const getOrElse: <A>(onNone: Lazy<IO<A>>) => (fa: IOOption<A>) => IO<A> = /*#__PURE__*/ OT.getOrElse(I.Monad)

/**
 * Less strict version of [`getOrElse`](#getorelse).
 *
 * The `W` suffix (short for **W**idening) means that the handler return type will be merged.
 *
 * @category error handling
 * @since 2.12.0
 */
export const getOrElseW: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> = getOrElse as any

/**
 * @category conversions
 * @since 2.12.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = I.map(O.toUndefined)

/**
 * @category conversions
 * @since 2.12.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = I.map(O.toNullable)

/**
 * @category conversions
 * @since 2.12.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = /*#__PURE__*/ OT.fromNullable(I.Pointed)

/**
 * @category lifting
 * @since 2.12.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> = /*#__PURE__*/ OT.fromNullableK(I.Pointed)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> = /*#__PURE__*/ OT.chainNullableK(I.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category lifting
 * @since 2.12.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ OT.fromOptionK(I.Pointed)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ OT.chainOptionK(I.Monad)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category mapping
 * @since 2.12.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OT.map(I.Functor)

/**
 * @since 2.12.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ OT.ap(I.Apply)

/**
 * @category constructors
 * @since 2.12.0
 */
export const of: <A>(a: A) => IOOption<A> = some

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OT.chain(
  I.Monad
)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const flatten: <A>(mma: IOOption<IOOption<A>>) => IOOption<A> = /*#__PURE__*/ chain(identity)

/**
 * @category error handling
 * @since 2.12.0
 */
export const alt: <A>(second: Lazy<IOOption<A>>) => (first: IOOption<A>) => IOOption<A> = /*#__PURE__*/ OT.alt(I.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @category error handling
 * @since 2.12.0
 */
export const altW: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<A | B> = alt as any

/**
 * @since 2.12.0
 */
export const zero: <A>() => IOOption<A> = /*#__PURE__*/ OT.zero(I.Pointed)

/**
 * @category constructors
 * @since 2.12.0
 */
export const none: IOOption<never> = /*#__PURE__*/ zero()

/**
 * @category filtering
 * @since 2.12.0
 */
export const compact: Compactable1<URI>['compact'] = /*#__PURE__*/ compact_(I.Functor, O.Compactable)

/**
 * @category filtering
 * @since 2.12.0
 */
export const separate: Compactable1<URI>['separate'] = /*#__PURE__*/ separate_(I.Functor, O.Compactable, O.Functor)

/**
 * @category filtering
 * @since 2.12.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
} = /*#__PURE__*/ filter_(I.Functor, O.Filterable)

/**
 * @category filtering
 * @since 2.12.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> = /*#__PURE__*/ filterMap_(
  I.Functor,
  O.Filterable
)

/**
 * @category filtering
 * @since 2.12.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
} = /*#__PURE__*/ partition_(I.Functor, O.Filterable)

/**
 * @category filtering
 * @since 2.12.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> = /*#__PURE__*/ partitionMap_(I.Functor, O.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
/* istanbul ignore next */
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: Alt1<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _filter: Filterable1<URI>['filter'] = <A>(fa: IOOption<A>, predicate: Predicate<A>) => pipe(fa, filter(predicate))
/* istanbul ignore next */
const _filterMap: Filterable1<URI>['filterMap'] = (fa, f) => pipe(fa, filterMap(f))
/* istanbul ignore next */
const _partition: Filterable1<URI>['partition'] = <A>(fa: IOOption<A>, predicate: Predicate<A>) =>
  pipe(fa, partition(predicate))
/* istanbul ignore next */
const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))

/**
 * @category type lambdas
 * @since 2.12.0
 */
export const URI = 'IOOption'

/**
 * @category type lambdas
 * @since 2.12.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: IOOption<A>
  }
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Functor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * @category mapping
 * @since 2.12.0
 */
export const flap = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 2.12.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Apply: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * @since 2.12.0
 */
export const apFirst = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * @since 2.12.0
 */
export const apSecond = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 2.12.0
 */
export const Applicative: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Chain: Chain1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * @category sequencing
 * @since 2.12.0
 */
export const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 2.12.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Zero: Zero1<URI> = {
  URI,
  zero
}

/**
 * @category do notation
 * @since 2.12.0
 */
export const guard = /*#__PURE__*/ guard_(Zero, Pointed)

/**
 * @category instances
 * @since 2.12.0
 */
export const Alternative: Alternative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  alt: _alt,
  zero
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * @category instances
 * @since 2.12.0
 */
export const MonadIO: MonadIO1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  fromIO
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.12.0
 */
export const Filterable: Filterable1<URI> = {
  URI,
  map: _map,
  compact,
  separate,
  filter: _filter,
  filterMap: _filterMap,
  partition: _partition,
  partitionMap: _partitionMap
}

/**
 * @category instances
 * @since 2.12.0
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}

/**
 * @category lifting
 * @since 2.12.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => I.IO<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ fromIOK_(FromIO)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<B> = /*#__PURE__*/ chainIOK_(
  FromIO,
  Chain
)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => I.IO<B>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ chainFirstIOK_(FromIO, Chain)

/**
 * @category instances
 * @since 2.12.0
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither
}

/**
 * @category lifting
 * @since 2.12.0
 */
export const fromEitherK: <E, A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ fromEitherK_(FromEither)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ chainEitherK_(FromEither, Chain)

/**
 * @category sequencing
 * @since 2.12.0
 */
export const chainFirstEitherK: <E, A, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ chainFirstEitherK_(FromEither, Chain)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 2.12.0
 */
export const Do: IOOption<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @category do notation
 * @since 2.12.0
 */
export const bindTo = /*#__PURE__*/ bindTo_(Functor)

const let_ = /*#__PURE__*/ let__(Functor)

export {
  /**
   * @category do notation
   * @since 2.13.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 2.12.0
 */
export const bind = /*#__PURE__*/ bind_(Chain)

/**
 * @category do notation
 * @since 2.12.0
 */
export const apS = /*#__PURE__*/ apS_(Apply)

/**
 * @since 2.12.0
 */
export const ApT: IOOption<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.12.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) =>
  flow(I.traverseReadonlyNonEmptyArrayWithIndex(f), I.map(O.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @category traversing
 * @since 2.12.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
