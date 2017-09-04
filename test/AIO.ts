import * as assert from 'assert'
import { of, liftIO } from '../src/AIO'
import { IO } from '../src/IO'

function getLoggers(logs: Array<string | number>) {
  const log = (s: string | number) =>
    new IO(() => {
      logs.push(s)
    })
  const error = (e: Error) => log(e.message)
  return { log, error }
}

describe('AIO', () => {
  it('of', () => {
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)
    const aio = of('a')
    aio.run(error, log)
    assert.deepEqual(logs, ['a'])
  })

  it('chain', () => {
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)
    const aio1 = of('a').chain(() => of(1))
    aio1.run(error, log)
    assert.deepEqual(logs, [1])

    let counter = 0
    const aio2 = liftIO(
      new IO(() => {
        counter += 1
        return 'a'
      })
    )
    const aio3 = liftIO(
      new IO(() => {
        counter += 1
        return 'b'
      })
    )
    const aio4 = aio2.chain(() => aio3)
    aio4.run(error, log)
    assert.strictEqual(counter, 2)
    assert.deepEqual(logs, [1, 'b'])
  })

  it('liftIO', () => {
    let counter = 0
    const logs: Array<string | number> = []
    const { log, error } = getLoggers(logs)

    const aio1 = liftIO(
      new IO(() => {
        counter += 1
        return 'a'
      })
    )

    assert.strictEqual(counter, 0)
    assert.deepEqual(logs, [])

    aio1.run(error, log)

    assert.strictEqual(counter, 1)
    assert.deepEqual(logs, ['a'])

    const aio2 = liftIO(
      new IO(() => {
        throw new Error('ouch')
      })
    )

    aio2.run(error, log)

    assert.strictEqual(counter, 1)
    assert.deepEqual(logs, ['a', 'ouch'])
  })
})
