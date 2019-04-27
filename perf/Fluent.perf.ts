import * as Benchmark from 'benchmark'
import * as F from './Fluent.def'
import { option, some, none } from '../src/Option'

const suite = new Benchmark.Suite()

const fluent = F.fluent(option)

const map = option.map
const chain = option.chain

suite
  .add('fluent', function() {
    // tslint:disable-next-line: no-unused-expression
    fluent(some(1))
      .map(n => n * 2)
      .chain(n => (n > 2 ? some(n) : none))
      .map(n => n + 1).value
  })
  .add('static dictionary', function() {
    option.map(option.chain(option.map(some(1), n => n * 2), n => (n > 2 ? some(n) : none)), n => n + 1)
  })
  .add('static dictionary (direct)', function() {
    map(chain(map(some(1), n => n * 2), n => (n > 2 ? some(n) : none)), n => n + 1)
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
