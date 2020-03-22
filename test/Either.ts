import * as assert from 'assert'
import * as _ from '../src/Either'
import { eqNumber, eqString } from '../src/Eq'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { showString } from '../src/Show'
import { pipe } from '../src/pipeable'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const fold = _.fold(f, g)
    assert.deepStrictEqual(fold(_.left('abc')), 'left3')
    assert.deepStrictEqual(fold(_.right('abc')), 'right3')
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(
      pipe(
        _.right(12),
        _.getOrElse(() => 17)
      ),
      12
    )
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse(() => 17)
      ),
      17
    )
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse((l: string) => l.length + 1)
      ),
      2
    )
  })

  it('elem', () => {
    assert.deepStrictEqual(_.elem(eqNumber)(2, _.left('a')), false)
    assert.deepStrictEqual(_.elem(eqNumber)(2, _.right(2)), true)
    assert.deepStrictEqual(_.elem(eqNumber)(1, _.right(2)), false)
  })

  it('filterOrElse', () => {
    const gt10 = (n: number): boolean => n > 10
    assert.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(gt10, () => -1)
      ),
      _.right(12)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(gt10, () => -1)
      ),
      _.left(-1)
    )
    assert.deepStrictEqual(
      pipe(
        _.left(12),
        _.filterOrElse(gt10, () => -1)
      ),
      _.left(12)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(gt10, n => `invalid ${n}`)
      ),
      _.left('invalid 7')
    )

    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`

    assert.deepStrictEqual(pipe(_.right('red'), _.filterOrElse(isColor, errorHandler)), _.right('red'))
    assert.deepStrictEqual(pipe(_.right('foo'), _.filterOrElse(isColor, errorHandler)), _.left('invalid color foo'))
    assert.deepStrictEqual(pipe(_.left('err'), _.filterOrElse(isColor, errorHandler)), _.left('err'))
  })

  it('isLeft', () => {
    assert.deepStrictEqual(_.isLeft(_.right(1)), false)
    assert.deepStrictEqual(_.isLeft(_.left(1)), true)
  })

  it('isRight', () => {
    assert.deepStrictEqual(_.isRight(_.right(1)), true)
    assert.deepStrictEqual(_.isRight(_.left(1)), false)
  })

  it('orElse', () => {
    assert.deepStrictEqual(
      pipe(
        _.right(1),
        _.orElse(() => _.right(2))
      ),
      _.right(1)
    )
    assert.deepStrictEqual(
      pipe(
        _.right(1),
        _.orElse(() => _.left('foo'))
      ),
      _.right(1)
    )
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.orElse(() => _.right(1))
      ),
      _.right(1)
    )
    assert.deepStrictEqual(
      pipe(
        _.left('a'),
        _.orElse(() => _.left('b'))
      ),
      _.left('b')
    )
  })

  it('alt', () => {
    assert.deepStrictEqual(
      _.either.alt(_.right(1), () => _.right(2)),
      _.right(1)
    )
    assert.deepStrictEqual(
      _.either.alt(_.right(1), () => _.left('a')),
      _.right(1)
    )
    assert.deepStrictEqual(
      _.either.alt(_.left('a'), () => _.right(2)),
      _.right(2)
    )
    assert.deepStrictEqual(
      _.either.alt(_.left('a'), () => _.left('b')),
      _.left('b')
    )
  })

  it('swap', () => {
    assert.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    assert.deepStrictEqual(_.swap(_.left('b')), _.right('b'))
  })

  it('parseJSON', () => {
    assert.deepStrictEqual(_.parseJSON('{"a":1}', _.toError), _.right({ a: 1 }))
    assert.deepStrictEqual(
      _.parseJSON('{"a":}', _.toError),
      _.left(new SyntaxError('Unexpected token } in JSON at position 5'))
    )
  })

  it('stringifyJSON', () => {
    assert.deepStrictEqual(_.stringifyJSON({ a: 1 }, _.toError), _.right('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    assert.deepStrictEqual(
      pipe(
        _.stringifyJSON(circular, _.toError),
        _.mapLeft(e => e.message.includes('Converting circular structure to JSON'))
      ),
      _.left(true)
    )
    interface Person {
      readonly name: string
      readonly age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    assert.deepStrictEqual(_.stringifyJSON(person, _.toError), _.right('{"name":"Giulio","age":45}'))
  })

  describe('Monad', () => {
    it('map', () => {
      const f = (s: string): number => s.length
      assert.deepStrictEqual(_.either.map(_.right('abc'), f), _.right(3))
      assert.deepStrictEqual(_.either.map(_.left('s'), f), _.left('s'))
    })

    it('ap', () => {
      const f = (s: string): number => s.length
      assert.deepStrictEqual(_.either.ap(_.right(f), _.right('abc')), _.right(3))
      assert.deepStrictEqual(_.either.ap(_.right(f), _.left('maError')), _.left('maError'))
      assert.deepStrictEqual(
        _.either.ap(_.left<string, (s: string) => number>('mabError'), _.right('abc')),
        _.left('mabError')
      )
      assert.deepStrictEqual(_.either.ap(_.left('mabError'), _.left('maError')), _.left('mabError'))
    })

    it('chain', () => {
      const f = (s: string) => _.right(s.length)
      assert.deepStrictEqual(_.either.chain(_.right('abc'), f), _.right(3))
      assert.deepStrictEqual(_.either.chain(_.left('maError'), f), _.left('maError'))
    })
  })

  describe('Bifunctor', () => {
    it('bimap', () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      assert.deepStrictEqual(_.either.bimap(_.right(1), f, g), _.right(false))
    })

    it('mapLeft', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(_.either.mapLeft(_.right('bar'), double), _.right('bar'))
      assert.deepStrictEqual(_.either.mapLeft(_.left(2), double), _.left(4))
    })
  })

  describe('lifting functions', () => {
    it('fromPredicate', () => {
      const gt2 = _.fromPredicate(
        (n: number) => n >= 2,
        n => `Invalid number ${n}`
      )
      assert.deepStrictEqual(gt2(3), _.right(3))
      assert.deepStrictEqual(gt2(1), _.left('Invalid number 1'))

      // refinements
      type Color = 'red' | 'blue'
      const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
      const from = _.fromPredicate(isColor, s => `invalid color ${s}`)
      assert.deepStrictEqual(from('red'), _.right('red'))
      assert.deepStrictEqual(from('foo'), _.left('invalid color foo'))
    })

    it('fromNullable', () => {
      assert.deepStrictEqual(_.fromNullable('default')(null), _.left('default'))
      assert.deepStrictEqual(_.fromNullable('default')(undefined), _.left('default'))
      assert.deepStrictEqual(_.fromNullable('default')(1), _.right(1))
    })

    it('tryCatch', () => {
      assert.deepStrictEqual(
        _.tryCatch(() => {
          return 1
        }, _.toError),
        _.right(1)
      )

      assert.deepStrictEqual(
        _.tryCatch(() => {
          // tslint:disable-next-line: no-string-throw
          throw 'string error'
        }, _.toError),
        _.left(new Error('string error'))
      )
    })
  })

  describe('getEq', () => {
    it('equals', () => {
      const equals = _.getEq(eqString, eqNumber).equals
      assert.deepStrictEqual(equals(_.right(1), _.right(1)), true)
      assert.deepStrictEqual(equals(_.right(1), _.right(2)), false)
      assert.deepStrictEqual(equals(_.right(1), _.left('foo')), false)
      assert.deepStrictEqual(equals(_.left('foo'), _.left('foo')), true)
      assert.deepStrictEqual(equals(_.left('foo'), _.left('bar')), false)
      assert.deepStrictEqual(equals(_.left('foo'), _.right(1)), false)
    })
  })

  describe('Traversable', () => {
    it('traverse', () => {
      assert.deepStrictEqual(
        _.either.traverse(option)(_.left('foo'), a => (a >= 2 ? some(a) : none)),
        some(_.left('foo'))
      )
      assert.deepStrictEqual(
        _.either.traverse(option)(_.right(1), a => (a >= 2 ? some(a) : none)),
        none
      )
      assert.deepStrictEqual(
        _.either.traverse(option)(_.right(3), a => (a >= 2 ? some(a) : none)),
        some(_.right(3))
      )
    })

    it('sequence', () => {
      const sequence = _.either.sequence(option)
      assert.deepStrictEqual(sequence(_.right(some('a'))), some(_.right('a')))
      assert.deepStrictEqual(sequence(_.left(1)), some(_.left(1)))
      assert.deepStrictEqual(sequence(_.right(none)), none)
    })
  })

  describe('ChainRec', () => {
    it('chainRec', () => {
      const chainRec = _.either.chainRec
      assert.deepStrictEqual(
        chainRec(1, () => _.left('foo')),
        _.left('foo')
      )
      assert.deepStrictEqual(
        chainRec(1, () => _.right(_.right(1))),
        _.right(1)
      )
      assert.deepStrictEqual(
        chainRec(1, a => {
          if (a < 5) {
            return _.right(_.left(a + 1))
          } else {
            return _.right(_.right(a))
          }
        }),
        _.right(5)
      )
    })
  })

  describe('Extend', () => {
    it('extend', () => {
      assert.deepStrictEqual(
        _.either.extend(_.right(1), () => 2),
        _.right(2)
      )
      assert.deepStrictEqual(
        _.either.extend(_.left('err'), () => 2),
        _.left('err')
      )
    })
  })

  describe('Foldable', () => {
    it('reduce', () => {
      assert.deepStrictEqual(
        _.either.reduce(_.right('bar'), 'foo', (b, a) => b + a),
        'foobar'
      )
      assert.deepStrictEqual(
        _.either.reduce(_.left('bar'), 'foo', (b, a) => b + a),
        'foo'
      )
    })

    it('foldMap', () => {
      const foldMap = _.either.foldMap(monoidString)
      assert.deepStrictEqual(foldMap(_.right('a'), identity), 'a')
      assert.deepStrictEqual(foldMap(_.left(1), identity), '')
    })

    it('reduceRight', () => {
      const reduceRight = _.either.reduceRight
      const init = ''
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(reduceRight(_.right('a'), init, f), 'a')
      assert.deepStrictEqual(reduceRight(_.left(1), init, f), '')
    })
  })

  describe('getWitherable', () => {
    const W = _.getWitherable(monoidString)
    const p = (n: number) => n > 2

    it('compact', () => {
      assert.deepStrictEqual(W.compact(_.left('1')), _.left('1'))
      assert.deepStrictEqual(W.compact(_.right(none)), _.left(monoidString.empty))
      assert.deepStrictEqual(W.compact(_.right(some(123))), _.right(123))
    })

    it('separate', () => {
      assert.deepStrictEqual(W.separate(_.left('123')), { left: _.left('123'), right: _.left('123') })
      assert.deepStrictEqual(W.separate(_.right(_.left('123'))), {
        left: _.right('123'),
        right: _.left(monoidString.empty)
      })
      assert.deepStrictEqual(W.separate(_.right(_.right('123'))), {
        left: _.left(monoidString.empty),
        right: _.right('123')
      })
    })

    it('partition', () => {
      assert.deepStrictEqual(W.partition(_.left('123'), p), {
        left: _.left('123'),
        right: _.left('123')
      })
      assert.deepStrictEqual(W.partition(_.right(1), p), {
        left: _.right(1),
        right: _.left(monoidString.empty)
      })
      assert.deepStrictEqual(W.partition(_.right(3), p), {
        left: _.left(monoidString.empty),
        right: _.right(3)
      })
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? _.right(n + 1) : _.left(n - 1))
      assert.deepStrictEqual(W.partitionMap(_.left('123'), f), {
        left: _.left('123'),
        right: _.left('123')
      })
      assert.deepStrictEqual(W.partitionMap(_.right(1), f), {
        left: _.right(0),
        right: _.left(monoidString.empty)
      })
      assert.deepStrictEqual(W.partitionMap(_.right(3), f), {
        left: _.left(monoidString.empty),
        right: _.right(4)
      })
    })

    it('filter', () => {
      assert.deepStrictEqual(W.filter(_.left('123'), p), _.left('123'))
      assert.deepStrictEqual(W.filter(_.right(1), p), _.left(monoidString.empty))
      assert.deepStrictEqual(W.filter(_.right(3), p), _.right(3))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(W.filterMap(_.left('123'), f), _.left('123'))
      assert.deepStrictEqual(W.filterMap(_.right(1), f), _.left(monoidString.empty))
      assert.deepStrictEqual(W.filterMap(_.right(3), f), _.right(4))
    })

    it('wither', () => {
      const f = (n: number) => I.identity.of(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(_.left('foo'), f), I.identity.of(_.left('foo')))
      assert.deepStrictEqual(witherIdentity(_.right(1), f), I.identity.of(_.left(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(_.right(3), f), I.identity.of(_.right(4)))
    })

    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => I.identity.of(p(n) ? _.right(n + 1) : _.left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(_.left('foo'), f),
        I.identity.of({
          left: _.left('foo'),
          right: _.left('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(_.right(1), f),
        I.identity.of({
          left: _.right(0),
          right: _.left(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(_.right(3), f),
        I.identity.of({
          left: _.left(monoidString.empty),
          right: _.right(4)
        })
      )
    })
  })

  describe('getSemigroup', () => {
    it('concat', () => {
      const S = _.getSemigroup(semigroupSum)
      assert.deepStrictEqual(S.concat(_.left('a'), _.left('b')), _.left('a'))
      assert.deepStrictEqual(S.concat(_.left('a'), _.right(2)), _.right(2))
      assert.deepStrictEqual(S.concat(_.right(1), _.left('b')), _.right(1))
      assert.deepStrictEqual(S.concat(_.right(1), _.right(2)), _.right(3))
    })
  })

  describe('getApplySemigroup', () => {
    it('concat', () => {
      const S = _.getApplySemigroup(semigroupSum)
      assert.deepStrictEqual(S.concat(_.left('a'), _.left('b')), _.left('a'))
      assert.deepStrictEqual(S.concat(_.left('a'), _.right(2)), _.left('a'))
      assert.deepStrictEqual(S.concat(_.right(1), _.left('b')), _.left('b'))
      assert.deepStrictEqual(S.concat(_.right(1), _.right(2)), _.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    it('concat', () => {
      const M = _.getApplyMonoid(monoidSum)
      assert.deepStrictEqual(M.concat(_.left('a'), M.empty), _.left('a'))
      assert.deepStrictEqual(M.concat(M.empty, _.left('b')), _.left('b'))
      assert.deepStrictEqual(M.concat(_.right(1), M.empty), _.right(1))
      assert.deepStrictEqual(M.concat(M.empty, _.right(2)), _.right(2))
    })
  })

  describe('getShow', () => {
    it('show', () => {
      const S = _.getShow(showString, showString)
      assert.deepStrictEqual(S.show(_.left('a')), `left("a")`)
      assert.deepStrictEqual(S.show(_.right('a')), `right("a")`)
    })
  })

  describe('Validation', () => {
    it('getValidation', () => {
      const M = _.getValidation(monoidString)
      const f = (s: string) => _.right(s.length)
      assert.deepStrictEqual(M.chain(_.right('abc'), f), _.right(3))
      assert.deepStrictEqual(M.chain(_.left('a'), f), _.left('a'))
      assert.deepStrictEqual(
        M.chain(_.left('a'), () => _.left('b')),
        _.left('a')
      )
      assert.deepStrictEqual(M.of(1), _.right(1))
      const double = (n: number) => n * 2
      assert.deepStrictEqual(M.ap(_.right(double), _.right(1)), _.right(2))
      assert.deepStrictEqual(M.ap(_.right(double), _.left('foo')), _.left('foo'))
      assert.deepStrictEqual(M.ap(_.left<string, (n: number) => number>('foo'), _.right(1)), _.left('foo'))
      assert.deepStrictEqual(M.ap(_.left('foo'), _.left('bar')), _.left('foobar'))
      assert.deepStrictEqual(
        M.alt(_.left('a'), () => _.right(1)),
        _.right(1)
      )
      assert.deepStrictEqual(
        M.alt(_.right(1), () => _.left('a')),
        _.right(1)
      )
      assert.deepStrictEqual(
        M.alt(_.left('a'), () => _.left('b')),
        _.left('ab')
      )
    })

    it('getValidationMonoid', () => {
      const M = _.getValidationMonoid(monoidString, monoidSum)
      assert.deepStrictEqual(M.concat(_.right(1), _.right(2)), _.right(3))
      assert.deepStrictEqual(M.concat(_.right(1), _.left('foo')), _.left('foo'))
      assert.deepStrictEqual(M.concat(_.left('foo'), _.right(1)), _.left('foo'))
      assert.deepStrictEqual(M.concat(_.left('foo'), _.left('bar')), _.left('foobar'))
      assert.deepStrictEqual(M.concat(_.right(1), M.empty), _.right(1))
      assert.deepStrictEqual(M.concat(M.empty, _.right(1)), _.right(1))
    })
  })

  it('fromOption', () => {
    assert.deepStrictEqual(_.fromOption(() => 'none')(none), _.left('none'))
    assert.deepStrictEqual(_.fromOption(() => 'none')(some(1)), _.right(1))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    assert.deepStrictEqual(gt2(_.left('a')), false)
    assert.deepStrictEqual(gt2(_.right(1)), false)
    assert.deepStrictEqual(gt2(_.right(3)), true)
  })
})
