import * as assert from 'assert'
import { span } from '../src/Filterable'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getFilterable as getEitherFilterable, left, right } from '../src/Either'
import { monoidString } from '../src/Monoid'
import { failure, getFilterable as getValidationFilterable, success } from '../src/Validation'
import { StrMap, strmap } from '../src/StrMap'

const p = (n: number) => n > 2

describe('Filterable', () => {
  it('span', () => {
    assert.deepEqual(span(array)([], p), {
      left: [],
      right: []
    })
    assert.deepEqual(span(array)([3, 2, 1, 2, 3], p), {
      left: [3],
      right: [2, 1, 2, 3]
    })

    assert.deepEqual(span(option)(none, p), {
      left: none,
      right: none
    })
    assert.deepEqual(span(option)(some(1), p), {
      left: none,
      right: some(1)
    })
    assert.deepEqual(span(option)(some(3), p), {
      left: some(3),
      right: none
    })

    const filterableEither = getEitherFilterable(monoidString)
    assert.deepEqual(span(filterableEither)(left<string, number>('foo'), p), {
      left: left('foo'),
      right: left('foo')
    })
    assert.deepEqual(span(filterableEither)(right<string, number>(1), p), {
      left: left(monoidString.empty),
      right: right(1)
    })
    assert.deepEqual(span(filterableEither)(right<string, number>(3), p), {
      left: right(3),
      right: left(monoidString.empty)
    })

    const filterableValidation = getValidationFilterable(monoidString)
    assert.deepEqual(span(filterableValidation)(failure<string, number>('foo'), p), {
      left: failure('foo'),
      right: failure('foo')
    })
    assert.deepEqual(span(filterableValidation)(success<string, number>(1), p), {
      left: failure(monoidString.empty),
      right: success(1)
    })
    assert.deepEqual(span(filterableValidation)(success<string, number>(3), p), {
      left: success(3),
      right: failure(monoidString.empty)
    })

    assert.deepEqual(span(strmap)(new StrMap<number>({}), p), {
      left: new StrMap({}),
      right: new StrMap({})
    })

    assert.deepEqual(span(strmap)(new StrMap<number>({ a: 3, b: 2, c: 1, d: 2, e: 3 }), p), {
      left: new StrMap({ a: 3 }),
      right: new StrMap({ b: 2, c: 1, d: 2, e: 3 })
    })
    assert.deepEqual(span(strmap)(new StrMap<number>({ e: 3, d: 2, c: 1, b: 2, a: 3 }), p), {
      left: new StrMap({ e: 3 }),
      right: new StrMap({ d: 2, c: 1, b: 2, a: 3 })
    })
  })
})
