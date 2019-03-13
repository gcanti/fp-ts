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
import { constant, Lazy } from './function'
import { Setoid } from './Setoid'
import { array } from './Array'

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
    const xx: HKT<F, Either<A, Either<B, C>>> = S.map(x, x =>
      x.fold(a => left<A, Either<B, C>>(a), b => right<A, Either<B, C>>(left<B, C>(b)))
    )
    const ll: HKT<F, (a: A) => Either<B, C>> = S.map(l, l => (a: A) => right<B, C>(l(a)))
    return S.select(S.select(xx, ll), r)
  }
}

const leftUnit = left<void, void>(undefined)
const rightUnit = right<void, void>(undefined)

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
    return branchF(S.map(x, x => (x ? leftUnit : rightUnit)), S.map(t, constant), S.map(e, constant))
  }
}

function eliminateMatch<A>(Sa: Setoid<A>) {
  return (a: A) => <B>(b: Either<A, B>): Either<void, Either<A, B>> =>
    b.fold(
      y => (Sa.equals(a, y) ? left<void, Either<A, B>>(undefined) : right<void, Either<A, B>>(left(y))),
      y => right<void, Either<A, B>>(right<A, B>(y))
    )
}

// eliminate :: (Eq a, Selective f) => a -> f b -> f (Either a b) -> f (Either a b)
export function eliminate<F extends URIS3, A>(
  S: Selective3<F>,
  Sa: Setoid<A>
): <U, L, B>(x: A, fb: Type3<F, U, L, B>, fa: Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, Either<A, B>>
export function eliminate<F extends URIS2, A>(
  S: Selective2<F>,
  Sa: Setoid<A>
): <L, B>(x: A, fb: Type2<F, L, B>, fa: Type2<F, L, Either<A, B>>) => Type2<F, L, Either<A, B>>
export function eliminate<F extends URIS, A>(
  S: Selective1<F>,
  Sa: Setoid<A>
): <B>(x: A, fb: Type<F, B>, fa: Type<F, Either<A, B>>) => Type<F, Either<A, B>>
export function eliminate<F extends URIS, A>(
  S: Selective<F>,
  Sa: Setoid<A>
): <B>(x: A, fb: HKT<F, B>, fa: HKT<F, Either<A, B>>) => HKT<F, Either<A, B>>
export function eliminate<F extends URIS, A>(S: Selective<F>, Sa: Setoid<A>) {
  const match = eliminateMatch(Sa)
  return <B>(x: A, fb: HKT<F, B>, fa: HKT<F, Either<A, B>>): HKT<F, Either<A, B>> => {
    // eliminate x fb fa = select (match x <$> fa) (const . Right <$> fb)
    //   where
    //     match _ (Right y) = Right (Right y)
    //     match x (Left  y) = if x == y then Left () else Right (Left y)
    //
    return S.select(S.map(fa, match(x)), S.map(fb, b => constant(right<A, B>(b))))
  }
}

// whenS :: Selective f => f Bool -> f () -> f ()
export function when<F extends URIS3>(
  S: Selective3<F>
): <U, L>(x: Type3<F, U, L, boolean>, y: Type3<F, U, L, Lazy<void>>) => Type3<F, U, L, void>
export function when<F extends URIS2>(
  S: Selective2<F>
): <L>(x: Type2<F, L, boolean>, y: Type2<F, L, Lazy<void>>) => Type2<F, L, void>
export function when<F extends URIS>(S: Selective1<F>): (x: Type<F, boolean>, y: Type<F, Lazy<void>>) => Type<F, void>
export function when<F extends URIS>(S: Selective<F>): (x: HKT<F, boolean>, y: HKT<F, Lazy<void>>) => HKT<F, void>
export function when<F extends URIS>(S: Selective<F>) {
  return (x: HKT<F, boolean>, y: HKT<F, Lazy<void>>): HKT<F, void> => {
    // whenS x y = select (bool (Right ()) (Left ()) <$> x) (const <$> y)
    return S.select(S.map(x, x => (x ? leftUnit : rightUnit)), y)
  }
}

// (<||>) :: Selective f => f Bool -> f Bool -> f Bool
export function or<F extends URIS3>(
  S: Selective3<F>
): <U, L>(x: Type3<F, U, L, boolean>, y: Type3<F, U, L, boolean>) => Type3<F, U, L, boolean>
export function or<F extends URIS2>(
  S: Selective2<F>
): <L>(x: Type2<F, L, boolean>, y: Type2<F, L, boolean>) => Type2<F, L, boolean>
export function or<F extends URIS>(S: Selective1<F>): (x: Type<F, boolean>, y: Type<F, boolean>) => Type<F, boolean>
export function or<F extends URIS>(S: Selective<F>): (x: HKT<F, boolean>, y: HKT<F, boolean>) => HKT<F, boolean>
export function or<F extends URIS>(S: Selective<F>) {
  const orIf = ifS(S)
  return (x: HKT<F, boolean>, y: HKT<F, boolean>): HKT<F, boolean> => {
    // x <||> y = ifS x (pure True) y
    return orIf(x, S.of(true), y)
  }
}

// (<&&>) :: Selective f => f Bool -> f Bool -> f Bool
export function and<F extends URIS3>(
  S: Selective3<F>
): <U, L>(x: Type3<F, U, L, boolean>, y: Type3<F, U, L, boolean>) => Type3<F, U, L, boolean>
export function and<F extends URIS2>(
  S: Selective2<F>
): <L>(x: Type2<F, L, boolean>, y: Type2<F, L, boolean>) => Type2<F, L, boolean>
export function and<F extends URIS>(S: Selective1<F>): (x: Type<F, boolean>, y: Type<F, boolean>) => Type<F, boolean>
export function and<F extends URIS>(S: Selective<F>): (x: HKT<F, boolean>, y: HKT<F, boolean>) => HKT<F, boolean>
export function and<F extends URIS>(S: Selective<F>) {
  const ifS_ = ifS(S)
  return (x: HKT<F, boolean>, y: HKT<F, boolean>): HKT<F, boolean> => {
    // x <&&> y = ifS x y (pure False)
    return ifS_(x, y, S.of(false))
  }
}

// anyS :: Selective f => (a -> f Bool) -> [a] -> f Bool
export function any<F extends URIS3>(
  S: Selective3<F>
): <U, L, A>(as: Array<A>, p: (a: A) => Type3<F, U, L, boolean>) => Type3<F, U, L, boolean>
export function any<F extends URIS2>(
  S: Selective2<F>
): <L, A>(as: Array<A>, p: (a: A) => Type2<F, L, boolean>) => Type2<F, L, boolean>
export function any<F extends URIS>(
  S: Selective1<F>
): <A>(as: Array<A>, p: (a: A) => Type<F, boolean>) => Type<F, boolean>
export function any<F extends URIS>(S: Selective<F>): <A>(as: Array<A>, p: (a: A) => HKT<F, boolean>) => HKT<F, boolean>
export function any<F extends URIS>(S: Selective<F>) {
  const orS = or(S)
  return <A>(as: Array<A>, p: (a: A) => HKT<F, boolean>): HKT<F, boolean> => {
    // anyS p = foldr ((<||>) . p) (pure False)
    return array.foldr(as, S.of(false), (a, b) => orS(b, p(a)))
  }
}

// allS :: Selective f => (a -> f Bool) -> [a] -> f Bool
export function all<F extends URIS3>(
  S: Selective3<F>
): <U, L, A>(as: Array<A>, p: (a: A) => Type3<F, U, L, boolean>) => Type3<F, U, L, boolean>
export function all<F extends URIS2>(
  S: Selective2<F>
): <L, A>(as: Array<A>, p: (a: A) => Type2<F, L, boolean>) => Type2<F, L, boolean>
export function all<F extends URIS>(
  S: Selective1<F>
): <A>(as: Array<A>, p: (a: A) => Type<F, boolean>) => Type<F, boolean>
export function all<F extends URIS>(S: Selective<F>): <A>(as: Array<A>, p: (a: A) => HKT<F, boolean>) => HKT<F, boolean>
export function all<F extends URIS>(S: Selective<F>) {
  const andS = and(S)
  return <A>(as: Array<A>, p: (a: A) => HKT<F, boolean>): HKT<F, boolean> => {
    // allS p = foldr ((<&&>) . p) (pure True)
    return array.foldr(as, S.of(true), (a, b) => andS(b, p(a)))
  }
}
