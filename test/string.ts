import * as U from './util'
import * as _ from '../src/string'
import { pipe } from '../src/function'

describe('string', () => {
  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Show', () => {
    U.deepStrictEqual(_.Show.show('a'), '"a"')
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('empty', () => {
    U.deepStrictEqual(_.empty, '')
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty(''), true)
    U.deepStrictEqual(_.isEmpty('a'), false)
  })

  it('isString', () => {
    U.deepStrictEqual(_.isString(_.empty), true)
    U.deepStrictEqual(_.isString('a'), true)
    U.deepStrictEqual(_.isString(1), false)
  })

  it('size', () => {
    U.deepStrictEqual(_.size(_.empty), 0)
    U.deepStrictEqual(_.size(''), 0)
    U.deepStrictEqual(_.size('a'), 1)
  })

  it('toUpperCase', () => {
    U.deepStrictEqual(_.toUpperCase('a'), 'A')
  })

  it('toLowerCase', () => {
    U.deepStrictEqual(_.toLowerCase('A'), 'a')
  })

  it('replace', () => {
    U.deepStrictEqual(pipe('abc', _.replace('b', 'd')), 'adc')
  })

  it('split', () => {
    U.deepStrictEqual(pipe('abc', _.split('')), ['a', 'b', 'c'])
    U.deepStrictEqual(pipe('', _.split('')), [''])
  })

  it('trim', () => {
    U.deepStrictEqual(pipe(' a ', _.trim), 'a')
  })

  it('trimLeft', () => {
    U.deepStrictEqual(pipe(' a ', _.trimLeft), 'a ')
  })

  it('trimRight', () => {
    U.deepStrictEqual(pipe(' a ', _.trimRight), ' a')
  })

  it('includes', () => {
    U.deepStrictEqual(pipe('abc', _.includes('b')), true)
    U.deepStrictEqual(pipe('abc', _.includes('b', 2)), false)
  })

  it('startsWith', () => {
    U.deepStrictEqual(pipe('abc', _.startsWith('a')), true)
  })

  it('endsWith', () => {
    U.deepStrictEqual(pipe('abc', _.endsWith('c')), true)
  })

  it('slice', () => {
    U.deepStrictEqual(pipe('abcd', _.slice(1, 3)), 'bc')
  })
})
