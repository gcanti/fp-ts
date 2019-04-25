import * as Benchmark from 'benchmark'
import { Either, left, right, isLeft } from '../src/Either'
import { readerTaskEither } from '../src/ReaderTaskEither'
import { taskEither, TaskEither } from '../src/TaskEither'

const suite = new Benchmark.Suite()

const f = (e: Either<string, string>): Promise<Either<string, number>> =>
  isLeft(e) ? Promise.resolve(left(e.value)) : Promise.resolve(right(e.value.length))
const g = (e: Either<string, number>): Promise<Either<string, boolean>> =>
  isLeft(e) ? Promise.resolve(left(e.value)) : Promise.resolve(right(e.value > 2))

const native = () =>
  Promise.resolve(right('foo'))
    .then(f)
    .then(g)

const te = taskEither
  .of('foo')
  .chain(s => taskEither.of(s.length))
  .chain(n => taskEither.of(n > 2))

const rte = readerTaskEither
  .of('foo')
  .chain(s => readerTaskEither.of(s.length))
  .chain(n => readerTaskEither.of(n > 2))

type ReaderTaskEither2<E, L, A> = (e: E) => TaskEither<L, A>

const of = <A>(a: A): ReaderTaskEither2<unknown, never, A> => () => taskEither.of(a)

const chain = <E, L, A, B>(
  fa: ReaderTaskEither2<E, L, A>,
  f: (a: A) => ReaderTaskEither2<E, L, B>
): ReaderTaskEither2<E, L, B> => {
  return e => fa(e).chain(a => f(a)(e))
}

const rte2: ReaderTaskEither2<{}, {}, boolean> = chain(chain(of('foo'), s => of(s.length)), n => of(n > 2))

// // tslint:disable-next-line
// native().then(e => console.log('native', e))
// // tslint:disable-next-line
// te.run().then(e => console.log('TaskEither', e))
// // tslint:disable-next-line
// rte.run({}).then(e => console.log('ReaderTaskEither', e))

suite
  .add('TaskEither', function() {
    // tslint:disable-next-line: no-floating-promises
    te.run()
  })
  .add('native', function() {
    // tslint:disable-next-line: no-floating-promises
    native()
  })
  .add('ReaderTaskEither', function() {
    // tslint:disable-next-line: no-floating-promises
    rte.run({})
  })
  .add('ReaderTaskEither', function() {
    // tslint:disable-next-line: no-floating-promises
    rte2({}).run()
  })
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
