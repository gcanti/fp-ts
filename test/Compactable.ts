import * as assert from 'assert'
import { Either, left, right } from '../src/Either'
import { none, some, Option, option } from '../src/Option'
import { compactDefault, separateDefault, separated, Separated } from '../src/Compactable'
import { identity } from '../src/function'

describe('Compactable', () => {
  const separate = <L, A>(fa: Option<Either<L, A>>): Separated<Option<L>, Option<A>> =>
    fa.foldL(
      () => separated(none, none),
      e => e.fold<Separated<Option<L>, Option<A>>>(l => separated(some(l), none), r => separated(none, some(r)))
    )

  const compact = <A>(fa: Option<Option<A>>): Option<A> => fa.chain(identity)

  it('separated', () => {
    assert.deepEqual(separated(1, 2), {
      left: 1,
      right: 2
    })
  })

  it('compactDefault', () => {
    const F = {
      ...option,
      separate
    }
    const compactDefaultF = compactDefault(F)
    assert.deepEqual(compactDefaultF(none), compact(none))
    assert.deepEqual(compactDefaultF(some(none)), compact(some(none)))
    assert.deepEqual(compactDefaultF(some(some(123))), compact(some(some(123))))
  })

  it('separateDefault', () => {
    const F = {
      ...option,
      compact
    }

    const separateDefaultF = separateDefault(F)
    assert.deepEqual(separateDefaultF(none), separate(none))
    assert.deepEqual(separateDefaultF(some(left('123'))), separate(some(left('123'))))
    assert.deepEqual(separateDefaultF(some(right('123'))), separate(some(right('123'))))
  })
})
