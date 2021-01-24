/**
 * @since 2.10.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative1 } from './Applicative'
import { apFirst_, Apply1, apSecond_ } from './Apply'
import { Compactable1, compact_, separate_ } from './Compactable'
import { Filterable1, filterMap_, filter_, partitionMap_, partition_ } from './Filterable'
import { FromEither1 } from './FromEither'
import { FromIO1 } from './FromIO'
import { FromTask1 } from './FromTask'
import { flow, identity, Lazy, pipe, Predicate } from './function'
import { Functor1 } from './Functor'
import { chainFirst_, Monad1 } from './Monad'
import { MonadIO1 } from './MonadIO'
import { MonadTask1 } from './MonadTask'
import * as O from './Option'
import * as OT from './OptionT'
import { Pointed1 } from './Pointed'
import * as T from './Task'

import Task = T.Task
import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 2.10.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export const some: <A>(a: A) => TaskOption<A> =
  /*#__PURE__*/
  OT.some_(T.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const none: TaskOption<never> =
  /*#__PURE__*/
  OT.none_(T.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromOption: <A>(ma: Option<A>) => TaskOption<A> = T.of

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromNullable =
  /*#__PURE__*/
  OT.fromNullable_(T.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromPredicate =
  /*#__PURE__*/
  OT.fromPredicate_(T.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromEither =
  /*#__PURE__*/
  OT.fromEither_(T.Pointed)

/**
 * @category constructors
 * @since 2.10.0
 */
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> => () =>
  f().then(
    (a) => O.some(a),
    () => O.none
  )

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromIO: FromIO1<URI>['fromIO'] = (ma) => fromTask(T.fromIO(ma))

/**
 * @category constructors
 * @since 2.10.0
 */
export const fromTask: FromTask1<URI>['fromTask'] =
  /*#__PURE__*/
  OT.fromF_(T.Functor)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 2.10.0
 */
export const fold =
  /*#__PURE__*/
  OT.fold_(T.Monad)

/**
 * Less strict version of [`fold`](#fold).
 *
 * @category destructors
 * @since 2.10.0
 */
export const foldW: <B, C, A>(
  onNone: () => Task<B>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C> = fold as any

/**
 * @category destructors
 * @since 2.10.0
 */
export const getOrElse =
  /*#__PURE__*/
  OT.getOrElse_(T.Monad)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 2.10.0
 */
export const getOrElseW: <B>(onNone: Lazy<Task<B>>) => <A>(ma: Option<A>) => A | B = getOrElse as any

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 0.1.10
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => O.Option<B>
) => (...a: A) => TaskOption<B> = (f) => (...a) => fromOption(f(...a))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map =
  /*#__PURE__*/
  OT.map_(T.Functor)

/**
 * @category Apply
 * @since 2.10.0
 */
export const ap =
  /*#__PURE__*/
  OT.ap_(T.ApplyPar)

/**
 * @category Pointed
 * @since 2.10.0
 */
export const of: Pointed1<URI>['of'] = some

/**
 * @category Monad
 * @since 2.10.0
 */
export const chain =
  /*#__PURE__*/
  OT.chain_(T.Monad)

/**
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 2.10.0
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Alt
 * @since 2.10.0
 */
export const alt =
  /*#__PURE__*/
  OT.alt_(T.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 2.10.0
 */
export const altW: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<A | B> = alt as any

/**
 * @category Alternative
 * @since 2.10.0
 */
export const zero: Alternative1<URI>['zero'] = () => none

const C: Compactable1<O.URI> & Functor1<O.URI> = { ...O.Compactable, ...O.Functor }

/**
 * @category Compactable
 * @since 2.10.0
 */
export const compact: Compactable1<URI>['compact'] =
  /*#__PURE__*/
  compact_(T.Functor, C)

/**
 * @category Compactable
 * @since 2.10.0
 */
export const separate: Compactable1<URI>['separate'] =
  /*#__PURE__*/
  separate_(T.Functor, C)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const filter =
  /*#__PURE__*/
  filter_(T.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const filterMap =
  /*#__PURE__*/
  filterMap_(T.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const partition =
  /*#__PURE__*/
  partition_(T.Functor, O.Filterable)

/**
 * @category Filterable
 * @since 2.10.0
 */
export const partitionMap =
  /*#__PURE__*/
  partitionMap_(T.Functor, O.Filterable)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const _map: Functor1<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _ap: Apply1<URI>['ap'] = (fab, fa) => pipe(fab, ap(fa))
/* istanbul ignore next */
const _chain: Monad1<URI>['chain'] = (ma, f) => pipe(ma, chain(f))
/* istanbul ignore next */
const _alt: Alt1<URI>['alt'] = (fa, that) => pipe(fa, alt(that))
/* istanbul ignore next */
const _filter: Filterable1<URI>['filter'] = <A>(fa: TaskOption<A>, predicate: Predicate<A>) =>
  pipe(fa, filter(predicate))
/* istanbul ignore next */
const _filterMap: Filterable1<URI>['filterMap'] = (fa, f) => pipe(fa, filterMap(f))
/* istanbul ignore next */
const _partition: Filterable1<URI>['partition'] = <A>(fa: TaskOption<A>, predicate: Predicate<A>) =>
  pipe(fa, partition(predicate))
/* istanbul ignore next */
const _partitionMap: Filterable1<URI>['partitionMap'] = (fa, f) => pipe(fa, partitionMap(f))

/**
 * @category instances
 * @since 2.10.0
 */
const URI = 'TaskOption'

/**
 * @category instances
 * @since 2.10.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind<A> {
    readonly [URI]: TaskOption<A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Funtor: Functor1<URI> = {
  URI,
  map: _map
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Pointed: Pointed1<URI> = {
  URI,
  map: _map,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplyPar: Apply1<URI> = {
  URI,
  map: _map,
  ap: _ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 2.10.0
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
 * @since 2.10.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(ApplyPar)

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplicativePar: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of
}

const _apSeq: Apply1<URI>['ap'] = (fab, fa) =>
  pipe(
    fab,
    chain((f) => pipe(fa, map(f)))
  )

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplySeq: Apply1<URI> = {
  URI,
  map: _map,
  ap: _apSeq
}

/**
 * @category instances
 * @since 2.10.0
 */
export const ApplicativeSeq: Applicative1<URI> = {
  URI,
  map: _map,
  ap: _apSeq,
  of
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Monad: Monad1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Monad`.
 *
 * @category derivable combinators
 * @since 2.10.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Monad)

/**
 * @category instances
 * @since 2.10.0
 */
export const Alt: Alt1<URI> = {
  URI,
  map: _map,
  alt: _alt
}

/**
 * @category instances
 * @since 2.10.0
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
 * @since 2.10.0
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
 * @since 2.10.0
 */
export const MonadTask: MonadTask1<URI> = {
  URI,
  map: _map,
  ap: _ap,
  of,
  chain: _chain,
  fromIO,
  fromTask
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Compactable: Compactable1<URI> = {
  URI,
  compact,
  separate
}

/**
 * @category instances
 * @since 2.10.0
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
 * @since 2.10.0
 */
export const FromEither: FromEither1<URI> = {
  URI,
  fromEither
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromIO: FromIO1<URI> = {
  URI,
  fromIO
}

/**
 * @category instances
 * @since 2.10.0
 */
export const FromTask: FromTask1<URI> = {
  URI,
  fromIO,
  fromTask
}

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 2.10.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => flow(T.traverseArrayWithIndex(f), T.map(O.sequenceArray))

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativePar)`.
 *
 * @since 2.10.0
 */
export const traverseReadonlyArray: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>> = (f) => traverseReadonlyArrayWithIndex((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativePar)`.
 *
 * @since 2.10.0
 */
export const sequenceReadonlyArray: <A>(as: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArray(identity)

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(f: (index: number, a: A) => TaskOption<B>) => (
  as: ReadonlyArray<A>
): TaskOption<ReadonlyArray<B>> => async () => {
  // tslint:disable-next-line: readonly-array
  const out: Array<B> = []
  for (let i = 0; i < as.length; i++) {
    const o = await f(i, as[i])()
    if (O.isNone(o)) {
      return o
    }
    out.push(o.value)
  }
  return O.some(out)
}

/**
 * Equivalent to `ReadonlyArray#traverse(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const traverseReadonlyArraySeq: <A, B>(
  f: (a: A) => TaskOption<B>
) => (as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>> = (f) => traverseReadonlyArrayWithIndexSeq((_, a) => f(a))

/**
 * Equivalent to `ReadonlyArray#sequence(ApplicativeSeq)`.
 *
 * @since 2.10.0
 */
export const sequenceReadonlyArraySeq: <A>(as: ReadonlyArray<TaskOption<A>>) => TaskOption<ReadonlyArray<A>> =
  /*#__PURE__*/
  traverseReadonlyArraySeq(identity)
