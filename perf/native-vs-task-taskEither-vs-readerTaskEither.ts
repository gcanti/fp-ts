import * as Benchmark from 'benchmark'
import { Either, left, right } from '../src/Either'
import { readerTaskEither } from '../src/ReaderTaskEither'
import { taskEither } from '../src/TaskEither'

const suite = new Benchmark.Suite()

const f = (e: Either<string, string>): Promise<Either<string, number>> =>
  e.fold(err => Promise.resolve(left(err)), s => Promise.resolve(right(s.length)))
const g = (e: Either<string, number>): Promise<Either<string, boolean>> =>
  e.fold(err => Promise.resolve(left(err)), n => Promise.resolve(right(n > 2)))

const native = () =>
  Promise.resolve(right<string, string>('foo'))
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
  .on('cycle', function(event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function(this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
