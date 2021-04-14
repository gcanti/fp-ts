/**
 * @since 3.0.0
 */
import { constant } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import type { Semigroup } from './Semigroup'
import { Functor as IDFunctor, apS } from './Identity'
import * as _ from './internal'

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (x: infer R) => any ? R : never

type EnsureLiteral<K extends string> = string extends K ? never : [K] extends [UnionToIntersection<K>] ? K : never

type TestLiteral<K> = string extends K ? unknown : [K] extends [UnionToIntersection<K>] ? K : unknown

type EnsureLiteralTuple<A extends Array<unknown>> = unknown extends {
  [Key in keyof A]: A[Key] extends string ? TestLiteral<A[Key]> : unknown
}[number]
  ? never
  : A

type EnsureStringKey<A> = keyof A extends string ? keyof A : never

type EnsurePropertyNotExist<T, K extends string> = keyof T extends never ? T : K extends keyof T ? never : T

// -------------------------------------------------------------------------------------
// primitives
// -------------------------------------------------------------------------------------

/**
 * Pick a set of keys from a `Record`. The value-level equivalent of the `Pick`
 * type.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { pick } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1, c: true },
 *     pick('a', 'b')
 *   ),
 *   { a: 'a', b: 1 }
 * )
 *
 * @since 3.0.0
 */
export const pick = <Obj1, Keys extends keyof Obj1 extends never ? Array<string> : Array<keyof Obj1>>(
  ...ks: keyof Obj1 extends never ? EnsureLiteralTuple<Keys> : Keys
) => <Obj2 extends { readonly [key in Keys[number]]: unknown }>(
  x: keyof Obj1 extends never ? Obj2 : Obj1
): keyof Obj1 extends never
  ? { readonly [K in Keys[number]]: Obj2[K] }
  : { readonly [K in Extract<Keys[number], keyof Obj1>]: Obj1[K] } => {
  const o: any = {}
  /* eslint-disable */
  for (const k of ks as Array<string & keyof Obj1>) {
    o[k] = x[k]
  }
  /* eslint-enable */
  return o
}

/**
 * Omit a set of keys from a `Record`. The value-level equivalent of the `Omit`
 * type.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { omit } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1, c: true },
 *     omit('b', 'c')
 *   ),
 *   { a: 'a' }
 * )
 *
 * @since 3.0.0
 */
export const omit = <Obj1, Keys extends keyof Obj1 extends never ? Array<string> : Array<keyof Obj1>>(
  ...ks: keyof Obj1 extends never ? EnsureLiteralTuple<Keys> : Keys
) => <Obj2 extends { readonly [key in Keys[number]]: unknown }>(
  x: keyof Obj1 extends never ? Obj2 : Obj1
): keyof Obj1 extends never
  ? { readonly [K in Exclude<keyof Obj2, Keys[number]>]: Obj2[K] }
  : { readonly [K in Exclude<keyof Obj1, Keys[number]>]: Obj1[K] } => {
  const o: any = {}
  for (const k of Object.keys(x) as Array<string & keyof Obj1>) {
    if (!ks.includes(k)) {
      o[k] = x[k]
    }
  }
  return o
}

/**
 * Insert an element at the specified key.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { insertAt } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1 },
 *     insertAt('c', true)
 *   ),
 *   { a: 'a', b: 1, c: true }
 * )
 *
 * @since 3.0.0
 */
export const insertAt: <Key extends string, Obj1, Val>(
  prop: Exclude<EnsureLiteral<Key>, keyof Obj1>,
  value: Val
) => <Obj2 extends { readonly [k in string as k extends Key ? never : k]: unknown }>(
  obj: keyof Obj1 extends never ? EnsurePropertyNotExist<Obj2, Key> : Obj1
) => keyof Obj1 extends never
  ? {
      readonly [K in keyof Obj2 | Key]: K extends keyof Obj2 ? Obj2[K] : Val
    }
  : {
      readonly [K in keyof Obj1 | Key]: K extends keyof Obj1 ? Obj1[K] : Val
    } = apS as any

/**
 * Rename a struct's key.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { renameAt } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1, z: true },
 *     renameAt('z', 'c')
 *   ),
 *   { a: 'a', b: 1, c: true }
 * )
 *
 * @since 3.0.0
 */

export const renameAt = <
  Obj1,
  OldKey extends keyof Obj1 extends never ? string : EnsureStringKey<Obj1>,
  NewKey extends string
>(
  from: keyof Obj1 extends never ? EnsureLiteral<OldKey> : OldKey,
  to: Exclude<EnsureLiteral<NewKey>, keyof Obj1>
) => <Obj2 extends { readonly [k in OldKey]: unknown }>(
  obj: keyof Obj1 extends never ? EnsurePropertyNotExist<Obj2, NewKey> : Obj1
): OldKey extends keyof Obj1
  ? {
      readonly [K in Exclude<keyof Obj1, OldKey> | NewKey]: K extends keyof Obj1 ? Obj1[K] : Obj1[OldKey]
    }
  : {
      readonly [K in Exclude<keyof Obj2, OldKey> | NewKey]: K extends keyof Obj2 ? Obj2[K] : Obj2[OldKey]
    } => ({ [to]: (obj as any)[from], ...omit(from as never)(obj) } as any)

/**
 * Map an element at a specified key inside an `F` context. The new element's type may be different from its original.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { mapAtE } from 'fp-ts/struct'
 * import { Functor, fromPredicate, some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1, c: true },
 *     mapAtE(Functor)('c', (c) => fromPredicate(() => c)('true'))
 *   ),
 *   some({ a: 'a', b: 1, c: 'true' })
 * )
 *
 * @since 3.0.0
 */
