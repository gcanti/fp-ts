import * as B from '../src/boolean'
import { deepStrictEqual } from './util'

describe('boolean', () => {
  it('fold', () => {
    deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(true),
      'true'
    )
    deepStrictEqual(
      B.fold(
        () => 'false',
        () => 'true'
      )(false),
      'false'
    )
  })
})
