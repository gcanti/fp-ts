import * as Benchmark from 'benchmark'
import { Either, left, right, isLeft } from '../src/Either'
import { readerTaskEither } from '../src/ReaderTaskEither'
import { taskEither } from '../src/TaskEither'

const suite = new Benchmark.Suite()

const f = (e: Either<string, string>): Promise<Either<string, number>> =>
  isLeft(e) ? Promise.resolve(left(e.value)) : Promise.resolve(right(e.value.length))
const g = (e: Either<string, number>): Promise<Either<string, boolean>> =>
  isLeft(e) ? Promise.resolve(left(e.value)) : Promise.resolve(right(e.value > 2))

const native = () =>
  Promise.resolve(right('foo'))
    .then(f)
    .then(g)

const te = taskEither.chain(taskEither.chain(taskEither.of('foo'), s => taskEither.of(s.length)), n =>
  taskEither.of(n > 2)
)

const rte = readerTaskEither.chain(
  readerTaskEither.chain(readerTaskEither.of('foo'), s => readerTaskEither.of(s.length)),
  n => readerTaskEither.of(n > 2)
)

// // tslint:disable-next-line
// native().then(e => console.log('native', e))
// // tslint:disable-next-line
// te().then(e => console.log('TaskEither', e))
// // tslint:disable-next-line
// rte({})().then(e => console.log('ReaderTaskEither', e))

suite
  .add('TaskEither', function() {
    // tslint:disable-next-line: no-floating-promises
    te()
  })
  .add('native', function() {
    // tslint:disable-next-line: no-floating-promises
    native()
  })
  .add('ReaderTaskEither', function() {
    // tslint:disable-next-line: no-floating-promises
    rte({})()
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
