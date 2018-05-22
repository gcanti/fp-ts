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
import { left as taskEitherLeft, taskEither } from '../src/TaskEither'
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

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    return readerTaskEither
      .of<{}, number, number>(1)
      .chain(() => new ReaderTaskEither(v => taskEitherLeft(task.of(2))))
      .mapLeft(double)
      .run({})
      .then(e => {
        assert.deepEqual(e, eitherLeft(4))
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

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = readerTaskEither.of<{}, string, number>(1)
    const teLeft = fromLeft<{}, string, number>('foo')
    return Promise.all([
      teRight.bimap(f, g).run({}),
      teLeft.bimap(f, g).run({}),
      readerTaskEither.bimap(teRight, f, g).run({})
    ]).then(([e1, e2, e3]) => {
      assert.deepEqual(e1, eitherRight(false))
      assert.deepEqual(e2, eitherLeft(3))
      assert.deepEqual(e1, e3)
    })
  })

  it('orElse', () => {
    const l = fromLeft<{}, string, number>('foo')
    const r = readerTaskEither.of<{}, string, number>(1)
    const tl = l.orElse(l => readerTaskEither.of<{}, number, number>(l.length))
    const tr = r.orElse(() => readerTaskEither.of<{}, number, number>(2))
    return Promise.all([tl.run({}), tr.run({})]).then(([el, er]) => {
      assert.deepEqual(el, eitherRight(3))
      assert.deepEqual(er, eitherRight(1))
    })
  })

  it('alt', () => {
    const l1 = fromLeft<{}, string, number>('foo')
    const l2 = fromLeft<{}, string, number>('bar')
    const r1 = readerTaskEither.of<{}, string, number>(1)
    const r2 = readerTaskEither.of<{}, string, number>(2)
    const x1 = l1.alt(l2)
    const x2 = l1.alt(r1)
    const x3 = r1.alt(l1)
    const x4 = r1.alt(r2)
    const x5 = readerTaskEither.alt(r1, r2)
    return Promise.all([x1.run({}), x2.run({}), x3.run({}), x4.run({}), x5.run({})]).then(([e1, e2, e3, e4, e5]) => {
      assert.deepEqual(e1, eitherLeft('bar'))
      assert.deepEqual(e2, eitherRight(1))
      assert.deepEqual(e3, eitherRight(1))
      assert.deepEqual(e4, eitherRight(1))
      assert.deepEqual(e4, e5)
    })
  })
})
