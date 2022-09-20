/**
 * `IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 *
 * @since 3.0.0
 */
import type * as alt_ from './Alt'
import type * as alternative from './Alternative'
import type * as applicative from './Applicative'
import * as apply from './Apply'
import * as chain_ from './Chain'
import * as compactable from './Compactable'
import type { Either } from './Either'
import * as filterable from './Filterable'
import * as fromOption_ from './FromOption'
import * as fromEither_ from './FromEither'
import * as fromIO_ from './FromIO'
import type { Lazy } from './function'
import { flow, identity, SK } from './function'
import * as functor from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import * as io from './IO'
import type { IOEither } from './IOEither'
import type * as monad from './Monad'
import * as option from './Option'
import * as OptionTModule from './OptionT'
import type * as pointed from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Separated } from './Separated'
import * as zero_ from './Zero'
import type { IO } from './IO'
import type { Option } from './Option'

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
export const some: <A>(a: A) => IOOption<A> = /*#__PURE__*/ OptionTModule.some(io.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => IOOption<A> = io.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(e: Either<unknown, A>) => io.IO<option.Option<A>> = /*#__PURE__*/ OptionTModule.fromEither(
  io.Pointed
)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(ma: io.IO<A>) => IOOption<A> = /*#__PURE__*/ OptionTModule.fromF(io.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <A>(ma: IOEither<unknown, A>) => IOOption<A> = /*#__PURE__*/ io.map(option.fromEither)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> =
  /*#__PURE__*/ OptionTModule.match(io.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <B, A, C = B>(onNone: () => IO<B>, onSome: (a: A) => IO<C>) => (ma: IOOption<A>) => IO<B | C> =
  /*#__PURE__*/ OptionTModule.matchE(io.Chain)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: Lazy<B>) => <A>(ma: IOOption<A>) => IO<A | B> =
  /*#__PURE__*/ OptionTModule.getOrElse(io.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> =
  /*#__PURE__*/ OptionTModule.getOrElseE(io.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = io.map(option.toUndefined)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = io.map(option.toNullable)

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
export const map: <A, B>(f: (a: A) => B) => (fa: IOOption<A>) => IOOption<B> = /*#__PURE__*/ OptionTModule.map(
  io.Functor
)

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> =
  /*#__PURE__*/ OptionTModule.ap(io.Apply)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => IOOption<A> = some

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, B>(f: (a: A) => IOOption<B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ OptionTModule.chain(io.Monad)

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
export const alt: <B>(second: Lazy<IOOption<B>>) => <A>(first: IOOption<A>) => IOOption<A | B> =
  /*#__PURE__*/ OptionTModule.alt(io.Monad)

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: <A>() => IOOption<A> = /*#__PURE__*/ OptionTModule.zero(io.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: IOOption<never> = /*#__PURE__*/ zero()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: IOOption<option.Option<A>>) => IOOption<A> = /*#__PURE__*/ compactable.compact(
  io.Functor,
  option.Compactable
)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>> =
  /*#__PURE__*/ compactable.separate(io.Functor, option.Compactable, option.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ filterable.filterMap(io.Functor, option.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> = /*#__PURE__*/ filterable.partitionMap(
  io.Functor,
  option.Filterable
)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface IOOptionF extends HKT {
  readonly type: IOOption<this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<IOOptionF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: pointed.Pointed<IOOptionF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<IOOptionF> = {
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
export const apFirst: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ apply.apFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecond: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ apply.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<IOOptionF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: chain_.Chain<IOOptionF> = {
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
export const chainFirst: <A, B>(f: (a: A) => IOOption<B>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ chain_.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt_.Alt<IOOptionF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: zero_.Zero<IOOptionF> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => IOOption<void> = /*#__PURE__*/ zero_.guard(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: alternative.Alternative<IOOptionF> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: monad.Monad<IOOptionF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<IOOptionF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<IOOptionF> = {
  filterMap,
  partitionMap
}

/**
 * @since 3.0.0
 */
export const filter: <B extends A, A = B>(predicate: Predicate<A>) => (fb: IOOption<B>) => IOOption<B> =
  /*#__PURE__*/ filterable.filter(Filterable)

/**
 * @since 3.0.0
 */
export const refine: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: IOOption<C>) => IOOption<B> = /*#__PURE__*/ filterable.refine(Filterable)

/**
 * @since 3.0.0
 */
export const partition: <B extends A, A = B>(
  predicate: Predicate<A>
) => (fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>> = /*#__PURE__*/ filterable.partition(Filterable)

/**
 * @since 3.0.0
 */
export const refinement: <C extends A, B extends A, A = C>(
  refinement: Refinement<A, B>
) => (fc: IOOption<C>) => Separated<IOOption<C>, IOOption<B>> = /*#__PURE__*/ filterable.refinement(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: fromIO_.FromIO<IOOptionF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => io.IO<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ fromIO_.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => io.IO<B>) => (first: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ fromIO_.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => io.IO<B>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ fromIO_.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<IOOptionF> = {
  fromOption
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromPredicate(FromOption)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(refinement: Refinement<A, B>) => (c: C) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromRefinement(FromOption)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ fromOption_.fromOptionK(FromOption)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = /*#__PURE__*/ fromOption_.fromNullable(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.fromNullableK(FromOption)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> = /*#__PURE__*/ fromOption_.chainNullableK(FromOption, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: fromEither_.FromEither<IOOptionF> = {
  fromEither
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ fromEither_.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ fromEither_.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ fromEither_.chainFirstEitherK(FromEither, Chain)

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
export const bindTo: <N extends string>(name: N) => <A>(fa: IOOption<A>) => IOOption<{ readonly [K in N]: A }> =
  /*#__PURE__*/ functor.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ functor.let(Functor)

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ chain_.bind(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: IOOption<B>
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ apply.apS(Apply)

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
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) =>
  flow(io.traverseReadonlyNonEmptyArrayWithIndex(f), io.map(option.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverse(Apply)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArray = <A, B>(
  f: (a: A) => IOOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => IOOption<ReadonlyNonEmptyArray<B>>) => {
  return traverseReadonlyNonEmptyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#traverse(Applicative)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArray = <A, B>(
  f: (a: A) => IOOption<B>
): ((as: ReadonlyArray<A>) => IOOption<ReadonlyArray<B>>) => {
  return traverseReadonlyArrayWithIndex((_, a) => f(a))
}

/**
 * Equivalent to `ReadonlyArray#sequence(Applicative)`.
 *
 * @since 3.0.0
 */
export const sequenceReadonlyArray: <A>(arr: ReadonlyArray<IOOption<A>>) => IOOption<ReadonlyArray<A>> =
  /*#__PURE__*/ traverseReadonlyArray(identity)
