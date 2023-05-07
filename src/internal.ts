/**
 * @since 2.10.0
 */
import { Either, Left, Right } from './Either'
import { dual } from './function'
import { NonEmptyArray } from './NonEmptyArray'
import { None, Option, Some } from './Option'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'

// -------------------------------------------------------------------------------------
// Option
// -------------------------------------------------------------------------------------

/** @internal */
export const isNone = (fa: Option<unknown>): fa is None => fa._tag === 'None'

/** @internal */
export const isSome = <A>(fa: Option<A>): fa is Some<A> => fa._tag === 'Some'

/** @internal */
export const none: Option<never> = { _tag: 'None' }

/** @internal */
export const some = <A>(a: A): Option<A> => ({ _tag: 'Some', value: a })

// -------------------------------------------------------------------------------------
// Either
// -------------------------------------------------------------------------------------

/** @internal */
export const isLeft = <E>(ma: Either<E, unknown>): ma is Left<E> => ma._tag === 'Left'

/** @internal */
export const isRight = <A>(ma: Either<unknown, A>): ma is Right<A> => ma._tag === 'Right'

/** @internal */
export const left = <E, A = never>(e: E): Either<E, A> => ({ _tag: 'Left', left: e })

/** @internal */
export const right = <A, E = never>(a: A): Either<E, A> => ({ _tag: 'Right', right: a })

// -------------------------------------------------------------------------------------
// ReadonlyNonEmptyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const singleton = <A>(a: A): NonEmptyArray<A> => [a]

/** @internal */
export const isNonEmpty = <A>(as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A> => as.length > 0

/** @internal */
export const head = <A>(as: ReadonlyNonEmptyArray<A>): A => as[0]

/** @internal */
export const tail = <A>(as: ReadonlyNonEmptyArray<A>): ReadonlyArray<A> => as.slice(1)

// -------------------------------------------------------------------------------------
// empty
// -------------------------------------------------------------------------------------

/** @internal */
export const emptyReadonlyArray: readonly [] = []

/** @internal */
export const emptyRecord: {} = {}

// -------------------------------------------------------------------------------------
// Record
// -------------------------------------------------------------------------------------

/** @internal */
export const has = Object.prototype.hasOwnProperty

// -------------------------------------------------------------------------------------
// NonEmptyArray
// -------------------------------------------------------------------------------------

/** @internal */
export const fromReadonlyNonEmptyArray = <A>(as: ReadonlyNonEmptyArray<A>): NonEmptyArray<A> => [as[0], ...as.slice(1)]

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/** @internal */
export declare const URI: unique symbol

/**
 * @internal
 * @since 2.15.0
 */
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

/**
 * @internal
 * @since 2.15.0
 */
export interface TypeClass<F extends TypeLambda> {
  readonly [URI]?: F
}

/** @internal */
export type Kind<F extends TypeLambda, In, Out2, Out1, Target> = F extends {
  readonly type: unknown
}
  ? (F & {
      readonly In: In
      readonly Out2: Out2
      readonly Out1: Out1
      readonly Target: Target
    })['type']
  : {
      readonly F: F
      readonly In: (_: In) => void
      readonly Out2: () => Out2
      readonly Out1: () => Out1
      readonly Target: (_: Target) => Target
    }

// -------------------------------------------------------------------------------------
// type classes
// -------------------------------------------------------------------------------------

/**
 * @internal
 * @since 2.15.0
 */
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <R, O, E, A>(e: Either<E, A>) => Kind<F, R, O, E, A>
}

/** @internal */
export const liftOption =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => Option<B>, onNone: (...a: A) => E) =>
  <R, O>(...a: A): Kind<F, R, O, E, B> => {
    const o = f(...a)
    return F.fromEither(isNone(o) ? left(onNone(...a)) : right(o.value))
  }

/**
 * @internal
 * @since 2.15.0
 */
export interface FlatMap<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMap: {
    <A, R2, O2, E2, B>(f: (a: A) => Kind<F, R2, O2, E2, B>): <R1, O1, E1>(
      self: Kind<F, R1, O1, E1, A>
    ) => Kind<F, R1 & R2, O1 | O2, E1 | E2, B>
    <R1, O1, E1, A, R2, O2, E2, B>(self: Kind<F, R1, O1, E1, A>, f: (a: A) => Kind<F, R2, O2, E2, B>): Kind<
      F,
      R1 & R2,
      O1 | O2,
      E1 | E2,
      B
    >
  }
}

/** @internal */
export const flatMapOption = <F extends TypeLambda>(
  F: FromEither<F>,
  M: FlatMap<F>
): {
  <A, B, E2>(f: (a: A) => Option<B>, onNone: (a: A) => E2): <R, O, E1>(
    self: Kind<F, R, O, E1, A>
  ) => Kind<F, R, O, E1 | E2, B>
  <R, O, E1, A, B, E2>(self: Kind<F, R, O, E1, A>, f: (a: A) => Option<B>, onNone: (a: A) => E2): Kind<
    F,
    R,
    O,
    E1 | E2,
    B
  >
} =>
  /*#__PURE__*/ dual(
    3,
    <R, O, E1, A, B, E2>(
      self: Kind<F, R, O, E1, A>,
      f: (a: A) => Option<B>,
      onNone: (a: A) => E2
    ): Kind<F, R, O, E1 | E2, B> => M.flatMap<R, O, E1, A, R, O, E2, B>(self, liftOption(F)(f, onNone))
  )
