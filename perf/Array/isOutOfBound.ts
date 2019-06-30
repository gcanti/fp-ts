import * as Benchmark from 'benchmark'

const suite = new Benchmark.Suite()

export function isOutOfBound1<A>(i: number, as: Array<A>): boolean {
  return i < 0 || i >= as.length
}

export function isOutOfBound2<A>(i: number): (as: Array<A>) => boolean {
  return as => i < 0 || i >= as.length
}

const as = [1, 2, 3]

suite
  .add('isOutOfBound1', function() {
    isOutOfBound1(1, as)
  })
  .add('isOutOfBound2', function() {
    isOutOfBound2(1)(as)
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
