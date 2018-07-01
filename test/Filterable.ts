import * as assert from 'assert'
import { uniq } from '../src/Filterable'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getFilterable as getEitherFilterable, left, right } from '../src/Either'
import { monoidString } from '../src/Monoid'
import { failure, getFilterable as getValidationFilterable, success } from '../src/Validation'
import { StrMap, strmap } from '../src/StrMap'
import { setoidNumber } from '../src/Setoid'

const filterableEither = getEitherFilterable(monoidString)
const filterableValidation = getValidationFilterable(monoidString)

describe('Filterable', () => {
  it('uniq', () => {
    const uniqueArray = uniq(array)
    assert.deepEqual(uniqueArray(setoidNumber)([]), [])
    assert.deepEqual(uniqueArray(setoidNumber)([3, 2, 1, 2, 3]), [3, 2, 1])

    const uniqueOption = uniq(option)
    assert.deepEqual(uniqueOption(setoidNumber)(none), none)
    assert.deepEqual(uniqueOption(setoidNumber)(some(1)), some(1))
    assert.deepEqual(uniqueOption(setoidNumber)(some(3)), some(3))

    const uniqueFilterableEither = uniq(filterableEither)
    assert.deepEqual(uniqueFilterableEither(setoidNumber)(left<string, number>('foo')), left('foo'))
    assert.deepEqual(uniqueFilterableEither(setoidNumber)(right<string, number>(1)), right(1))
    assert.deepEqual(uniqueFilterableEither(setoidNumber)(right<string, number>(3)), right(3))

    const uniqueFilterableValidation = uniq(filterableValidation)
    assert.deepEqual(uniqueFilterableValidation(setoidNumber)(failure<string, number>('foo')), failure('foo'))
    assert.deepEqual(uniqueFilterableValidation(setoidNumber)(success<string, number>(1)), success(1))
    assert.deepEqual(uniqueFilterableValidation(setoidNumber)(success<string, number>(3)), success(3))

    const uniqueStrmap = uniq(strmap)
    assert.deepEqual(uniqueStrmap(setoidNumber)(new StrMap<number>({})), new StrMap({}))
    assert.deepEqual(
      uniqueStrmap(setoidNumber)(new StrMap<number>({ a: 3, b: 2, c: 1, d: 2, e: 3 })),
      new StrMap({ a: 3, b: 2, c: 1 })
    )
    assert.deepEqual(
      uniqueStrmap(setoidNumber)(new StrMap<number>({ e: 3, d: 2, c: 1, b: 2, a: 3 })),
      new StrMap({ e: 3, d: 2, c: 1 })
    )
  })
})
