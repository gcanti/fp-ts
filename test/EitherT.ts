import * as assert from 'assert'
import * as eitherT from '../src/EitherT'
import { left, right } from '../src/Either'
import { task } from '../src/Task'
import { option, some, none } from '../src/Option'

describe('EitherT', () => {
  it('right', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.right(option)(none), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.right(option)(some(1)), some(right(1)))
  })

  it('left', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.left(option)(none), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.left(option)(some(1)), some(left(1)))
  })

  it('fromEither', () => {
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.fromEither(option)(right(1)), some(right(1)))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.fromEither(option)(left(1)), some(left(1)))
  })

  it('mapLeft', () => {
    const len = (s: string): number => s.length
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.mapLeft(option)(len)(none), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.mapLeft(option)(len)(some(right(1))), some(right(1)))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.mapLeft(option)(len)(some(left('foo'))), some(left(3)))
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.bimap(option)(none, len, double), none)
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.bimap(option)(some(right<string, number>(1)), len, double), some(right(2)))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(eitherT.bimap(option)(some(left<string, number>('foo')), len, double), some(left(3)))
  })

  it('getEitherT', () => {
    // tslint:disable-next-line: deprecation
    const { chain, of } = eitherT.getEitherT(task)
    const f = (n: number) => of(n * 2)
    const x = of(1)
    const y = task.of(left<string, number>('foo'))
    return Promise.all([chain(f, x).run(), chain(f, y).run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, right(2))
      assert.deepStrictEqual(e2, left('foo'))
    })
  })

  it('getEitherT2v', () => {
    const { chain, of } = eitherT.getEitherT2v(task)
    const f = (n: number) => of(n * 2)
    const x = of(1)
    const y = task.of(left<string, number>('foo'))
    return Promise.all([chain(x, f).run(), chain(y, f).run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, right(2))
      assert.deepStrictEqual(e2, left('foo'))
    })
  })
})
