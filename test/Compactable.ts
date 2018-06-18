import * as assert from 'assert'
import { eitherBool, optionBool } from '../src/Filterable'
import { left, right } from '../src/Either'
import { none, some } from '../src/Option'
import { separated } from '../src/Compactable'

describe('Compactable', () => {
  it('separated', () => {
    assert.deepEqual(separated(1, 2), {
      left: 1,
      right: 2
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
