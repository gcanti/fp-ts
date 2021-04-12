import * as U from './util'
import * as _ from '../src/string'

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

  it('size', () => {
    U.deepStrictEqual(_.size(_.empty), 0)
    U.deepStrictEqual(_.size(''), 0)
    U.deepStrictEqual(_.size('a'), 1)
  })

  it('toUpperCase', () => {
    U.deepStrictEqual(_.toUpperCase('abc'), 'ABC')
  })

  it('toLowerCase', () => {
    U.deepStrictEqual(_.toLowerCase('ABC'), 'abc')
  })
})
