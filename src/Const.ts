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
import type { BooleanAlgebra } from './BooleanAlgebra'
import type { Bounded } from './Bounded'
import type * as contravariant from './Contravariant'
import type { Eq } from './Eq'
import * as eq from './Eq'
import { unsafeCoerce } from './function'
import * as functor from './Functor'
import type { HeytingAlgebra } from './HeytingAlgebra'
import type { TypeLambda } from './HKT'
import type { Monoid } from './Monoid'
import type { Ord } from './Ord'
import * as ord from './Ord'
import type { Ring } from './Ring'
import type { Semigroup } from './Semigroup'
import type { Semiring } from './Semiring'
import type { Show } from './Show'

// TODO Semigroupoid Const
// TODO Invariant (Const a)
// TODO (Semigroup a) => Bind (Const a)
// TODO Foldable (Const a)
// TODO Traversable (Const a)

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const make: <S>(s: S) => Const<S, never> = (s) =>
  unsafeCoerce({
    value: s
  })

/**
 * @since 3.0.0
 */
export const execute = <S, A>(self: Const<S, A>): S => self.value

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const contramap: <B, A>(f: (b: B) => A) => <S>(fa: Const<S, A>) => Const<S, B> = () => unsafeCoerce

/**
 * @since 3.0.0
 */
export const mapLeft: <S, G>(f: (s: S) => G) => <A>(self: Const<S, A>) => Const<G, A> = (f) => (self) =>
  make(f(self.value))

/**
 * @since 3.0.0
 */
export const mapBoth: <S, T, A, B>(f: (s: S) => T, g: (a: A) => B) => (self: Const<S, A>) => Const<T, B> =
  unsafeCoerce(mapLeft)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const getEq: <S>(E: Eq<S>) => Eq<Const<S, never>> = eq.contramap((c) => c.value)

/**
 * @category instances
 * @since 3.0.0
 */
export const getOrd: <S>(O: Ord<S>) => Ord<Const<S, never>> = ord.contramap((c) => c.value)

/**
 * @category instances
 * @since 3.0.0
 */
export const getBounded: <S>(B: Bounded<S>) => Bounded<Const<S, never>> = (B) => ({
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
export const getMonoid: <S>(M: Monoid<S>) => Monoid<Const<S, never>> = (M) => ({
  combine: getSemigroup(M).combine,
  empty: make(M.empty)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getSemiring: <S>(S: Semiring<S>) => Semiring<Const<S, never>> = (S) => ({
  add: (that) => (self) => make(S.add(that.value)(self.value)),
  mul: (that) => (self) => make(S.mul(that.value)(self.value)),
  one: make(S.one),
  zero: make(S.zero)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getRing: <S>(R: Ring<S>) => Ring<Const<S, never>> = (R) => {
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
export const getHeytingAlgebra: <S>(H: HeytingAlgebra<S>) => HeytingAlgebra<Const<S, never>> = (H) => {
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
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <S>(self: Const<S, A>) => Const<S, B> = () => unsafeCoerce

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ConstTypeLambda> = {
  map
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <S, B>(self: Const<S, (a: A) => B>) => Const<S, B> = /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Contravariant: contravariant.Contravariant<ConstTypeLambdaContravariant> = {
  contramap
}

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
export const getApply = <S>(S: Semigroup<S>): Apply<ConstTypeLambdaFix<S>> => ({
  map,
  ap: (fa) => (self) => make(S.combine(fa.value)(self.value))
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getApplicative = <S>(M: Monoid<S>): Applicative<ConstTypeLambdaFix<S>> => {
  const A = getApply(M)
  const empty = make(M.empty)
  return {
    map: A.map,
    ap: A.ap,
    of: () => empty
  }
}
