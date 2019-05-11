/**
 * @file The `Apply` class provides the `ap` which is used to apply a function to an argument under a type constructor.
 *
 * `Apply` can be used to lift functions of two or more arguments to work on values wrapped with the type constructor
 * `f`.
 *
 * Instances must satisfy the following law in addition to the `Functor` laws:
 *
 * 1. Associative composition: `F.ap(F.ap(F.map(fbc, bc => ab => a => bc(ab(a))), fab), fa) = F.ap(fbc, F.ap(fab, fa))`
 *
 * Formally, `Apply` represents a strong lax semi-monoidal endofunctor.
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4 } from './Functor'
import { HKT, Type, Type2, Type3, Type4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Apply<F> extends Functor<F> {
  readonly ap: <A, B>(fab: HKT<F, (a: A) => B>, fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface Apply1<F extends URIS> extends Functor1<F> {
  readonly ap: <A, B>(fab: Type<F, (a: A) => B>, fa: Type<F, A>) => Type<F, B>
}

/**
 * @since 2.0.0
 */
export interface Apply2<F extends URIS2> extends Functor2<F> {
  readonly ap: <L, A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Apply3<F extends URIS3> extends Functor3<F> {
  readonly ap: <U, L, A, B>(fab: Type3<F, U, L, (a: A) => B>, fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
}

/**
 * @since 2.0.0
 */
export interface Apply2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly ap: <A, B>(fab: Type2<F, L, (a: A) => B>, fa: Type2<F, L, A>) => Type2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Apply4<F extends URIS4> extends Functor4<F> {
  readonly ap: <X, U, L, A, B>(fab: Type4<F, X, U, L, (a: A) => B>, fa: Type4<F, X, U, L, A>) => Type4<F, X, U, L, B>
}

/**
 * Tuple sequencing, i.e., take a tuple of monadic actions and does them from left-to-right, returning the resulting tuple.
 *
 * @example
 * import { sequenceT } from 'fp-ts/lib/Apply'
 * import { option, some, none } from 'fp-ts/lib/Option'
 *
 * const sequenceTOption = sequenceT(option)
 * assert.deepStrictEqual(sequenceTOption(some(1)), some([1]))
 * assert.deepStrictEqual(sequenceTOption(some(1), some('2')), some([1, '2']))
 * assert.deepStrictEqual(sequenceTOption(some(1), some('2'), none), none)
 *
 * @since 2.0.0
 */
export function sequenceT<F extends URIS3>(
  F: Apply3<F>
): <U, L, T extends Array<Type3<F, U, L, any>>>(
  ...t: T & { 0: Type3<F, U, L, any> }
) => Type3<F, U, L, { [K in keyof T]: [T[K]] extends [Type3<F, U, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS2>(
  F: Apply2<F>
): <L, T extends Array<Type2<F, L, any>>>(
  ...t: T & { 0: Type2<F, L, any> }
) => Type2<F, L, { [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never }>
export function sequenceT<F extends URIS2, L>(
  F: Apply2C<F, L>
): <T extends Array<Type2<F, L, any>>>(
  ...t: T & { 0: Type2<F, L, any> }
) => Type2<F, L, { [K in keyof T]: [T[K]] extends [Type2<F, L, infer A>] ? A : never }>

export function sequenceT<F extends URIS>(
  F: Apply1<F>
): <T extends Array<Type<F, any>>>(
  ...t: T & { 0: Type<F, any> }
) => Type<F, { [K in keyof T]: [T[K]] extends [Type<F, infer A>] ? A : never }>
export function sequenceT<F>(
  F: Apply<F>
): <T extends Array<HKT<F, any>>>(
  ...t: T & { 0: HKT<F, any> }
) => HKT<F, { [K in keyof T]: [T[K]] extends [HKT<F, infer A>] ? A : never }>
export function sequenceT<F>(F: Apply<F>): (...args: Array<HKT<F, any>>) => HKT<F, any> {
  return (...args: Array<HKT<F, any>>) => {
    const fst = args[0]
    const others = args.slice(1)
    let fas: HKT<F, Array<any>> = F.map(fst, a => [a])
    for (const fa of others) {
      fas = F.ap(
        F.map(fas, as => (a: any) => {
          as.push(a)
          return as
        }),
        fa
      )
    }
    return fas
  }
}

type EnforceNonEmptyRecord<R> = keyof R extends never ? never : R

/**
 * Like `Apply.sequenceT` but works with structs instead of tuples.
 *
 * @example
 * import { either, right, left } from 'fp-ts/lib/Either'
 * import { sequenceS } from 'fp-ts/lib/Apply'
 *
 * const ado = sequenceS(either)
 *
 * assert.deepStrictEqual(
 *   ado({
 *     a: right(1),
 *     b: right(true)
 *   }),
 *   right({ a: 1, b: true })
 * )
 * assert.deepStrictEqual(
 *   ado({
 *     a: right(1),
 *     b: left('error')
 *   }),
 *   left('error')
 * )
 *
 * @since 2.0.0
 */
export function sequenceS<F extends URIS3>(
  F: Apply3<F>
): <U, L, R extends Record<string, Type3<F, U, L, any>>>(
  r: EnforceNonEmptyRecord<R> & Record<string, Type3<F, U, L, any>>
) => Type3<F, U, L, { [K in keyof R]: [R[K]] extends [Type3<F, any, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2>(
  F: Apply2<F>
): <L, R extends Record<string, Type2<F, L, any>>>(
  r: EnforceNonEmptyRecord<R> & Record<string, Type2<F, L, any>>
) => Type2<F, L, { [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS2, L>(
  F: Apply2C<F, L>
): <R extends Record<string, Type2<F, L, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type2<F, L, { [K in keyof R]: [R[K]] extends [Type2<F, any, infer A>] ? A : never }>
export function sequenceS<F extends URIS>(
  F: Apply1<F>
): <R extends Record<string, Type<F, any>>>(
  r: EnforceNonEmptyRecord<R>
) => Type<F, { [K in keyof R]: [R[K]] extends [Type<F, infer A>] ? A : never }>
export function sequenceS<F>(
  F: Apply<F>
): <R extends Record<string, HKT<F, any>>>(
  r: EnforceNonEmptyRecord<R>
) => HKT<F, { [K in keyof R]: [R[K]] extends [HKT<F, infer A>] ? A : never }>
export function sequenceS<F>(F: Apply<F>): (r: Record<string, HKT<F, any>>) => HKT<F, Record<string, any>> {
  return r => {
    const keys = Object.keys(r)
    const fst = keys[0]
    const others = keys.slice(1)
    let fr: HKT<F, Record<string, any>> = F.map(r[fst], a => ({ [fst]: a }))
    for (const key of others) {
      fr = F.ap(
        F.map(fr, r => (a: any) => {
          r[key] = a
          return r
        }),
        r[key]
      )
    }
    return fr
  }
}
