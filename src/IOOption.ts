/**
 * `IOOption<A>` represents a synchronous computation that either yields a value of type `A` or nothing.
 *
 * If you want to represent a synchronous computation that never fails, please see `IO`.
 * If you want to represent a synchronous computation that may fail, please see `IOEither`.
 *
 * @since 3.0.0
 */
import * as AltModule from './Alt'
import * as AlternativeModule from './Alternative'
import * as ApplicativeModule from './Applicative'
import * as ApplyModule from './Apply'
import * as ChainModule from './Chain'
import * as CompactableModule from './Compactable'
import type { Either } from './Either'
import * as FilterableModule from './Filterable'
import * as FromOptionModule from './FromOption'
import * as FromEitherModule from './FromEither'
import * as FromIOModule from './FromIO'
import { flow, identity, Lazy, SK } from './function'
import * as FunctorModule from './Functor'
import type { HKT } from './HKT'
import * as _ from './internal'
import * as IOModule from './IO'
import type { IOEither } from './IOEither'
import * as MonadModule from './Monad'
import * as OptionModule from './Option'
import * as OptionTModule from './OptionT'
import * as PointedModule from './Pointed'
import type { Predicate } from './Predicate'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Separated } from './Separated'
import * as ZeroModule from './Zero'

import IO = IOModule.IO
import Option = OptionModule.Option

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
export const some: <A>(a: A) => IOOption<A> = /*#__PURE__*/ OptionTModule.some(IOModule.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => IOOption<A> = IOModule.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(e: Either<unknown, A>) => IOModule.IO<OptionModule.Option<A>> =
  /*#__PURE__*/ OptionTModule.fromEither(IOModule.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: <A>(ma: IOModule.IO<A>) => IOOption<A> = /*#__PURE__*/ OptionTModule.fromF(IOModule.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIOEither: <A>(ma: IOEither<unknown, A>) => IOOption<A> = /*#__PURE__*/ IOModule.map(
  OptionModule.fromEither
)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A, C = B>(onNone: () => B, onSome: (a: A) => C) => (ma: IOOption<A>) => IO<B | C> =
  /*#__PURE__*/ OptionTModule.match(IOModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <B, A, C = B>(onNone: () => IO<B>, onSome: (a: A) => IO<C>) => (ma: IOOption<A>) => IO<B | C> =
  /*#__PURE__*/ OptionTModule.matchE(IOModule.Chain)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <B>(onNone: Lazy<B>) => <A>(ma: IOOption<A>) => IO<A | B> =
  /*#__PURE__*/ OptionTModule.getOrElse(IOModule.Functor)

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <B>(onNone: Lazy<IO<B>>) => <A>(ma: IOOption<A>) => IO<A | B> =
  /*#__PURE__*/ OptionTModule.getOrElseE(IOModule.Monad)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toUndefined: <A>(ma: IOOption<A>) => IO<A | undefined> = IOModule.map(OptionModule.toUndefined)

/**
 * @category destructors
 * @since 3.0.0
 */
export const toNullable: <A>(ma: IOOption<A>) => IO<A | null> = IOModule.map(OptionModule.toNullable)

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => IOOption<NonNullable<A>> = /*#__PURE__*/ OptionTModule.fromNullable(
  IOModule.Pointed
)

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => IOOption<NonNullable<B>> = /*#__PURE__*/ OptionTModule.fromNullableK(IOModule.Pointed)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: IOOption<A>) => IOOption<NonNullable<B>> = /*#__PURE__*/ OptionTModule.chainNullableK(IOModule.Monad)

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
  IOModule.Functor
)

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: IOOption<A>) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> =
  /*#__PURE__*/ OptionTModule.ap(IOModule.Apply)

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
  /*#__PURE__*/ OptionTModule.chain(IOModule.Monad)

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
  /*#__PURE__*/ OptionTModule.alt(IOModule.Monad)

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: <A>() => IOOption<A> = /*#__PURE__*/ OptionTModule.zero(IOModule.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: IOOption<never> = /*#__PURE__*/ zero()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: IOOption<OptionModule.Option<A>>) => IOOption<A> =
  /*#__PURE__*/ CompactableModule.compact(IOModule.Functor, OptionModule.Compactable)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: IOOption<Either<A, B>>) => Separated<IOOption<A>, IOOption<B>> =
  /*#__PURE__*/ CompactableModule.separate(IOModule.Functor, OptionModule.Compactable, OptionModule.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => IOOption<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => IOOption<B>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => IOOption<A>
} = /*#__PURE__*/ FilterableModule.filter(IOModule.Functor, OptionModule.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fga: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ FilterableModule.filterMap(IOModule.Functor, OptionModule.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (fb: IOOption<A>) => Separated<IOOption<A>, IOOption<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: IOOption<B>) => Separated<IOOption<B>, IOOption<B>>
  <A>(predicate: Predicate<A>): (fa: IOOption<A>) => Separated<IOOption<A>, IOOption<A>>
} = /*#__PURE__*/ FilterableModule.partition(IOModule.Functor, OptionModule.Filterable)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: IOOption<A>) => Separated<IOOption<B>, IOOption<C>> = /*#__PURE__*/ FilterableModule.partitionMap(
  IOModule.Functor,
  OptionModule.Filterable
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
export const Functor: FunctorModule.Functor<IOOptionF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: IOOption<(a: A) => B>) => IOOption<B> =
  /*#__PURE__*/ FunctorModule.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: PointedModule.Pointed<IOOptionF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: ApplyModule.Apply<IOOptionF> = {
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
  /*#__PURE__*/ ApplyModule.apFirst(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const apSecond: <B>(second: IOOption<B>) => <A>(first: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ ApplyModule.apSecond(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: ApplicativeModule.Applicative<IOOptionF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: ChainModule.Chain<IOOptionF> = {
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
  /*#__PURE__*/ ChainModule.chainFirst(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: AltModule.Alt<IOOptionF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: ZeroModule.Zero<IOOptionF> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => IOOption<void> = /*#__PURE__*/ ZeroModule.guard(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: AlternativeModule.Alternative<IOOptionF> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: MonadModule.Monad<IOOptionF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: CompactableModule.Compactable<IOOptionF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: FilterableModule.Filterable<IOOptionF> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIOModule.FromIO<IOOptionF> = {
  fromIO
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => IOModule.IO<B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ FromIOModule.fromIOK(FromIO)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainIOK: <A, B>(f: (a: A) => IOModule.IO<B>) => (first: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ FromIOModule.chainIOK(FromIO, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstIOK: <A, B>(f: (a: A) => IOModule.IO<B>) => (first: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ FromIOModule.chainFirstIOK(FromIO, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: FromOptionModule.FromOption<IOOptionF> = {
  fromOption
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: <B extends A, A = B>(predicate: Predicate<A>) => (b: B) => IOOption<B> =
  /*#__PURE__*/ FromOptionModule.fromPredicate(FromOption)

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromRefinement: <C extends A, B extends A, A = C>(refinement: Refinement<A, B>) => (c: C) => IOOption<B> =
  /*#__PURE__*/ FromOptionModule.fromRefinement(FromOption)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (...a: A) => IOOption<B> =
  /*#__PURE__*/ FromOptionModule.fromOptionK(FromOption)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEitherModule.FromEither<IOOptionF> = {
  fromEither
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => IOOption<B> = /*#__PURE__*/ FromEitherModule.fromEitherK(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<B> =
  /*#__PURE__*/ FromEitherModule.chainEitherK(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: IOOption<A>) => IOOption<A> =
  /*#__PURE__*/ FromEitherModule.chainFirstEitherK(FromEither, Chain)

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
  /*#__PURE__*/ FunctorModule.bindTo(Functor)

const let_: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (fa: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ FunctorModule.let(Functor)

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
  f: <A2 extends A>(a: A | A2) => IOOption<B>
) => (ma: IOOption<A>) => IOOption<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  /*#__PURE__*/ ChainModule.bind(Chain)

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
  /*#__PURE__*/ ApplyModule.apS(Apply)

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
  flow(
    IOModule.traverseReadonlyNonEmptyArrayWithIndex(f),
    IOModule.map(OptionModule.traverseReadonlyNonEmptyArrayWithIndex(SK))
  )

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
