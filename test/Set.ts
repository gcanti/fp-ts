import * as assert from 'assert'
import { left, right } from '../src/Either'
import { ordNumber } from '../src/Ord'
import {
  chain,
  difference,
  every,
  filter,
  fromArray,
  getIntersectionSemigroup,
  getSetoid,
  getUnionMonoid,
  insert,
  intersection,
  map,
  member,
  partition,
  partitionMap,
  reduce,
  remove,
  singleton,
  some,
  subset,
  toArray,
  union,
  difference2v,
  compact,
  separate,
  filterMap,
  foldMap,
  getShow
} from '../src/Set'
import { Setoid, setoidNumber, setoidString, contramap, getStructSetoid } from '../src/Setoid'
import { none, some as optionSome } from '../src/Option'
import { getArrayMonoid } from '../src/Monoid'
import { showString } from '../src/Show'

const gte2 = (n: number) => n >= 2

interface Foo {
  x: string
}
const foo = (x: string): Foo => ({ x })
const fooSetoid: Setoid<Foo> = {
  equals: (a: Foo, b: Foo) => a.x === b.x
}

describe('Set', () => {
  it('toArray', () => {
    assert.deepStrictEqual(toArray(ordNumber)(new Set()), [])
    assert.deepStrictEqual(toArray(ordNumber)(new Set([1, 2, 3])), [1, 2, 3])
    assert.deepStrictEqual(toArray(ordNumber)(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new Set([1, 2, 3]), new Set([1, 2, 3])), true)
    assert.strictEqual(S.equals(new Set([1, 2, 3]), new Set([1, 2])), false)
    assert.strictEqual(S.equals(new Set([1, 2]), new Set([1, 2, 3])), false)
  })

  it('some', () => {
    assert.strictEqual(some(new Set(), (s: string) => s.trim() === ''), false)
    assert.strictEqual(some(new Set([1, 2, 3]), gte2), true)
    assert.strictEqual(some(new Set([1]), gte2), false)
  })

  it('map', () => {
    assert.deepStrictEqual(map(setoidNumber)(new Set([]), x => x % 2), new Set([]))
    assert.deepStrictEqual(map(setoidNumber)(new Set([1, 2, 3, 4]), x => x % 2), new Set([0, 1]))
    assert.deepStrictEqual(map(setoidString)(new Set([1, 2, 3, 4]), x => `${x % 2}`), new Set(['0', '1']))
  })

  it('every', () => {
    assert.strictEqual(every(new Set([1, 2, 3]), gte2), false)
    assert.strictEqual(every(new Set([2, 3]), gte2), true)
  })

  it('chain', () => {
    assert.deepStrictEqual(chain(setoidString)(new Set<number>([]), x => new Set([x.toString()])), new Set([]))
    assert.deepStrictEqual(chain(setoidString)(new Set([1, 2]), () => new Set([])), new Set([]))
    assert.deepStrictEqual(
      chain(setoidString)(new Set([1, 2]), x => new Set([`${x}`, `${x + 1}`])),
      new Set(['1', '2', '3'])
    )
  })

  it('subset', () => {
    assert.strictEqual(subset(setoidNumber)(new Set([1, 2]), new Set([1, 2, 3])), true)
    assert.strictEqual(subset(setoidNumber)(new Set([1, 2, 4]), new Set([1, 2, 3])), false)
  })

  it('filter', () => {
    assert.deepStrictEqual(filter(new Set([1, 2, 3]), gte2), new Set([2, 3]))

    // refinements
    const x: Set<string | number> = new Set([1, 'a', 2])
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = filter(x, isNumber)
    assert.deepStrictEqual(actual, new Set([1, 2]))
  })

  it('partition', () => {
    assert.deepStrictEqual(partition(new Set([]), () => true), { right: new Set([]), left: new Set([]) })
    assert.deepStrictEqual(partition(new Set([1]), () => true), { right: new Set([1]), left: new Set([]) })
    assert.deepStrictEqual(partition(new Set([1]), () => false), { right: new Set([]), left: new Set([1]) })
    assert.deepStrictEqual(partition(new Set([1, 2, 3, 4]), x => x % 2 === 0), {
      right: new Set([2, 4]),
      left: new Set([1, 3])
    })

    // refinements
    const x: Set<string | number> = new Set([1, 'a', 2])
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = partition(x, isNumber)
    assert.deepStrictEqual(actual, {
      left: new Set(['a']),
      right: new Set([1, 2])
    })
  })

  it('member', () => {
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)(new Set([1, 2, 3]))(1), true)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)(new Set([1, 2, 3]))(4), false)
    // tslint:disable-next-line: deprecation
    assert.strictEqual(member(setoidNumber)(new Set<number>([]))(4), false)
  })

  it('union', () => {
    assert.deepStrictEqual(union(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
  })

  it('intersection', () => {
    assert.deepStrictEqual(intersection(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([1]))
  })

  it('partitionMap', () => {
    assert.deepStrictEqual(partitionMap(setoidNumber, setoidString)(new Set([]), left), {
      left: new Set([]),
      right: new Set([])
    })
    assert.deepStrictEqual(
      partitionMap(setoidNumber, setoidString)(new Set([1, 2, 3]), x => (x % 2 === 0 ? left(x) : right(`${x}`))),
      {
        left: new Set([2]),
        right: new Set(['1', '3'])
      }
    )
    const SL = getStructSetoid({ value: setoidNumber })
    const SR = getStructSetoid({ value: setoidString })
    assert.deepStrictEqual(
      partitionMap(SL, SR)(new Set([{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }]), x =>
        x.value % 2 === 0 ? left({ value: 2 }) : right({ value: 'odd' })
      ),
      {
        left: new Set([{ value: 2 }]),
        right: new Set([{ value: 'odd' }])
      }
    )
  })

  it('getUnionMonoid', () => {
    const M = getUnionMonoid(setoidNumber)
    assert.deepStrictEqual(M.concat(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
    assert.deepStrictEqual(M.concat(new Set([1, 2]), M.empty), new Set([1, 2]))
    assert.deepStrictEqual(M.concat(M.empty, new Set([1, 3])), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const S = getIntersectionSemigroup(setoidNumber)
    assert.deepStrictEqual(S.concat(new Set([1, 2]), new Set([1, 3])), new Set([1]))
  })

  it('difference', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(difference(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([3]))
  })

  it('difference2v', () => {
    assert.deepStrictEqual(difference2v(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([2]))
  })

  it('reduce', () => {
    assert.deepStrictEqual(reduce(ordNumber)(new Set([1, 2, 3]), '', (b, a) => b + a), '123')
    assert.deepStrictEqual(reduce(ordNumber)(new Set([3, 2, 1]), '', (b, a) => b + a), '123')
  })

  it('foldMap', () => {
    assert.deepStrictEqual(foldMap(ordNumber, getArrayMonoid<number>())(new Set([1, 2, 3]), a => [a]), [1, 2, 3])
    assert.deepStrictEqual(foldMap(ordNumber, getArrayMonoid<number>())(new Set([3, 2, 1]), a => [a]), [1, 2, 3])
  })

  it('singleton', () => {
    assert.deepStrictEqual(singleton(1), new Set([1]))
  })

  it('insert', () => {
    const x = new Set([1, 2])
    assert.deepStrictEqual(insert(setoidNumber)(3, x), new Set([1, 2, 3]))
    // should return the same ference if the element is already a member
    assert.strictEqual(insert(setoidNumber)(2, x), x)
  })

  it('remove', () => {
    assert.deepStrictEqual(remove(setoidNumber)(3, new Set([1, 2])), new Set([1, 2]))
    assert.deepStrictEqual(remove(setoidNumber)(1, new Set([1, 2])), new Set([2]))
  })

  it('fromArray', () => {
    assert.deepStrictEqual(fromArray(setoidNumber)([]), new Set([]))
    assert.deepStrictEqual(fromArray(setoidNumber)([1]), new Set([1]))
    assert.deepStrictEqual(fromArray(setoidNumber)([1, 1]), new Set([1]))
    assert.deepStrictEqual(fromArray(setoidNumber)([1, 2]), new Set([1, 2]))

    assert.deepStrictEqual(fromArray(fooSetoid)(['a', 'a', 'b'].map(foo)), new Set(['a', 'b'].map(foo)))
  })

  it('compact', () => {
    assert.deepStrictEqual(compact(setoidNumber)(new Set([optionSome(1), none, optionSome(2)])), new Set([1, 2]))
    type R = { id: string }
    const S: Setoid<R> = contramap(x => x.id, setoidString)
    assert.deepStrictEqual(
      compact(S)(new Set([optionSome({ id: 'a' }), none, optionSome({ id: 'a' })])),
      new Set([{ id: 'a' }])
    )
  })

  it('separate', () => {
    assert.deepStrictEqual(
      separate(setoidString, setoidNumber)(
        new Set([right<string, number>(1), left<string, number>('a'), right<string, number>(2)])
      ),
      {
        left: new Set(['a']),
        right: new Set([1, 2])
      }
    )
    type L = { error: string }
    type R = { id: string }
    const SL: Setoid<L> = contramap(x => x.error, setoidString)
    const SR: Setoid<R> = contramap(x => x.id, setoidString)
    assert.deepStrictEqual(
      separate(SL, SR)(
        new Set([
          right<L, R>({ id: 'a' }),
          left<L, R>({ error: 'error' }),
          right<L, R>({ id: 'a' }),
          left<L, R>({ error: 'error' })
        ])
      ),
      {
        left: new Set([{ error: 'error' }]),
        right: new Set([{ id: 'a' }])
      }
    )
  })

  it('filterMap', () => {
    assert.deepStrictEqual(
      filterMap(setoidNumber)(new Set(['a', 'bb', 'ccc']), s => (s.length > 1 ? optionSome(s.length) : none)),
      new Set([2, 3])
    )
    type R = { id: string }
    const S: Setoid<R> = contramap(x => x.id, setoidString)
    assert.deepStrictEqual(filterMap(S)(new Set([{ id: 'a' }, { id: 'a' }]), optionSome), new Set([{ id: 'a' }]))
  })

  it('getShow', () => {
    const S = getShow(showString)
    const s1 = new Set<string>([])
    assert.strictEqual(S.show(s1), `new Set([])`)
    const s2 = new Set<string>(['a'])
    assert.strictEqual(S.show(s2), `new Set(["a"])`)
    const s3 = new Set<string>(['a', 'b'])
    assert.strictEqual(S.show(s3), `new Set(["a", "b"])`)
  })
})
