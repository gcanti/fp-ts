import * as assert from 'assert'
import { Either, left, right } from '../src/Either'
import { none, some, Option, option } from '../src/Option'
import { getCompactFromSeparate, getSeparateFromCompact, separated, Separated } from '../src/Compactable'
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

  it('getCompactFromSeparate', () => {
    const F = {
      ...option,
      separate
    }
    const compactDefault = getCompactFromSeparate(F)
    assert.deepEqual(compactDefault(none), compact(none))
    assert.deepEqual(compactDefault(some(none)), compact(some(none)))
    assert.deepEqual(compactDefault(some(some(123))), compact(some(some(123))))
  })

  it('getSeparateFromCompact', () => {
    const F = {
      ...option,
      compact
    }

    const separateDefault = getSeparateFromCompact(F)
    assert.deepEqual(separateDefault(none), separate(none))
    assert.deepEqual(separateDefault(some(left('123'))), separate(some(left('123'))))
    assert.deepEqual(separateDefault(some(right('123'))), separate(some(right('123'))))
  })
})
