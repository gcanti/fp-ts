/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { Apply } from './Apply'
import type * as bifunctor from './Bifunctor'
import type { Bounded } from './Bounded'
import type * as contravariant from './Contravariant'
import type { Eq } from './Eq'
import * as eq from './Eq'
import { constant, unsafeCoerce } from './Function'
import * as functor from './Functor'
import type { TypeLambda } from './HKT'
import type { Monoid } from './Monoid'
import type { Ord } from './Ord'
import * as ord from './Ord'
import type { FromIdentity } from './FromIdentity'
import type { Semigroup } from './Semigroup'
import type { Show } from './Show'

// TODO Semigroupoid Const
// TODO Invariant (Const a)
// TODO (Semigroup a) => Bind (Const a)
// TODO Foldable (Const a)
// TODO Traversable (Const a)

/**
 * @since 3.0.0
 */
export declare const phantom: unique symbol

/**
 * @category model
 * @since 3.0.0
 */
export interface Const</** in out */ S, /** out */ A> {
  readonly [phantom]: A
  readonly value: S
}

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambda extends TypeLambda {
  readonly type: Const<this['InOut1'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaBifunctor extends TypeLambda {
  readonly type: Const<this['Out2'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaContravariant extends TypeLambda {
  readonly type: Const<this['InOut1'], this['In1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ConstTypeLambdaFix<S> extends TypeLambda {
  readonly type: Const<S, this['Out1']>
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const make = <S>(s: S): Const<S, never> =>
  unsafeCoerce({
    value: s
  })

/**
 * @since 3.0.0
 */
export const execute = <S, A>(self: Const<S, A>): S => self.value

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <S>(E: Eq<S>) => Eq<Const<S, never>> = /*#__PURE__*/ eq.contramap(execute)

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <S>(O: Ord<S>) => Ord<Const<S, never>> = /*#__PURE__*/ ord.contramap(execute)

/**
 * @category instances
 * @since 3.0.0
 */
export const getBounded = <S>(B: Bounded<S>): Bounded<Const<S, never>> => ({
  compare: getOrd(B).compare,
  top: make(B.top),
  bottom: make(B.bottom)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <S>(S: Show<S>): Show<Const<S, never>> => ({
  show: (c) => `make(${S.show(c.value)})`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <S>(S: Semigroup<S>): Semigroup<Const<S, never>> => ({
  combine: (that) => (self) => make(S.combine(that.value)(self.value))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <S>(M: Monoid<S>): Monoid<Const<S, never>> => ({
  combine: getSemigroup(M).combine,
  empty: make(M.empty)
})

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B> = /*#__PURE__*/ constant(unsafeCoerce)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ConstTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category mapping
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B> =
  /*#__PURE__*/ constant(unsafeCoerce)

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ConstTypeLambdaContravariant> = {
  contramap
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const mapLeft =
  <S, G>(f: (s: S) => G) =>
  <A>(self: Const<S, A>): Const<G, A> =>
    make(f(self.value))

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <S, T, A, B>(f: (s: S) => T, g: (a: A) => B) => (self: Const<S, A>) => Const<T, B> =
  /*#__PURE__*/ unsafeCoerce(mapLeft)

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<ConstTypeLambdaBifunctor> = {
  mapBoth
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApply = <S>(Semigroup: Semigroup<S>): Apply<ConstTypeLambdaFix<S>> => ({
  map,
  ap: (fa) => (self) => make(Semigroup.combine(fa.value)(self.value))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getFromIdentity = <S>(Monoid: Monoid<S>): FromIdentity<ConstTypeLambdaFix<S>> => {
  return {
    of: constant(make(Monoid.empty))
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <S>(Monoid: Monoid<S>): Applicative<ConstTypeLambdaFix<S>> => {
  const Apply = getApply(Monoid)
  const FromIdentity = getFromIdentity(Monoid)
  return {
    map: Apply.map,
    ap: Apply.ap,
    of: FromIdentity.of
  }
}
