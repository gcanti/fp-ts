import * as Benchmark from 'benchmark'
import * as _ from '../../src/ReadonlyNonEmptyArray'

/*
cons x 24,082,845 ops/sec ±1.21% (86 runs sampled)
cons2 x 39,963,730 ops/sec ±1.78% (84 runs sampled)
*/

const suite = new Benchmark.Suite()

export function cons2<A>(head: A): (tail: ReadonlyArray<A>) => _.ReadonlyNonEmptyArray<A>
export function cons2<A>(head: A, tail: ReadonlyArray<A>): _.ReadonlyNonEmptyArray<A>
export function cons2<A>(
  head: A,
  tail?: ReadonlyArray<A>
): _.ReadonlyNonEmptyArray<A> | ((tail: ReadonlyArray<A>) => _.ReadonlyNonEmptyArray<A>) {
  if (tail === undefined) {
    return (tail) => cons2(head, tail)
  }
  const len = tail.length
  const r = Array(len + 1)
  for (let i = 0; i < len; i++) {
    r[i + 1] = tail[i]
  }
  r[0] = head
  return (r as unknown) as _.ReadonlyNonEmptyArray<A>
}

suite
  .add('cons', function () {
    _.cons(1, [2, 3, 4])
  })
  .add('cons2', function () {
    cons2(1, [2, 3, 4])
  })
  .on('cycle', function (event: any) {
    // tslint:disable-next-line: no-console
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    // tslint:disable-next-line: no-console
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
