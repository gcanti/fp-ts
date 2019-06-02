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
  getEq,
  getWitherable,
  isLeft,
  isRight,
  left,
  right,
  tryCatch,
  tryCatch2v,
  toError,
  parseJSON,
  stringifyJSON,
  getShow,
  fold,
  getOrElse,
  filterOrElse,
  orElse,
  elem,
  getValidation,
  getValidationSemigroup,
  getValidationMonoid
} from '../src/Either'
import * as F from '../src/Foldable'
import { identity, pipeOp } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, Option, some } from '../src/Option'
import { semigroupSum, semigroupString } from '../src/Semigroup'
import { eqNumber, eqString } from '../src/Eq'
import * as T from '../src/Traversable'
import { failure, success } from '../src/Validation'
import { showString } from '../src/Show'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(fold(f, g)(left<string, string>('abc')), 'left3')
    assert.strictEqual(fold(f, g)(right<string, string>('abc')), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepStrictEqual(right('abc').map(f), right(3))
    assert.deepStrictEqual(left<string, string>('s').map(f), left('s'))
    assert.deepStrictEqual(either.map(right('abc'), f), right(3))
    assert.deepStrictEqual(either.map(left<string, string>('s'), f), left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepStrictEqual(right<string, number>(1).bimap(f, g), right(false))
    assert.deepStrictEqual(left<string, number>('foo').bimap(f, g), left(3))
    assert.deepStrictEqual(either.bimap(right<string, number>(1), f, g), right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    assert.deepStrictEqual(right<string, string>('abc').ap(right<string, (s: string) => number>(f)), right(3))
    assert.deepStrictEqual(
      left<string, string>('a').ap(right<string, (s: string) => number>(f)),
      left<string, number>('a')
    )
    assert.deepStrictEqual(
      right<string, string>('abc').ap(left<string, (s: string) => number>('a')),
      left<string, number>('a')
    )
    assert.deepStrictEqual(
      left<string, string>('b').ap(left<string, (s: string) => number>('a')),
      left<string, number>('a')
    )

    assert.deepStrictEqual(right<string, (s: string) => number>(f).ap_(right<string, string>('abc')), right(3))
    assert.deepStrictEqual(
      left<string, (s: string) => number>('a').ap_(right<string, string>('abc')),
      left<string, number>('a')
    )
  })

  it('chain', () => {
    const f = (s: string) => right<string, number>(s.length)
    assert.deepStrictEqual(right<string, string>('abc').chain(f), right(3))
    assert.deepStrictEqual(left<string, string>('a').chain(f), left('a'))
    assert.deepStrictEqual(either.chain(right<string, string>('abc'), f), right(3))
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

  it('tryCatch2v', () => {
    // tslint:disable-next-line: deprecation
    const e1 = tryCatch(() => {
      return JSON.parse(`{}`)
    })
    assert.deepStrictEqual(e1, right({}))

    // tslint:disable-next-line: deprecation
    const e2 = tryCatch(() => {
      return JSON.parse(``)
    })
    assert.deepStrictEqual(e2, left(new SyntaxError('Unexpected end of JSON input')))

    // tslint:disable-next-line: deprecation
    const e3 = tryCatch(() => {
      throw 'a string' // tslint:disable-line no-string-throw
    })
    assert.deepStrictEqual(e3, left(new Error('a string')))

    // tslint:disable-next-line: deprecation
    const e4 = tryCatch(() => {
      throw new Error('foo')
    }, toError)
    assert.deepStrictEqual(e4, left(new Error('foo')))

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
    assert.deepStrictEqual(e5, left(new Error('Bad response: 404')))
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(right(12).getOrElse(17), 12)
    assert.deepStrictEqual(left<string, number>('a').getOrElse(17), 17)
  })

  it('getOrElseL', () => {
    assert.deepStrictEqual(getOrElse(() => 17)(right(12)), 12)
    assert.deepStrictEqual(getOrElse(() => 17)(left<string, number>('a')), 17)
    assert.deepStrictEqual(getOrElse((l: string) => l.length + 1)(left<string, number>('a')), 2)
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

  it('getEq', () => {
    const equals = getEq(eqString, eqNumber).equals
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
    const f = (n: number) => (n >= 2 ? some(n) : none)
    assert.deepStrictEqual(either.traverse(option)(left<string, number>('foo'), f), some(left('foo')))
    assert.deepStrictEqual(either.traverse(option)(right(1), f), none)
    assert.deepStrictEqual(either.traverse(option)(right(3), f), some(right(3)))
  })

  it('sequence', () => {
    const old = T.sequence(option, either)
    const sequence = either.sequence(option)
    const x1 = right<number, Option<string>>(some('a'))
    assert.deepStrictEqual(sequence(x1), some(right('a')))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = left<number, Option<string>>(1)
    assert.deepStrictEqual(sequence(x2), some(left(1)))
    assert.deepStrictEqual(sequence(x2), old(x2))
    const x3 = right<number, Option<string>>(none)
    assert.deepStrictEqual(sequence(x3), none)
    assert.deepStrictEqual(sequence(x3), old(x3))
  })

  it('chainRec', () => {
    const chainRec = either.chainRec
    assert.deepStrictEqual(chainRec(1, () => left<string, Either<number, number>>('foo')), left('foo'))
    assert.deepStrictEqual(chainRec(1, () => right<string, Either<number, number>>(right(1))), right(1))
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(fromOptionL(() => 'default')(none), left('default'))
    assert.deepStrictEqual(fromOptionL(() => 'default')(some(1)), right(1))
  })

  it('filterOrElse', () => {
    assert.deepStrictEqual(right(12).filterOrElse(n => n > 10, -1), right(12))
    assert.deepStrictEqual(right(7).filterOrElse(n => n > 10, -1), left(-1))
    assert.deepStrictEqual(left<number, number>(12).filterOrElse(n => n > 10, -1), left(12))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    assert.deepStrictEqual(right('red').filterOrElse(isColor, -1), right('red'))
    assert.deepStrictEqual(right('foo').filterOrElse(isColor, -1), left(-1))
    assert.deepStrictEqual(left<number, string>(12).filterOrElse(isColor, -1), left(12))
  })

  it('filterOrElseL', () => {
    assert.deepStrictEqual(pipeOp(right<number, number>(12), filterOrElse(n => n > 10, () => -1)), right(12))
    assert.deepStrictEqual(right(7).filterOrElseL(n => n > 10, () => -1), left(-1))
    assert.deepStrictEqual(left<number, number>(12).filterOrElseL(n => n > 10, () => -1), left(12))
    assert.deepStrictEqual(right(7).filterOrElseL(n => n > 10, n => `invalid ${n}`), left('invalid 7'))
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`
    assert.deepStrictEqual(right('red').filterOrElseL(isColor, errorHandler), right('red'))
    assert.deepStrictEqual(right('foo').filterOrElseL(isColor, errorHandler), left('invalid color foo'))
    assert.deepStrictEqual(left<string, string>('error').filterOrElseL(isColor, errorHandler), left('error'))
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
    assert.deepStrictEqual(right<string, number>(1).alt(right<string, number>(2)), right<string, number>(1))
    assert.deepStrictEqual(right<string, number>(1).alt(left<string, number>('foo')), right<string, number>(1))
    assert.deepStrictEqual(left<string, number>('foo').alt(right<string, number>(1)), right<string, number>(1))
    assert.deepStrictEqual(left<string, number>('foo').alt(left<string, number>('bar')), left<string, number>('bar'))
    assert.deepStrictEqual(either.alt(right<string, number>(1), right<string, number>(2)), right<string, number>(1))
  })

  it('orElse', () => {
    assert.deepStrictEqual(
      pipeOp(right<string, number>(1), orElse(() => right<string, number>(2))),
      right<string, number>(1)
    )
    assert.deepStrictEqual(right<string, number>(1).orElse(() => left<string, number>('foo')), right<string, number>(1))
    assert.deepStrictEqual(left<string, number>('foo').orElse(() => right<string, number>(1)), right<string, number>(1))
    assert.deepStrictEqual(
      left<string, number>('foo').orElse(() => left<string, number>('bar')),
      left<string, number>('bar')
    )
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
    assert.deepStrictEqual(right<number, string>('bar').mapLeft(double), right('bar'))
    assert.deepStrictEqual(left<number, string>(2).mapLeft(double), left(4))
  })

  it('toString', () => {
    assert.strictEqual(right('bar').toString(), 'right("bar")')
    assert.strictEqual(right('bar').inspect(), 'right("bar")')
    assert.strictEqual(left('bar').toString(), 'left("bar")')
    assert.strictEqual(left('bar').inspect(), 'left("bar")')
  })

  it('swap', () => {
    assert.deepStrictEqual(right('bar').swap(), left('bar'))
    assert.deepStrictEqual(left('bar').swap(), right('bar'))
  })

  it('refineOrElse', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(right('red').refineOrElse(isColor, -1), right('red'))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(right('foo').refineOrElse(isColor, -1), left(-1))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(left<number, string>(12).refineOrElse(isColor, -1), left(12))
  })

  it('refineOrElseL', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(right('red').refineOrElseL(isColor, errorHandler), right('red'))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(right('foo').refineOrElseL(isColor, errorHandler), left('invalid color foo'))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(left<string, string>('error').refineOrElseL(isColor, errorHandler), left('error'))
  })

  it('fromRefinement', () => {
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    // tslint:disable-next-line: deprecation
    const from = fromRefinement(isColor, s => `invalid color ${s}`)
    assert.deepStrictEqual(from('red'), right('red'))
    assert.deepStrictEqual(from('foo'), left('invalid color foo'))
  })

  describe('getCompactable', () => {
    // tslint:disable-next-line: deprecation
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
    // tslint:disable-next-line: deprecation
    const F = getFilterable(monoidString)
    const p = (n: number) => n > 2
    it('partition', () => {
      assert.deepStrictEqual(F.partition(left<string, number>('123'), p), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partition(right<string, number>(1), p), {
        left: right(1),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partition(right<string, number>(3), p), {
        left: left(monoidString.empty),
        right: right(3)
      })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(F.partitionMap(left<string, number>('123'), f), {
        left: left('123'),
        right: left('123')
      })
      assert.deepStrictEqual(F.partitionMap(right<string, number>(1), f), {
        left: right(0),
        right: left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partitionMap(right<string, number>(3), f), {
        left: left(monoidString.empty),
        right: right(4)
      })
    })
    it('filter', () => {
      assert.deepStrictEqual(F.filter(left<string, number>('123'), p), left('123'))
      assert.deepStrictEqual(F.filter(right<string, number>(1), p), left(monoidString.empty))
      assert.deepStrictEqual(F.filter(right<string, number>(3), p), right(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(F.filterMap(left<string, number>('123'), f), left('123'))
      assert.deepStrictEqual(F.filterMap(right<string, number>(1), f), left(monoidString.empty))
      assert.deepStrictEqual(F.filterMap(right<string, number>(3), f), right(4))
    })
  })

  describe('getWitherable', () => {
    const W = getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(left<string, number>('foo'), f), new I.Identity(left('foo')))
      assert.deepStrictEqual(witherIdentity(right<string, number>(1), f), new I.Identity(left(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(right<string, number>(3), f), new I.Identity(right(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(left<string, number>('foo'), f),
        new I.Identity({
          left: left('foo'),
          right: left('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(right<string, number>(1), f),
        new I.Identity({
          left: right(0),
          right: left(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
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
    assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(S.concat(left('a'), right(2)), right(2))
    assert.deepStrictEqual(S.concat(right(1), left('b')), right(1))
    assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplySemigroup', () => {
    const S = getApplySemigroup<string, number>(semigroupSum)
    assert.deepStrictEqual(S.concat(left('a'), left('b')), left('a'))
    assert.deepStrictEqual(S.concat(left('a'), right(2)), left('a'))
    assert.deepStrictEqual(S.concat(right(1), left('b')), left('b'))
    assert.deepStrictEqual(S.concat(right(1), right(2)), right(3))
  })

  it('getApplyMonoid', () => {
    const S = getApplyMonoid<string, number>(monoidSum)
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

  it('elem', () => {
    assert.deepStrictEqual(elem(eqNumber)(1)(right(1)), true)
    assert.deepStrictEqual(elem(eqNumber)(1)(right(2)), false)
    assert.deepStrictEqual(elem(eqNumber)(1)(left('a')), false)
  })

  describe('Validation', () => {
    it('getValidation', () => {
      const M = getValidation(monoidString)
      const f = (s: string) => right<string, number>(s.length)
      assert.deepStrictEqual(M.chain(right('abc'), f), right(3))
      assert.deepStrictEqual(M.chain(left<string, string>('a'), f), left('a'))
      assert.deepStrictEqual(M.chain(left('a'), () => left('b')), left('a'))
      assert.deepStrictEqual(M.of(1), right(1))
      const double = (n: number) => n * 2
      assert.deepStrictEqual(M.ap(right(double), right(1)), right(2))
      assert.deepStrictEqual(M.ap(right(double), left('foo')), left('foo'))
      assert.deepStrictEqual(M.ap(left<string, (n: number) => unknown>('foo'), right(1)), left('foo'))
      assert.deepStrictEqual(M.ap(left<string, (n: number) => unknown>('foo'), left('bar')), left('foobar'))
      assert.deepStrictEqual(M.alt(left('a'), right(1)), right(1))
      assert.deepStrictEqual(M.alt(right(1), left('a')), right(1))
      assert.deepStrictEqual(M.alt(left('a'), left('b')), left('ab'))
    })

    it('getValidationSemigroup', () => {
      const { concat } = getValidationSemigroup(semigroupString, semigroupString)
      assert.deepStrictEqual(concat(right('a'), right('b')), right('ab'))
      assert.deepStrictEqual(concat(right('a'), left('b')), left('b'))
      assert.deepStrictEqual(concat(left('b'), right('a')), left('b'))
      assert.deepStrictEqual(concat(left('a'), left('b')), left('ab'))
    })

    it('getValidationMonoid', () => {
      const M = getValidationMonoid(monoidString, monoidSum)
      assert.deepStrictEqual(M.concat(right(1), right(2)), right(3))
      assert.deepStrictEqual(M.concat(right(1), left('foo')), left('foo'))
      assert.deepStrictEqual(M.concat(left('foo'), right(1)), left('foo'))
      assert.deepStrictEqual(M.concat(left('foo'), left('bar')), left('foobar'))
    })
  })
})
