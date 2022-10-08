/**
 * The `Const` type constructor, which wraps its first type argument and ignores its second.
 * That is, `Const<E, A>` is isomorphic to `E` for any `A`.
 *
 * `Const` has some useful instances. For example, the `Applicative` instance allows us to collect results using a `Monoid`
 * while ignoring return values.
 *
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type { Apply } from '@fp-ts/core/Apply'
import type * as bifunctor from '@fp-ts/core/Bifunctor'
import type { BooleanAlgebra } from '@fp-ts/core/BooleanAlgebra'
import type { Bounded } from '@fp-ts/core/Bounded'
import type * as contravariant from '@fp-ts/core/Contravariant'
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import type { FromIdentity } from '@fp-ts/core/FromIdentity'
import { constant, unsafeCoerce } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type { HeytingAlgebra } from '@fp-ts/core/HeytingAlgebra'
import type { TypeLambda } from '@fp-ts/core/HKT'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { Ord } from '@fp-ts/core/Ord'
import * as ord from '@fp-ts/core/Ord'
import type { Ring } from '@fp-ts/core/Ring'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Semiring } from '@fp-ts/core/Semiring'
import type { Show } from '@fp-ts/core/Show'

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
export const getEq: <S>(E: Eq<S>) => Eq<Const<S, never>> = eq.contramap(execute)

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <S>(O: Ord<S>) => Ord<Const<S, never>> = ord.contramap(execute)

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
 * @category instances
 * @since 3.0.0
 */
export const getSemiring = <S>(S: Semiring<S>): Semiring<Const<S, never>> => ({
  add: (that) => (self) => make(S.add(that.value)(self.value)),
  mul: (that) => (self) => make(S.mul(that.value)(self.value)),
  one: make(S.one),
  zero: make(S.zero)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing = <S>(R: Ring<S>): Ring<Const<S, never>> => {
  const S = getSemiring(R)
  return {
    add: S.add,
    mul: S.mul,
    one: S.one,
    zero: S.zero,
    sub: (that) => (self) => make(R.sub(that.value)(self.value))
  }
}

// TODO Field

/**
 * @category instances
 * @since 3.0.0
 */
export const getHeytingAlgebra = <S>(H: HeytingAlgebra<S>): HeytingAlgebra<Const<S, never>> => {
  return {
    implies: (that) => (self) => make(H.implies(that.value)(self.value)),
    not: (c) => make(H.not(c.value)),
    join: (that) => (self) => make(H.join(that.value)(self.value)),
    meet: (that) => (self) => make(H.meet(that.value)(self.value)),
    one: make(H.one),
    zero: make(H.zero)
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getBooleanAlgebra: <S>(H: BooleanAlgebra<S>) => BooleanAlgebra<Const<S, never>> = getHeytingAlgebra

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B> = constant(unsafeCoerce)

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
export const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B> = functor.flap(Functor)

/**
 * @category mapping
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B> = constant(
  unsafeCoerce
)

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
export const mapLeft = <S, G>(f: (s: S) => G) => <A>(self: Const<S, A>): Const<G, A> => make(f(self.value))

/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @category mapping
 * @since 3.0.0
 */
export const mapBoth: <S, T, A, B>(f: (s: S) => T, g: (a: A) => B) => (self: Const<S, A>) => Const<T, B> = unsafeCoerce(
  mapLeft
)

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
