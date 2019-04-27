import * as assert from 'assert'
import * as E from '../src/Either'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString, monoidSum } from '../src/Monoid'
import { none, option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { eqNumber, eqString } from '../src/Eq'
import { showString } from '../src/Show'

describe('Either', () => {
  it('fold', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    assert.strictEqual(E.fold(E.left('abc'), f, g), 'left3')
    assert.strictEqual(E.fold(E.right('abc'), f, g), 'right3')
  })

  it('map', () => {
    const f = (s: string): number => s.length
    assert.deepStrictEqual(E.either.map(E.right('abc'), f), E.right(3))
    assert.deepStrictEqual(E.either.map(E.left('s'), f), E.left('s'))
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    assert.deepStrictEqual(E.either.bimap(E.right(1), f, g), E.right(false))
  })

  it('ap', () => {
    const f = (s: string): number => s.length
    assert.deepStrictEqual(E.either.ap(E.right(f), E.right('abc')), E.right(3))
    assert.deepStrictEqual(E.either.ap(E.right(f), E.left('maError')), E.left('maError'))
    assert.deepStrictEqual(E.either.ap(E.left('mabError'), E.right('abc')), E.left('mabError'))
    assert.deepStrictEqual(E.either.ap(E.left('mabError'), E.left('maError')), E.left('mabError'))
  })

  it('chain', () => {
    const f = (s: string) => E.right(s.length)
    assert.deepStrictEqual(E.either.chain(E.right('abc'), f), E.right(3))
    assert.deepStrictEqual(E.either.chain(E.left('maError'), f), E.left('maError'))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = E.fromPredicate(predicate, handleError)
    assert.deepStrictEqual(gt2(3), E.right(3))
    assert.deepStrictEqual(gt2(1), E.left('Invalid number 1'))

    // refinements
    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const from = E.fromPredicate(isColor, s => `invalid color ${s}`)
    assert.deepStrictEqual(from('red'), E.right('red'))
    assert.deepStrictEqual(from('foo'), E.left('invalid color foo'))
  })

  it('tryCatch', () => {
    const e1 = E.tryCatch(() => {
      return 1
    }, E.toError)
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = E.tryCatch(() => {
      // tslint:disable-next-line: no-string-throw
      throw 'string error'
    }, E.toError)
    assert.deepStrictEqual(e2, E.left(new Error('string error')))
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(E.getOrElse(E.right(12), () => 17), 12)
    assert.deepStrictEqual(E.getOrElse(E.left('a'), () => 17), 17)
    assert.deepStrictEqual(E.getOrElse(E.left('a'), (l: string) => l.length + 1), 2)
  })

  it('fromNullable', () => {
    assert.deepStrictEqual(E.fromNullable(null, 'default'), E.left('default'))
    assert.deepStrictEqual(E.fromNullable(undefined, 'default'), E.left('default'))
    assert.deepStrictEqual(E.fromNullable(1, 'default'), E.right(1))
  })

  it('getEq', () => {
    const equals = E.getEq(eqString, eqNumber).equals
    assert.strictEqual(equals(E.right(1), E.right(1)), true)
    assert.strictEqual(equals(E.right(1), E.right(2)), false)
    assert.strictEqual(equals(E.right(1), E.left('foo')), false)
    assert.strictEqual(equals(E.left('foo'), E.left('foo')), true)
    assert.strictEqual(equals(E.left('foo'), E.left('bar')), false)
    assert.strictEqual(equals(E.left('foo'), E.right(1)), false)
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      E.either.traverse(option)(E.left('foo'), a => (a >= 2 ? some(a) : none)),
      some(E.left('foo'))
    )
    assert.deepStrictEqual(E.either.traverse(option)(E.right(1), a => (a >= 2 ? some(a) : none)), none)
    assert.deepStrictEqual(E.either.traverse(option)(E.right(3), a => (a >= 2 ? some(a) : none)), some(E.right(3)))
  })

  it('sequence', () => {
    const sequence = E.either.sequence(option)
    const x1 = E.right(some('a'))
    assert.deepStrictEqual(sequence(x1), some(E.right('a')))
    const x2 = E.left(1)
    assert.deepStrictEqual(sequence(x2), some(E.left(1)))
    const x3 = E.right(none)
    assert.deepStrictEqual(sequence(x3), none)
  })

  it('chainRec', () => {
    const chainRec = E.either.chainRec
    assert.deepStrictEqual(chainRec(1, () => E.left('foo')), E.left('foo'))
    assert.deepStrictEqual(chainRec(1, () => E.right(E.right(1))), E.right(1))
    assert.deepStrictEqual(
      chainRec(1, a => {
        if (a < 5) {
          return E.right(E.left(a + 1))
        } else {
          return E.right(E.right(a))
        }
      }),
      E.right(5)
    )
  })

  it('filterOrElse', () => {
    const gt10 = (n: number): boolean => n > 10
    assert.deepStrictEqual(E.filterOrElse(E.right(12), gt10, () => -1), E.right(12))
    assert.deepStrictEqual(E.filterOrElse(E.right(7), gt10, () => -1), E.left(-1))
    assert.deepStrictEqual(E.filterOrElse(E.left(12), gt10, () => -1), E.left(12))
    assert.deepStrictEqual(E.filterOrElse(E.right(7), gt10, n => `invalid ${n}`), E.left('invalid 7'))

    type Color = 'red' | 'blue'
    const isColor = (s: string): s is Color => s === 'red' || s === 'blue'
    const errorHandler = (s: string) => `invalid color ${s}`

    assert.deepStrictEqual(E.filterOrElse(E.right('red'), isColor, errorHandler), E.right('red'))
    assert.deepStrictEqual(E.filterOrElse(E.right('foo'), isColor, errorHandler), E.left('invalid color foo'))
    assert.deepStrictEqual(E.filterOrElse(E.left('err'), isColor, errorHandler), E.left('err'))
  })

  it('isLeft', () => {
    assert.strictEqual(E.isLeft(E.right(1)), false)
    assert.strictEqual(E.isLeft(E.left(1)), true)
  })

  it('isRight', () => {
    assert.strictEqual(E.isRight(E.right(1)), true)
    assert.strictEqual(E.isRight(E.left(1)), false)
  })

  it('orElse', () => {
    assert.deepStrictEqual(E.orElse(E.right(1), () => E.right(2)), E.right(1))
    assert.deepStrictEqual(E.orElse(E.right(1), () => E.left('foo')), E.right(1))
    assert.deepStrictEqual(E.orElse(E.left('foo'), () => E.right(1)), E.right(1))
    assert.deepStrictEqual(E.orElse(E.left('foo'), () => E.left('bar')), E.left('bar'))
  })

  it('extend', () => {
    assert.deepStrictEqual(E.either.extend(E.right(1), () => 2), E.right(2))
    assert.deepStrictEqual(E.either.extend(E.left('err'), () => 2), E.left('err'))
  })

  it('reduce', () => {
    assert.deepStrictEqual(E.either.reduce(E.right('bar'), 'foo', (b, a) => b + a), 'foobar')
    assert.deepStrictEqual(E.either.reduce(E.left('bar'), 'foo', (b, a) => b + a), 'foo')
  })

  it('foldMap', () => {
    const foldMap = E.either.foldMap(monoidString)
    const x1 = E.right('a')
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'a')
    const x2 = E.left(1)
    assert.strictEqual(foldMap(x2, f1), '')
  })

  it('reduceRight', () => {
    const reduceRight = E.either.reduceRight
    const x1 = E.right('a')
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(reduceRight(x1, init1, f1), 'a')
    const x2 = E.left(1)
    assert.strictEqual(reduceRight(x2, init1, f1), '')
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(E.mapLeft(E.right('bar'), double), E.right('bar'))
    assert.deepStrictEqual(E.mapLeft(E.left(2), double), E.left(4))
  })

  it('swap', () => {
    assert.deepStrictEqual(E.swap(E.right('bar')), E.left('bar'))
    assert.deepStrictEqual(E.swap(E.left('bar')), E.right('bar'))
  })

  describe('getCompactable', () => {
    const C = E.getCompactable(monoidString)
    it('compact', () => {
      assert.deepStrictEqual(C.compact(E.left('1')), E.left('1'))
      assert.deepStrictEqual(C.compact(E.right(none)), E.left(monoidString.empty))
      assert.deepStrictEqual(C.compact(E.right(some(123))), E.right(123))
    })

    it('separate', () => {
      assert.deepStrictEqual(C.separate(E.left('123')), { left: E.left('123'), right: E.left('123') })
      assert.deepStrictEqual(C.separate(E.right(E.left('123'))), {
        left: E.right('123'),
        right: E.left(monoidString.empty)
      })
      assert.deepStrictEqual(C.separate(E.right(E.right('123'))), {
        left: E.left(monoidString.empty),
        right: E.right('123')
      })
    })
  })

  describe('getFilterable', () => {
    const F = E.getFilterable(monoidString)
    const p = (n: number) => n > 2
    it('partition', () => {
      assert.deepStrictEqual(F.partition(E.left('123'), p), {
        left: E.left('123'),
        right: E.left('123')
      })
      assert.deepStrictEqual(F.partition(E.right(1), p), {
        left: E.right(1),
        right: E.left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partition(E.right(3), p), {
        left: E.left(monoidString.empty),
        right: E.right(3)
      })
    })
    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))
      assert.deepStrictEqual(F.partitionMap(E.left('123'), f), {
        left: E.left('123'),
        right: E.left('123')
      })
      assert.deepStrictEqual(F.partitionMap(E.right(1), f), {
        left: E.right(0),
        right: E.left(monoidString.empty)
      })
      assert.deepStrictEqual(F.partitionMap(E.right(3), f), {
        left: E.left(monoidString.empty),
        right: E.right(4)
      })
    })
    it('filter', () => {
      assert.deepStrictEqual(F.filter(E.left('123'), p), E.left('123'))
      assert.deepStrictEqual(F.filter(E.right(1), p), E.left(monoidString.empty))
      assert.deepStrictEqual(F.filter(E.right(3), p), E.right(3))
    })
    it('filterMap', () => {
      const f = (n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(F.filterMap(E.left('123'), f), E.left('123'))
      assert.deepStrictEqual(F.filterMap(E.right(1), f), E.left(monoidString.empty))
      assert.deepStrictEqual(F.filterMap(E.right(3), f), E.right(4))
    })
  })

  describe('getWitherable', () => {
    const W = E.getWitherable(monoidString)
    const p = (n: number) => n > 2
    it('wither', () => {
      const f = (n: number) => I.identity.of(p(n) ? some(n + 1) : none)
      const witherIdentity = W.wither(I.identity)
      assert.deepStrictEqual(witherIdentity(E.left('foo'), f), I.identity.of(E.left('foo')))
      assert.deepStrictEqual(witherIdentity(E.right(1), f), I.identity.of(E.left(monoidString.empty)))
      assert.deepStrictEqual(witherIdentity(E.right(3), f), I.identity.of(E.right(4)))
    })
    it('wilt', () => {
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => I.identity.of(p(n) ? E.right(n + 1) : E.left(n - 1))
      assert.deepStrictEqual(
        wiltIdentity(E.left('foo'), f),
        I.identity.of({
          left: E.left('foo'),
          right: E.left('foo')
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(E.right(1), f),
        I.identity.of({
          left: E.right(0),
          right: E.left(monoidString.empty)
        })
      )
      assert.deepStrictEqual(
        wiltIdentity(E.right(3), f),
        I.identity.of({
          left: E.left(monoidString.empty),
          right: E.right(4)
        })
      )
    })
  })

  it('getSemigroup', () => {
    const S = E.getSemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(E.left('a'), E.left('b')), E.left('a'))
    assert.deepStrictEqual(S.concat(E.left('a'), E.right(2)), E.right(2))
    assert.deepStrictEqual(S.concat(E.right(1), E.left('b')), E.right(1))
    assert.deepStrictEqual(S.concat(E.right(1), E.right(2)), E.right(3))
  })

  it('getApplySemigroup', () => {
    const S = E.getApplySemigroup(semigroupSum)
    assert.deepStrictEqual(S.concat(E.left('a'), E.left('b')), E.left('a'))
    assert.deepStrictEqual(S.concat(E.left('a'), E.right(2)), E.left('a'))
    assert.deepStrictEqual(S.concat(E.right(1), E.left('b')), E.left('b'))
    assert.deepStrictEqual(S.concat(E.right(1), E.right(2)), E.right(3))
  })

  it('getApplyMonoid', () => {
    const S = E.getApplyMonoid(monoidSum)
    assert.deepStrictEqual(S.concat(E.left('a'), S.empty), E.left('a'))
    assert.deepStrictEqual(S.concat(S.empty, E.left('b')), E.left('b'))
    assert.deepStrictEqual(S.concat(E.right(1), S.empty), E.right(1))
    assert.deepStrictEqual(S.concat(S.empty, E.right(2)), E.right(2))
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      assert.deepStrictEqual(
        E.either.chain(E.either.throwError('error'), a => E.right(a)),
        E.either.throwError('error')
      )
    })

    it('fromOption', () => {
      assert.deepStrictEqual(E.either.fromOption(none, () => 'error'), E.left('error'))
      assert.deepStrictEqual(E.either.fromOption(some(1), () => 'error'), E.right(1))
    })
  })

  it('parseJSON', () => {
    assert.deepStrictEqual(E.parseJSON('{"a":1}', E.toError), E.right({ a: 1 }))
    assert.deepStrictEqual(
      E.parseJSON('{"a":}', E.toError),
      E.left(new SyntaxError('Unexpected token } in JSON at position 5'))
    )
  })

  it('stringifyJSON', () => {
    assert.deepStrictEqual(E.stringifyJSON({ a: 1 }, E.toError), E.right('{"a":1}'))
    const circular: any = { ref: null }
    circular.ref = circular
    assert.deepStrictEqual(
      E.stringifyJSON(circular, E.toError),
      E.left(new TypeError('Converting circular structure to JSON'))
    )
    interface Person {
      name: string
      age: number
    }
    const person: Person = { name: 'Giulio', age: 45 }
    assert.deepStrictEqual(E.stringifyJSON(person, E.toError), E.right('{"name":"Giulio","age":45}'))
  })

  it('getShow', () => {
    const S = E.getShow(showString, showString)
    assert.strictEqual(S.show(E.left('a')), `left("a")`)
    assert.strictEqual(S.show(E.right('a')), `right("a")`)
  })
})
