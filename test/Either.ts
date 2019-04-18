import * as assert from 'assert'
import {
  either,
  fromNullable,
  fromOption,
  fromOptionL,
  fromPredicate,
  fromValidation,
  getApplyMonoid,
  getApplySemigroup,
  getCompactable,
  getFilterable,
  getSemigroup,
  getSetoid,
  getShow,
  getWitherable,
  isLeft,
  isRight,
  left,
  parseJSON,
  right,
  stringifyJSON,
  toError,
  tryCatch,
  Either
} from '../src/Either'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { setoidNumber, setoidString } from '../src/Setoid'
import { showString } from '../src/Show'
import { failure, success } from '../src/Validation'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(left('abc').fold(f, g), 'left3')
    assert.strictEqual(right('abc').fold(f, g), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepStrictEqual(right('abc').map(f), right(3))
    assert.deepStrictEqual(left('s').map(f), left('s'))
    assert.deepStrictEqual(either.map(right('abc'), f), right(3))
    assert.deepStrictEqual(either.map(left('s'), f), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepStrictEqual(right(1).bimap(f, g), right(false))
    assert.deepStrictEqual(left('foo').bimap(f, g), left(3))
    assert.deepStrictEqual(either.bimap(right(1), f, g), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    const abc: Either<string, string> = right('abc')
    assert.deepStrictEqual(right('abc').ap(right(f)), right(3))
    assert.deepStrictEqual(left('a').ap(right(f)), left('a'))
    assert.deepStrictEqual(abc.ap(left('a')), left('a'))
    assert.deepStrictEqual(left('b').ap(left('a')), left('a'))

    assert.deepStrictEqual(right(f).ap_(right('abc')), right(3))
    assert.deepStrictEqual(left('a').ap_(right('abc')), left('a'))
  })

  it('chain', () => {
    const f = (s: string) => right(s.length)
    assert.deepStrictEqual(right('abc').chain(f), right(3))
    assert.deepStrictEqual(left('a').chain(f), left('a'))
    assert.deepStrictEqual(either.chain(right('abc'), f), right(3))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    assert.deepStrictEqual(gt2(3), right(3))
    assert.deepStrictEqual(gt2(1), left('Invalid number 1'))

    // refinements
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = fromPredicate(isColor, s => `invalid color ${s}`)
    assert.deepStrictEqual(from('red'), right('red'))
    assert.deepStrictEqual(from('foo'), left('invalid color foo'))
  })

  it('tryCatch', () => {
    const e1 = tryCatch(() => {
      return 1
    }, toError)
    assert.deepStrictEqual(e1, right(1))
    const e2 = tryCatch(() => {
      // tslint:disable-next-line: no-string-throw
      throw 'string error'
    }, toError)
    assert.deepStrictEqual(e2, left(new Error('string error')))
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(right(12).getOrElse(17), 12)
    const l: Either<string, number> = left('a')
    assert.deepStrictEqual(l.getOrElse(17), 17)
  })

  it('getOrElseL', () => {
    assert.deepStrictEqual(right(12).getOrElseL(() => 17), 12)
    const l: Either<string, number> = left('a')
    assert.deepStrictEqual(l.getOrElseL(() => 17), 17)
    assert.deepStrictEqual(l.getOrElseL((l: string) => l.length + 1), 2)
  })

  it('fromOption', () => {
    assert.deepStrictEqual(fromOption('default')(none), left('default'))
    assert.deepStrictEqual(fromOption('default')(some(1)), right(1))
  })

  it('fromNullable', () => {
    assert.deepStrictEqual(fromNullable('default')(null), left('default'))
    assert.deepStrictEqual(fromNullable('default')(undefined), left('default'))
    assert.deepStrictEqual(fromNullable('default')(1), right(1))
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
    assert.deepStrictEqual(fromValidation(success(1)), right(1))
    assert.deepStrictEqual(fromValidation(failure('a')), left('a'))
  })

  it('traverse', () => {
    assert.deepStrictEqual(either.traverse(option)(left('foo'), a => (a >= 2 ? some(a) : none)), some(left('foo')))
    assert.deepStrictEqual(either.traverse(option)(right(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepStrictEqual(either.traverse(option)(right(3), a => (a >= 2 ? some(a) : none)), some(right(3)))
  })

  it('sequence', () => {
    const sequence = either.sequence(option)
    const x1 = right(some('a'))
    assert.deepStrictEqual(sequence(x1), some(right('a')))
    const x2 = left(1)
    assert.deepStrictEqual(sequence(x2), some(left(1)))
    const x3 = right(none)
    assert.deepStrictEqual(sequence(x3), none)
  })

  it('chainRec', () => {
    const chainRec = either.chainRec
    assert.deepStrictEqual(chainRec(1, () => left('foo')), left('foo'))
    assert.deepStrictEqual(chainRec(1, () => right(right(1))), right(1))
    assert.deepStrictEqual(
      chainRec(1, a => {
        if (a < 5) {
          return right(left(a + 1))
        } else {
          return right(right(a))
        }
      }),
      right(5)
    )
  })

  it('fromOptionL', () => {
    assert.deepStrictEqual(fromOptionL(() => 'default')(none), left('default'))
    assert.deepStrictEqual(fromOptionL(() => 'default')(some(1)), right(1))
  })

  it('filterOrElse', () => {
    const r1: Either<number, number> = right(12)
    assert.deepStrictEqual(r1.filterOrElse(n => n > 10, -1), right(12))
    const r2: Either<number, number> = right(7)
    assert.deepStrictEqual(r2.filterOrElse(n => n > 10, -1), left(-1))
    assert.deepStrictEqual(left(12).filterOrElse(n => n > 10, -1), left(12))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const r3: Either<number, string> = right('red')
    assert.deepStrictEqual(r3.filterOrElse(isColor, -1), right('red'))
    const r4: Either<number, string> = right('foo')
    assert.deepStrictEqual(r4.filterOrElse(isColor, -1), left(-1))
    assert.deepStrictEqual(left(12).filterOrElse(isColor, -1), left(12))
  })

  it('filterOrElseL', () => {
    const r1: Either<number, number> = right(12)
    assert.deepStrictEqual(r1.filterOrElseL(n => n > 10, () => -1), right(12))
    const r2: Either<number, number> = right(7)
    assert.deepStrictEqual(r2.filterOrElseL(n => n > 10, () => -1), left(-1))
    assert.deepStrictEqual(left(12).filterOrElseL(n => n > 10, () => -1), left(12))
    const r3: Either<string, number> = right(7)
    assert.deepStrictEqual(r3.filterOrElseL(n => n > 10, n => `invalid ${n}`), left('invalid 7'))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`
    const r4: Either<string, string> = right('red')
    assert.deepStrictEqual(r4.filterOrElseL(isColor, errorHandler), right('red'))
    const r5: Either<string, string> = right('foo')
    assert.deepStrictEqual(r5.filterOrElseL(isColor, errorHandler), left('invalid color foo'))
    assert.deepStrictEqual(left('error').filterOrElseL(isColor, errorHandler), left('error'))
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
    assert.deepStrictEqual(right(1).alt(right(2)), right(1))
    const r1: Either<string, number> = right(1)
    assert.deepStrictEqual(r1.alt(left('foo')), right(1))
    const l1: Either<string, number> = left('foo')
    assert.deepStrictEqual(l1.alt(right(1)), right(1))
    assert.deepStrictEqual(left('foo').alt(left('bar')), left('bar'))
    assert.deepStrictEqual(either.alt(right(1), right(2)), right(1))
  })

  it('orElse', () => {
    assert.deepStrictEqual(right(1).orElse(() => right(2)), right(1))
    assert.deepStrictEqual(right(1).orElse(() => left('foo')), right(1))
    const l1: Either<string, number> = left('foo')
    assert.deepStrictEqual(l1.orElse(() => right(1)), right(1))
    assert.deepStrictEqual(left('foo').orElse(() => left('bar')), left('bar'))
  })

  it('extend', () => {
    assert.deepStrictEqual(right(1).extend(() => 2), right(2))
    assert.deepStrictEqual(left('foo').extend(() => 2), left('foo'))
    assert.deepStrictEqual(either.extend(right(1), () => 2), right(2))
  })

  it('reduce', () => {
    assert.deepStrictEqual(right('bar').reduce('foo', (b, a) => b + a), 'foobar')
    assert.deepStrictEqual(left('bar').reduce('foo', (b, a) => b + a), 'foo')
    assert.deepStrictEqual(either.reduce(right('bar'), 'foo', (b, a) => b + a), 'foobar')
  })

  it('foldMap', () => {
    const foldMap = either.foldMap(monoidString)
    const x1 = right('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    const x2 = left(1)
    assert.strictEqual(foldMap(x2, f1), '')
  })

  it('foldr', () => {
    const foldr = either.foldr
    const x1 = right('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'a')
    const x2 = left(1)
    assert.strictEqual(foldr(x2, init1, f1), '')
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(right('bar').mapLeft(double), right('bar'))
    assert.deepStrictEqual(left(2).mapLeft(double), left(4))
  })

  it('swap', () => {
    assert.deepStrictEqual(right('bar').swap(), left('bar'))
    assert.deepStrictEqual(left('bar').swap(), right('bar'))
  })

  describe('getCompactable', () => {
    const C = getCompactable(monoidString)
    it('compact', () => {
      assert.deepStrictEqual(C.compact(left('1')), left('1'))
      assert.deepStrictEqual(C.compact(right(none)), left(monoidString.empty))
      assert.deepStrictEqual(C.compact(right(some(123))), right(123))
    })

    it('separate', () => {
      assert.deepStrictEqual(C.separate(left('123')), { left: left('123'), right: left('123') })
      assert.deepStrictEqual(C.separate(right(left('123'))), { left: right('123'), right: left(monoidString.empty) })
      assert.deepStrictEqual(C.separate(right(right('123'))), { left: left(monoidString.empty), right: right('123') })
    })
  })

  describe('getFilterable', () => {
    const F = getFilterable(monoidString)
    const p = (n: number) => n > 2
    it('partition', () => {
      assert.deepStrictEqual(F.partition(left('123'), p), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partition(right(1), p), {
        left: right(1),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partition(right(3), p), {
        left: left(monoidString.empty),
        right: right(3)
      })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(F.partitionMap(left('123'), f), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partitionMap(right(1), f), {
        left: right(0),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partitionMap(right(3), f), {
        left: left(monoidString.empty),
        right: right(4)
      })
    })
    it('filter', () => {
      assert.deepStrictEqual(F.filter(left('123'), p), left('123'))
      assert.deepStrictEqual(F.filter(right(1), p), left(monoidString.empty))
      assert.deepStrictEqual(F.filter(right(3), p), right(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(F.filterMap(left('123'), f), left('123'))
      assert.deepStrictEqual(F.filterMap(right(1), f), left(monoidString.empty))
      assert.deepStrictEqual(F.filterMap(right(3), f), right(4))
    })
  })

  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(left('foo'), f), new I.Identity(left('foo')))
      assert.deepStrictEqual(witherIdentity(right(1), f), new I.Identity(left(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(right(3), f), new I.Identity(right(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(left('foo'), f),
        new I.Identity({
          left: left('foo'),
          right: left('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(right(1), f),
        new I.Identity({
          left: right(0),
          right: left(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(right(3), f),
        new I.Identity({
          left: left(monoidString.empty),
          right: right(4)
        })
      )
    })
  })

  it('getSemigroup', () => {
    const S = getSemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
    assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
    assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplySemigroup', () => {
    const S = getApplySemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
    assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
    assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplyMonoid', () => {
    const S = getApplyMonoid(monoidSum)
    assert.deepStrictEqual(S.concat(left('a'), S.empty), left('a'))
    assert.deepStrictEqual(S.concat(S.empty, left('b')), left('b'))
    assert.deepStrictEqual(S.concat(right(1), S.empty), right(1))
    assert.deepStrictEqual(S.concat(S.empty, right(2)), right(2))
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(either.chain(either.throwError('error'), a => either.of(a)), either.throwError('error'))
    })

    it('fromOption', () => {
      assert.deepStrictEqual(either.fromOption(none, 'error'), left('error'))
      assert.deepStrictEqual(either.fromOption(some(1), 'error'), right(1))
    })
  })

  it('parseJSON', () => {
    assert.deepStrictEqual(parseJSON('{"a":1}', toError).value, { a: 1 })
    assert.deepStrictEqual(
      parseJSON('{"a":}', toError).value,
      new SyntaxError('Unexpected token } in JSON at position 5')
    )
  })

  it('stringifyJSON', () => {
    assert.deepStrictEqual(stringifyJSON({ a: 1 }, toError).value, '{"a":1}')
    const circular: any = { ref: null }
    circular.ref = circular
    assert.deepStrictEqual(
      stringifyJSON(circular, toError).value,
      new TypeError('Converting circular structure to JSON')
    )
    interface Person {
      name: string
      age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    assert.deepStrictEqual(stringifyJSON(person, toError).value, '{"name":"Giulio","age":45}')
  })

  it('getShow', () => {
    const S = getShow(showString, showString)
    assert.strictEqual(S.show(left('a')), `left("a")`)
    assert.strictEqual(S.show(right('a')), `right("a")`)
  })
})
