import { pipe } from '../src/function'
import * as _ from '../src/struct'
import { Functor, fromPredicate, some } from '../src/Option'
import * as U from './util'

describe('struct', () => {
  describe('primitives', () => {
    it('pick', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, _.pick('a', 'b')), { a: 'a', b: 1 })
      U.deepStrictEqual(_.pick('a', 'b')({ a: 'a', b: 1, c: true }), { a: 'a', b: 1 })
    })

    it('omit', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, _.omit('b', 'c')), { a: 'a' })
      U.deepStrictEqual(_.omit('b', 'c')({ a: 'a', b: 1, c: true }), { a: 'a' })
    })

    it('insertAt', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 1 }, _.insertAt('c', true)), { a: 'a', b: 1, c: true })
      U.deepStrictEqual(_.insertAt('c', true)({ a: 'a', b: 1 }), { a: 'a', b: 1, c: true })
    })

    it('renameAt', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 1, z: true }, _.renameAt('z', 'c')), { a: 'a', b: 1, c: true })
      U.deepStrictEqual(_.renameAt('z', 'c')({ a: 'a', b: 1, z: true }), { a: 'a', b: 1, c: true })
    })

    it('mapAtE', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: true },
          _.mapAtE(Functor)('c', (c) => fromPredicate(() => c)('true'))
        ),
        some({ a: 'a', b: 1, c: 'true' })
      )
    })
  })

  describe('instances', () => {
    it('getAssignSemigroup', () => {
      type T = {
        readonly foo?: number
        readonly bar: string
      }
      const foo: T = {
        foo: 123,
        bar: '456'
      }
      const bar: T = {
        bar: '123'
      }
      const S = _.getAssignSemigroup<T>()
      U.deepStrictEqual(pipe(foo, S.concat(bar)), Object.assign({}, foo, bar))
    })
  })

  describe('utils', () => {
    it('mapAt', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: true },
          _.mapAt('c', (c) => (c ? 'true' : 'false'))
        ),
        { a: 'a', b: 1, c: 'true' }
      )
      U.deepStrictEqual(_.mapAt('c', (c) => (c ? 'true' : 'false'))({ a: 'a', b: 1, c: true }), {
        a: 'a',
        b: 1,
        c: 'true'
      })
    })

    it('modifyAt', () => {
      U.deepStrictEqual(
        pipe(
          { a: 'a', b: 1, c: true },
          _.modifyAt('c', (c) => !c)
        ),
        { a: 'a', b: 1, c: false }
      )
      U.deepStrictEqual(_.modifyAt('c', (c) => !c)({ a: 'a', b: 1, c: true }), { a: 'a', b: 1, c: false })
    })

    it('updateAt', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 1, c: true }, _.updateAt('c', false)), { a: 'a', b: 1, c: false })
      U.deepStrictEqual(_.updateAt('c', false)({ a: 'a', b: 1, c: true }), { a: 'a', b: 1, c: false })
    })
  })
})
