import * as assert from 'assert'
import {
  readerTaskEither,
  fromTaskEither,
  left,
  right,
  fromEither,
  fromReader,
  tryCatch,
  ask,
  asks,
  local,
  ReaderTaskEither,
  fromLeft,
  fromIO,
  fromIOEither
} from '../src/ReaderTaskEither'
import { left as eitherLeft, right as eitherRight, either } from '../src/Either'
import { taskEither } from '../src/TaskEither'
import { task, Task } from '../src/Task'
import { reader } from '../src/Reader'
import { IO } from '../src/IO'
import { IOEither } from '../src/IOEither'

describe('ReaderTaskEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = readerTaskEither.of(double)
    const fa = readerTaskEither.of(1)
    return Promise.all([fa.ap(fab).run({}), fab.ap_(fa).run({}), readerTaskEither.ap(fab, fa).run({})]).then(
      ([e1, e2, e3]) => {
        assert.deepEqual(e1, eitherRight(2))
        assert.deepEqual(e1, e2)
        assert.deepEqual(e1, e3)
      }
    )
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return readerTaskEither
      .map(readerTaskEither.of(1), double)
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
      })
  })

  it('chain', () => {
    const rte1 = readerTaskEither.chain(
      readerTaskEither.of<{}, string, string>('foo'),
      a => (a.length > 2 ? readerTaskEither.of<{}, string, number>(a.length) : fromLeft<{}, string, number>('foo'))
    )
    const rte2 = readerTaskEither.chain(
      readerTaskEither.of<{}, string, string>('a'),
      a => (a.length > 2 ? readerTaskEither.of<{}, string, number>(a.length) : fromLeft<{}, string, number>('foo'))
    )
    return Promise.all([rte1.run({}), rte2.run({})]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(3))
      assert.deepEqual(e2, eitherLeft('foo'))
    })
  })

  it('of', () => {
    return readerTaskEither
      .of(1)
      .run({})
      .then(e => assert.deepEqual(e, eitherRight(1)))
  })

  it('ask', () => {
    const x = ask<number, {}>()
    return x.run(1).then(e => assert.deepEqual(e, eitherRight(1)))
  })

  it('asks', () => {
    const x = asks((s: string) => s.length)
    return x.run('foo').then(e => assert.deepEqual(e, eitherRight(3)))
  })

  it('local', () => {
    const double = (n: number): number => n * 2
    const doubleLocal = local<number>(double)

    return doubleLocal(new ReaderTaskEither(taskEither.of))
      .run(1)
      .then(e => assert.deepEqual(e, eitherRight(2)))
  })

  it('left', () => {
    return left(task.of(1))
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherLeft(1))
      })
  })

  it('right', () => {
    return right(task.of(1))
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
      })
  })

  it('fromEither', () => {
    const fa = fromEither(either.of(1))
    return fa.run({}).then(e => {
      assert.deepEqual(e, eitherRight(1))
    })
  })

  it('fromReader', () => {
    const fa = fromReader(reader.of(1))
    return fa.run({}).then(e => {
      assert.deepEqual(e, eitherRight(1))
    })
  })

  it('fromTaskEither', () => {
    const fa = fromTaskEither(taskEither.of(1))
    return fa.run({}).then(e => {
      assert.deepEqual(e, eitherRight(1))
    })
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => Promise.resolve(1), () => 'error')
    const ko = tryCatch(() => Promise.reject(undefined), () => 'error')
    return Promise.all([ok.run({}), ko.run({})]).then(([eok, eko]) => {
      assert.deepEqual(eok, eitherRight(1))
      assert.deepEqual(eko, eitherLeft('error'))
    })
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const fa = fromIO(io)
    return fa.run({}).then(e => {
      assert.deepEqual(e, eitherRight(1))
    })
  })

  it('fromIOEither', () => {
    const x1 = fromIOEither(new IOEither(new IO(() => eitherRight(1))))
    const x2 = fromIOEither(new IOEither(new IO(() => eitherLeft('foo'))))
    return Promise.all([x1.run({}), x2.run({})]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(1))
      assert.deepEqual(e2, eitherLeft('foo'))
    })
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string): ReaderTaskEither<{}, string, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    return append('a')
      .applyFirst(append('b'))
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
        assert.deepEqual(log, ['a', 'b'])
      })
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): ReaderTaskEither<{}, string, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    return append('a')
      .applySecond(append('b'))
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
        assert.deepEqual(log, ['a', 'b'])
      })
  })
})
