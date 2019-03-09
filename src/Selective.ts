/**
 * @file The `Selective` type class is an abstraction between applicative functors and monads.
 *
 * Ported from https://github.com/snowleopard/selective
 *
 * In addition to the `Applicative` laws, instances of the `Selective` type class must satisfy
 * a few laws to make it possible to refactor selective computations:
 *
 * 1. Identity: `x <*? pure id = either id id <$> x`
 * 2. Distributivity: `pure x <*? (y *> z) = (pure x <*? y) *> (pure x <*? z)`
 * 3. Associativity: `x <*? (y <*? z) = (f <$> x) <*? (g <$> y) <*? (h <$> z)`
 *
 * Note. For `Selective` instances that are also `Monad`s, `select` must be equal to the one derived on `chain`
 *
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { URIS, URIS2, URIS3, HKT, Type, Type2, Type3 } from './HKT'
import { Either, left, right } from './Either'
import { constant } from './function'

/**
 * @since 1.15.0
 */
export interface Selective<F> extends Applicative<F> {
  readonly select: <A, B>(fa: HKT<F, Either<A, B>>, f: HKT<F, (a: A) => B>) => HKT<F, B>
}

export interface Selective1<F extends URIS> extends Applicative1<F> {
  readonly select: <A, B>(fa: Type<F, Either<A, B>>, f: Type<F, (a: A) => B>) => Type<F, B>
}

export interface Selective2<M extends URIS2> extends Applicative2<M> {
  readonly select: <L, A, B>(fa: Type2<M, L, Either<A, B>>, f: Type2<M, L, (a: A) => B>) => Type2<M, L, B>
}

export interface Selective3<M extends URIS3> extends Applicative3<M> {
  readonly select: <U, L, A, B>(fa: Type3<M, U, L, Either<A, B>>, f: Type3<M, U, L, (a: A) => B>) => Type3<M, U, L, B>
}

export interface Selective2C<M extends URIS2, L> extends Applicative2C<M, L> {
  readonly select: <A, B>(fa: Type2<M, L, Either<A, B>>, f: Type2<M, L, (a: A) => B>) => Type2<M, L, B>
}

export interface Selective3C<M extends URIS3, U, L> extends Applicative3C<M, U, L> {
  readonly select: <U, A, B>(fa: Type3<M, U, L, Either<A, B>>, f: Type3<M, U, L, (a: A) => B>) => Type3<M, U, L, B>
}

// branch :: Selective f => f (Either a b) -> f (a -> c) -> f (b -> c) -> f c
export function branch<F extends URIS3>(
  S: Selective3<F>
): <U, L, A, B, C>(
  x: Type3<F, U, L, Either<A, B>>,
  l: Type3<F, U, L, (a: A) => C>,
  r: Type3<F, U, L, (b: B) => C>
) => Type3<F, U, L, A>
export function branch<F extends URIS2>(
  S: Selective2<F>
): <L, A, B, C>(
  x: Type2<F, L, Either<A, B>>,
  l: Type2<F, L, (a: A) => C>,
  r: Type2<F, L, (b: B) => C>
) => Type2<F, L, A>
export function branch<F extends URIS>(
  S: Selective1<F>
): <A, B, C>(x: Type<F, Either<A, B>>, l: Type<F, (a: A) => C>, r: Type<F, (b: B) => C>) => Type<F, C>
export function branch<F extends URIS>(
  S: Selective<F>
): <A, B, C>(x: HKT<F, Either<A, B>>, l: HKT<F, (a: A) => C>, r: HKT<F, (b: B) => C>) => HKT<F, C>
export function branch<F extends URIS>(S: Selective<F>) {
  return <A, B, C>(x: HKT<F, Either<A, B>>, l: HKT<F, (a: A) => C>, r: HKT<F, (b: B) => C>): HKT<F, C> => {
    // branch x l r = fmap (fmap Left) x <*? fmap (fmap Right) l <*? r
    throw new Error('unimplemented')
  }
}

// ifS :: Selective f => f Bool -> f a -> f a -> f a
export function ifS<F extends URIS3>(
  S: Selective3<F>
): <U, L, A>(x: Type3<F, U, L, boolean>, t: Type3<F, U, L, A>, e: Type3<F, U, L, A>) => Type3<F, U, L, A>
export function ifS<F extends URIS2>(
  S: Selective2<F>
): <L, A>(x: Type2<F, L, boolean>, t: Type2<F, L, A>, e: Type2<F, L, A>) => Type2<F, L, A>
export function ifS<F extends URIS>(
  S: Selective1<F>
): <A>(x: Type<F, boolean>, t: Type<F, A>, e: Type<F, A>) => Type<F, A>
export function ifS<F extends URIS>(S: Selective<F>): <A>(x: HKT<F, boolean>, t: HKT<F, A>, e: HKT<F, A>) => HKT<F, A>
export function ifS<F extends URIS>(S: Selective<F>) {
  const branchF = branch(S)
  return <A>(x: HKT<F, boolean>, t: HKT<F, A>, e: HKT<F, A>): HKT<F, A> => {
    // ifS x t e = branch (bool (Right ()) (Left ()) <$> x) (const <$> t) (const <$> e)
    return branchF(
      S.map(x, x => (x ? left<void, void>(undefined) : right<void, void>(undefined))),
      S.map(t, constant),
      S.map(e, constant)
    )
  }
}
