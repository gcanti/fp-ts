import * as assert from 'assert'
import * as eitherT from '../src/EitherT'
import { left, right } from '../src/Either'
import { task } from '../src/Task'

describe('EitherT', () => {
  it('getEitherT', () => {
    const { chain, of } = eitherT.getEitherT(task)
    const f = (n: number) => of(n * 2)
    const x = of(1)
    const y = task.of(left('foo'))
    return Promise.all([chain(x, f)(), chain(y, f)()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, right(2))
      assert.deepStrictEqual(e2, left('foo'))
    })
  })
})
