import * as Benchmark from 'benchmark'
import * as _ from '../../src/internal'
import * as iterable from '../../src/Iterable'

const suite = new Benchmark.Suite()

interface Forest<A> extends ReadonlyArray<Tree<A>> {}

interface Tree<A> {
  readonly value: A
  readonly forest: Forest<A>
}

const make = <A>(value: A, forest: Forest<A> = _.emptyReadonlyArray): Tree<A> => ({
  value,
  forest
})

const toIterable = <A>(self: Tree<A>): Iterable<A> => {
  const value = self.value
  return {
    [Symbol.iterator](): Iterator<A> {
      return {
        next() {
          return { value, done: true }
        }
      }
    }
  }
}

const head = <A>(self: Tree<A>) => iterable.head(toIterable(self))

const head2 = <A>(self: Tree<A>) => _.some(self.value)

const input = make(1, [make(2), make(3)])

suite
  .add('head (production)', function () {
    head(input)
  })
  .add('head2', function () {
    head2(input)
  })
  .on('cycle', function (event: any) {
    console.log(String(event.target))
  })
  .on('complete', function (this: any) {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