export function mapAtE<F extends URIS4>(
  F: Functor4<F>
): {
  <S, R, E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind4<F, S, R, E, B>): (
    a: A
  ) => Kind4<F, S, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export function mapAtE<F extends URIS3>(
  F: Functor3<F>
): {
  <R, E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind3<F, R, E, B>): (
    a: A
  ) => Kind3<F, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export function mapAtE<F extends URIS3, E>(
  F: Functor3C<F, E>
): {
  <R, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind3<F, R, E, B>): (
    a: A
  ) => Kind3<F, R, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export function mapAtE<F extends URIS2>(
  F: Functor2<F>
): {
  <E, A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind2<F, E, B>): (
    a: A
  ) => Kind2<F, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export function mapAtE<F extends URIS2, E>(
  F: Functor2C<F, E>
): {
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind2<F, E, B>): (
    a: Kind2<F, E, A>
  ) => Kind2<F, E, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}
export function mapAtE<F extends URIS>(
  F: Functor1<F>
): {
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => Kind<F, B>): (
    a: A
  ) => Kind<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
  <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>): (
    a: A
  ) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }>
}

export function mapAtE<F>(
  F: Functor<F>
): <A, P extends keyof A, B>(
  prop: P,
  f: (ap: A[P]) => HKT<F, B>
) => (a: A) => HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }> {
  return <A, P extends keyof A, B>(prop: P, f: (ap: A[P]) => HKT<F, B>) => (
    obj: A
  ): HKT<F, { readonly [K in keyof A]: K extends P ? B : A[K] }> => {
    return F.map(
      (output) =>
        ({ [prop]: output, ...omit(prop as never)(obj) } as { readonly [K in keyof A]: K extends P ? B : A[K] })
    )(f(obj[prop]))
  }
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * Return a semigroup which works like `Object.assign`.
 *
 * @example
 * import { getAssignSemigroup } from 'fp-ts/struct'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   readonly name: string
 *   readonly age: number
 * }
 *
 * const S = getAssignSemigroup<Person>()
 * assert.deepStrictEqual(pipe({ name: 'name', age: 23 }, S.concat({ name: 'name', age: 24 })), { name: 'name', age: 24 })
 *
 * @category instances
 * @since 3.0.0
 */
export const getAssignSemigroup = <A = never>(): Semigroup<A> => ({
  concat: (second) => (first) => Object.assign({}, first, second)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Map an element at the specified key. The new element's type may be different from its original.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { mapAt } from 'fp-ts/struct'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     { a: 'a', b: 1, c: true },
 *     mapAt('c', (c) => c ? 'true' : 'false')
 *   ),
 *   { a: 'a', b: 1, c: 'true' }
 * )
 *
 * @since 3.0.0
 */
export const mapAt: <Obj1, Key extends keyof Obj1 extends never ? string : EnsureStringKey<Obj1>, ValOut, ValIn>(
  prop: keyof Obj1 extends never ? EnsureLiteral<Key> : Key,
  f: Key extends keyof Obj1 ? (ap: Obj1[Key]) => ValOut : (ap: ValIn) => ValOut
) => <Obj2 extends { [k in Key]: ValIn }>(
  a: keyof Obj1 extends never ? Obj2 : Obj1
) => Key extends keyof Obj1
  ? {
      readonly [K in keyof Obj1]: K extends Key ? ValOut : Obj1[K]
    }
  : {
      readonly [K in keyof Obj2]: K extends Key ? ValOut : Obj2[K]
    } = mapAtE(IDFunctor)

/**
 * Modify an element at the specified key. The new element's type must be the same as its original.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { modifyAt } from 'fp-ts/struct'
 *
 * const modified = pipe(
 *   { a: 'a', b: 1, c: true },
 *   modifyAt('c', (c) => !c)
 * )
 *
 * assert.deepStrictEqual(
 *   modified,
 *   { a: 'a', b: 1, c: false }
 * )
 *
 * @since 3.0.0
 */
export const modifyAt: <Obj1, Key extends keyof Obj1 extends never ? string : EnsureStringKey<Obj1>, Val>(
  prop: keyof Obj1 extends never ? EnsureLiteral<Key> : Key,
  f: Key extends keyof Obj1 ? (o: Obj1[Key]) => Obj1[Key] : (o: Val) => Val
) => <Obj2 extends { [k in Key]: Val }>(
  o: keyof Obj1 extends never ? Obj2 : Obj1
) => keyof Obj1 extends never ? Obj2 : Obj1 = mapAt as any

/**
 * Update an element at the specified key.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import { updateAt } from 'fp-ts/struct'
 *
 * const updated = pipe(
 *   { a: 'a', b: 1, c: true },
 *   updateAt('c', false)
 * )
 *
 * assert.deepStrictEqual(
 *   updated,
 *   { a: 'a', b: 1, c: false }
 * )
 *
 * @since 3.0.0
 */
export const updateAt: <Obj1, Key extends keyof Obj1 extends never ? string : EnsureStringKey<Obj1>, Val>(
  prop: keyof Obj1 extends never ? EnsureLiteral<Key> : Key,
  ap: Key extends keyof Obj1 ? Obj1[Key] : Val
) => <Obj2 extends { [k in Key]: Val }>(
  o: keyof Obj1 extends never ? Obj2 : Obj1
) => keyof Obj1 extends never ? Obj2 : Obj1 = (prop, ap) => modifyAt(prop as never, constant(ap) as never)
