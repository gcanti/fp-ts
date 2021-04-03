import { pipe } from '../src/function'
import * as O from '../src/Option'
import { ReadonlyRecord } from '../src/ReadonlyRecord'
import * as _ from '../src/Refinement'
import * as U from './util'

export const string = (u: unknown): u is string => typeof u === 'string'

export const number = (u: unknown): u is number => typeof u === 'number'

export const boolean = (u: unknown): u is boolean => typeof u === 'boolean'

interface NonEmptyStringBrand {
  readonly NonEmptyString: unique symbol
}

type NonEmptyString = string & NonEmptyStringBrand

const NonEmptyString: _.Refinement<string, NonEmptyString> = (s): s is NonEmptyString => s.length > 0

describe('Refinement', () => {
  it('not', () => {
    const r1: _.Refinement<string | number, string> = string
    const r2 = _.not(r1)
    U.deepStrictEqual(r2('a'), false)
    U.deepStrictEqual(r2(1), true)
  })

  it('or', () => {
    const r = pipe(string, _.or(number), _.or(boolean))
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r('a'), true)
    U.deepStrictEqual(r(1), true)
    U.deepStrictEqual(r(true), true)
  })

  it('and', () => {
    const ra = (r: ReadonlyRecord<string, unknown>): r is { readonly a: string } => string(r['a'])
    const rb = (r: ReadonlyRecord<string, unknown>): r is { readonly b: number } => number(r['b'])
    const r = pipe(ra, _.and(rb))
    U.deepStrictEqual(r({ a: 'a' }), false)
    U.deepStrictEqual(r({ b: 1 }), false)
    U.deepStrictEqual(r({}), false)
    U.deepStrictEqual(r({ a: 'a', b: 'b' }), false)
    U.deepStrictEqual(r({ a: 1, b: 2 }), false)
    U.deepStrictEqual(r({ a: 'a', b: 1 }), true)
  })

  it('fromOptionK', () => {
    const f = (s: string | number): O.Option<string> => (typeof s === 'string' ? O.some(s) : O.none)
    const isString = _.fromOptionK(f)
    U.deepStrictEqual(isString('s'), true)
    U.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.fromOptionK<C, A>((c) => (c.type === 'A' ? O.some(c) : O.none))
    U.deepStrictEqual(isA({ type: 'A' }), true)
    U.deepStrictEqual(isA({ type: 'B' }), false)
  })

  it('zero', () => {
    const refinement = _.zero()
    U.strictEqual(refinement('a'), false)
  })

  it('id', () => {
    const refinement = _.id<string>()
    U.strictEqual(refinement('a'), true)
  })

  it('compose', () => {
    const refinement = pipe(string, _.compose(NonEmptyString))
    U.strictEqual(refinement('a'), true)
    U.strictEqual(refinement(null), false)
    U.strictEqual(refinement(''), false)
  })
})
