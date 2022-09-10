/**
 * @since 3.0.0
 */
import type { Alt as Alt_ } from './Alt'
import type { Alternative as Alternative_ } from './Alternative'
import type { Applicative } from './Applicative'
import { apFirst as apFirst_, Apply, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { ap as apSeq_, bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import { compact as compact_, Compactable as Compactable_, separate as separate_ } from './Compactable'
import type { Either } from './Either'
import {
  filter as filter_,
  Filterable as Filterable_,
  filterMap as filterMap_,
  partition as partition_,
  partitionMap as partitionMap_
} from './Filterable'
import {
  FromEither as FromEither_,
  fromPredicate as fromPredicate_,
  fromEitherK as fromEitherK_,
  chainEitherK as chainEitherK_,
  chainFirstEitherK as chainFirstEitherK_
} from './FromEither'
import {
  chainFirstIOK as chainFirstIOK_,
  chainIOK as chainIOK_,
  FromIO as FromIO_,
  fromIOK as fromIOK_
} from './FromIO'
import {
  chainFirstTaskK as chainFirstTaskK_,
  chainTaskK as chainTaskK_,
  FromTask as FromTask_,
  fromTaskK as fromTaskK_
} from './FromTask'
import { flow, identity, Lazy, SK } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import { HKT } from './HKT'
import * as _ from './internal'
import type { Monad as Monad_ } from './Monad'
import { NaturalTransformation } from './NaturalTransformation'
import type { NonEmptyArray } from './NonEmptyArray'
import * as O from './Option'
import * as OT from './OptionT'
import type { Pointed as Pointed_ } from './Pointed'
import type { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import * as T from './Task'
import type { TaskEither, TaskEitherF } from './TaskEither'
import { guard as guard_, Zero as Zero_ } from './Zero'

import Task = T.Task
import Option = O.Option

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface TaskOption<A> extends Task<Option<A>> {}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const some: <A>(a: A) => TaskOption<A> =
  /*#__PURE__*/
  OT.some(T.Pointed)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: NaturalTransformation<O.OptionF, TaskOptionF> = T.of

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: FromEither_<TaskOptionF>['fromEither'] =
  /*#__PURE__*/
  OT.fromEither(T.Pointed)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromIO: FromIO_<TaskOptionF>['fromIO'] = (ma) => fromTask(T.fromIO(ma))

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTask: FromTask_<TaskOptionF>['fromTask'] =
  /*#__PURE__*/
  OT.fromF(T.Functor)

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromTaskEither: NaturalTransformation<TaskEitherF, TaskOptionF> =
  /*#__PURE__*/
  T.map(O.fromEither as any) as any // TODO

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A>(onNone: () => B, onSome: (a: A) => B) => (ma: TaskOption<A>) => Task<B> =
  /*#__PURE__*/
  OT.match(T.Functor)

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW: <B, A, C>(
  onNone: () => B,
  onSome: (a: A) => C
) => (ma: TaskOption<A>) => Task<B | C> = match as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const matchE: <B, A>(onNone: () => Task<B>, onSome: (a: A) => Task<B>) => (ma: TaskOption<A>) => Task<B> =
  /*#__PURE__*/
  OT.matchE(T.Monad)

/**
 * Less strict version of [`matchE`](#matchE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchEW: <B, A, C>(
  onNone: () => Task<B>,
  onSome: (a: A) => Task<C>
) => (ma: TaskOption<A>) => Task<B | C> = matchE as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElse: <A>(onNone: Lazy<A>) => (fa: TaskOption<A>) => Task<A> =
  /*#__PURE__*/
  OT.getOrElse(T.Functor)

/**
 * Less strict version of [`getOrElse`](#getOrElse).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseW: <B>(onNone: Lazy<B>) => <A>(ma: TaskOption<A>) => Task<A | B> = getOrElse as any

/**
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseE: <A>(onNone: Lazy<Task<A>>) => (fa: TaskOption<A>) => Task<A> =
  /*#__PURE__*/
  OT.getOrElseE(T.Monad)

/**
 * Less strict version of [`getOrElseE`](#getOrElseE).
 *
 * @category destructors
 * @since 3.0.0
 */
export const getOrElseEW: <B>(onNone: Lazy<Task<B>>) => <A>(ma: TaskOption<A>) => Task<A | B> = getOrElseE as any

// -------------------------------------------------------------------------------------
// interop
// -------------------------------------------------------------------------------------

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => TaskOption<NonNullable<A>> =
  /*#__PURE__*/
  OT.fromNullable(T.Pointed)

/**
 * Transforms a `Promise` that may reject to a `Promise` that never rejects and returns an `Option` instead.
 *
 * Note: `f` should never `throw` errors, they are not caught.
 *
 * See also [`tryCatchK`](#tryCatchK).
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatch = <A>(f: Lazy<Promise<A>>): TaskOption<A> => async () => {
  try {
    return await f().then(_.some)
  } catch (reason) {
    return _.none
  }
}

/**
 * Converts a function returning a `Promise` to one returning a `TaskOption`.
 *
 * @category interop
 * @since 3.0.0
 */
export const tryCatchK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Promise<B>
): ((...a: A) => TaskOption<B>) => (...a) => tryCatch(() => f(...a))

/**
 * @category interop
 * @since 3.0.0
 */
export const fromNullableK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => TaskOption<NonNullable<B>> =
  /*#__PURE__*/
  OT.fromNullableK(T.Pointed)

/**
 * @category interop
 * @since 3.0.0
 */
export const chainNullableK: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: TaskOption<A>) => TaskOption<NonNullable<B>> =
  /*#__PURE__*/
  OT.chainNullableK(T.Monad)

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => TaskOption<B> =
  /*#__PURE__*/
  OT.fromOptionK(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainOptionK: <A, B>(f: (a: A) => Option<B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/
  OT.chainOptionK(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTaskEitherK = <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => TaskEither<unknown, B>
): ((...a: A) => TaskOption<B>) => flow(f, fromTaskEither) as any // TODO

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
export const map: Functor_<TaskOptionF>['map'] =
  /*#__PURE__*/
  OT.map(T.Functor)

/**
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply<TaskOptionF>['ap'] =
  /*#__PURE__*/
  OT.ap(T.ApplyPar)

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: Pointed_<TaskOptionF>['of'] = some

/**
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain_<TaskOptionF>['chain'] =
  /*#__PURE__*/
  OT.chain(T.Monad)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainTaskEitherK: <A, B>(f: (a: A) => TaskEither<unknown, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/
  flow(fromTaskEitherK, chain)

/**
 * Derivable from `Chain`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: TaskOption<TaskOption<A>>) => TaskOption<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt_<TaskOptionF>['alt'] =
  /*#__PURE__*/
  OT.alt(T.Monad)

/**
 * Less strict version of [`alt`](#alt).
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW: <B>(second: Lazy<TaskOption<B>>) => <A>(first: TaskOption<A>) => TaskOption<A | B> = alt as any

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: Zero_<TaskOptionF>['zero'] =
  /*#__PURE__*/
  OT.zero(T.Pointed)

/**
 * @category constructors
 * @since 3.0.0
 */
export const none: TaskOption<never> =
  /*#__PURE__*/
  zero()

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: Compactable_<TaskOptionF>['compact'] =
  /*#__PURE__*/
  compact_(T.Functor, O.Compactable) as any // TODO

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable_<TaskOptionF>['separate'] =
  /*#__PURE__*/
  separate_(T.Functor, O.Compactable, O.Functor)

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: Filterable_<TaskOptionF>['filter'] =
  /*#__PURE__*/
  filter_(T.Functor, O.Filterable) as any // TODO

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: Filterable_<TaskOptionF>['filterMap'] =
  /*#__PURE__*/
  filterMap_(T.Functor, O.Filterable) as any // TODO

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partition: Filterable_<TaskOptionF>['partition'] =
  /*#__PURE__*/
  partition_(T.Functor, O.Filterable) as any // TODO

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: Filterable_<TaskOptionF>['partitionMap'] =
  /*#__PURE__*/
  partitionMap_(T.Functor, O.Filterable) as any // TODO

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface TaskOptionF extends HKT {
  readonly type: TaskOption<this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<TaskOptionF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<TaskOptionF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplyPar: Apply<TaskOptionF> = {
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
export const ApplicativePar: Applicative<TaskOptionF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<TaskOptionF> = {
  map,
  chain
}

const apSeq =
  /*#__PURE__*/
  apSeq_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplySeq: Apply<TaskOptionF> = {
  map,
  ap: apSeq
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ApplicativeSeq: Applicative<TaskOptionF> = {
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
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<TaskOptionF> = {
  map,
  of,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<TaskOptionF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: Zero_<TaskOptionF> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  /*#__PURE__*/
  guard_(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative_<TaskOptionF> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIO: FromIO_<TaskOptionF> = {
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
export const FromEither: FromEither_<TaskOptionF> = {
  fromEither
}

/**
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
export const fromEitherK =
  /*#__PURE__*/
  fromEitherK_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainEitherK: <A, E, B>(f: (a: A) => Either<E, B>) => (ma: TaskOption<A>) => TaskOption<B> =
  /*#__PURE__*/
  chainEitherK_(FromEither, Chain)

/**
 * @category combinators
 * @since 3.0.0
 */
export const chainFirstEitherK =
  /*#__PURE__*/
  chainFirstEitherK_(FromEither, Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromTask: FromTask_<TaskOptionF> = {
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
export const Compactable: Compactable_<TaskOptionF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable_<TaskOptionF> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: TaskOption<{}> =
  /*#__PURE__*/
  of(_.emptyRecord)

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

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(ApplyPar)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: TaskOption<readonly []> =
  /*#__PURE__*/
  of(_.emptyReadonlyArray)

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

// -------------------------------------------------------------------------------------
// array utils
// -------------------------------------------------------------------------------------

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyNonEmptyArray<A>) => TaskOption<ReadonlyNonEmptyArray<B>>) =>
  flow(T.traverseReadonlyNonEmptyArrayWithIndex(f), T.map(O.traverseReadonlyNonEmptyArrayWithIndex(SK)))

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativePar)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndex = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndex(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}

/**
 * Equivalent to `ReadonlyNonEmptyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyNonEmptyArrayWithIndexSeq = <A, B>(f: (index: number, a: A) => TaskOption<B>) => (
  as: ReadonlyNonEmptyArray<A>
): TaskOption<ReadonlyNonEmptyArray<B>> => () =>
  _.tail(as).reduce<Promise<Option<NonEmptyArray<B>>>>(
    (acc, a, i) =>
      acc.then((obs) =>
        _.isNone(obs)
          ? acc
          : f(i + 1, a)().then((ob) => {
              if (_.isNone(ob)) {
                return ob
              }
              obs.value.push(ob.value)
              return obs
            })
      ),
    f(0, _.head(as))().then(O.map(_.singleton))
  )

/**
 * Equivalent to `ReadonlyArray#traverseWithIndex(ApplicativeSeq)`.
 *
 * @since 3.0.0
 */
export const traverseReadonlyArrayWithIndexSeq = <A, B>(
  f: (index: number, a: A) => TaskOption<B>
): ((as: ReadonlyArray<A>) => TaskOption<ReadonlyArray<B>>) => {
  const g = traverseReadonlyNonEmptyArrayWithIndexSeq(f)
  return (as) => (_.isNonEmpty(as) ? g(as) : ApT)
}
