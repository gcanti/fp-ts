const Benchmark = require('benchmark')
const { left } = require('../lib/Either')

const suite = new Benchmark.Suite()

const double = n => n * 2

const x = left(1)

suite
  .add('map', function() {
    x.map(double)
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
