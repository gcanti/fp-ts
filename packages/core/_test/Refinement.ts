import * as B from '@fp-ts/core/boolean'
import { pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import * as O from '@fp-ts/core/Option'
import type { ReadonlyRecord } from '@fp-ts/core/ReadonlyRecord'
import * as _ from '@fp-ts/core/Refinement'
import * as E from '@fp-ts/core/Result'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

type NonEmptyString = string & NonEmptyStringBrand

const NonEmptyString: _.Refinement<string, NonEmptyString> = (s): s is NonEmptyString => s.length > 0

describe('Refinement', () => {
  it('not', () => {
    const r1: _.Refinement<string | number, string> = S.isString
    const r2 = _.not(r1)
    U.deepStrictEqual(r2('a'), false)
    U.deepStrictEqual(r2(1), true)
  })

  it('or', () => {
    const r = pipe(S.isString, _.or(N.isNumber), _.or(B.isBoolean))
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r('a'), true)
    U.deepStrictEqual(r(1), true)
    U.deepStrictEqual(r(true), true)
  })

  it('and', () => {
    const ra = (r: ReadonlyRecord<string, unknown>): r is { readonly a: string } => S.isString(r['a'])
    const rb = (r: ReadonlyRecord<string, unknown>): r is { readonly b: number } => N.isNumber(r['b'])
    const r = pipe(ra, _.and(rb))
    U.deepStrictEqual(r({ a: 'a' }), false)
    U.deepStrictEqual(r({ b: 1 }), false)
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r({ a: 'a', b: 'b' }), false)
    U.deepStrictEqual(r({ a: 1, b: 2 }), false)
    U.deepStrictEqual(r({ a: 'a', b: 1 }), true)
  })

  it('liftOption', () => {
    const f = (s: string | number): O.Option<string> => (typeof s === 'string' ? O.some(s) : O.none)
    const isString = _.liftOption(f)
    U.deepStrictEqual(isString('s'), true)
    U.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.liftOption<C, A>((c) => (c.type === 'A' ? O.some(c) : O.none))
    U.deepStrictEqual(isA({ type: 'A' }), true)
    U.deepStrictEqual(isA({ type: 'B' }), false)
  })

  it('emptyKind', () => {
    const refinement = _.empty()
    U.strictEqual(refinement('a'), false)
  })

  it('id', () => {
    const refinement = _.id<string>()
    U.strictEqual(refinement('a'), true)
  })

  it('compose', () => {
    const refinement = pipe(S.isString, _.compose(NonEmptyString))
    U.strictEqual(refinement('a'), true)
    U.strictEqual(refinement(null), false)
    U.strictEqual(refinement(''), false)
  })

  it('liftResult', () => {
    const f = (s: string | number): E.Result<string, string> =>
      typeof s === 'string' ? E.succeed(s) : E.fail('not a string')
    const isString = _.liftResult(f)
    U.deepStrictEqual(isString('s'), true)
    U.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.liftResult<C, A>((c) => (c.type === 'A' ? E.succeed(c) : E.fail('not as A')))
    U.deepStrictEqual(isA({ type: 'A' }), true)
    U.deepStrictEqual(isA({ type: 'B' }), false)
  })
})
