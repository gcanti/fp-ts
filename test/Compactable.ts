import * as assert from 'assert'
import { eitherBool, optionBool } from '../src/Filterable'
import { Either, left, right } from '../src/Either'
import { none, some, Option, option } from '../src/Option'
import { getCompact, getSeparate, separated, Separated } from '../src/Compactable'
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

  it('getCompact', () => {
    const F = {
      ...option,
      separate
    }
    const compactDefault = getCompact(F)
    assert.deepEqual(compactDefault(none), compact(none))
    assert.deepEqual(compactDefault(some(none)), compact(some(none)))
    assert.deepEqual(compactDefault(some(some(123))), compact(some(some(123))))
  })

  it('getSeparate', () => {
    const F = {
      ...option,
      compact
    }

    const separateDefault = getSeparate(F)
    assert.deepEqual(separateDefault(none), separate(none))
    assert.deepEqual(separateDefault(some(left('123'))), separate(some(left('123'))))
    assert.deepEqual(separateDefault(some(right('123'))), separate(some(right('123'))))
  })
})
