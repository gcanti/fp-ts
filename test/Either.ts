import * as assert from 'assert'
import {
  Either,
  either,
  fromNullable,
  fromOption,
  fromOptionL,
  fromPredicate,
  fromRefinement,
  fromValidation,
  getApplyMonoid,
  getApplySemigroup,
  getCompactable,
  getFilterable,
  getSemigroup,
  getSetoid,
  getWitherable,
  isLeft,
  isRight,
  left,
  right,
  tryCatch,
  tryCatch2v,
  toError
} from '../src/Either'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, Option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { setoidNumber, setoidString } from '../src/Setoid'
import * as T from '../src/Traversable'
import { failure, success } from '../src/Validation'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(left<string, string>('abc').fold(f, g), 'left3')
    assert.strictEqual(right<string, string>('abc').fold(f, g), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(right('abc').map(f), right(3))
    assert.deepEqual(left<string, string>('s').map(f), left('s'))
    assert.deepEqual(either.map(right('abc'), f), right(3))
    assert.deepEqual(either.map(left<string, string>('s'), f), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepEqual(right<string, number>(1).bimap(f, g), right(false))
    assert.deepEqual(left<string, number>('foo').bimap(f, g), left(3))
    assert.deepEqual(either.bimap(right<string, number>(1), f, g), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    assert.deepEqual(right<string, string>('abc').ap(right<string, (s: string) => number>(f)), right(3))
    assert.deepEqual(left<string, string>('a').ap(right<string, (s: string) => number>(f)), left<string, number>('a'))
    assert.deepEqual(
      right<string, string>('abc').ap(left<string, (s: string) => number>('a')),
      left<string, number>('a')
    )
    assert.deepEqual(left<string, string>('b').ap(left<string, (s: string) => number>('a')), left<string, number>('a'))

    assert.deepEqual(right<string, (s: string) => number>(f).ap_(right<string, string>('abc')), right(3))
    assert.deepEqual(
      left<string, (s: string) => number>('a').ap_(right<string, string>('abc')),
      left<string, number>('a')
    )
  })

  it('chain', () => {
    const f = (s: string) => right<string, number>(s.length)
    assert.deepEqual(right<string, string>('abc').chain(f), right(3))
    assert.deepEqual(left<string, string>('a').chain(f), left('a'))
    assert.deepEqual(either.chain(right<string, string>('abc'), f), right(3))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepEqual(gt2(3), right(3))
    assert.deepEqual(gt2(1), left('Invalid number 1'))

    // refinements
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = fromPredicate(isColor, s => `invalid color ${s}`)
    assert.deepEqual(from('red'), right('red'))
    assert.deepEqual(from('foo'), left('invalid color foo'))
  })

  it('tryCatch2v', () => {
    const e1 = tryCatch(() => {
      return JSON.parse(`{}`)
    })
    assert.deepEqual(e1, right({}))

    const e2 = tryCatch(() => {
      return JSON.parse(``)
    })
    assert.deepEqual(e2, left(new SyntaxError('Unexpected end of JSON input')))

    const e3 = tryCatch(() => {
      throw 'a string' // tslint:disable-line no-string-throw
    })
    assert.deepEqual(e3, left(new Error('a string')))

    const e4 = tryCatch(() => {
      throw new Error('foo')
    }, toError)
    assert.deepEqual(e4, left(new Error('foo')))

    type ObjectWithStatusCode = { statusCode: number }
    const thrownIsObjectWithStatusCode = (thrown: unknown): thrown is ObjectWithStatusCode => {
      // tslint:disable-next-line:strict-type-predicates (upstream bug: https://github.com/palantir/tslint/issues/4107)
      return typeof thrown === 'object' && thrown !== null && 'statusCode' in thrown
    }
    const onerror = (thrown: unknown): Error => {
      if (thrownIsObjectWithStatusCode(thrown)) {
        return new Error(`Bad response: ${thrown.statusCode}`)
      } else if (thrown instanceof Error) {
        return thrown
      } else {
        return new Error('Unexpected error')
      }
    }
    const e5 = tryCatch2v(() => {
      throw { statusCode: 404 }
    }, onerror)
    assert.deepEqual(e5, left(new Error('Bad response: 404')))
  })

  it('getOrElse', () => {
    assert.equal(right(12).getOrElse(17), 12)
    assert.equal(left(12).getOrElse(17), 17)
  })

  it('getOrElseL', () => {
    assert.equal(right(12).getOrElseL(() => 17), 12)
    assert.equal(left(12).getOrElseL(() => 17), 17)
    assert.equal(left(12).getOrElseL((l: number) => l + 1), 13)
  })

  it('fromOption', () => {
    assert.deepEqual(fromOption('default')(none), left('default'))
    assert.deepEqual(fromOption('default')(some(1)), right(1))
  })

  it('fromNullable', () => {
    assert.deepEqual(fromNullable('default')(null), left('default'))
    assert.deepEqual(fromNullable('default')(undefined), left('default'))
    assert.deepEqual(fromNullable('default')(1), right(1))
  })

  it('getSetoid', () => {
    const equals = getSetoid(setoidString, setoidNumber).equals
    assert.strictEqual(equals(right(1), right(1)), true)
    assert.strictEqual(equals(right(1), right(2)), false)
    assert.strictEqual(equals(right(1), left('foo')), false)
    assert.strictEqual(equals(left('foo'), left('foo')), true)
    assert.strictEqual(equals(left('foo'), left('bar')), false)
    assert.strictEqual(equals(left('foo'), right(1)), false)
  })

  it('fromValidation', () => {
    assert.deepEqual(fromValidation(success(1)), right(1))
    assert.deepEqual(fromValidation(failure('a')), left('a'))
  })

  it('traverse', () => {
    assert.deepEqual(either.traverse(option)(left('foo'), a => (a >= 2 ? some(a) : none)), some(left('foo')))
    assert.deepEqual(either.traverse(option)(right(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepEqual(either.traverse(option)(right(3), a => (a >= 2 ? some(a) : none)), some(right(3)))
  })

  it('sequence', () => {
    const old = T.sequence(option, either)
    const sequence = either.sequence(option)
    const x1 = right<number, Option<string>>(some('a'))
    assert.deepEqual(sequence(x1), some(right('a')))
    assert.deepEqual(sequence(x1), old(x1))
    const x2 = left<number, Option<string>>(1)
    assert.deepEqual(sequence(x2), some(left(1)))
    assert.deepEqual(sequence(x2), old(x2))
    const x3 = right<number, Option<string>>(none)
    assert.deepEqual(sequence(x3), none)
    assert.deepEqual(sequence(x3), old(x3))
  })

  it('chainRec', () => {
    const chainRec = either.chainRec
    assert.deepEqual(chainRec(1, () => left<string, Either<number, number>>('foo')), left('foo'))
    assert.deepEqual(chainRec(1, () => right<string, Either<number, number>>(right(1))), right(1))
    assert.deepEqual(
      chainRec(1, a => {
        if (a < 5) {
          return right<string, Either<number, number>>(left(a + 1))
        } else {
          return right<string, Either<number, number>>(right(a))
        }
      }),
      right(5)
    )
  })

  it('fromOptionL', () => {
    assert.deepEqual(fromOptionL(() => 'default')(none), left('default'))
    assert.deepEqual(fromOptionL(() => 'default')(some(1)), right(1))
  })

  it('filterOrElse', () => {
    assert.deepEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
    assert.deepEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
    assert.deepEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    assert.deepEqual(right('red').filterOrElse(isColor, -1), right('red'))
    assert.deepEqual(right('foo').filterOrElse(isColor, -1), left(-1))
    assert.deepEqual(left<number, string>(12).filterOrElse(isColor, -1), left(12))
  })

  it('filterOrElseL', () => {
    assert.deepEqual(right(12).filterOrElseL(n => n > 10, () => -1), right(12))
    assert.deepEqual(right(7).filterOrElseL(n => n > 10, () => -1), left(-1))
    assert.deepEqual(left(12).filterOrElseL(n => n > 10, () => -1), left(12))
    assert.deepEqual(right(7).filterOrElseL(n => n > 10, n => `invalid ${n}`), left('invalid 7'))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`
    assert.deepEqual(right('red').filterOrElseL(isColor, errorHandler), right('red'))
    assert.deepEqual(right('foo').filterOrElseL(isColor, errorHandler), left('invalid color foo'))
    assert.deepEqual(left<string, string>('error').filterOrElseL(isColor, errorHandler), left('error'))
  })

  it('isLeft', () => {
    assert.strictEqual(right(1).isLeft(), false)
    assert.strictEqual(left(1).isLeft(), true)
    assert.strictEqual(isLeft(right(1)), false)
    assert.strictEqual(isLeft(left(1)), true)
  })

  it('isRight', () => {
    assert.strictEqual(right(1).isRight(), true)
    assert.strictEqual(left(1).isRight(), false)
    assert.strictEqual(isRight(right(1)), true)
    assert.strictEqual(isRight(left(1)), false)
  })

  it('alt', () => {
    assert.deepEqual(right<string, number>(1).alt(right<string, number>(2)), right<string, number>(1))
    assert.deepEqual(right<string, number>(1).alt(left<string, number>('foo')), right<string, number>(1))
    assert.deepEqual(left<string, number>('foo').alt(right<string, number>(1)), right<string, number>(1))
    assert.deepEqual(left<string, number>('foo').alt(left<string, number>('bar')), left<string, number>('bar'))
    assert.deepEqual(either.alt(right<string, number>(1), right<string, number>(2)), right<string, number>(1))
  })

  it('orElse', () => {
    assert.deepEqual(right<string, number>(1).orElse(() => right<string, number>(2)), right<string, number>(1))
    assert.deepEqual(right<string, number>(1).orElse(() => left<string, number>('foo')), right<string, number>(1))
    assert.deepEqual(left<string, number>('foo').orElse(() => right<string, number>(1)), right<string, number>(1))
    assert.deepEqual(left<string, number>('foo').orElse(() => left<string, number>('bar')), left<string, number>('bar'))
  })

  it('extend', () => {
    assert.deepEqual(right(1).extend(() => 2), right(2))
    assert.deepEqual(left('foo').extend(() => 2), left('foo'))
    assert.deepEqual(either.extend(right(1), () => 2), right(2))
  })

  it('reduce', () => {
    assert.deepEqual(right('bar').reduce('foo', (b, a) => b + a), 'foobar')
    assert.deepEqual(left('bar').reduce('foo', (b, a) => b + a), 'foo')
    assert.deepEqual(either.reduce(right('bar'), 'foo', (b, a) => b + a), 'foobar')
  })

  it('foldMap', () => {
    const old = F.foldMap(either, monoidString)
    const foldMap = either.foldMap(monoidString)
    const x1 = right<number, string>('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
    const x2 = left<number, string>(1)
    assert.strictEqual(foldMap(x2, f1), '')
    assert.strictEqual(foldMap(x2, f1), old(x2, f1))
  })

  it('foldr', () => {
    const old = F.foldr(either)
    const foldr = either.foldr
    const x1 = right<number, string>('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
    const x2 = left<number, string>(1)
    assert.strictEqual(foldr(x2, init1, f1), '')
    assert.strictEqual(foldr(x2, init1, f1), old(x2, init1, f1))
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    assert.deepEqual(right<number, string>('bar').mapLeft(double), right('bar'))
    assert.deepEqual(left<number, string>(2).mapLeft(double), left(4))
  })

  it('toString', () => {
    assert.strictEqual(right('bar').toString(), 'right("bar")')
    assert.strictEqual(right('bar').inspect(), 'right("bar")')
    assert.strictEqual(left('bar').toString(), 'left("bar")')
    assert.strictEqual(left('bar').inspect(), 'left("bar")')
  })

  it('swap', () => {
    assert.deepEqual(right('bar').swap(), left('bar'))
    assert.deepEqual(left('bar').swap(), right('bar'))
  })

  it('refineOrElse', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    assert.deepEqual(right('red').refineOrElse(isColor, -1), right('red'))
    assert.deepEqual(right('foo').refineOrElse(isColor, -1), left(-1))
    assert.deepEqual(left<number, string>(12).refineOrElse(isColor, -1), left(12))
  })

  it('refineOrElseL', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`
    assert.deepEqual(right('red').refineOrElseL(isColor, errorHandler), right('red'))
    assert.deepEqual(right('foo').refineOrElseL(isColor, errorHandler), left('invalid color foo'))
    assert.deepEqual(left<string, string>('error').refineOrElseL(isColor, errorHandler), left('error'))
  })

  it('fromRefinement', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = fromRefinement(isColor, s => `invalid color ${s}`)
    assert.deepEqual(from('red'), right('red'))
    assert.deepEqual(from('foo'), left('invalid color foo'))
  })

  describe('getCompactable', () => {
    const C = getCompactable(monoidString)
    it('compact', () => {
      assert.deepEqual(C.compact(left('1')), left('1'))
      assert.deepEqual(C.compact(right(none)), left(monoidString.empty))
      assert.deepEqual(C.compact(right(some(123))), right(123))
    })

    it('separate', () => {
      assert.deepEqual(C.separate(left('123')), { left: left('123'), right: left('123') })
      assert.deepEqual(C.separate(right(left('123'))), { left: right('123'), right: left(monoidString.empty) })
      assert.deepEqual(C.separate(right(right('123'))), { left: left(monoidString.empty), right: right('123') })
    })
  })

  describe('getFilterable', () => {
    const F = getFilterable(monoidString)
    const p = (n: number) => n > 2
    it('partition', () => {
      assert.deepEqual(F.partition(left<string, number>('123'), p), {
        left: left('123'),
        right: left('123')
      })
      assert.deepEqual(F.partition(right<string, number>(1), p), { left: right(1), right: left(monoidString.empty) })
      assert.deepEqual(F.partition(right<string, number>(3), p), { left: left(monoidString.empty), right: right(3) })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepEqual(F.partitionMap(left<string, number>('123'), f), {
        left: left('123'),
        right: left('123')
      })
      assert.deepEqual(F.partitionMap(right<string, number>(1), f), { left: right(0), right: left(monoidString.empty) })
      assert.deepEqual(F.partitionMap(right<string, number>(3), f), { left: left(monoidString.empty), right: right(4) })
    })
    it('filter', () => {
      assert.deepEqual(F.filter(left<string, number>('123'), p), left('123'))
      assert.deepEqual(F.filter(right<string, number>(1), p), left(monoidString.empty))
      assert.deepEqual(F.filter(right<string, number>(3), p), right(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepEqual(F.filterMap(left<string, number>('123'), f), left('123'))
      assert.deepEqual(F.filterMap(right<string, number>(1), f), left(monoidString.empty))
      assert.deepEqual(F.filterMap(right<string, number>(3), f), right(4))
    })
  })

  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepEqual(witherIdentity(left<string, number>('foo'), f), new I.Identity(left('foo')))
      assert.deepEqual(witherIdentity(right<string, number>(1), f), new I.Identity(left(monoidString.empty)))
      assert.deepEqual(witherIdentity(right<string, number>(3), f), new I.Identity(right(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepEqual(
        wiltIdentity(left<string, number>('foo'), f),
        new I.Identity({
          left: left('foo'),
          right: left('foo')
        })
      )
      assert.deepEqual(
        wiltIdentity(right<string, number>(1), f),
        new I.Identity({
          left: right(0),
          right: left(monoidString.empty)
        })
      )
      assert.deepEqual(
        wiltIdentity(right<string, number>(3), f),
        new I.Identity({
          left: left(monoidString.empty),
          right: right(4)
        })
      )
    })
  })

  it('getSemigroup', () => {
    const S = getSemigroup<string, number>(semigroupSum)
    assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepEqual(S.concat(left('a'), right(2)), right(2))
    assert.deepEqual(S.concat(right(1), left('b')), right(1))
    assert.deepEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplySemigroup', () => {
    const S = getApplySemigroup<string, number>(semigroupSum)
    assert.deepEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepEqual(S.concat(left('a'), right(2)), left('a'))
    assert.deepEqual(S.concat(right(1), left('b')), left('b'))
    assert.deepEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplyMonoid', () => {
    const S = getApplyMonoid<string, number>(monoidSum)
    assert.deepEqual(S.concat(left('a'), S.empty), left('a'))
    assert.deepEqual(S.concat(S.empty, left('b')), left('b'))
    assert.deepEqual(S.concat(right(1), S.empty), right(1))
    assert.deepEqual(S.concat(S.empty, right(2)), right(2))
  })
})
