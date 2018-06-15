import * as assert from 'assert'
import { eitherBool, optionBool, partitioned } from '../src/Filterable'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'

describe('Filterable', () => {
  it('partitioned', () => {
    assert.deepEqual(partitioned(1, 2), {
      no: 1,
      yes: 2
    })
  })

  it('eitherBool', () => {
    const p = (n: number) => n > 2
    const eitherP = eitherBool(p)
    assert.deepEqual(eitherP(1), left(1))
    assert.deepEqual(eitherP(3), right(3))
  })

  it('optionBool', () => {
    const p = (n: number) => n > 2
    const optionP = optionBool(p)
    assert.deepEqual(optionP(1), none)
    assert.deepEqual(optionP(3), some(3))
  })
})
