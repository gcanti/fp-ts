import * as assert from 'assert'
import {
  readerTaskEither,
  fromTaskEither,
  left,
  right,
  fromTask,
  fromEither,
  fromReader,
  tryCatch,
  ask,
  asks,
  local,
  ReaderTaskEither
} from '../src/ReaderTaskEither'
import { left as eitherLeft, right as eitherRight, either } from '../src/Either'
import { fromLeft, taskEither } from '../src/TaskEither'
import { task } from '../src/Task'
import { reader } from '../src/Reader'

describe('ReaderTaskEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = readerTaskEither.of(double)
    const fa = readerTaskEither.of(1)
    return Promise.all([
      fa
        .ap(fab)
        .run({})
        .run(),
      fab
        .ap_(fa)
        .run({})
        .run(),
      readerTaskEither
        .ap(fab, fa)
        .run({})
        .run()
    ]).then(([e1, e2, e3]) => {
      assert.deepEqual(e1, eitherRight(2))
      assert.deepEqual(e1, e2)
      assert.deepEqual(e1, e3)
    })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return readerTaskEither
      .map(readerTaskEither.of(1), double)
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
      })
  })

  it('chain', () => {
    const rte1 = readerTaskEither.chain(
      readerTaskEither.of<{}, string, string>('foo'),
      a =>
        a.length > 2
          ? readerTaskEither.of<{}, string, number>(a.length)
          : fromTaskEither(fromLeft<string, number>('foo'))
    )
    const rte2 = readerTaskEither.chain(
      readerTaskEither.of<{}, string, string>('a'),
      a =>
        a.length > 2
          ? readerTaskEither.of<{}, string, number>(a.length)
          : fromTaskEither(fromLeft<string, number>('foo'))
    )
    return Promise.all([rte1.run({}).run(), rte2.run({}).run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(3))
      assert.deepEqual(e2, eitherLeft('foo'))
    })
  })

  it('of', () => {
    return readerTaskEither
      .of(1)
      .run({})
      .run()
      .then(e => assert.deepEqual(e, eitherRight(1)))
  })

  it('of', () => {
    return readerTaskEither
      .of(1)
      .of(2)
      .run({})
      .run()
      .then(e => assert.deepEqual(e, eitherRight(2)))
  })

  it('ask', () => {
    const x = ask<number, {}>()

    return x
      .run(1)
      .run()
      .then(e => assert.deepEqual(e, eitherRight(1)))
  })

  it('asks', () => {
    const x = asks((s: string) => s.length)

    return x
      .run('foo')
      .run()
      .then(e => assert.deepEqual(e, eitherRight(3)))
  })

  it('local', () => {
    const double = (n: number): number => n * 2
    const doubleLocal = local<number>(double)

    return doubleLocal(new ReaderTaskEither(taskEither.of))
      .run(1)
      .run()
      .then(e => assert.deepEqual(e, eitherRight(2)))
  })

  it('left', () => {
    return left(task.of(1))
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherLeft(1))
      })
  })

  it('right', () => {
    return right(task.of(1))
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('fromEither', () => {
    const fa = fromEither(either.of(1))
    return fa
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('fromReader', () => {
    const fa = fromReader(reader.of(1))
    return fa
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('fromTask', () => {
    const fa = fromTask(task.of(1))
    return fa
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('fromTaskEither', () => {
    const fa = fromTaskEither(taskEither.of(1))
    return fa
      .run({})
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => Promise.resolve(1), () => 'error')
    const ko = tryCatch(() => Promise.reject(undefined), () => 'error')
    return Promise.all([ok.run({}).run(), ko.run({}).run()]).then(([eok, eko]) => {
      assert.deepEqual(eok, eitherRight(1))
      assert.deepEqual(eko, eitherLeft('error'))
    })
  })
})
