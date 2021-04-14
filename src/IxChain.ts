/**
 * @since 2.10.0
 */
import { HKT2, HKT3, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import { IxApply, IxApply3, IxApply4 } from './IxApply'
import { Pointed, Pointed2, Pointed3, Pointed4 } from './Pointed'

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxChain4<F extends URIS4> extends IxApply4<F> {
  readonly ichain: <R1, R2, E, A, B>(
    f: (a: A) => Kind4<F, R1, R2, E, B>
  ) => <S>(fa: Kind4<F, S, R1, E, A>) => Kind4<F, S, R2, E, B>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxChain3<F extends URIS3> extends IxApply3<F> {
  readonly ichain: <E1, E2, A1, A2>(
    f: (a: A1) => Kind3<F, E1, E2, A2>
  ) => <R>(fa: Kind3<F, R, E1, A1>) => Kind3<F, R, E2, A2>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface IxChain<F> extends IxApply<F> {
  readonly ichain: <O, Z, A1, B>(f: (a: A1) => HKT3<F, O, Z, B>) => <I>(fa: HKT3<F, I, O, A1>) => HKT3<F, I, Z, B>
}

/**
 * @category Combinators
 * @since 2.10.0
 */
export function ichainFirst<F extends URIS4>(
  F: IxChain4<F>
): <R1, R2, E, A1, A2>(
  f: (a: A1) => Kind4<F, R1, R2, E, A2>
) => <S>(fa: Kind4<F, S, R1, E, A1>) => Kind4<F, S, R2, E, A1>
export function ichainFirst<F extends URIS3>(
  F: IxChain3<F>
): <E1, E2, A1, A2>(f: (a: A1) => Kind3<F, E1, E2, A2>) => <R>(fa: Kind3<F, R, E1, A1>) => Kind3<F, R, E2, A1>
export function ichainFirst<F>(
  F: IxChain<F>
): <E1, E2, A1, A2>(f: (a: A1) => HKT3<F, E1, E2, A2>) => <R>(fa: HKT3<F, R, E1, A1>) => HKT3<F, R, E2, A1>
export function ichainFirst<F>(
  F: IxChain<F>
): <O, Z, A, B>(f: (a: A) => HKT3<F, O, Z, B>) => <I>(fa: HKT3<F, I, O, A>) => HKT3<F, I, Z, A> {
  return (f) => F.ichain((a) => F.map(f(a), () => a))
}

/**
 * @category Combinators
 * @since 2.10.0
 */
export function iDo<F extends URIS4>(F: Pointed4<F>): <I, R, E>() => Kind4<F, I, R, E, {}>
export function iDo<F extends URIS3>(F: Pointed3<F>): <I, E>() => Kind3<F, I, E, {}>
export function iDo<F extends URIS2>(F: Pointed2<F>): <I>() => Kind2<F, I, {}>
export function iDo<F>(F: Pointed<F>): <I>() => HKT2<F, I, {}>
export function iDo<F>(F: Pointed<F>): <I>() => HKT2<F, I, {}> {
  return () => F.of({}) as any
}

/**
 * @category Combinators
 * @since 2.10.0
 */
export function ibind<F extends URIS4>(
  F: IxChain4<F>
): <N extends string, A, O, Z, E, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind4<F, O, Z, E, B>
) => <I>(ma: Kind4<F, I, O, E, A>) => Kind4<F, I, Z, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ibind<F extends URIS3>(
  F: IxChain3<F>
): <N extends string, A, O, Z, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => Kind3<F, O, Z, B>
) => <I>(ma: Kind3<F, I, O, A>) => Kind3<F, I, Z, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ibind<F>(
  F: IxChain<F>
): <N extends string, A, O, Z, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT3<F, O, Z, B>
) => <I>(ma: HKT3<F, I, O, A>) => HKT3<F, I, Z, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>
export function ibind<F>(
  F: IxChain<F>
): <N extends string, A, O, Z, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => HKT3<F, O, Z, B>
) => <I>(ma: HKT3<F, I, O, A>) => HKT3<F, I, Z, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }> {
  return (name, f) => F.ichain((a) => F.map(f(a), (b) => Object.assign({}, a, { [name]: b }) as any))
}
