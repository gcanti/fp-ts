/**
 * @since 3.0.0
 */
import type { Apply } from './Apply'
import * as apply from './Apply'
import * as bifunctor from './Bifunctor'
import type { Flattenable } from './Flattenable'
import type { FromSync } from './FromSync'
import type { FromAsync } from './FromAsync'
import { pipe } from './Function'
import type { Functor } from './Functor'
import * as functor from './Functor'
import type { Kind, TypeLambda } from './HKT'
import type { Sync } from './Sync'
import type { Monoid } from './Monoid'
import type { FromIdentity } from './FromIdentity'
import type { Semigroup } from './Semigroup'
import type { Async } from './Async'
import type { Writer } from './Writer'
import * as writer from './Writer'

/**
 * @since 3.0.0
 */
export interface WriterT<F extends TypeLambda, W> extends TypeLambda {
  readonly type: Kind<F, this['InOut1'], this['In1'], this['Out3'], this['Out2'], Writer<W, this['Out1']>>
}

/**
 * @since 3.0.0
 */
export const fromKind =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <W>(w: W): (<S, R, O, E, A>(fa: Kind<F, S, R, O, E, A>) => Kind<WriterT<F, W>, S, R, O, E, A>) =>
    Functor.map((a) => [w, a])

/**
 * @since 3.0.0
 */
export const fromSync =
  <F extends TypeLambda>(Functor: Functor<F>, FromSync: FromSync<F>) =>
  <W>(w: W) =>
  <A, S>(fa: Sync<A>): Kind<WriterT<F, W>, S, unknown, never, never, A> =>
    pipe(
      FromSync.fromSync<A, S>(fa),
      Functor.map((a) => [w, a])
    )

/**
 * @since 3.0.0
 */
export const fromAsync =
  <F extends TypeLambda>(Functor: Functor<F>, FromAsync: FromAsync<F>) =>
  <W>(w: W) =>
  <A, S>(fa: Async<A>): Kind<WriterT<F, W>, S, unknown, never, never, A> =>
    pipe(
      FromAsync.fromAsync<A, S>(fa),
      Functor.map((a) => [w, a])
    )

/**
 * @since 3.0.0
 */
export const tell =
  <F extends TypeLambda>(FromIdentity: FromIdentity<F>) =>
  <W, S>(w: W): Kind<WriterT<F, W>, S, unknown, never, never, void> =>
    FromIdentity.succeed(writer.tell(w))

/**
 * @since 3.0.0
 */
export const map = <F extends TypeLambda>(Functor: Functor<F>) => {
  const map_ = functor.mapComposition(Functor, writer.Functor)
  return <A, B>(
    f: (a: A) => B
  ): (<S, R, O, E, W>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, W>, S, R, O, E, B>) => map_(f)
}

/**
 * @since 3.0.0
 */
export const succeed =
  <F extends TypeLambda, W>(FromIdentity: FromIdentity<F>, Monoid: Monoid<W>) =>
  <A, S>(a: A): Kind<WriterT<F, W>, S, unknown, never, never, A> =>
    FromIdentity.succeed([Monoid.empty, a])

/**
 * @since 3.0.0
 */
export const ap = <F extends TypeLambda, W>(
  Apply: Apply<F>,
  Semigroup: Semigroup<W>
): (<S, R2, O2, E2, A>(
  fa: Kind<WriterT<F, W>, S, R2, O2, E2, A>
) => <R1, O1, E1, B>(
  self: Kind<WriterT<F, W>, S, R1, O1, E1, (a: A) => B>
) => Kind<WriterT<F, W>, S, R1 & R2, O1 | O2, E1 | E2, B>) => apply.apComposition(Apply, writer.getApply(Semigroup))

/**
 * @since 3.0.0
 */
export const flatMap =
  <F extends TypeLambda, W>(Flattenable: Flattenable<F>, Semigroup: Semigroup<W>) =>
  <A, S, R1, FO1, E1, B>(
    f: (a: A) => Kind<WriterT<F, W>, S, R1, FO1, E1, B>
  ): (<R2, FO2, E2>(
    self: Kind<WriterT<F, W>, S, R2, FO2, E2, A>
  ) => Kind<WriterT<F, W>, S, R1 & R2, FO1 | FO2, E1 | E2, B>) =>
    Flattenable.flatMap(([w1, a]) =>
      pipe(
        f(a),
        Flattenable.map(([w2, b]) => [Semigroup.combine(w2)(w1), b])
      )
    )

/**
 * @since 3.0.0
 */
export const mapBoth = <F extends TypeLambda>(
  Functor: Functor<F>
): (<W, X, A, B>(
  f: (w: W) => X,
  g: (a: A) => B
) => <S, R, O, E>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, X>, S, R, O, E, B>) =>
  bifunctor.mapBothComposition(Functor, writer.Bifunctor)

/**
 * @since 3.0.0
 */
export const mapLeft =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <W, X>(
    f: (w: W) => X
  ): (<S, R, O, E, A>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, X>, S, R, O, E, A>) => {
    return Functor.map(writer.mapLeft(f))
  }

// TODO: combineKind, emptyKind, fromResult, fromReader, fromState, reduce, foldMap, reduceRight, traverse, contramap

/**
 * @since 3.0.0
 */
export const fst = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, W>(self: Kind<WriterT<F, W>, S, R, O, E, unknown>) => Kind<F, S, R, O, E, W>) =>
  Functor.map(writer.fst)

/**
 * @since 3.0.0
 */
export const snd = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, A>(self: Kind<WriterT<F, unknown>, S, R, O, E, A>) => Kind<F, S, R, O, E, A>) =>
  Functor.map(writer.snd)

/**
 * @since 3.0.0
 */
export const swap = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, W, A>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, A>, S, R, O, E, W>) =>
  Functor.map(writer.swap)

/**
 * Modifies the result to include the changes to the accumulator
 *
 * @since 3.0.0
 */
export const listen = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, W, A>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, W>, S, R, O, E, readonly [W, A]>) =>
  Functor.map(writer.listen)

/**
 * Applies the returned function to the accumulator
 *
 * @since 3.0.0
 */
export const pass = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, W, A>(
  self: Kind<WriterT<F, W>, S, R, O, E, readonly [A, (w: W) => W]>
) => Kind<F, S, R, O, E, Writer<W, A>>) => Functor.map(writer.pass)

/**
 * Projects a value from modifications made to the accumulator during an action
 *
 * @since 3.0.0
 */
export const listens =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <W, B>(
    f: (w: W) => B
  ): (<S, R, O, E, A>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, W>, S, R, O, E, readonly [A, B]>) =>
    Functor.map(writer.listens(f))

/**
 * Modify the final accumulator value by applying a function
 *
 * @since 3.0.0
 */
export const censor =
  <F extends TypeLambda>(Functor: Functor<F>) =>
  <W>(
    f: (w: W) => W
  ): (<S, R, O, E, A>(self: Kind<WriterT<F, W>, S, R, O, E, A>) => Kind<WriterT<F, W>, S, R, O, E, A>) =>
    Functor.map(writer.censor(f))
