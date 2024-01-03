import { Either, Left, Right } from './Either'
import { dual } from './function'
import { IO } from './IO'
import { NonEmptyArray } from './NonEmptyArray'
import { None, Option, Some } from './Option'
import { Reader } from './Reader'
import { ReadonlyNonEmptyArray } from './ReadonlyNonEmptyArray'
import { Task } from './Task'

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

/** @internal */
export interface TypeLambda {
  readonly In: unknown
  readonly Out2: unknown
  readonly Out1: unknown
  readonly Target: unknown
}

/** @internal */
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

/** @internal */
export interface FromEither<F extends TypeLambda> extends TypeClass<F> {
  readonly fromEither: <R, O, E, A>(e: Either<E, A>) => Kind<F, R, O, E, A>
}

/** @internal */
export interface FromIO<F extends TypeLambda> extends TypeClass<F> {
  readonly fromIO: <R, O, E, A>(e: IO<A>) => Kind<F, R, O, E, A>
}

/** @internal */
export interface FromTask<F extends TypeLambda> extends TypeClass<F> {
  readonly fromTask: <R, O, E, A>(e: Task<A>) => Kind<F, R, O, E, A>
}

/** @internal */
export interface FromReader<F extends TypeLambda> extends TypeClass<F> {
  readonly fromReader: <R, O, E, A>(e: Reader<R, A>) => Kind<F, R, O, E, A>
}

/** @internal */
export const liftNullable =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => B | null | undefined, onNullable: (...a: A) => E) =>
  <R, O>(...a: A): Kind<F, R, O, E, NonNullable<B>> => {
    const o = f(...a)
    return F.fromEither<R, O, E, NonNullable<B>>(
      o == null ? left(onNullable(...a)) : right<NonNullable<B>, E>(o as any)
    )
  }

/** @internal */
export const liftOption =
  <F extends TypeLambda>(F: FromEither<F>) =>
  <A extends ReadonlyArray<unknown>, B, E>(f: (...a: A) => Option<B>, onNone: (...a: A) => E) =>
  <R, O>(...a: A): Kind<F, R, O, E, B> => {
    const o = f(...a)
    return F.fromEither(isNone(o) ? left(onNone(...a)) : right(o.value))
  }

/** @internal */
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
export const flatMapNullable = <F extends TypeLambda>(
  F: FromEither<F>,
  M: FlatMap<F>
): {
  <A, B, E2>(f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): <R, O, E1>(
    self: Kind<F, R, O, E1, A>
  ) => Kind<F, R, O, E1 | E2, NonNullable<B>>
  <R, O, E1, A, B, E2>(self: Kind<F, R, O, E1, A>, f: (a: A) => B | null | undefined, onNullable: (a: A) => E2): Kind<
    F,
    R,
    O,
    E1 | E2,
    NonNullable<B>
  >
} => {
  return /*#__PURE__*/ dual(
    3,
    <R, O, E1, A, B, E2>(
      self: Kind<F, R, O, E1, A>,
      f: (a: A) => B | null | undefined,
      onNullable: (a: A) => E2
    ): Kind<F, R, O, E1 | E2, NonNullable<B>> =>
      M.flatMap<R, O, E1, A, R, O, E2, NonNullable<B>>(self, liftNullable(F)(f, onNullable))
  )
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
} => {
  return /*#__PURE__*/ dual(
    3,
    <R, O, E1, A, B, E2>(
      self: Kind<F, R, O, E1, A>,
      f: (a: A) => Option<B>,
      onNone: (a: A) => E2
    ): Kind<F, R, O, E1 | E2, B> => M.flatMap<R, O, E1, A, R, O, E2, B>(self, liftOption(F)(f, onNone))
  )
}

/** @internal */
export const flatMapEither = <F extends TypeLambda>(
  F: FromEither<F>,
  M: FlatMap<F>
): {
  <A, E2, B>(f: (a: A) => Either<E2, B>): <R, O, E1>(self: Kind<F, R, O, E1, A>) => Kind<F, R, O, E1 | E2, B>
  <R, O, E1, A, E2, B>(self: Kind<F, R, O, E1, A>, f: (a: A) => Either<E2, B>): Kind<F, R, O, E1 | E2, B>
} => {
  return /*#__PURE__*/ dual(
    2,
    <R, O, E1, A, E2, B>(self: Kind<F, R, O, E1, A>, f: (a: A) => Either<E2, B>): Kind<F, R, O, E1 | E2, B> =>
      M.flatMap(self, (a) => F.fromEither(f(a)))
  )
}

/** @internal */
export const flatMapIO = <F extends TypeLambda>(
  F: FromIO<F>,
  M: FlatMap<F>
): {
  <A, B>(f: (a: A) => IO<B>): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => IO<B>): Kind<F, R, O, E, B>
} => {
  return /*#__PURE__*/ dual(
    2,
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => IO<B>): Kind<F, R, O, E, B> =>
      M.flatMap(self, (a) => F.fromIO(f(a)))
  )
}

/** @internal */
export const flatMapTask = <F extends TypeLambda>(
  F: FromTask<F>,
  M: FlatMap<F>
): {
  <A, B>(f: (a: A) => Task<B>): <R, O, E>(self: Kind<F, R, O, E, A>) => Kind<F, R, O, E, B>
  <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => Task<B>): Kind<F, R, O, E, B>
} => {
  return /*#__PURE__*/ dual(
    2,
    <R, O, E, A, B>(self: Kind<F, R, O, E, A>, f: (a: A) => Task<B>): Kind<F, R, O, E, B> =>
      M.flatMap(self, (a) => F.fromTask(f(a)))
  )
}

/** @internal */
export const flatMapReader = <F extends TypeLambda>(
  F: FromReader<F>,
  M: FlatMap<F>
): {
  <A, R2, B>(f: (a: A) => Reader<R2, B>): <R1, O, E>(self: Kind<F, R1, O, E, A>) => Kind<F, R1 & R2, O, E, B>
  <R1, O, E, A, R2, B>(self: Kind<F, R1, O, E, A>, f: (a: A) => Reader<R2, B>): Kind<F, R1 & R2, O, E, B>
} => {
  return /*#__PURE__*/ dual(
    2,
    <R1, O, E, A, R2, B>(self: Kind<F, R1, O, E, A>, f: (a: A) => Reader<R2, B>): Kind<F, R1 & R2, O, E, B> =>
      M.flatMap(self, (a) => F.fromReader(f(a)))
  )
}
