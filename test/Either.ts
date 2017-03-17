import * as assert from 'assert'
import {
  right,
  left,
  map,
  fold,
  ap,
  chain,
  fromPredicate,
  tryCatch
} from '../src/Either'
import { eqEithers as eq } from './helpers'

describe('Either', () => {

  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(fold(f, g, left('abc')), 'left3')
    assert.strictEqual(fold(f, g, right('abc')), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    eq(map(f, right('abc')), right(3))
    eq(map(f, left('s')), left('s'))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    eq(ap(right(f), right('abc')), right(3))
    eq(ap(right(f), left('s')), left('s'))
    eq(ap(left<any, any>(f), right('abc')), left(f))
  })

  it('chain', () => {
    const f = (s: string) => right(s.length)
    eq(chain(f, right('abc')), right(3))
    eq(chain(f, left('s')), left('s'))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    eq(gt2(3), right(3))
    eq(gt2(1), left('Invalid number 1'))
  })

  it('tryCatch', () => {
    const e1 = tryCatch(() => {
      return JSON.parse(`{}`)
    })
    eq(e1, right({}))
    const e2 = tryCatch(() => {
      return JSON.parse(``)
    })
    eq(e2, left({}))
  })

})
