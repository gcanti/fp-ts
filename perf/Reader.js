var Benchmark = require('benchmark')
const { Reader } = require('../lib/Reader')

const suite = new Benchmark.Suite()

const f = n => n * 2

const readerf = new Reader(f)

suite
  .add('f', function() {
    f(2)
  })
  .add('readerf', function() {
    readerf.run(2)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
