var Benchmark = require('benchmark')

const suite = new Benchmark.Suite()

const double = n => n * 2

const n = 2

class Id {
  constructor(value) {
    this.value = value
  }
  map(f) {
    return new Id(f(this.value))
  }
}

const wrap = x => x
const unwrap = x => x

suite
  .add('n', function() {
    double(2)
  })
  .add('Id', function() {
    new Id(2).map(double).value
  })
  .add('wrap / unwrap', function() {
    unwrap(double(wrap(2)))
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
